angular.module('guru.food.services', [])
.factory('Restaurant', [
    Restaurant]);

function Restaurant() {

    var selectedRestaurant = {};

    var restaurants = [

    {
        "name": "Fat Slice",
        "slogan": "Closes in 15 minutes",
        "type": 'pizza',
        "options": {
            "icon": 'http://icons.iconarchive.com/icons/sonya/swarm/32/Pizza-icon.png',

        },

        "id": 1,
        "city": "Berkeley",
        "open": true,
        "stars": 5,
        "info": [
            {
                "description": 'Average Student Meals',
                "value": '$132'
            },
            {
                "description": 'Vegan-Friendly',
                "value": '9 out of 10'
            },
            {
                "description": 'Free Wifi',
                "value": 'YES'
            }
        ],
        "menu": [
            {
                "name": 'Mushroom Pizza',
                "price": '5.50'
            },
            {
                "name": 'Ceasar Salad',
                "price": '6.75'
            },
            {
                "name": 'Soft Drink',
                "price": '1.50'
            }
        ],
        "latitude": 37.8673419,
        "longitude": -122.2608894,
        "website": 'www.fatslice.com',
        "phone": '510-435-1278',

    },
    {
        "name": "Lousiana Kitchen",
        "slogan": "Fresh off the grill",
        "type": 'pizza',
        "options": {
            "icon": 'http://icons.iconarchive.com/icons/aha-soft/desktop-buffet/32/Steak-icon.png',

        },

        "id": 1,
        "city": "Berkeley",
        "open": true,
        "stars": 5,
        "info": [
            {
                "description": 'Average Student Meals',
                "value": '$132'
            },
            {
                "description": 'Vegan-Friendly',
                "value": '2 out of 10'
            },
            {
                "description": 'Free Wifi',
                "value": 'YES'
            }
        ],
        "menu": [
            {
                "name": 'Baby Back Ribs',
                "price": '15.50'
            },
            {
                "name": 'Ceasar Salad',
                "price": '9.75'
            },
            {
                "name": 'Beer',
                "price": '4.50'
            }
        ],
        "latitude": 37.866807,
        "longitude": -122.2688143,
        "website": 'www.lousianakitchen.com',
        "phone": '510-435-1278',

    },



    {
        "name": "La Burrita",
        "slogan": "Yikes! 2hr wait",
        "type": 'mexican',
        "options": {
            "icon": 'http://icons.iconarchive.com/icons/iconmuseo/fast-food/32/tacos-icon.png',
        },
        "id": 2,
        "city": "Berkeley",
        "open": true,
        "stars": 3,
        "info": [
            {
                "description": 'Average Student Meals',
                "value": '$132'
            },
            {
                "description": 'Vegan-Friendly',
                "value": '9 out of 10'
            },
            {
                "description": 'Free Wifi',
                "value": 'YES'
            }
        ],
        "menu": [
            {
                "name": 'Super Burrito',
                "price": '8.50'
            },
            {
                "name": 'Super Nachoes',
                "price": '8.00'
            },
            {
                "name": 'Quesadilla',
                "price": '7.75'
            },
            {
                "name": 'Soft Drink',
                "price": '1.50'
            }
        ],
        "latitude": 37.8640725,
        "longitude": -122.2758044,
        "website": 'www.laburrita.com',
        "phone": '510-435-1278'

    },
    {
        "name": "Top Dog",
        "slogan": "The classic",
        "type": 'hotdog',
        "options": {
            "icon": 'http://icons.iconarchive.com/icons/sonya/swarm/32/Hot-Dog-icon.png'
        },

        "id": 3,
        "city": "Berkeley",
        "open": true,
        "stars": 4,
        "info": [
            {
                "description": 'Average Student Meals',
                "value": '$132'
            },
            {
                "description": 'Vegan-Friendly',
                "value": '9 out of 10'
            },
            {
                "description": 'Free Wifi',
                "value": 'YES'
            }
        ],
        "menu": [
            {
                "name": 'Beef Hotdog',
                "price": '3.00'
            },
            {
                "name": 'Polish Hotdog',
                "price": '3.00'
            },
            {
                "name": 'Soft Drink',
                "price": '1.50'
            }
        ],
        "latitude": 37.867792,
        "longitude": -122.2595921,
        "website": 'www.topdog.com',
        "phone": '510-435-1278'

    },
    {
        "name": "Pasta Bene",
        "slogan": "Next batch in 5 min",
        "type": 'pasta',
        "options": {
            "icon": 'http://icons.iconarchive.com/icons/icons-land/3d-food/32/Dish-Pasta-Spaghetti-icon.png',
        },

        "id": 4,
        "city": "Berkeley",
        "open": true,
        "stars": 2,
        "info": [
            {
                "description": 'Average Student Meals',
                "value": '$132'
            },
            {
                "description": 'Vegan-Friendly',
                "value": '9 out of 10'
            },
            {
                "description": 'Free Wifi',
                "value": 'YES'
            }
        ],
        "menu": [
            {
                "name": 'House Wine',
                "price": '7.00'
            },
            {
                "name": 'Meat Lasanga',
                "price": '9.50'
            },
            {
                "name": 'Soft Drink',
                "price": '1.50'
            }
        ],
        "latitude": 37.8640357,
        "longitude": -122.2604351,
        "website": 'www.pastabene.com',
        "phone": '510-435-1278'

    },
    {
        "name": "Gypsy's",
        "slogan": "Free samples!",
        "type": 'pasta',
        "options": {
            "icon": 'http://icons.iconarchive.com/icons/icons-land/3d-food/32/Dish-Pasta-Spaghetti-icon.png',

        },

        "id": 5,
        "city": "Berkeley",
        "open": true,
        "stars": 1,
        "info": [
            {
                "description": 'Average Student Meals',
                "value": '$132'
            },
            {
                "description": 'Vegan-Friendly',
                "value": '9 out of 10'
            },
            {
                "description": 'Free Wifi',
                "value": 'YES'
            }
        ],
        "menu": [
            {
                "name": 'Cheese Ravioli',
                "price": '4.35'
            },
            {
                "name": 'King Salmon',
                "price": '9.25'
            },
            {
                "name": 'Garlic Bread',
                "price": '2.65'
            },
            {
                "name": 'Soft Drink',
                "price": '1.50'
            }
        ],
        "latitude": 37.8680705,
        "longitude": -122.2602789,
        "website": 'www.gypsys.com',
        "phone": '510-435-1278'

    },

    ];


    return {
        getAll: restaurants,
        selected: selectedRestaurant
    }
}

