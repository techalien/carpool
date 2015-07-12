// =================================================================
// get the packages we need ========================================
// =================================================================
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var moment = require('moment');
var async = require('async');
var request = require('request');
var jwt    = require('json-web-token'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var Schema  = mongoose.Schema;

var travelSchema   = new Schema({
  Name: String,
  phoneNum: String,
  userEmail:String,
  Source:String,
  Destination:String,
  travelDate:Date,
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
var User = mongoose.model('User', userSchema);
var Travel = mongoose.model('Travel', travelSchema);
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// =================================================================
// routes ==========================================================
// =================================================================

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
app.get('/users', function(req, res, next) {
  if (!req.query.email) {
    return res.send(400, { message: 'Email parameter is required.' });
  }

  User.findOne({ email: req.query.email }, function(err, user) {
    if (err) return next(err);
    res.send({ available: !user });
  });
});

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}

});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the carpool API' });
});


apiRoutes.get('/carpooler', function(req, res, next) {
  Travel.find({},function(err, carpooler) {
      if (err)
        res.send(err);

      res.json(carpooler);
    });

});

apiRoutes.get('/carpooler/:booking_id', function(req, res, next) { //Get by destination, date, time
  Travel.findById(req.params.booking_id, function(err, booking) {
    if (err) return next(err);
    res.send(booking);
  });
});

apiRoutes.post('/carpooler', function (req, res, next) {
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

apiRoutes.delete('/carpooler/:booking_id', function(req, res) {
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


/*app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});
*/
apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
