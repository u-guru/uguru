angular.module('uguru.rest')
.factory('Currency', ['Restangular', function(Restangular) {
    var Currency;
    var masterCurrencyList = [{icon_url: null, id: 1, name: 'Food'}, {icon_url: null, id: 2, name: 'Cash'}, {icon_url: null, id: 3, name: 'Coffee'}, {icon_url: null, id: 4, name: 'Giftcards'}, {icon_url: null, id: 5, name: 'Kitten Time'}, {icon_url: null, id: 6, name: 'Meal Points'}, {icon_url: null, id: 7, name: 'Chipotle'}, {icon_url: null, id: 8, name: 'Dogecoin'}, {icon_url: null, id: 9, name: 'Concert Tickets'}, {icon_url: null, id: 10, name: 'Puppy Time'}, {icon_url: null, id: 11, name: 'Cookies'}];
    Currency = {
        getAll:getAll,
        updateMasterList:updateMasterList
    }

    function getAll() {
        return [{'id': 1, 'name': 'Food', 'icon_url': 'food.html'}, {'id': 3, 'name': 'Coffee', 'icon_url': 'coffee.html'}, {'id': 5, 'name': 'Kitten Time', 'icon_url': 'kitten_time.html'}, {'id': 6, 'name': 'Meal Points', 'icon_url': 'meal_points.html'}, {'id': 7, 'name': 'Chipotle', 'icon_url': 'chipotle.html'}, {'id': 8, 'name': 'Dogecoin', 'icon_url': 'dogecoin.html'}, {'id': 10, 'name': 'Puppy Time', 'icon_url': 'puppy_time.html'}, {'id': 2, 'name': 'Cash', 'icon_url': 'cash.html'}, {'id': 12, 'name': 'Skill Swap', 'icon_url': 'skill_swap.html'}, {'id': 4, 'name': 'Gift Cards', 'icon_url': 'gift_cards.html'}, {'id': 9, 'name': 'Tickets', 'icon_url': 'tickets.html'}, {'id': 11, 'name': 'Tutor', 'icon_url': 'tutor.html'}]
    }

    function updateMasterList(user) {
        if (!user.guru_currencies) {
            return;
        }
        all_user_currencies = user.guru_currencies.slice();
        all_currencies_copy = getAll().slice();
        all_currency_names = getNamesOfCurrencies(all_currencies_copy)
        all_user_currency_names = getNamesOfCurrencies(all_user_currencies)

        for (var i = 0; i < all_currencies_copy.length; i++) {
            var indexCurrency = all_currencies_copy[i];
            if (all_user_currency_names.indexOf(indexCurrency.name.toLowerCase()) > -1) {
                all_currencies_copy[i].active = true;
            }
        }

        masterCurrencyList = all_currencies_copy
        return masterCurrencyList;
    }

    function getNamesOfCurrencies(currency_arr) {
        var result_arr = []
        for (var i = 0; i < currency_arr.length; i ++) {
            var indexCurrency = currency_arr[i];
            result_arr.push(indexCurrency.name.toLowerCase());
        }
        return result_arr
    }


    return Currency;
}]);