var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
var async = require('async');
var request = require('request');
var tokenSecret = 'breezeToken';

var Schema  = mongoose.Schema;

// define schemas
var travelSchema   = new Schema({
  Name: String,
  phoneNum: String,
  userEmail:String,
  Source:String,
  Destination:String,
  travelDate:String,
  travelTime:String
});

var userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  facebook: {
    id: String,
    email: String
  },
  google: {
    id: String,
    email: String
  }
});
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
// define a model
var User = mongoose.model('User', userSchema);
var Travel = mongoose.model('Travel', travelSchema);
mongoose.connect('mongodb://carpooler:ilikecarpooling@ds053312.mongolab.com:53312/carpooler'); // connect to our database
var app = express();

app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/carpooler', function(req, res, next) {
  Travel.find(function(err, carpooler) {
      if (err)
        res.send(err);

      res.json(carpooler);
    });

});

app.get('/api/carpooler/:id', function(req, res, next) { //Get by destination, date, time
  Travel.findById(req.params.id, function(err, event) {
    if (err) return next(err);
    res.send(travel);
  });
});

app.post('/api/carpooler', function (req, res, next) {
   var travel = new Travel();    // create a new instance of the Travel model
    travel.Name = req.body.Name;  // set the event name (comes from the request)
    travel.userEmail=req.body.userEmail;
    travel.phoneNum=req.body.phoneNum;
    travel.Source=req.body.Source;
    travel.Destination=req.body.Destination;
    travel.travelDate=req.body.travelDate;
    travel.travelTime=req.body.travelTime;
                                //configure angular to choose from dropdown menu
    travel.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Travel Successfully Added!' });
    });

});
/*
app.delete('/api/carpooler/:id', function(req, res) {
    Travel.remove({
      _id: req.params.event_id
    }, function(err, event) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });
*/

function ensureAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    try {
      var decoded = jwt.decode(token, tokenSecret);
      if (decoded.exp <= Date.now()) {
        res.send(400, 'Access token has expired');
      } else {
        req.user = decoded.user;
        return next();
      }
    } catch (err) {
      return res.send(500, 'Error parsing token');
    }
  } else {
    return res.send(401);
  }
}

function createJwtToken(user) {
  var payload = {
    user: user,
    iat: new Date().getTime(),
    exp: moment().add('days', 7).valueOf()
  };
  return jwt.encode(payload, tokenSecret);
}

app.post('/auth/signup', function(req, res, next) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    if (err) return next(err);
    res.send(200);
  });
});

app.post('/auth/login', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) return res.send(401, 'User does not exist');
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.send(401, 'Invalid email and/or password');
      var token = createJwtToken(user);
      res.send({ token: token });
    });
  });
});

app.post('/auth/facebook', function(req, res, next) {
  var profile = req.body.profile;
  var signedRequest = req.body.signedRequest;
  var encodedSignature = signedRequest.split('.')[0];
  var payload = signedRequest.split('.')[1];

  var appSecret = 'ca16738dcd74712d3c36938bbb6b1e53';

  var expectedSignature = crypto.createHmac('sha256', appSecret).update(payload).digest('base64');
  expectedSignature = expectedSignature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  if (encodedSignature !== expectedSignature) {
    return res.send(400, 'Invalid Request Signature');
  }

  User.findOne({ facebook: profile.id }, function(err, existingUser) {
    if (existingUser) {
      var token = createJwtToken(existingUser);
      return res.send(token);
    }
    var user = new User({
      name: profile.name,
      facebook: {
        id: profile.id,
        email: profile.email
      }
    });
    user.save(function(err) {
      if (err) return next(err);
      var token = createJwtToken(user);
      res.send(token);
    });
  });
});

app.post('/auth/google', function(req, res, next) {
  var profile = req.body.profile;
  User.findOne({ google: profile.id }, function(err, existingUser) {
    if (existingUser) {
      var token = createJwtToken(existingUser);
      return res.send(token);
    }
    var user = new User({
      name: profile.displayName,
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });
    user.save(function(err) {
      if (err) return next(err);
      var token = createJwtToken(user);
      res.send(token);
    });
  });
});

app.get('/api/users', function(req, res, next) {
  if (!req.query.email) {
    return res.send(400, { message: 'Email parameter is required.' });
  }

  User.findOne({ email: req.query.email }, function(err, user) {
    if (err) return next(err);
    res.send({ available: !user });
  });
});


app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
