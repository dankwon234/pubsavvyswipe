var express = require('express');
var request = require('request');
var xmlToJson = require('xml2js');
var Promise = require('bluebird');
var Profile = require('../models/Profile');
var Device = require('../models/Device');
var AutoSearch = require('../models/AutoSearch');
var router = express.Router();

var accountController = require('../controllers/AccountController.js');
var deviceController = require('../controllers/DeviceController.js');
var profileController = require('../controllers/ProfileController.js');
var autosearchController = require('../controllers/AutoSearchController.js');
var articleController = require('../controllers/ArticleController.js');

var controllers = {
	'account':accountController,
 	'currentuser':accountController,
 	'logout':accountController,
 	'login':accountController,
 	'device':deviceController, 
 	'profile':profileController, 
 	'autosearch':autosearchController, 
 	'article':articleController,
 	'search':articleController,
 	'related':articleController
 };


/* GET users listing. */
router.get('/:resource', function(req, res, next) {

	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	controller.handleGet(req, res, {'id':null, 'parameters':req.query});

});


router.get('/:resource/:id', function(req, res, next) {

  	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	controller.handleGet(req, res, {'id':req.params.id, 'parameters':req.query});
  	
});


router.post('/:resource', function(req, res, next) {
	
	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	controller.handlePost(req, res, {'id':null, 'parameters':req.query});

});


router.put('/:resource/:id', function(req, res, next) {
	
	//CONTROLLERS
	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	if (req.params.id == null){
		res.send({'confirmation':'fail', 'message':'Missing resource identiifer.'});
		return;
	}
	controller.handlePut(req, res, {'id':req.params.id, 'parameters':req.query});


});

module.exports = router;
