angular.module('uguru.util.controllers')

.controller('TimelineController', [

	'$scope',
	'$state',
	'$stateParams',
	'Restangular',
	'User',
	'$ionicSideMenuDelegate',
	'LoadingService',
	'$timeout',
	'University',
	'TimelineService',
	function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, LoadingService, $timeout, University, TimelineService) {

		//first format by
		$scope.user.timeline_universities = TimelineService.formatUniversitiesByDueDate($scope.user.universities);
		$scope.user.timeline_universities = TimelineService.formatTimelineUniversitiesForHSStudent($scope.user.timeline_universities);
		console.log('user universities', $scope.user.timeline_universities)
		$scope.header = {
			timestamp: TimelineService.todaysDateShortFormat()
		}

		var event_one = {
			title: 'If you work in college admissions, you need to get better at Instagram.',
			body: 'Time reported that kids were starting to turn to Instagram to make their college decisions.',
			tags: ['social media', 'hs support'],
			announcer: {
				name: 'Jeselle',
				last_name: 'Obina',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "presentation guru"
			},
			formatted_time: 'December 16, 2015',
			category: 'blog'
		}

		var event_two = {
			title: 'Officially accepting Gurus for Spring 2016.',
			tags: ['announcement', 'hs support'],
			announcer: {
				name: 'Samir',
				last_name: 'Makhani',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "founding guru"
			},
			formatted_time: 'December 15, 2015',
			category: 'milestone'
		}

		var event_three = {
			title: 'Uguru now supports DePaul University',
			svg: 'https://upload.wikimedia.org/wikipedia/en/8/85/DePaul_Blue_Demons_alternate_logo.svg',
			body: 'We are excited to welcome the Blue Demons to Uguru!',
			tags: ['announcement', 'college', 'depaul'],
			announcer: {
				name: 'Samir',
				last_name: 'Makhani',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "founding guru"
			},
			formatted_time: 'December 15, 2015',
			category: 'milestone'
		}

		var event_four = {
			title: 'How to: Make Animated Gifs',
			banner: 'http://45.media.tumblr.com/952cc32ec6b06383077d0749528a35f8/tumblr_nz6n7jEPHs1s5f7v4o1_500.gif',
			announcer: {
				name: 'Gabrielle',
				last_name: 'Wee',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "design guru"
			},
			formatted_time: 'December 13, 2015',
			category: 'tutorial'
		}

		var event_five = {
			title: 'Launching Soon: College Admission Gurus',
			announcer: {
				name: 'Samir',
				last_name: 'Makhani',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "founding guru"
			},
			tags: ['new feature', 'admissions'],
			formatted_time: 'December 12, 2015',
			category: 'high-school',
			formatted_category: 'high school'
		}

        var event_six = {
			title: 'How I learned Python in a day',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar mauris quis ex ullamcorp...',
			announcer: {
				name: 'Jason',
				last_name: 'Huang',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "dev guru"
			},
            attachment: {
                title: 'python',
                extension: 'pdf',
                url: 'http://gabriellew.ee/static/pdf/resume.pdf'
            },
			tags: ['life at uguru', 'python'],
			formatted_time: 'December 11, 2015',
			category: 'blog'
		}

        var event_seven = {
			title: 'The ultimate parent\'s guide to choosing the right guru',
			announcer: {
				name: 'Samir',
				last_name: 'Makhani',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "founding guru"
			},
			tags: ['tips', 'guru search'],
			formatted_time: 'December 10, 2015',
			category: 'parent'
		}

        var event_seven = {
			title: 'Uguru partners up with Bohemian Coding',
            banner: 'http://s3.amazonaws.com/skillshare/uploads/parentClasses/3b5b63fb47f08efc8ab76e4aeef2b161/7914b201',
			announcer: {
				name: 'Jeselle',
				last_name: 'Obina',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "presentation guru"
			},
			tags: ['bohemian coding'],
			formatted_time: 'December 9, 2015',
			category: 'partnership'
		}

        var event_eight = {
			title: 'Easy billing for professional gurus',
			announcer: {
				name: 'Samir',
				last_name: 'Makhani',
				profile_url: 'https://www.uguru.me/static/remote/img/avatar.svg',
				role: "founding guru"
			},
			tags: ['billing', 'new feature', 'money'],
			formatted_time: 'December 8, 2015',
			category: 'professional'
		}

		$scope.timeline = {
			events: [event_one, event_two, event_three, event_four, event_five, event_six, event_seven, event_eight]
		}

	}

]);