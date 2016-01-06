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
	function($scope, $state, $stateParams, Restangular, User, $ionicSideMenuDelegate, LoadingService, $timeout, University, TimelineService) {

		//first format by
		$scope.page = {active: {thread: 'design + UX', progress:null}};
		$scope.setActiveThread = function(thread) {
			$scope.page.active.thread = thread;
			var numComplete = 0;
			var totalItems = 0;

			//iterate over item objects
			allTodoItems = $scope.timeline.threads_detailed[thread].todo;
			for (var i = 0; i < allTodoItems.length; i++) {
				totalItems += allTodoItems[i].checklist.length;
				for (var j = 0; j < allTodoItems[i].checklist.length; j++) {
					var indexChecklistItem = allTodoItems[i].checklist[j];
					if (indexChecklistItem.complete) {
						numComplete += 1;
						console.log('yay ' + indexChecklistItem.item + ' complete!');
					}
				}
			}
			$scope.page.active.progress = numComplete + '/' + totalItems;
			$scope.page.active.progress_percent = parseInt(numComplete/totalItems * 100 ) + '%';
		}

		$scope.timeline = {
		    "version": 0.1,
		    "audiences": ["general", "gurus", "students"],
		    "threads": ["design + UX", "cleanup", "responsive", "data", "functionality", "marketing", "content"],
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
		        }
		    }
		}

		$scope.setActiveThread('design + UX');

		// 1. Define everything that needs to be done & share it



	}

]);