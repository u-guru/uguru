.filter('wordsFilter', function() {
   return function(items, word) {
    var filtered = [];

    angular.forEach(items, function(item) {
        if(item.indexOf(word) !== -1){
            filtered.push(item);
        }
    });

    filtered.sort(function(a,b){
        if(a.indexOf(word) < b.indexOf(word)) return -1;
        else if(a.indexOf(word) > b.indexOf(word)) return 1;
        else return 0;
    });

    return filtered;
  };
});