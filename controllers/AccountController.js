var Profile = require('../models/Profile.js');
var mongoose = require('mongoose');


this.checkCurrentUser = function(req, res){
	if (!req.session){
		res.send({'confirmation':'fail', 'message':'User not logged in.'});
		return;
	}

	if (!req.session.user){
		res.send({'confirmation':'fail', 'message':'User not logged in.'});
		return;
	}
	
	var userId = req.session.user;
	console.log('USER '+userId+' LOGGED IN');
	
	Profile.findById(userId, function(err, profile){
		if (err){
			req.session.reset();
			res.send({'confirmation':'fail', 'message':'Profile '+userId+' not found'});
			return;
		}

		res.json({'confirmation':'success', 'profile':profile.summary()});
	});
	
}

this.handleGet = function(req, res, pkg){
	console.log('ACCOUNT CONTROLLER: Handle GET');
	
	if (pkg.id != null){
		Profile.findById(pkg.id, function(err, profile){
			if (err){
				res.send({'confirmation':'fail', 'message':'Profile '+pkg.id+' not found'});
				return next(err);
			}

			res.json({'confirmation':'success', 'profile':profile.summary()});
		});
		return;
	}
	
	var keys = Object.keys(req.query).length;
	console.log(keys+' KEYS');
	
	if (keys==0){ // no params, fetch all!
		Profile.find(function(err, profiles){
			if (err){
				res.send({'confirmation':'fail', 'message':'error'});
				return next(err);
			}
			
			res.json({"profiles":convertToJson(profiles)});
		});
		return;
	}
	
	/* Query by filters passed into parameter string: */
	Profile.find(req.query, function(err, profiles) {
	  if (err) {
		res.send({'confirmation':'fail', 'message':err});
		return next(err);
	  }
  
	  res.json({"profiles":convertToJson(profiles)});
	});
}


this.handlePost = function(req, res, pkg){
	console.log('PROFILE CONTROLLER: Handle POST');

	Profile.create(req.body, function(err, profile){
		if (err){
			res.send({'confirmation':'fail', 'message':err});
			return next(err);
		}
		
	  	res.json({'confirmation':'success', 'profile':profile.summary()});
	});
}



function convertToJson(profiles){
	var results = new Array();
    for (var i=0; i<profiles.length; i++){
  	  var p = profiles[i];
  	  results.push(p.summary());
    }
	
	return results;
}


