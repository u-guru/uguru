var teamPage = function () {
	// body...
	var photoElement;
	var NameElement;
	var DetailElement;
     // global.dv = browser.driver;

	 this.get = function() {
	    dv.get('http://staging.uguru.me/team/');
	  };
     this.getElementHeight = function(element)
     {
     	element.getLocation().then(function(location)
		{
			return location.y;
		});
     };
     this.getArrayLoc = function (eles)
     {
 		eles.then(function(elements)
		{
			var length = elements.length;
			var person = 0;
			var temp =0;
			var x = [];
			var y = [];
				
				for (var i = 0; i< length; ++i)
				{
					var person = i;

					elements[i].getLocation().then(function(location)
					{
						// console.log(location.x, location.y);
						//temp = location.x;
						x.push(location.x);
						y.push(location.y);
					});
				}
		});

     }

};
module.exports = new teamPage();
