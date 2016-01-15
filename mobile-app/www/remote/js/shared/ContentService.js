angular
	.module('sharedServices')
	.factory("ContentService", [
		ContentService
	]);

function ContentService() {


	var pricing = {
		header: "Estimated Pricing",
		cards: {
			one: {
				header: 'HEADER HEADER HEADER',
				subheader: 'subheader subheader subheader subheader subheader subheader subheader subheader subheader subheader',
				attributes: ['attributes attributes attributes', 'attributes attributes attributes', 'attributes attributes attributes'],
				pricing: 50
			},
			two: {
				header: 'HEADER HEADER HEADER',
				subheader: 'subheader subheader subheader subheader subheader subheader subheader subheader subheader subheader',
				attributes: ['attributes attributes attributes', 'attributes attributes attributes', 'attributes attributes attributes'],
				pricing: 50
			},
			three: {
				header: 'HEADER HEADER HEADER',
				subheader: 'subheader subheader subheader subheader subheader subheader subheader subheader subheader subheader',
				attributes: ['attributes attributes attributes', 'attributes attributes attributes', 'attributes attributes attributes'],
				pricing: 50
			}
		},
		footer: {
			sophisticated: "If you seek something more sophisticated, we have a couple of these left",
			affordability: "if none of these meet your needs or are out of budget, contact us for a quick reply",
		}
	}

	var sampleProfiles = {
		"academic": {
			"name": "Kelly U",
			"category": {
				name: "Academic Course Shop"
			},
			"rating": {
				"review_count": 24,
				"avg_stars": 4.5
			},
			"profile_url": "remote/./img/filler/avatars/guru-academic-f.jpg",
			"guru_introduction": "Note-taking guru extraordinaire.",
			"profile_code": "academic",
			"verified": true,
			"percentile": "3rd",
			"guru_ratings": new Array(49),
			"guru_rating": {
				"int": 5,
				"half": false,
			},
			"university": {
				"name": "University of California at Berkeley",
				"short_name": "UC Berkeley"
			},
			"skype_friendly": true,
			"messenger_friendly": true,
			"phone_friendly": true,
			"text_friendly": true,
			"year": "grad student",
			"is_alumni": false,
			"major": "Computer Science",
			"guru_languages": [{
				name: "English"
			}, {
				name: "Spanish"
			}, ],
			"all_currencies": [{
				name: "Money",
				active: true,
				icon_url: "cash.html"
			}, {
				name: "Food",
				active: true,
				icon_url: "food.html"
			}, {
				name: "Bitcoin",
				active: true,
				icon_url: "dogecoin.html"
			}, {
				name: "Meal Points",
				active: true,
				icon_url: "meal_points.html"
			}, {
				name: "Coffee",
				active: true,
				icon_url: "coffee.html"
			}, {
				name: "Kitten Time",
				active: true,
				icon_url: "kitten_time.html"
			}],
			"guru_experiences": [{
				name: "NASA Intern",
				years: 1,
				description: "",
			}, {
				name: "CS 312 TA",
				years: 2,
				description: "",
			}, {
				name: "CS 200 TA",
				description: "",
				years: 1
			}],
			"academic_shop": {
				"banner_url": "remote/./img/filler/avatars/guru-academic-f.jpg",
				"title": "The Golden Bear Tutor",
				"description": "Tutoring for three years, I am devoted in helping my peers achieve eureka moments when studying. Dean’s List and in the top quartile of all my classes.",
				"portfolio_items":
					[{
					"rounded_avg_rating": 5,
					"half_stars": false,
					"avg_rating": 4.9,
					"name": "CS 200",
					"full_name": "Algorithms and Data Structures",
					"hourly_price": 20,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "CS 312",
					"full_name": "Introduction to Programming",
					"hourly_price": 25,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "MATH 410",
					"full_name": "Linear Algebra",
					"hourly_price": 15,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "CS 420",
					"full_name": "Analysis of Algorithms",
					"hourly_price": 15,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}]
			}
		},
		"bakery": {
			"name": "Jeremy O",
			"category": {
				name: "Bakery"
			},
			"rating": {
				"review_count": 24,
				"avg_stars": 4.5
			},
			"profile_url": "remote/./img/filler/avatars/guru-baker-m.jpg",
			"guru_introduction": "I make yummy things",
			"profile_code": "baking",
			"verified": true,
			"percentile": "8th",
			"guru_ratings": new Array(15),
			"guru_rating": {
				"int": 4,
				"half": true,
			},
			"university": {
				"name": "Cornell University",
				"short_name": "Cornell"
			},
			"skype_friendly": true,
			"messenger_friendly": true,
			"phone_friendly": true,
			"text_friendly": true,
			"year": "junior",
			"is_alumni": false,
			"major": "Hospitality",
			"guru_languages": [{
				name: "French"
			}, {
				name: "Italian"
			}, ],
			"all_currencies": [{
				name: "Money",
				active: true,
				icon_url: "cash.html"
			}, {
				name: "Food",
				active: true,
				icon_url: "food.html"
			}, {
				name: "Bitcoin",
				active: true,
				icon_url: "dogecoin.html"
			}, {
				name: "Meal Points",
				active: true,
				icon_url: "meal_points.html"
			}, {
				name: "Coffee",
				active: true,
				icon_url: "coffee.html"
			}, {
				name: "Kitten Time",
				active: true,
				icon_url: "kitten_time.html"
			}],
			"guru_experiences": [{
				name: "Barista at Starbucks",
				description: "",
				years: "current"
			}, {
				name: "Baker at Mrs. Fields",
				description: "",
				years: 2
			}],
			"academic_shop": {
				"banner_url": "remote/./img/filler/avatars/guru-baker-m.jpg",
				"title": "Jem's Quality Treats",
				"description": "Fresh delivery with tasty vegan, gluten-free and kosher options. Creating the most delicious, all natural baked goods from Court Hall on North Campus. Drop me a line to check out my seasonal treats.",
				"portfolio_items":
					[{
					"rounded_avg_rating": 5,
					"half_stars": false,
					"avg_rating": 4.9,
					"name": "",
					"full_name": "Chocolate Chip Cookies",
					"hourly_price": 5,
					"price_measure": "dozen",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/baking/cookie.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Cupcakes",
					"hourly_price": 10,
					"price_measure": "dozen",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/baking/cupcake.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Donuts",
					"hourly_price": 8,
					"price_measure": "dozen",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/baking/donut.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Macarons",
					"hourly_price": 12,
					"price_measure": "dozen",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/baking/maca.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}]
			}
		},
		"household": {
			"name": "Austin L",
			"category": {
				name: "Household"
			},
			"rating": {
				"review_count": 24,
				"avg_stars": 4.5
			},
			"profile_url": "remote/./img/filler/avatars/guru-clean-m.jpg",
			"guru_introduction": "So fresh, so clean, and a five-star guru.",
			"profile_code": "household",
			"verified": true,
			"percentile": "25th",
			"guru_rating": {
				"int": 4,
				"half": true,
			},
			"guru_ratings": new Array(83),
			"university": {
				"name": "Washington University in St Louis",
				"short_name": "Wash U"
			},
			"skype_friendly": true,
			"messenger_friendly": true,
			"phone_friendly": true,
			"text_friendly": true,
			"year": "sophomore",
			"is_alumni": false,
			"major": "Hospitality",
			"guru_languages": [{
				name: "English"
			}, {
				name: "Spanish"
			}, {
				name: "Latin"
			}, {
				name: "German"
			}, ],
			"all_currencies": [{
				name: "Money",
				active: true,
				icon_url: "cash.html"
			}, {
				name: "Food",
				active: true,
				icon_url: "food.html"
			}, {
				name: "Meal Points",
				active: true,
				icon_url: "meal_points.html"
			}, {
				name: "Chipotle",
				active: true,
				icon_url: "chipotle.html"
			}, {
				name: "Coffee",
				active: true,
				icon_url: "coffee.html"
			}, {
				name: "Kitten Time",
				active: true,
				icon_url: "kitten_time.html"
			}],
			"guru_experiences": [{
				name: "Guest Service Agent at Holiday Inn",
				years: 1,
				description: "",
			}, {
				name: "Sales Associate at Target",
				description: "",
				years: 2
			}],
			"academic_shop": {
				"banner_url": "remote/./img/filler/avatars/guru-clean-m.jpg",
				"title": "Cleanly by Austin",
				"description": "Spruce your dorm or apartment whether you have a messy closet or preparing for a house party. Your living space will be lemon-fresh and squeaky-clean.",
				"portfolio_items":
					[{
					"rounded_avg_rating": 5,
					"half_stars": false,
					"avg_rating": 4.9,
					"name": "",
					"full_name": "Dishwashing",
					"hourly_price": 10,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/household/dish.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
				"rounded_avg_rating": 5,
				"half_stars": false,
				"avg_rating": 4.9,
				"name": "",
				"full_name": "Furniture Cleaning",
				"hourly_price": 12,
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				"featured_url": "remote/./img/filler/household/furclean.jpg",
				"resources": [{
					"is_url": true,
					"is_featured": true,
					"site_url": ""
				}]
			}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Floor Care",
					"hourly_price": 12,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/household/floor.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Laundry",
					"hourly_price": 18,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/household/laundry.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "General Cleaning",
					"hourly_price": 20,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/household/genclean.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}]
			}
		},
		"photography": {
			"name": "Rachel V",
			"category": {
				name: "Photography"
			},
			"rating": {
				"review_count": 24,
				"avg_stars": 4.5
			},
			"profile_url": "remote/./img/filler/avatars/guru-photo-f.jpg",
			"guru_introduction": "Often imitated, never duplicated. Photography maniac",
			"profile_code": "photo",
			"verified": true,
			"percentile": "5th",
			"guru_ratings": new Array(19),
			"guru_rating": {
				"int": 4,
				"half": true,
			},
			"university": {
				"name": "Miami University at Oxford",
				"short_name": "Miami U"
			},
			"skype_friendly": true,
			"messenger_friendly": true,
			"phone_friendly": true,
			"text_friendly": true,
			"year": "Freshman",
			"is_alumni": false,
			"major": "Art History",
			"guru_languages": [{
				name: "English"
			}, {
				name: "Chinese"
			}, {
				name: "Japanese"
			}, {
				name: "Tagalog"
			}, ],
			"all_currencies": [{
				name: "Money",
				active: true,
				icon_url: "cash.html"
			}, {
				name: "Food",
				active: true,
				icon_url: "food.html"
			}, {
				name: "Meal Points",
				active: true,
				icon_url: "meal_points.html"
			}, {
				name: "Chipotle",
				active: true,
				icon_url: "chipotle.html"
			}, {
				name: "Coffee",
				active: true,
				icon_url: "coffee.html"
			}, {
				name: "Kitten Time",
				active: true,
				icon_url: "kitten_time.html"
			}],
			"guru_experiences": [{
				name: "Freelance Photographer",
				years: 6,
				description: ""
			}],
			"academic_shop": {
				"banner_url": "remote/./img/filler/avatars/guru-photo-f.jpg",
				"title": "Limitless Photos",
				"description": "A multi-disciplinary creative specializing in photography. Self-taught. Passionate about capturing the human spirit. Prints for sale on my website.",
				"portfolio_items":
					[{
					"rounded_avg_rating": 5,
					"half_stars": false,
					"avg_rating": 4.9,
					"name": "",
					"full_name": "Adventure Series",
					"hourly_price": 15,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/photography/night.jpeg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Formal Events",
					"hourly_price": 20,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/photography/suit.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Headshots",
					"hourly_price": 20,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/photography/headshots.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Fun Around Campus",
					"hourly_price": 15,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/photography/singer.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}]
			}
		},
		"tech": {
			"name": "Gregory M",
			"category": {
				name: "Technology & IT"
			},
			"rating": {
				"review_count": 24,
				"avg_stars": 4.5
			},
			"profile_url": "remote/./img/filler/avatars/guru-tech-m.jpg",
			"guru_introduction": "Retro gamer. Go-to person for campus tech advice. Blue Devils fan.",
			"profile_code": "tech",
			"verified": true,
			"percentile": "< 1st",
			"guru_ratings": new Array(36),
			"guru_rating": {
				"int": 4,
				"half": false,
			},
			"university": {
				"name": "Duke University",
				"short_name": "Duke"
			},
			"skype_friendly": true,
			"messenger_friendly": true,
			"phone_friendly": true,
			"text_friendly": true,
			"year": "senior",
			"is_alumni": false,
			"major": "Electrical Engineering",
			"guru_languages": [{
				name: "English"
			}, {
				name: "Greek"
			} ],
			"all_currencies": [{
				name: "Money",
				active: true,
				icon_url: "cash.html"
			}, {
				name: "Food",
				active: true,
				icon_url: "food.html"
			}, {
				name: "Bitcoin",
				active: true,
				icon_url: "dogecoin.html"
			}, {
				name: "Meal Points",
				active: true,
				icon_url: "meal_points.html"
			}, {
				name: "Chipotle",
				active: true,
				icon_url: "chipotle.html"
			}, {
				name: "Coffee",
				active: true,
				icon_url: "coffee.html"
			}],
			"guru_experiences": [{
				name: "Best Buy Geek Squad",
				description: "",
				years: 2
			}, {
				name: "Genius at Apple Store",
				description: "",
				years: 5
			}],
			"academic_shop": {
				"banner_url": "https://uguru.me/static/remote/img/avatar.svg",
				"title": "Smart Tech Repair",
				"description": "I can help you with your Mac or PC meltdowns ASAP.",
				"portfolio_items":
					[{
					"rounded_avg_rating": 5,
					"half_stars": false,
					"avg_rating": 4.9,
					"name": "",
					"full_name": "Broken Device Screens",
					"hourly_price": "25-$80",
					"price_measure": "device",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/tech/broken.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Water Damage",
					"hourly_price": "25-$80",
					"price_measure": "device",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/tech/waterdmg.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "WiFi Installation",
					"hourly_price": 15,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/tech/wifi.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Memory Backup",
					"hourly_price": 15,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/tech/memory.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Gadget Help",
					"hourly_price": 25,
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/tech/gadgethlp.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}, {
					"rounded_avg_rating": 4,
					"avg_rating": 4.0,
					"half_stars": true,
					"name": "",
					"full_name": "Web Design",
					"hourly_price": "20-$30",
					"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"featured_url": "remote/./img/filler/tech/design.jpg",
					"resources": [{
						"is_url": true,
						"is_featured": true,
						"site_url": ""
					}]
				}]
			}
		}
	}

	var generateMiniSampleProfileDict = function() {

		var getMainAttributesFromUser = function(category) {
			return {
				name: sampleProfiles[category]["name"],
				profile_url: sampleProfiles[category]["profile_url"],
				verified: sampleProfiles[category]["verified"],
				category_name: sampleProfiles[category]["category"]["name"],
				university_name: sampleProfiles[category]["university"]["short_name"],
				percentile: sampleProfiles[category]["percentile"],
				rating: {
					"whole_stars": sampleProfiles[category]["guru_rating"]["int"],
					"has_half_star": sampleProfiles[category]["guru_rating"]["half"],
					"count": sampleProfiles[category]["guru_ratings"].length
				}
			}
		}

		return {
			tech: getMainAttributesFromUser("tech"),
			household: getMainAttributesFromUser("household"),
			academic: getMainAttributesFromUser("academic"),
			photography: getMainAttributesFromUser("photography"),
			baking: getMainAttributesFromUser("bakery")
		}
	}

	var faq = [{
		question: "Is this college ruled?",
		popularity: 10,
		answer: "Yes"
	}, {
		question: "Do Gurus edit my content anonymously?",
		popularity: 10,
		answer: "Yes - unless you choose Option 1 on pricing, where we leave it up to you guys to reveal identities"
	}, {
		question: "What payment forms do you support?",
		popularity: 10,
		answer: "We take all popular credit cards, domestically and internationally"
	}, {
		question: "Can other college applications see any of my uploaded content (i.e. college essays)?",
		popularity: 10,
		answer: "Absolutely not. We take privacy very seriously and can assure you that your data is safe with us."
	}, {
		question: "Can I request help anonymously?",
		popularity: 10,
		answer: "You remain anonymous by default. However, our signup still requires your full name and email."
	}, {
		question: "How can I increase my chances to be connected with a college Guru?",
		popularity: 10,
		answer: "Provide detailed description of what you need help in. If you are not sure, try our live customer support."
	}, {
		question: "I am not 100% happy with my experience - can I request a refund?",
		popularity: 10,
		answer: "Absolutely, we will dispute the situation from both sides."
	}, {
		question: "Can I request for a college Guru to rewrite parts of my essay?",
		popularity: 10,
		answer: "This is strictly against our policy. Any violation or attempts to do so will result in a de-activated account. We do not tolerate cheating, just like the university you are applying to."
	}, {
		question: "Do you sell my content to third party services?",
		popularity: 10,
		answer: "Absolutely not. We respect your privacy and have no future plans to share any sensitive content."
	}, {
		question: "I'm applying for many different special scholarships, including athletics, honors, and minorities. I need these to be able to afford college. Can I clarify this when I request help?",
		popularity: 10,
		answer: "Yes. For Gurus that have used the exact same key terms in their description, we'll immediately let them know and connect you immediately if they are available."
	}];

	var timeline = {

	}

	var honorPledge = [{
		content: "I will not request that any portion of my work be rewritten by a Guru."
	}, {
		content: "I understand that if I do, I risk immediately losing access to my Uguru account."
	}, {
		content: "All of the work I'm submitting for feedback is my work and my work only."
	}, {
		content: "I understand that Uguru's services may not result in acceptance to any school."
	}, {
		content: "I understand that addicting usage of Uguru may result in cancer."
	}]

	//MVP
	var affordability_modal = {

	}


	var sophisticated_modal = {

	}

	var parents = {

	}

	var generateUniversitySpecificBecomeGuruText = function(university) {
		return {
			header: "The Most Flexible Part-Time",
			top_half: [{
				icon_src: "main/profile.html",
				header: "Full Stack Profile",
				tag: 'See Preview',
				content: "A platform where you come first. Complete control over your profile. Customize, set prices, bill others",
			}, {
				icon_src: "main/stats.html",
				header: "Analytics & Promotion Tool",
				tags: 'See Preview',
				content: "Digital marketing kits, business cards, high quality graphics and much more.",
			}, {
				icon_src: "main/payment-portal.svg",
				header: "Your own payment portal",
				content: "Money goes straight to your bank account. Send an invoice to whoever, whenever",
			}, ],
			bottom_half: [{
				icon_src: "main/full-stack.svg",
				header: "Have Multiple Profiles for Multiple Skills",
				content: "Create an academic shop for course-related skills, photography shop to earn from grad photos, tech shop for iPhone repair..",
			}, {
				icon_src: "main/card.html",
				header: "Zero Transaction Fees",
				tag: 'See Preview',
				content: "Earn your first $500 within a month & then we'll discuss business partnerships and monthly subscriptions. You come first.",
			}, {
				icon_src: "main/pajama.svg",
				header: "Work anytime, anywhere, <br>even in your PJs",
				content: "Toggle a switch on when you are available to earn side cash, and we'll market you. Focus on great quality, we'll take care of the rest",
			}, ]
		};

	}
	var generateUniversitySpecificHowItWorks = function(university) {
		return {
			header: "Uguru Can Help You ..",
			top_half: [{
				icon_src: "../svg.icon.calendar.html",
				header: "24/7, Anytime, Anywhere",
				tag: null,
				content: "Request course help @7am, or request a midnight snack at 11pm. Trust me, one of your peers " + ((university && university.name && ' ') || '') + 'is up',
			}, {
				icon_src: "main/lightbulb.html",
				header: "Save $$$ on Academic Help",
				content: "Get help from a quick 5-min question to several hours at super-cheap rates, averaging at $13/hr"
			}, {
				icon_src: "wwf/tutor.html",
				header: "Same Course, Same Professor",
				content: "We'll connect you a student who has already aced it recently, and possible the same professor!"
			}],
			bottom_half: [{
				icon_src: "academic.html",
				header: "Stay Organized & Improve Focus",
				tag: 'Coming Soon!',
				content: "Apps to help calculate & project your GPA, + other power-ups coming soon!"
			}, {
				icon_src: "main/experience.html",
				header: "Prepare for Your Career",
				content: "Connect with mentors related to your major, or peers who have your dream internship. They're just one tap away."
			}, {
				icon_src: "main/money.html",
				tag: 'Read More',
				header: "Earn Side Cash, Work For Yourself",
				content: "Help your peers in aced courses, your talents, or pretty much anything else"
			}, ]
		};

	}





	return {
		pricing: pricing,
		faq: faq,
		timeline: timeline,
		generateUniversitySpecificHowItWorks: generateUniversitySpecificHowItWorks,
		generateUniversitySpecificBecomeGuruText: generateUniversitySpecificBecomeGuruText,
		honorPledge: honorPledge,
		parents: parents,
		sophisticated_modal: sophisticated_modal,
		affordability_modal: affordability_modal,
		sampleProfiles: sampleProfiles,
		generateMiniSampleProfileDict: generateMiniSampleProfileDict
	}

}