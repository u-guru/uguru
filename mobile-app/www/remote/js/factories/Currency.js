angular.module('uguru.rest')
.factory('Currency', ['Restangular', function(Restangular) {
    var Currency;
    var masterCurrencyList = [{icon_url: null, id: 1, name: 'Food'}, {icon_url: null, id: 2, name: 'Cash'}, {icon_url: null, id: 3, name: 'Coffee'}, {icon_url: null, id: 4, name: 'Giftcards'}, {icon_url: null, id: 5, name: 'Kitten Time'}, {icon_url: null, id: 6, name: 'Meal Points'}, {icon_url: null, id: 7, name: 'Chipotle'}, {icon_url: null, id: 8, name: 'Dogecoin'}, {icon_url: null, id: 9, name: 'Concert Tickets'}, {icon_url: null, id: 10, name: 'Puppy Time'}, {icon_url: null, id: 11, name: 'Cookies'}];
    Currency = {
        getAll:getAll,
        updateMasterList:updateMasterList
    }

    function getAll() {
        return [{'id': 1, 'name': 'Food', 'icon_url': 'food.svg'}, {'id': 3, 'name': 'Coffee', 'icon_url': 'coffee.svg'}, {'id': 5, 'name': 'Kitten Time', 'icon_url': 'kitten_time.svg'}, {'id': 6, 'name': 'Meal Points', 'icon_url': 'meal_points.svg'}, {'id': 7, 'name': 'Chipotle', 'icon_url': 'chipotle.svg'}, {'id': 8, 'name': 'Dogecoin', 'icon_url': 'dogecoin.svg'}, {'id': 10, 'name': 'Puppy Time', 'icon_url': 'puppy_time.svg'}, {'id': 2, 'name': 'Cash', 'icon_url': 'cash.svg'}, {'id': 12, 'name': 'Skill Swap', 'icon_url': 'skill_swap.svg'}, {'id': 4, 'name': 'Gift Cards', 'icon_url': 'gift_cards.svg'}, {'id': 9, 'name': 'Tickets', 'icon_url': 'tickets.svg'}, {'id': 11, 'name': 'Tutor', 'icon_url': 'tutor.svg'}]
    }

    function updateMasterList(user) {
        if (!user.guru_currencies || user.guru_currencies.length) {
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