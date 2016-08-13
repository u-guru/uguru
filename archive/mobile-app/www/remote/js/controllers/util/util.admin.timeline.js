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

		$scope.showAdmin = false;

		if (!$scope.user || !$scope.user.id || !$scope.user.is_admin) {
			LoadingService.showMsg('404', 4000, function() {
				$state.go('^.desktop-login');
			})
		} else {
			$scope.showAdmin = true;
		}


		//first format by
		$scope.page = {active: {tabName: 'Home', progress:null}};
		var NUM_PRIORITIZED = 16;

		$scope.setActiveThread = function(tabName) {
			$scope.page.active.tabName = tabName;
		}



		//Launch on friday
		// - back and forth
		// --- student makes a request
		// --- guru receives a request
		// - data, resolve university data
		// - content (tomorrow evening)
		//


		//@GABRIELLE-NOTE
		$scope.moodboardComponents = [
			{
				name: "Search",
				cta_box_bg: 'bg-cerise',
				description: "",
				date: "January 19, 2016",
				top: [
					{
						title: "Search Behavior Concept",
						reference: "https://dribbble.com/shots/2467219-Search-behaviour",
						type: "mobile",
						banner: "https://d13yacurqjgara.cloudfront.net/users/118673/screenshots/2467219/garadge2-15.png",
					},
					{
						title: "Craiglist Redesign Concept",
						reference: "https://dribbble.com/shots/2361864-Craiglist-Mobile-animation",
						type: "mobile",
						banner: "https://d13yacurqjgara.cloudfront.net/users/30252/screenshots/2361864/craiglist-mobile-dribbble.gif",
					},
					{
						title: "Tumblr",
						reference: "http://tumblr.com",
						type: "both",
					},
					{
						title: "Style Seat",
						reference: "https://itunes.apple.com/us/app/styleseat-beauty-barber-appointments/id414313281",
						type: "mobile",
					},
					{
						title: "8tracks",
						reference: "https://itunes.apple.com/us/app/8tracks-playlist-radio-free/id346194763",
						type: "mobile",
					},
					{
						title: "Twitter",
						reference: "https://itunes.apple.com/us/app/twitter/id409789998",
						type: "desktop",
					},
					{
						title: "Google Maps",
						reference: "http://google.com/maps",
						type: "desktop",
					},
					{
						title: "Google Inbox",
						reference: "http://inbox.google.com",
						type: "desktop",
					},
					{
						title: "Fantastical 2",
						reference: "https://itunes.apple.com/us/app/fantastical-2-calendar-reminders/id975937182",
						type: "desktop",
					}

				],
				icebox: [
					{
						title: "Washington University",
						reference: "http://oncologyk12.wustl.edu/?s=oncology",
						type: "desktop",
					},
					{
						title: "Facebook",
						reference: "https://itunes.apple.com/us/app/facebook/id284882215",
						type: "mobile",
					},
					{
						title: "Slack",
						reference: "https://itunes.apple.com/us/app/slack-team-communication/id618783545",
						type: "mobile",
					}
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



		var calculateProjectProgress = function(project) {
			var progressDict = {alpha:0, alpha_total:0, beta:0, beta_total:0, production_total:0, production:0, overall:0};

			progressDict.total = ((project.alpha && project.alpha.length) || 0) + ((project.beta && project.beta.length) || 0) + ((project.production && project.production.length) || 0)
			if (project.alpha) {
				for (var i = 0; i < project.alpha.length; i ++) {
					var indexAlphaItem = project.alpha[i];
					var indexAlphaKey = Object.keys(project.alpha[i]);
					progressDict.alpha_total += 1;
					if (indexAlphaItem[indexAlphaKey]) {
						progressDict.alpha += 1;
						progressDict.overall += 1;
					}
				}
			}
			if (project.beta) {
				for (var j = 0; j < project.beta.length; j ++) {
					var indexBetaItem = project.beta[j];
					var indexBetaKey = Object.keys(project.beta[j]);
					progressDict.beta_total += 1;
					if (indexBetaItem[indexBetaKey]) {
						progressDict.beta += 1;
						progressDict.overall += 1;
					}

				}
			}
			if (project.production) {
				for (var k = 0; k < project.production.length; k ++) {
					var indexProductionItem = project.production[k];
					var indexProductionKey = Object.keys(project.production[k]);
					progressDict.production_total += 1;
					if (indexProductionItem[indexProductionKey]) {
						progressDict.production += 1;
						progressDict.overall += 1;
					}
				}
			}

			progressDict.alpha_percent =  progressDict.alpa_total &&  parseInt((progressDict.alpha / parseFloat(progressDict.alpha_total) * 100)) + '%';
			progressDict.beta_percent = progressDict.beta_total && parseInt((progressDict.beta / parseFloat(progressDict.beta_total) * 100)) + '%';
			progressDict.production_percent = progressDict.production_total && parseInt((progressDict.production / parseFloat(progressDict.production_total) * 100)) + '%';
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



		//takes a project and initializes the ideal object
		// project
		// project_dict
		// -- name
		// -- alpha_action
		// -- beta_action
		// -- production
		// -- action_items_arr
		// --- --- action_item =


		$scope.adminTabs = ["Home", "Universities", "Roles", "Moodboards"];
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
			name: "Pre-app",
			description: "Student can select university & create an account",
			projects: [
				{
					name: "Home",
					priority:{samir: 2, gabrielle:1, jeselle:2},
					alpha: ["T: Bind + compile the home loader", "T: Bind Sidebar Transition + resolve mobile", "Team CTA + Filled out", "Replace & MVP FAQ", "T: CTA from Sidebar", "T: Navbar everything", "T: Make Maps Fast", "T: Scroll Reveal Handlers + MVP"],
					beta: ["Verify Main 100%", "Verify Navbar 100%", "Verify Sidebar 100%", "Verify University 100%", "Verify Become Guru/How-it-works"],
					production: ["J: Main top section brainstorm", "J: Desktop/Mobile Iterate until 100%", "G: Mobilized already complete desktop sections", "G: Sidebar Animations/OnScroll (Mobile+Desktop)", "G: Mobile Nav + Smooth Scroll","University Search (discuss+spec+impl)", "G:Animation Spec+Check-in+Implement", "B: Verify + Finalize"]
				},
				{
					name: "University",
					priority: {samir: 1, gabrielle:3},
					alpha: ["Improve Scroll", "Make Maps Fast", "Mobile App Support", "Scroll Reveal Handlers + MVP"],
					beta: ["Verify Main 100%", "Verify Navbar 100%", "Verify Sidebar 100%", "Verify University 100%", "Verify Become Guru/How-it-works"],
					production: [ "G: Discuss + Finalize format w/ Samir", "G: Update Course Search from Zeplin", "G: Mobile/Desktop Top Section", "B: Verify + Finalize"],
				},
				{
					name: "Logo",
					priority: {gabrielle: 5, jeselle: 3},
					production: ["B:First Iteration", "J: Juxtapose Icon into app", "G:Embed into app", "G: Animate into App", "J:Update Design Guide"]
				},
				{
					name: "Content",
					priorities: {jeselle:2},
					alpha: ["Home > Main > Top Section", "FAQ", "Become Guru", "How it works", "University Templating"],
					production: ["G: Verify content meets limitations aesthetically", "J: Choose category icons for upwork"]
				},
				{
					name: "Analytics",
					alpha: ["Inspectlet MVP", "Mixpanel MVP", "Separate Local, Dev, Production", "Finalize Tools List + Add to Admin"],
					production: ["B:Become Familiar With Tools"]
				},
				{
					name: "Cleanup/Wrapup",
					alpha: ["Static Assets Hosted", "Static Assets Compressed", "Static Assets Window Responsive"],
					production: ["G: Google Maps CSS", "G: Style guide for all sprint components 100%", "G: Design guide for all sprint components 100%"],
				},
				{
					name: "Misc + Tools",
					priority: {gabrielle:2, jason:1},
					alpha: ["Animate Setup", "Gabrielle day setup", "Jeselle Day Setup", "Maps", "Homepage MVP Spec + Wrapup", "Code cleanup [Home]", "Mobile MVP", "Safari scroll", "SVG Images", "University Search", "FAQ/Evil pricing / team", "University MVP", "Upwork", "Categories", "Content", "Logo Creative"],
					beta: [
						"Create listener for css events|['http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/','http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/']",
						"Verify that your listener works for animations |['http://callmenick.com/post/listen-for-css-animation-events-with-javascript ']",
						"All recent listeners --> Property table |['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']",
						"Apply above to the home page section one: Navbar|['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']",
						"Click one of the nav items, the page should scroll (which is an animation) |['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']",
						"Map events YAY|['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']",
						"Create a step that records events to mixpanel through python|['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']",
						"Same as step 7, but instead use the javascript library.|['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']",
						"Learn how to use selenium world global dictionary for test codebase|['https://docs.google.com/document/d/1OcXbwIhHuUVIPN9HtGGsQnE1yc4c_NnUiFGlHJjAHGY/edit']"
					],
					production: ["G: Multi-Platform Scroll/Animate Analysis"]
				},
				{
					name: "Static Pages",
					priority: {gabrielle: 4},
					alpha: ["FAQ MVP Content", "FAQ MVP Template w/ Search"],
					production: ["G: FAQ Page", "G: Evil Pricing"],
				},
				{
					name: "Extra Credit",
					alpha: ["Static Assets Hosted", "Static Assets Compressed", "Static Assets Window Responsive"],
					production: ["", "Static Assets Compressed", "Static Assets Window Responsive"]
				},
				{
					name: "MVP Request Form",
					alpha: ["cta initialize", "add loader directive", "progress detailed + tracking", "categories", "subcategories + cta", "form info", "user info", "payments", "summary", "loading + exit"]
				}
			]
		}
		var sprint_two = {
			name: "Student MVP",
			description: "Student can go to student dashboard and can modify settings, their courses, create/edit/delete requests, add/edit cards + purchase credits",
			projects: [
				{
					name: "Dashboard Mobile + Desktop",
					// beta: ["Test Inspectlet Works", "Test Mixpanel Work"],
					priority: {jeselle:1},
					production: ["J T: First Iteration", "J: Mobile Dashboard", "J: Resolve/Finalize Desktop (if needed)"]
				},
				{
					name: "Settings",
					alpha: [""],
					// beta: ["Test Inspectlet Works", "Test Mixpanel Work"],
					production: ["Components are implimented"],
				},
				{
					name: "Add/Remove Courses",
				},
				{
					name: "Tour",
					alpha: ["TourService"],
					// beta: ["Test TourService on First Time Student"],
					production: ["B: Discuss, Finalize, Gameplan", "J:100% Design + Templated", "G:100% CSS/HTML w/ Best Practices"]
				},
				{
					name: "Requests",
					priority: {jeselle:5},
					alpha: ["Make Maps Fast", "Mobile App Support"],
					// beta: ["University Specific", "Home Page"],
					production: ["J: Resolve+Finalize Mobile+Desktop Form Structure", "J: Resolve+Finalize Mobile+Desktop Calendar", "J: Resolve+Finalize Map"]
				},
				{
					name: "Add/Delete Cards",
					priority: {jeselle:6},
					alpha: ["Add a Card", "Delete a Card", "Stripe Local/Dev/Staging"],
					// beta: ["Test Add a Card", "Test Delete a Card"],
					production: ["B:First Iteration", "G:Embed into app", "J:Update Design Guide"]
				},
				{
					name: "Student Purchase Credits",
					priority: {jeselle:7},
					alpha: ["Bare bones MVP"],
					production: ["J: Student can purchse credits @ Thrift Shop"]
				}
			]
		}

		var sprint_three = {
			name: "Guru MVP",
			description: "setup their profile, create many shops, swap to student/guru mode + stay put, settings, become a guru",
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
				},
				{
					name: "Guru Profiles",
					priority: {jeselle:3},
					production: ["J: Discuss + Finalize + Template Bakery, Photography", "J: Tech: Rubric/Spec + Ambitious", "J: Academic: Rubric/Spec + Ambitious", "J: Laundry: Rubric/Spec + Ambitious"]
				}
			]
		}

		var sprint_four = {
			name: "Guru Receives Request",
			priority: {jeselle: 8},
			production: ["J: Resolve + Finalize Desktop + Mobile"]
		}

		var sprint_five = {
			name: "Student receives Guru Request + Chooses",
			priority: {jeselle: 9},
			production: ["J: Resolve & Finalize Desktop + Mobile "]
		}

		var sprint_six = {
			name: "Guru & Student Enhance Message",
			priority: {jeselle: 10},
			production: ["J: Resolve & Finalize Desktop + Mobile "]
		}

		$scope.sprints = [sprint_one, sprint_two, sprint_three];
		var roleDict = {
			'alpha': {
				name: 'Samir',
				profile_url: 'https://uguru.me/static/web/images/team/samir.png'
			},
			'beta': {
				name: 'Jason',
				profile_url: 'https://uguru.me/static/web/images/team/jason.png'
			},
			'jeselle': {
				name: 'Jeselle',
				profile_url: 'https://uguru.me/static/web/images/team/jeselle.png'
			},
			'gabrielle': {
				name: 'Gabrielle',
				profile_url: 'https://uguru.me/static/web/images/team/gabrielle.png'
			},
			'both': [
				{
					name: 'Gabrielle',
					profile_url: 'https://uguru.me/static/images/img/team/gabrielle.png'
				},
				{
					name: 'Jeselle',
					profile_url: 'https://uguru.me/static/images/img/team/jeselle.png'
				}
			]

		}

		$scope.roleDict = roleDict;
		$scope.roleArr = [
							{name:'Samir', role:'alpha', profile_url:roleDict['alpha'].profile_url, bg_color:'gold', all_projects:[]},
							{name:'Jason', role:'beta', profile_url:roleDict['beta'].profile_url, bg_color: 'azure', all_projects:[]},
							{name:'Jeselle', role:'production', profile_url:roleDict['jeselle'].profile_url, bg_color:'shamrock', all_projects:[]},
							{name:'Gabrielle', role:'production', profile_url:roleDict['gabrielle'].profile_url, bg_color: 'shamrock', all_projects:[]}
						];

		var alphaBetaActionsToArr = function(arr_str, role) {
			var result_arr = [];
			for (var i = 0; i < arr_str.length; i++) {
				var indexActionItem = arr_str[i];
				var indexActionItemComplete = isActionItemComplete(indexActionItem);
				var externalLinksArr = hasExternalLinks(indexActionItem) || [];
				if (indexActionItemComplete) {
					indexActionItem = indexActionItem.replace('T:', '');
				}
				if (externalLinksArr.length) {
					indexActionItem = indexActionItem.split('|')[0];
				}
				tempDict = {}
				var key = indexActionItem + " ";
				tempDict[key] = indexActionItemComplete;
				tempDict.links = externalLinksArr;
				result_arr.push(tempDict);
			}
			return result_arr;
		}

		//
		var hasExternalLinks = function(action_string) {
			if (action_string.indexOf('|') > 0) {
				external_link_string = action_string.split('|')[1].replace('[', '').replace(']', '');
				external_link_arr = external_link_string.split(',');
				return external_link_arr;
			}
		}

		var isActionItemComplete = function(action_string) {
			return action_string.indexOf("T:") > -1;
		}

		var parseAndGetRole = function(str_action) {
			var actionSplit = str_action;
			if (actionSplit.length > 1) {
				var firstLetterLower = actionSplit[0].toLowerCase();
				if (firstLetterLower === 'g') {
					return 'gabrielle';
				}
				else if (firstLetterLower === 'j') {
					return 'jeselle';
				}
				else if (firstLetterLower === 'b') {
					return 'both'
				}
			}
		}

		var productionActionsToArr = function(arr_str, role) {
			var result_arr = [];
			for (var i = 0; i < arr_str.length; i++) {
				var indexActionItem = arr_str[i];
				var indexActionItemComplete = isActionItemComplete(indexActionItem);
				if (indexActionItemComplete) {
					indexActionItem = indexActionItem.replace('T:', '');
				}

				tempDict = {}
				var key = indexActionItem + " ";
				tempDict[key] = indexActionItemComplete;
				result_arr.push(tempDict);
			}
			return result_arr;
		}
		$scope.roleDict = {alpha: [], beta:[], gabrielle: [], jeselle: []};
		$scope.flattenedProjects = [];

		var processAndFilterProductionActionItems = function(p_actions) {
			result_dict = {gabrielle:[], jeselle:[], both:[]}
			for (var i = 0; i < p_actions.length; i++) {
				var indexActionObj = p_actions[i];
				var indexActionKey = Object.keys(indexActionObj)[0];
				var indexActionValue = indexActionObj[indexActionKey];
				var actionType = parseAndGetRole(indexActionKey);
				if (actionType === 'gabrielle') {
					var unformattedKey = indexActionKey.slice(2).trim();
					var removeFormattingDict = {}
					removeFormattingDict[unformattedKey] = indexActionValue;
					result_dict.gabrielle.push(removeFormattingDict);
				}
				else if (actionType === 'jeselle') {
					var unformattedKey = indexActionKey.slice(2).trim();
					var removeFormattingDict = {}
					removeFormattingDict[unformattedKey] = indexActionValue;
					result_dict.jeselle.push(removeFormattingDict);
				}
				else if (actionType === 'both') {
					var unformattedKey = indexActionKey.slice(2).trim();
					var removeFormattingDict = {}
					removeFormattingDict[unformattedKey] = indexActionValue;
					result_dict.both.push(removeFormattingDict);
				}
			}
			return result_dict;
		}

		function prioritySort(a, b) {
		  if (!a.priority && !b.priority) {
		    return 0;
		  }
		  if (!a.priority && b.priority) {
		  	return 1;
		  }
		  if (a.priority && !b.priority) {
		  	return 1;
		  }
		  if (a.priority && b.priority && a.priority <= b.priority) {
		  	return 1;
		  }
		  if (a.priority && b.priority && a.priority > b.priority) {
		  	return -1;
		  }
		  // a must be equal to b
		  return 0;
		}

		// takes in a sprint meta data and creates
		var initSprints = function(sprint_arr) {
			var uniqueProjectIndex = 0
			for (var i = 0; i < sprint_arr.length; i++) {
				var indexSprint = sprint_arr[i];
				var sprintProjects = indexSprint.projects;
				for (var j = 0; j < sprintProjects.length; j++) {
					var indexProject = sprintProjects[j];
					$scope.flattenedProjects.push(indexProject);
					sprintProjects[j].id = uniqueProjectIndex;
					uniqueProjectIndex += 1;
					sprintProjects[j].action_items = {
						alpha : sprintProjects[j].alpha && alphaBetaActionsToArr(indexProject.alpha, 'alpha'),
						beta: sprintProjects[j].beta && alphaBetaActionsToArr(indexProject.beta, 'beta'),
						production: sprintProjects[j].production && productionActionsToArr(indexProject.production, 'production'),
						gabrielle: [],
						jeselle: [],
						both: []
					}
					sprintProjects[j].progress = calculateProjectProgress(indexProject);
					if (sprintProjects[j].action_items.alpha) {
						$scope.roleArr[0].all_projects.push({
							sprint:indexSprint,
							id: sprintProjects[j].id,
							name: sprintProjects[j].name,
							progress: sprintProjects[j].progress,
							priority: (sprintProjects[j].priority && sprintProjects[j].priority.samir) || 10000,
							action_items:sprintProjects[j].action_items.alpha
						});
					};

					if (sprintProjects[j].action_items.beta) {
						$scope.roleArr[1].all_projects.push({
							sprint:indexSprint,
							name: sprintProjects[j].name,
							id: sprintProjects[j].id,
							progress: sprintProjects[j].progress,
							priority: (sprintProjects[j].priority && sprintProjects[j].priority.jason) || 10000,
							action_items:sprintProjects[j].action_items.beta
						});
					}

					if (sprintProjects[j].action_items.production) {
						var productionDict = processAndFilterProductionActionItems(sprintProjects[j].action_items.production);
						if (productionDict.gabrielle && productionDict.gabrielle.length) {
							$scope.roleArr[3].all_projects.push({
								sprint:indexSprint,
								name: sprintProjects[j].name,
								id: sprintProjects[j].id,
								progress: sprintProjects[j].progress,
								priority: (sprintProjects[j].priority && sprintProjects[j].priority.gabrielle) || 10000,
								action_items:productionDict.gabrielle
							});
							sprintProjects[j].action_items.gabrielle = productionDict.gabrielle;
						}
						if (productionDict.jeselle && productionDict.jeselle.length) {
							$scope.roleArr[2].all_projects.push({
								sprint:indexSprint,
								name: sprintProjects[j].name,
								id: sprintProjects[j].id,
								progress: sprintProjects[j].progress,
								priority: (sprintProjects[j].priority && sprintProjects[j].priority.jeselle) || 10000,
								action_items:productionDict.jeselle
							});
							sprintProjects[j].action_items.jeselle = productionDict.jeselle;
						}
						if (productionDict.both && productionDict.both.length) {
							sprintProjects[j].action_items.both = productionDict.both;
						}
					}


				}
			}
			return sprint_arr;
		}

		var sprintArr = initSprints($scope.sprints)

		// $scope.projects[0].action_items = getProjectOneActionItems();

		// $scope.projects[0].progress = $scope.calculateProjectProgress($scope.projects[0].action_items);

		// $scope.sprints = [{description:"Functional product students can use", projects:$scope.projects.slice(0,NUM_PRIORITIZED)}, {description:"Icebox", projects:$scope.projects.slice(NUM_PRIORITIZED, $scope.projects.length)}];
		$scope.sprints = sprintArr;

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

			for (var i = 0; i < $scope.flattenedProjects.length; i ++) {
				// indexProject = $scope.projects[i];

				CTAService.initSingleCTA('#cta-box-project-' + i, '#admin-main');

			}

		}

		var initRoleCTAS = function() {
			for (var i = 0; i < $scope.roleArr.length; i ++) {
				// indexProject = $scope.projects[i];

				CTAService.initSingleCTA('#cta-box-role-' + i, '#admin-main');

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
				initRoleCTAS();
			}, 2000)
		})




		// 1. Define everything that needs to be done & share it



	}

]);