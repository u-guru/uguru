angular.module('uguru.shared.services')
    .factory("ContentService", [
        'CategoryService',
        ContentService
    ]);

function ContentService(Category) {
    var STATIC_BASE = "https://uguru-rest-test.herokuapp.com/static/remote/";

    var splashCategoryOptions = {
        academic: {
            madlib: {
                _class: "academic-madlib",
                template: {
                    beginning: "It's",
                    p1: "5am",
                    middle: "and I have a ",
                    p2: "bio exam",
                    end: "in 4 hours"
                },
                blank_one_options: ['midnight', '2am', 'bedtime', '7am'],
                blank_two_options: ['paper', 'speech', 'report', 'project']
            }
        },
        household: {
            madlib: {
                _class: "household-madlib",
                template: {
                    beginning: "It's been a ",
                    p1: "month",
                    middle: "since I did",
                    p2: "my laundry",
                    end: ""
                },
                blank_one_options: ["semester", "...idk", "week", "never"],
                blank_two_options: ["the dishes", "vacuuming", "cleaned the bathroom", "ironed"]
            }
        },
        tech: {
            madlib: {
                _class: "tech-madlib",
                template: {
                    beginning: "My current",
                    p1: "iphone",
                    middle: "needs a",
                    p2: "new screen",
                    end: ""
                },
                blank_one_options: ['macbook', 'router', 'windows pc', 'nexus tablet'],
                blank_two_options: ['virus', '1hr battery life', 'replacement', 'charger'],
            }
        },
        photography: {
            madlib: {
                _class: 'photography-madlib',
                template: {
                    beginning: "Its almost",
                    p1: "graduation",
                    middle: "and I need",
                    p2: "take grad photos",
                    end: "",
                },
                blank_one_options: ['macbook', 'router', 'windows pc', 'nexus tablet'],
                blank_two_options: ['virus', '1hr battery life', 'replacement', 'charger']
            }
        },
        baking: {
            madlib: {
                _class: 'bakery-madlib',
                template: {
                    beginning: "I'm really",
                    p1: "lazy",
                    middle: "and I'm craving",
                    p2: "brownies"
                },
                blank_one_options: ['macbook', 'router', 'windows pc', 'nexus tablet'],
                blank_two_options: ['virus', '1hr battery life', 'replacement', 'charger']
            }
        }
    }

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
            "profile_url": "https://uguru-rest-test.herokuapp.com/static/remote/img/filler/avatars/guru-academic-f.jpg",
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
                "banner_url": "https://uguru-rest-test.herokuapp.com/static/remote/img/filler/avatars/guru-academic-f.jpg",
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
            "profile_url": "https://uguru-rest-test.herokuapp.com/static/remote/img/filler/avatars/guru-baker-m.jpg",
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
                "banner_url": "https://uguru-rest-test.herokuapp.com/static/remote/img/filler/avatars/guru-baker-m.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/baking/cookie.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/baking/cupcake.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/baking/donut.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/baking/maca.jpg",
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
            "profile_url": "https://uguru-rest-test.herokuapp.com/static/remote/img/filler/avatars/guru-clean-m.jpg",
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
                "banner_url": "https://uguru-rest-test.herokuapp.com/static/remote/img/filler/avatars/guru-clean-m.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/household/dish.jpg",
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
                "featured_url": STATIC_BASE + "img/filler/household/furclean.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/household/floor.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/household/laundry.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/household/genclean.jpg",
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
            "profile_url": STATIC_BASE + "img/filler/avatars/guru-photo-f.jpg",
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
                "banner_url": STATIC_BASE + "img/filler/avatars/guru-photo-f.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/photography/night.jpeg",
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
                    "featured_url": STATIC_BASE + "img/filler/photography/suit.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/photography/headshots.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/photography/singer.jpg",
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
            "profile_url": STATIC_BASE + "img/filler/avatars/guru-tech-m.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/tech/broken.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/tech/waterdmg.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/tech/wifi.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/tech/memory.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/tech/gadgethlp.jpg",
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
                    "featured_url": STATIC_BASE + "img/filler/tech/design.jpg",
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

    var faq = [
        {question: "What is Uguru?", answer: "<p>uGuru <strong> helps connect college students with peer tutors (Gurus)</strong> who have done well in the same classes in school.</p><p>We have all experienced that helpless feeling when you are stuck in the library by yourself the night before exams because you can’t find help outside the classroom.</p><p>Traditional tutoring is too expensive. Office hours are too packed. Why not make it easy for students to get help from each other?</p><p><strong>So we created a platform to make peer-to-peer help available and affordable.</strong></p>"},
        {question: "Who are you guys?", answer: "<p>We are a team of college students and graduates who are passionate about turning the unnecessary academic competition into collaborative learning opportunities, starting with Cal (Berkeley).</p>"},
        {question: "How is uGuru different comparing to traditional private tutoring?", answer: "<p>Traditional private tutoring costs anywhere from $30 to $60 per hour, and that is ridiculously expensive for poor college students living on top ramen. Since it’s students helping each other, sessions on uGuru are super affordable ($15/hr on average).</p><p>uGuru also focuses on making urgent help available, especially when you are in a jam, and need to cram.</p><p>Most importantly, students are getting help directly from peer tutors that have done well in the same exact courses at Cal, instead of random “experts” who are not familiar with the students particular course.</p>"},
        {question: "Who can sign up as a Guru?", answer: "<p>Everyone can sign up as a Guru, but you will need to prove yourself before you can start charging your students. You will give free sessions until you receive an average rating of 4.5 stars. Most good Gurus can do that in one shot and become an official Guru.</p>"},
        {question: "What is the time commitment as a Guru?", answer: "<p>No time commitment required at all! Signing up to be a guru makes it possible for you to receive work, but you are not obligated to take a job if it doesn’t fit your schedule or if you’re cramming for your own midterm. You set your own schedule based upon which sessions you choose to accept.</p>"},
        {question: "Which classes are offered?", answer: "<p>The class selection is based upon what courses gurus have signed up to tutor. The larger the course, the more likely a guru has signed up to tutor that course. Currently, the largest selection of gurus are available for lower division courses and for writing help.</p>"},
        {question: "Why should I choose uGuru over other resource", answer: "<p>uGuru offers personal attention and time flexibility which are often not offered by other resources on campus. With uGuru, students wouldn’t have to worry about competing for the tutor’s time with other students.</p><p>uGuru tutors are also available at times that are convenient to the student, whether that be on the weekends or late in the night right before a midterm. Overall, it’s easier, and faster.</p>"},
        {question: "What’s the price generally?", answer: "<p>Prices vary, but usually around $15 per hour. You name your own price when you request help, and Gurus also get to reply with their ideal price. We also provide recommended rates depending on the time of the semester (ex: a higher offer helps you attract Gurus during finals season).</p>"},
        {question: "How do students and Gurus get matched up?", answer: "<p>Student sends out a Guru request for a class, specifying a preferred price, time, and location to meet.</p><p>We pin all the Gurus who registered for the class with the request. Based on their availability, Gurus could ignore or accept the request, with the option of changing the price to how much they’d like to get paid.</p><p>Student then choose from up to 3 Gurus based on their ratings, relevant attributes and experience.</p>"},
        {question: "How do students and Gurus get matched up?", answer: "<ol><li>Student sends out a Guru request for a class, specifying a preferred price, time, and location to meet.</li><li>We pin all the Gurus who registered for the class with the request. Based on their availability, Gurus could ignore or accept the request, with the option of changing the price to how much they’d like to get paid.</li><li>Student then choose from up to 3 Gurus based on their ratings, relevant attributes and experience.</li></ol>"},
        {question: "How do students and Gurus get matched up?", answer: "<p>After each payment through the platform, students give the Guru a review and a rating, which will be appear on the Guru’s profile to help other students compare their options.</p><p>Generally, Gurus with higher ratings and higher number of reviews are more popular and are compensated more per hour.</p>"},
        {question: "How does a student reconnect with the same Guru again?", answer: "<p>Since our Gurus are awesome, it is common that students would like to have more sessions with the same Guru after the first time.</p><p>You can re-request from the same Guru, and if the Guru doesn’t respond, the request gets sent to other available Gurus.</p>"}
        ]










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
            header: "A Part-Time Job where U Come 1st",
            top_half: [{
                icon_src: "splash/profile.html",
                header: "Full Stack Profile",
                content: "A platform where you come first. Complete control over your profile.",
            }, {
                icon_src: "splash/promotion.html",
                header: "Analytics & Promotion",
                content: "We'll help you out with digital marketing kits, business cards",
            }, {
                icon_src: "splash/payment.html",
                header: "Your Payment Portal",
                content: "Money goes straight to your bank account. Send an invoice to whoever",
            }, ],
            bottom_half: [{
                icon_src: "splash/skills.html",
                header: "A Shop For ___ Skill",
                content: "Create an academic shop for tutoring, photography shop.",
            }, {
                icon_src: "splash/fees.html",
                header: "Zero Transaction Fees",
                content: "Earn your first $500 in a month and then we'll discuss business.",
            }, {
                icon_src: "splash/pajamas.html",
                header: "Work anytime, anywhere",
                content: "Toggle a switch when you're available to earn and we'll market.",
            }, ]
        };

    }
    var generateUniversitySpecificHowItWorks = function(university) {
        return {
            header: "How Uguru Impacts You", //bold this // or how about "How Uguru Increases Life Quality"
            subheader: "Enjoy all 4 Years of College. Uguru helps you stay on top of your academic life.",
            top_half: [{
                icon_src: "splash/anytime.html",
                header: "24/7, Anytime, Anywhere",
                content: "Request anything. Your peers can help you with biology @2am",
                // content: "Request anything. Your peers can your Biology Grade @2am, take your grad photos, or do dirty laundry",
            }, {
                icon_src: "splash/save.html",
                header: "Dirt-Cheap Tutoring",
                content: "Got a quick question? Need an entire course crammed the night before?",
                // content: "Got a quick question? Need an entire course crammed the night before? Perhaps a guru for your study group of 4?",
            }, {
                icon_src: "splash/same.html",
                header: "Not Just 'Math' Help",
                content: "Yes, you can now request a Guru who has taken Math 16A recently",
                // content: "Yes, you can now request a Guru who has taken Math 16A recently, possibly the same professor & textbook",
            }],
            bottom_half: [{
                icon_src: "splash/organize.html",
                header: "100% LTE Coverage", // add 100
                content: "Got a quick question? Need an entire course crammed the night before?"
                // content: "Got a quick question? Need an entire course crammed the night before? Need a guru for your study group of 4?"
            }, {
                icon_src: "splash/career.html",
                header: "Meet the Future You.", //FUTURE: Have the dynamic text here
                content: "On the Pre-Med track? Meet with alumni already @ your dream school.",
                // content: "On the Pre-Med track? Meet with alumni already @ your dream school. Dream job Google? Match with a peer already there.",
            }, {
                icon_src: "splash/earn.html",
                header: "Become a College Guru",
                content: "Earn great sidecash anytime, anywhere. Build cred and earn."
                // content: "Earn great sidecash anytime, anywhere. Build cred and earn up to $40/hr. Earn, learn, & burn those loans early."
            }, ]
        };

    }
    var homeHowItWorks = generateUniversitySpecificHowItWorks();
    var homeBecomeAGuru = generateUniversitySpecificBecomeGuruText();
    var homeFooter = {
        header: "Congrats! You're the first to make it all the way down here.",
        subheader: "Don't worry. We've summarized your next steps below to make your life easier.", //add emoji wink
        button_left: "Become a Guru",
        button_right: "Launch College Student Portal"
    }
    var homeNavbar;
    var homeSidebar;
    var homePage = {
        how_it_works: homeHowItWorks,
        become_a_guru: homeBecomeAGuru, //final 'draft' --> requires approval
        navbar: homeNavbar,
        sidebar:homeSidebar,
        footer: homeFooter,
        sections: {
            main: {
                header_constant: [],
                header_dynamic: []
            },
            browse: {
                profiles: generateMiniSampleProfileDict(),
                categories: Category.categories
            }
        }
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
        generateMiniSampleProfileDict: generateMiniSampleProfileDict,
        splashCategoryOptions: splashCategoryOptions
    }

}