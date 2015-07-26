var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

var config = require('./config');
var Schema  = mongoose.Schema;

// define schemas
var travelSchema   = new Schema({
  Name: String,
  phoneNum: String,
  userEmail:String,
  Source:String,
  Destination:String,
  travelDate:Date,
  travelTime:String,
  sourceLat:Number,
  sourceLong:Number,
  destLat:Number,
  destLong:Number
});

var userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  phoneNum:String
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
var Travel = mongoose.model('Travel', travelSchema);

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();

app.set('port', process.env.PORT || 3000);
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.phoneNum=req.body.phoneNum || user.phoneNum;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});


app.get('/api/carpooler', ensureAuthenticated,function(req, res, next) {
  Travel.find({},function(err, carpooler) {
      if (err)
        res.send(err);

      res.json(carpooler);
    });

});

app.get('/api/carpooler/:booking_id',ensureAuthenticated, function(req, res, next) { //Get by destination, date, time
  Travel.findById(req.params.booking_id, function(err, booking) {
    if (err) return next(err);
    res.send(booking);
  });
});

app.post('/api/carpooler',ensureAuthenticated, function (req, res, next) {
   var travel = new Travel();    // create a new instance of the Travel model
    travel.Name = req.body.Name;  // set the event name (comes from the request)
    travel.userEmail=req.body.userEmail;
    travel.phoneNum=req.body.phoneNum;
    travel.Source=req.body.Source;
    travel.Destination=req.body.Destination;
    travel.travelDate=req.body.travelDate;
    travel.travelTime=req.body.travelTime;
    travel.sourceLat=req.body.sourceLat;
    travel.sourceLong=req.body.sourceLong;
    travel.destLat=req.body.destLat;
    travel.destLong=req.body.destLong;
                                //configure angular to choose from dropdown menu
    travel.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Travel Successfully Added!' });
    });

});

app.delete('/api/carpooler/:booking_id', ensureAuthenticated,function(req, res) {
    Travel.remove({
      _id: req.params.booking_id
    }, function(err, booking) {
      if (err)
        res.send(err);

        Travel.find({},function(err, carpooler) {
            if (err)
              res.send(err);

            res.json(carpooler);
          });
    });
  });



/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function(req, res) {
  User.findOne({ email: req.body.email }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      res.send({ token: createJWT(user) });
    });
  });
});

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
app.post('/auth/signup', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      phoneNum:req.body.phoneNum,
      password: req.body.password
    });
    user.save(function() {
      res.send({ token: createJWT(user) });
    });
  });
});

/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
