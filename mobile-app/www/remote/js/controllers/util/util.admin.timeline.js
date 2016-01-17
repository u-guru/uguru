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

		$scope.setActiveThread = function(tabName) {
			$scope.page.active.tabName = tabName;
		}

		$scope.adminTabs = ["Home", "Universities", "Roles", "Calendar", "Guides", "Timeline", "Moodboards", "Glossary"];
		$scope.projects = [{name:'University Specific + Home', deadline:"1/15/2015", urgent:true, progress:null, action_items:[]}, {name: 'Student Everything MVP'}, {name: 'Guru Everything MVP'}, {name: 'GPA App'}];

		var getProjectOneActionItems = function() {
			var resultDict = {};

			resultDict.alpha = [
				{"Home page counter":true},
				{"Scroll Reveal": true},
				{"Update University.js":true},
				{"Add tiny_name to university":true},
				{"Support Library":true},
				{"Home Page Sidebar + link in-app-views":true},
				{"Helicopter Transition":false},
				{"FAQ":false},
				{"Pricing + other page animations":false},
				{"Add svg_url + tiny name edit to admin + cleanup courses":false},
				{"Clean-up maps + add pennant + resize after render":false},
				{"Sanitize Courses": false},
				{"Main section templating": false},
				{"Code Cleanup": false},
				{"Category Content": false},
				{"Content": false},
				{"image url + static assets conversion":false}
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
			var progressDict = {alpha:0, beta:0, production:0, overall:0};
			progressDict.total = project.alpha.length + project.beta.length + project.production.length;
			for (var i = 0; i < project.alpha.length; i ++) {
				var indexAlphaItem = project.alpha[i];
				var indexAlphaKey = Object.keys(project.alpha[i]);
				if (indexAlphaItem[indexAlphaKey]) {
					progressDict.alpha += 1;
					progressDict.overall += 1;
				}
			}
			for (var j = 0; j < project.beta.length; j ++) {
				var indexBetaItem = project.beta[j];
				var indexBetaKey = Object.keys(project.beta[j]);
				if (indexBetaItem[indexBetaKey]) {
					progressDict.beta += 1;
					progressDict.overall += 1;
				}

			}
			for (var k = 0; k < project.production.length; k ++) {
				var indexProductionItem = project.production[k];
				var indexProductionKey = Object.keys(project.production[k]);
				if (indexProductionItem[indexProductionKey]) {
					progressDict.production += 1;
					progressDict.overall += 1;
				}
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

		var initProjectCTAS = function() {

			for (var i = 0; i < $scope.projects.length; i ++) {
				indexProject = $scope.projects[i];
				CTAService.initSingleCTA('#cta-box-project-' + i, '#admin-main');
			}

		}

		$scope.$on('$ionicView.loaded', function() {
			$timeout(function() {
				initProjectCTAS();
			}, 1000)
		})


		$scope.timeline = {
		    "version": 0.1,
		    "audiences": ["general", "gurus", "students"],
		    "threads": ["design + UX", "cleanup", "responsive", "data", "functionality", "marketing", "content", "testing"],
		    "threads_detailed": { //sheet specific
		        "design + UX": {
		            "owner": "Jeselle",
		            "todo": [
		            	{
		                	"title": "Design Guide 100% for these workflows",
		                    "description": "All workflows' mapped + resolved to design guide. This means their components + containers following Dont-Repeat-Yourself Principles",
		                    "checklist": [
		                    	{item: "Signup/Login", complete: true},
		                        {item: "Guru Onboarding", complete: true},
		                        {item: "Student Home", complete: true},
		                        {item: "Guru Profile", complete: true},
		                        {item: "Edit Guru Profile", complete: true},
		                        {item: "Guru Home Page", complete: true},
		                        {item: "Student Request Form", complete:false},
		                        {item: "Student Add Course", complete:false},
		                        {item: "Student Messaging + files", complete:false},
		                        {item: "Desktop/Mobile Settings", complete:false},
		                        {item: "Add/edit/remove Payment + Transactions", complete:false}
		                    ],
		                    "checklist_fields": ["components", "containers", "100%"],
		                    "assignee": {
		                    	name: "Jeselle"
		                    }
		                },
		                { "title": "Page Specific",
		                    "description": "Discuss, reconstruct, finalize hi-fis pertaining to most-updated guide",
		                    "checklist": [
		                        {item: "University Specific Page", complete:false },
		                        {item: "Team Page", complete:false },
		                        {item: "FAQ Page", complete:false },
		                        {item: "Pricing Page", complete:false },
		                        {item: "Apply Page", complete:false },
		                        {item: "Home Page (last -- fun!)", complete:false },
		                        {item: "Stray, one-time-use components", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Jeselle"
		                    }
		                },
		                { "title": "Mobile mapping",
		                    "description": "Discuss & finalize mobile versions from part 1",
		                    "checklist": [
		                        {item: "Everything Mobile", complete:false }
		                    ],
		                    "assignee": {
		                    	name: "Jeselle"
		                    }
		                },
		     	   ],
		    	},
		        "responsive": {
		        		"owner": "Samir",
			            "todo": [
			            	{
			                	"title": "All Components + Containers",
			                    "description": "All components in Jeselle's design guide implemented & modular for all 7 screen sizers",
			                    "checklist": [
			                    	{item: "Buttons", complete:false },
			                    	{item: "Search Bars", complete:false },
			                    	{item: "Calendar", complete:false },
			                    	{item: "Maps", complete:false },
			                    	{item: "etc.", complete:false },
			                    ],
			                    "assignee": {
			                    	name: "Gabrielle"
			                    }
			            	}
			            ]
		            },
		        "data": {

		        		"owner": "Samir",
			            "todo": [
			            	{
			                	"title": "University Data Final",
			                    "description": "Spring Semester Start Date for Top 200 + Course Cleanup",
			                    "checklist": [
			                    	{item: "General Course Cleanup Algorithm", complete:false },
			                    	{item: "Spring Semester load", complete:false },
			                    	{item: "Verify images are great quality", complete:false },
			                    ],
			                    "assignee": {
			                    	name: "Samir"
			                    }
			            	}
			            ]

		            },
		        "functionality": {
		        	"owner": "Samir",
			            "todo": [
			            	{
			                	"title": "University Data Final",
			                    "description": "Spring Semester Start Date for Top 200 + Course Cleanup",
			                    "checklist": [
			                    	{item: "Signup/Login", complete: true},
		                        	{item: "Guru Onboarding", complete: true},
		                        	{item: "Student Home", complete: true},
		                        	{item: "Guru Profile", complete: true},
		                        	{item: "Edit Guru Profile", complete: true},
		                        	{item: "Guru Home Page", complete: true},
		                        	{item: "Student Request Form", complete:false},
		                        	{item: "Student Add Course", complete:false},
		                        	{item: "Student Messaging + files", complete:false},
		                        	{item: "Desktop/Mobile Settings", complete:false},
		                        	{item: "Add/edit/remove Payment + Transactions", complete:false}
			                    ],
			                    "assignee": {
			                    	name: "Samir"
			                    }
			            	}
			            ]
		            },
		        "marketing": {
		        	  "todo": [
		            	{
		                	"title": "Email Scraping",
		                    "description": "Determine morning 1st hour -- daily schedule to scrape emails + post on facebook (automated facebook post)",
		                    "checklist": [
		                    	{item: "Create general post on facebook", complete:false },
		                    	{item: "Create general post on Instagram", complete:false },
		                        {item: "Find tool that's cheap to auto-post for us (selenium?)", complete:false },
		                        {item: "Create docs to have jason take over", complete:false }
		                    ],
		                    "assignee": {
		                    	name: "Samir"
		                    }
		            	},
		            	{
		                	"title": "Email Marketing Templating + Product Hooks",
		                    "description": "All emails drafted, templated, and linked into the product",
		                    "checklist": [
		                    	{item: "First time signup", complete:false },
		                    	{item: "+ 3 follow-up", complete:false },
		                        {item: "+ 3 follow-up + active", complete:false },
		                        {item: "set up task queue", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Samir"
		                    }
		            	}
		            ],
		        },
		        "content": {
		        	"owner": "Samir",
		            "todo": [
		            	{
		                	"title": "Email Marketing Templating + Product Hooks",
		                    "description": "All emails drafted, templated, and linked into the product",
		                    "checklist": [
		                    	{item: "First time signup", complete:false },
		                    	{item: "+ 3 follow-up", complete:false },
		                        {item: "+ 3 follow-up + active", complete:false },
		                        {item: "set up task queue", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Samir"
		                    }
		            	},
		            	{
		                	"title": "Home page marketing Content",
		                    "description": "Student / Guru Centric content to better explain the product",
		                    "checklist": [
		                    	{item: "Slide one", complete:false },
		                    	{item: "Slide two", complete:false },
		                        {item: "Slide three", complete:false },
		                        {item: "Slide four", complete:false },
		                        {item: "Slide five", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Samir"
		                    }
		            	},
		            	{
		                	"title": "'Docs/FAQ'",
		                    "description": "Content for tour guru etc.",
		                    "checklist": [
		                    	{item: "Go through Guru Home & Determine Ambigious", complete:false }
		                    ],
		                    "assignee": {
		                    	name: "Samir"
		                    }
		            	},

		            ]
		            },
		        "cleanup": {
		        	"owner": "Samir",
		            "todo": [
		            	{
		                	"title": "Change file structure",
		                    "description": "All old js/html/css filess not being used",
		                    "checklist": [
		                    	{item: "Create a gameplan", complete:false },
		                    	{item: "HTML", complete:false },
		                        {item: "JS", complete:false },
		                        {item: "UI-Router", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Samir"
		                    }
		            	}
		            ]
		        },
		        "testing": {
		        	"owner": "Jason",
		            "todo": [
		            	{
		                	"title": "Home Page Workflow",
		                    "description": "Here is the test cases to implement. This is just a mental list don't format it in the order below -- its just a list to communicate to you. Let me know if this description doesn't make sense.",
		                    "checklist": [
		                    	{item: "Search 'Berkeley' and select Berkeley", complete:false },
		                    	{item: "Verify page has changed", complete:false },
		                    	{item: "Repeat + setup for 10 universities", complete:false },
		                        {item: "Click side menu, open + close (nothing else)", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Jason"
		                    }
		            	},
		            	{
		                	"title": "University specific workflow",
		                    "description": "When you get to /university/{{university.id}}, here are the things you should test",
		                    "checklist": [
		                    	{item: "Main Section: Nav bar, sidebar, all the top right links work", complete:false },
		                    	{item: "Browse Section -> Courses: Create celery table, test 10 different inputs", complete:false },
		                    	{item: "Browse Section -> Gurus: Click each guru + make sure CTA with full profile", complete:false },
		                    	{item: "Browse Section -> Categorys: Make sure each clicks and shows all the options", complete:false },
		                    	{item: "How it works -> Make sure all elements exist", complete:false },
		                    	{item: "How it works -> Become a Guru", complete:false },
		                    ],
		                    "assignee": {
		                    	name: "Jason"
		                    }
		            	},
		            ]
		        }
		    }
		}



		// 1. Define everything that needs to be done & share it



	}

]);