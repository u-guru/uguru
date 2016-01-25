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

		//1. initialize all sprints

		// sprints --> many projects --> projects --> many action items
		// have a sprint id

		var addUniqueIdToAllProjects = function(sprints) {
			index = 0;
			for (var i = 0; i < sprints.length; i++) {
				var indexSprint = sprints[i];
				for (var j = 0; j < indexSprint.projects.length; j++) {
					var indexProject = indexSprint.projects[j];
					indexProject.id = index;
					index += 1;
				}
			}
		}

		//takes a project and initializes the ideal object
		// project
		// project_dict
		// -- name
		// -- alpha_action
		// -- beta_action
		// -- production
		// -- action_items_arr
		// --- --- action_item =
		var initProject = function(project_dict) {

		}

		// takes in a sprint meta data and creates
		var initSprint = function(sprint_dict) {

		}

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

		//0. Get it working with 3 sprint objs
		//1. Create sprint init objs
		//   ---each has
		//        - name with usecase
		//        - array of projects
		//              - each project has dict
		//                    - name
		//                    - action_alpha [array of action_strings]
		//                    - action_beta [array of acton_strings]
		//                    - action_production [array of action_strings]
		//                    - External_Link_Dict = {"": "": }

		//2. Initialize sprints
		//		- Create sprint final object
		//		- For-loop projects
		//            - initialize project init obj from sprint metadata
		//            - 3x for-loop-action_items for each production, beta, alpha
		//            			- initialize action_item from project metadata
		//                      - parse action_item
		//            			- map default roles to all action_items
		//                      -
		//            - initialize project progress

		// Sprint: Student can select university & create an account
		// - name:
		// - projects_dict:
		// ----> name
		// ----> action_alpha: str[]
		// ----> action_beta: str[]
		// ----> action_production: str["J:", "B:", "G:"]
		//

		// To resolve
		// -analytics + marketing
		// -empty state for all collections
		//
		// use cases
		// 1. Student can select university & create an account
		// 2. Student can go to student dashboard and modify
		//       - settings
		//       - Their courses
		//       - create a request & activate their account
		//       - intro (student
		//       - next steps
		// 3. Guru can become a guru
		//       - setup their profile
		//       - create many shops
		//       - swap to student mode and remember last session
		//       - settings
		//       - become a guru
		// 4. Guru can receive requests from students
		// 5. Student can receive requests from gurus
		//       - accept
		//       - reject
		//       - cancel
		// 6. Enhanced messaging
		// 7. Ratings
		// 8. Continue Future Communications
		//       - Direct billing
		//       - Location sharing
		//       - student files
		//       - transaction history
		// 9. Student & Guru shops

		// Icebox
		//
		// GPA App
		// Mobile Support APp
		// GPA Promote
		// HS Support
		// Parent Support
		// Access 2.0
		// Component centric tutorials
		// Data management
		// Interns + applications
		// Guru OH
		// Detailed FAQ + Docs
		// Detailed Custom courses + universities



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

		// use cases
		// 1. Student can select university & create an account
		// 2. Student can go to student dashboard and modify
		//       - settings
		//       - Their courses
		//       - create a request & activate their account
		//       - intro (student
		//       - next steps
		// 3. Guru can become a guru
		//       - setup their profile
		//       - create many shops
		//       - swap to student mode and remember last session
		//       - settings
		//       - become a guru

		//0. Get it working with 3 sprint objs
		//1. Create sprint init objs
		//   ---each has
		//        - name with usecase
		//        - array of projects
		//              - each project has dict
		//                    - name
		//                    - action_alpha [array of action_strings]
		//                    - action_beta [array of acton_strings]
		//                    - action_production [array of action_strings]
		//                    - External_Link_Dict = {"": "": }

		var sprint_one = {
			name: "Student can select university & create an account",
			projects: [
				{
					name: "analytics",
					alpha: ["Inspectlet MVP", "Mixpanel MVP", "Separate Local, Dev, Production", "Finalize Tools List + Add to Admin"],
					beta: ["Test Inspectlet Works", "Test Mixpanel Work"]
				},
				{
					name: "Display on Admin",
					alpha: ["Analytics", "Moodboard", "Roles"],
					beta: [""],
				},
				{
					name: "Functionality",
					alpha: ["Make Maps Fast", "Mobile App Support", "Scroll Reveal", "University Specific"],
					beta: ["University Specific", "Home Page", "Test Home Page"],
				},
				{
					name: "Functionality",
					alpha: ["Make Maps Fast", "Mobile App Support"],
					beta: ["University Specific", "Home Page"]
				},
				{
					name: "Logo",
					Production: ["B:First Iteration", "G:Embed into app", "J:Update Design Guide"]
				}
			]
		}
		var sprint_two = {
			name: "Student MVP",
			descrition: "Student can go to student dashboard and can modify settings, their courses, create/edit/delete requests, add/edit cards + purchase credits",
			projects: [
				{
					name: "Settings",
					alpha: [""],
					beta: ["Test Inspectlet Works", "Test Mixpanel Work"],
					production: ["Components are implimented"],
				},
				{
					name: "Add/Remove Courses",
				},
				{
					name: "Tour",
					alpha: ["TourService"],
					beta: ["Test TourService on First Time Student"],
					production: ["B: Discuss, Finalize, Gameplan", "J:100% Design + Templated", "G:100% CSS/HTML w/ Best Practices"]
				},
				{
					name: "Requests",
					alpha: ["Make Maps Fast", "Mobile App Support"],
					beta: ["University Specific", "Home Page"]
				},
				{
					name: "Add/Delete Cards",
					alpha: ["Add a Card", "Delete a Card", "Stripe Local/Dev/Staging"],
					beta: ["Test Add a Card", "Test Delete a Card"],
					production: ["B:First Iteration", "G:Embed into app", "J:Update Design Guide"]
				},
				{
					name: "Purchase Credits",
					alpha: ["Bare bones MVP"]
				}
			]
		}

		var sprint_three = {
			name: "Guru MVP",
			descrition: "setup their profile, create many shops, swap to student/guru mode + stay put, settings, become a guru",
			projects: [
				{
					name: "Add/Edit Profile",
				},
				{
					name: "Create man shops",
				},
				{
					name: "Swap to student/guru mode",
				},
				{
					name: "Settings"
				},
				{
					name: "Become a Guru"
				}
			]
		}

		// Next steps for admin 1/24/2015

		// 1. Finish MVP view
		// - def initSprints + test
		// - def initProjects
		// - def initActionItem
		// - def create unique ids + modals for projects (CTA - box)
		// 2. external URLS
		// 3. Personalized
		// - view profile pic
		// - click profile link & get all actions specific to that person
		// - add row of profile pics on top of dashboard "View by"
		// 4.  create MVP spec for rest


		$scope.sprints = [];


		$scope.projects[0].action_items = getProjectOneActionItems();

		$scope.projects[0].progress = $scope.calculateProjectProgress($scope.projects[0].action_items);

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