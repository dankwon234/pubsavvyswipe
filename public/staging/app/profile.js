var app = angular.module('ProfileModule', []);

app.controller('ProfileController', ['$scope', '$http', function($scope, $http){
	$scope.profile = {'firstName':'', 'lastName':'', 'email':'', 'password':''};
	$scope.profiles = null;
	
	$scope.loginUser = {'email':'', 'password':''};
	
	$scope.init = function(){
		console.log('Profile Controller: INIT');
	}
	
	$scope.register = function(){
		var json = JSON.stringify($scope.profile);
		console.log('REGISTER: '+ json);
		
		var url = '/api/profile';
		
        $http.post(url, json).success(function(data, status, headers, config) {
            var confirmation = data['confirmation'];
            console.log('CONFIRMATION: '+JSON.stringify(data));
            
            if (confirmation != 'success'){
                alert(data['message']);
                return;
            }
        
            alert('Profile Created: '+ data['profile']);
            window.location.href = '/staging/profile';
            
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });

	}
	


	
	
}]);

