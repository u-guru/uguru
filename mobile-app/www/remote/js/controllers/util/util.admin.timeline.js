angular.module('uguru.util.controllers')

.controller('AdminTimelineController', [

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
	'CTAService',
	function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, LoadingService, $timeout, University, TimelineService, CTAService) {

		//first format by
		$scope.page = {active: {tabName: 'Home', progress:null}};
		var NUM_PRIORITIZED = 16;

		$scope.setActiveThread = function(tabName) {
			$scope.page.active.tabName = tabName;
		}
		// Define format
		// - Google hyperlinks to subprojects
		// --- uguru/milestones/january/date
		// --- I maintain all of it, dw on your end
		// --- Create day goals
		// --- Test Sprint vs Weak
		// - functional + testing is a MUST
		// - Sleek is best-effort

		// alpha beta percentages
		// fill in this weeks' projects
		// visual colors
		// all remaining projects --> icebox
		// team photos within betas
		// moodboard component page MVP
		// roles + responsibilities
		// Glossary
		$scope.moodboardComponents = [
			{
				name: "Cards",
				cta_box_bg: 'bg-azure',
				description: "Cards with a purpose",
				top_five: [
					{
						title: "Google's Material Cards",
						reference: "http://www.google.com",
					},
					{
						title: "Pinterest's Material Cards",
						reference: "http://www.Pinterests.com",
						//@GABRIELLE-NOTE (feel free to add other fields)
					}

				],
				icebox: [

					{
						title: "Yahoo's Material Cards",
						reference: "http://www.yahoo.com",
					},
					{
						title: "Facebooks's Material Cards",
						reference: "http://www.facebook.com",
					}
					// add however many

				]
			},
			//end day 1
			{
				name: "Component Two",
				top_five: [
					{
						title: "Google's Material Lists",
						reference: "http://www.google.com"
					}
				]
			},

		]

		$scope.adminTabs = ["Home", "Universities", "Roles", "Calendar", "Guides",  "Moodboards", "Glossary"];
		$scope.projects = [
			{name:'Pre-app (Universities, Sidebar)'},
			{name: 'Login/Logout + Signup + School Email Verify'},
			{name: 'Become a Guru'},
			{name: 'Guru can fill out their profile'},
			{name: 'Guru can increase their credibility'},
			{name: 'Guru can create 1-->Many shops'},
			{name: 'Guru can promote themselves'},
			{name: 'Guru can bill students'},
			{name: 'Student can create a request'},
			{name: 'Student add/remove courses'},
			{name: 'Student + Guru can enhance message'},
			{name: 'MVP Email Marketing'},
			{name: 'Logo Redesign (Saturday)'},
			{name: 'uMoodboard MVP'},
			{name: 'One Pagers'},
			{name: 'Admin Stuff'}, //remove mobile app from stores
			{name: 'Access 2.0'},
			{name: 'Guru OH'},
			{name: 'Catchup with Mobile Apps'},
			{name: 'Better Mobile Experience'},
			{name: 'Data + Content'},
			{name: 'All Audience Edge Case'},
			{name: 'First Time Experience + Tutorials'},
			{name: 'Custom Courses + Universities'},
		];

		// {"PLANNING Figure out format for the week + push it": false},
				// {"PLANNING + Project specs: saturday-logo, whack wednesday, login/signup/fb, independent project": false},
				// {"Add to plan--> guru mode vs student mode + last mode signed in": false},
				// {"Hi-fi --- guru + student dashboard on mobile": false},
				// {"Hi-fi --- signup page / not signup apge": false},
				// {"Add to plan --> 'design project transitions + sneakViews + scrollreveal'": false},
				// {"Add to plan --> 'university specific project'": false},
				// {"Add to plan --> 'pricing on profile cards etc'": false},
				// {"Add to plan --> 'Loading Spec'": false},
				// {"Add to plan --> 'complete profiles'": false},
				// {"Add to plan --> 'helicopter theme'": false},
				// {"Add to plan --> 'edge cases'": false},
				// {"Add to plan --> 'checkin on goals'": false},
				// {"Add to plan --> 'components'": false},
				// {"Add to plan --> 'all audiences'": false},
				// {"Add to plan --> 'user personal site icon'": false},
				// {"Add to plan --> 'weekly themes: build moodboards -- tie & finalize animations'": false},
				// {"Add to plan --> 'marketing + email transactions'": false},
				// {"Add to plan --> tutorial benchmark": false},

		$scope.sprints = [];
		var getProjectOneActionItems = function() {
			var resultDict = {};

			//STOP USING THIS DAMN THING & FINALIZE
			resultDict.alpha = [
				{'Add all projects to admin + template': false},
				{'Compile + Ship MVP': false},
				{'Fluid Spec': false},
				{'Data:  Finalize categories, Analyse + get + Scrape Popular Courses, Map All Documents': false},
				{"Testing comfort + verify + admin": false},
				{'Content, Privacy Terms, Final categories': false},
				{'Minor errors --> back button action become guru / login/ signup':false},
				{'Fluidity Spec':false},
				{"Sanitize Courses": false},
				{"Fluidity spec + implement": false},
				{"Login / signup / facebook connect spec": false},
				{"list of all unfinished threads": false},
				{"Code Cleanup": false},
				{"Admin tools private only": false},
				{"Map Window": false}
			];


			resultDict.beta = [{"Pre-App Test Spec": false}, {"Full University Page PDF Report": false}];

			resultDict.production = [
				{"Complete all pages/components":true},
				{"Map Finalize + customize map":false},
				{"Home page scroll spec + implement":false},
				{"Content card spacing + spec":false},
				{"Tab bar":false},
				{"Cross platform":false},
				{"Fluidity":false},
				{"Resolve Categories":false},
				{"Support styling + finalize w.r.t support icon":false},
				{"Agree on animation spec":false},
				{"FAQ polishing":false},
				{"Staging Env":false}
			];

			return resultDict;
		}

		$scope.calculateProjectProgress = function(project) {
			var progressDict = {alpha:0, alpha_total:0, beta:0, beta_total:0, production_total:0, production:0, overall:0};
			progressDict.total = project.alpha.length + project.beta.length + project.production.length;
			for (var i = 0; i < project.alpha.length; i ++) {
				var indexAlphaItem = project.alpha[i];
				var indexAlphaKey = Object.keys(project.alpha[i]);
				progressDict.alpha_total += 1;
				if (indexAlphaItem[indexAlphaKey]) {
					progressDict.alpha += 1;
					progressDict.overall += 1;
				}
			}
			for (var j = 0; j < project.beta.length; j ++) {
				var indexBetaItem = project.beta[j];
				var indexBetaKey = Object.keys(project.beta[j]);
				progressDict.beta_total += 1;
				if (indexBetaItem[indexBetaKey]) {
					progressDict.beta += 1;
					progressDict.overall += 1;
				}

			}
			for (var k = 0; k < project.production.length; k ++) {
				var indexProductionItem = project.production[k];
				var indexProductionKey = Object.keys(project.production[k]);
				progressDict.production_total += 1;
				if (indexProductionItem[indexProductionKey]) {
					progressDict.production += 1;
					progressDict.overall += 1;
				}
			}

			progressDict.alpha_percent = parseInt((progressDict.alpha / parseFloat(progressDict.alpha_total) * 100)) + '%';
			progressDict.beta_percent = parseInt((progressDict.beta / parseFloat(progressDict.beta_total) * 100)) + '%';
			progressDict.production_percent = parseInt((progressDict.production / parseFloat(progressDict.production_total) * 100)) + '%';
			progressDict.overall_percent = parseInt((progressDict.overall / parseFloat(progressDict.total) * 100)) + '%';

			if (progressDict.alpha === progressDict.alpha_total) {
				progressDict.alpha_complete = true;
			}

			if (progressDict.beta === progressDict.beta_total) {
				progressDict.beta_complete = true;
			}

			if (progressDict.production === progressDict.production_total) {
				progressDict.production_complete = true;
			}

			$timeout(function() {
				$scope.projects[0].progress = progressDict;
				$timeout(function() {
					$scope.$apply();
				});
			}, 100)
			return progressDict;
		}

		$scope.projects[0].action_items = getProjectOneActionItems();

		$scope.projects[0].progress = $scope.calculateProjectProgress($scope.projects[0].action_items);
		console.log($scope.projects[0].progress)

		$scope.sprints = [{description:"Functional product students can use", projects:$scope.projects.slice(0,NUM_PRIORITIZED)}, {description:"Icebox", projects:$scope.projects.slice(NUM_PRIORITIZED, $scope.projects.length)}];

		var initProject = function(project) {
			project.alpha_complete = false;
			project.beta_complete = false;
			project.production_complete = false;
			project.progress_percentage = 0;
			if (!project.action_items) {
				project.action_items = {alpha:[], beta:[], production:[]}
			}
			return project;
		}


		var initProjectCTAS = function() {

			for (var i = 0; i < $scope.projects.length; i ++) {
				// indexProject = $scope.projects[i];

				CTAService.initSingleCTA('#cta-box-project-' + i, '#admin-main');

			}

		}

		// <!--@GABRIELLE-NOTE this is the moodboard code JS -->
		var initMoodboardCTAS = function() {
			for (var i = 0; i < $scope.moodboardComponents.length; i ++) {
				CTAService.initSingleCTA('#cta-box-moodboard-' + i, '#moodboard-main');
			}
		}


		$scope.$on('$ionicView.loaded', function() {
			$timeout(function() {
				initProjectCTAS();
				initMoodboardCTAS();
			}, 1000)
		})




		// 1. Define everything that needs to be done & share it



	}

]);