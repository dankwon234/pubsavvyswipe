var Profile = require('../models/Profile.js');
var Device = require('../models/Device.js');
var mongoose = require('mongoose');



this.handleGet = function(req, res, pkg){
	console.log('Profile CONTROLLER: Handel GET');

	// fetch specific profile by ID:
	if (pkg.id != null){ 
		Profile.findById(pkg.id, function(err, profile) {
			if (err){
				res.send({'confirmation':'fail','message':"Profile "+pkg.id+" not found"});
				return;
			}
			res.json({'confirmation':'success', "profile":profile.summary()});
		});
		return;
	}


	Profile.find(req.query, function(err, profiles) {
		if (err){
			res.json({'confirmation':'fail','message':err.message});
			return;
		}

		var results = new Array();
		for (var i=0; i<profiles.length; i++){
			var p = profiles[i];
			results.push(p.summary());
		}

		res.json({'confirmation':'success', "profiles":results});
	});
	return;
}


this.handlePost = function(req, res, pkg){
	console.log('Profile CONTROLLER: Handel POST');
	Profile.create(req.body, function(err, profile){
		if (err){
			res.send({'confirmation':'fail', 'message':err.message});
			return;
		}

		//FIND DEVICE AND UPDATE device.profileId
		var query = {_id: req.body.device};
		var options = {new: true}; // important - this has to be set to 'true' 
		Device.findOneAndUpdate(query, {'profileId': profile._id}, options, function(err, device){
			if (err){
				res.json({'confirmation':'fail', 'message':err.message});
				return;
			}
		
			req.session.user = profile._id; // install cookie with profile id set to 'user'
			res.json({'confirmation':'success', 'profile':profile.summary()});
		});
	});
	return;
}



this.handlePut = function(req, res, pkg){
	console.log('Profile CONTROLLER: Handel PUT');
	var query = {_id: pkg.id};
	var options = {new: true};		
		
	Profile.findOneAndUpdate(query, req.body, options,function(err, profile){
		if (err){
			res.send({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'profile':profile.summary()});
	});
	return;

}



