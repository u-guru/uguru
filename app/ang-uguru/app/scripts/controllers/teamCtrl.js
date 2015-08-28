'use strict';

/**
 * @ngdoc function
 * @name angUguruApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angUguruApp
 */
angular.module('app')
  .filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    })
 .controller('teamCtrl', ['$scope','$http' ,function($scope,$http) {
 	  	console.log("teamCtrl") 

    $scope.getResults = function() {
      console.log("test");
    };
   	var admin_info = {
	    'samir@uguru.me': {
	        'name': 'Samir Makhani',
	        'profile_url': 'http://i.imgur.com/ANBGfOu.png',
	        'about': 'I keep the dishes running 24/7',
	        'location': 'San Francisco, CA',
	        'university': 'UC Berkeley',
	        'role': 'Founding Guru'
	    },
	    'ben@uguru.me': {
	        'name': 'Ben Dalal',
	        'profile_url': 'http://i.imgur.com/xk6aKRJ.png',
	        'about': 'I aggregate dish washer data',
	        'location': 'El Cerrito, CA',
	        'university': 'Berkeley City College',
	        'role': 'Data Guy'
	    },
	    'gabrielle@uguru.me': {
	        'name': 'Gabrielle Wee',
	        'profile_url': '/static/img/admin/gabrielle.png',
	        'about': 'I make sure all dishes look awesome',
	        'location': 'Emeryville, CA',
	        'university': 'Game Design College',
	        'role': 'Design, Product & Front-end'
	    },
	    'jeselle@uguru.me': {
	        'name': 'Jeselle Obina',
	        'profile_url': '/static/img/admin/jeselle.png',
	        'about': 'I make the dishwasher better with research & feedback',
	        'location': 'Santa Clara, CA',
	        'university': 'University of Chicago',
	        'role': 'Design, Product'
	    },
	
	    'jason@uguru.me': {
	        'name': 'Jason Huang',
	        'profile_url': 'http://i.imgur.com/NzlBCRz.png',
	        'about': 'I test the dishwasher and make sure no surprises',
	        'location': 'Cupertino, CA',
	        'university': 'San Jose State',
	        'role': 'Front-end, QA'
	    },
	    nick: {
	        'name': 'Nick Lam',
	        'profile_url': '/static/img/admin/nicklam.png',
	        'about': 'I help make the dishwasher functional',
	        'location': 'San Jose, CA',
	        'university': 'UC Berkeley',
	        'role': 'Front-end, APIs'
	    }
	}

	$scope.team_members = admin_info;
	 console.log($scope.team_members);
	 console.log(Object.keys($scope.team_members).length)


  }

]);
 function readAndParseJSON(file) {
 	console.log(file);
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);

    if (request.status == 200)
        var file = JSON.parse(request.responseText);
    return file;
}