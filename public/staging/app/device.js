var app = angular.module('DeviceModule', []);

app.controller('DeviceController', ['$scope', '$http', function($scope, $http){
	$scope.device = {'deviceToken':''};
	
	$scope.init = function(){
		console.log('Device Controller: INIT');
	}
	
	$scope.register = function(){
		var json = JSON.stringify($scope.device);
		console.log('REGISTER: '+ json);
		
		var url = '/api/device';
		
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
        
            alert('Device Created');
            window.location.href = '/staging/device';
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });

	}
	


	
	
}]);

