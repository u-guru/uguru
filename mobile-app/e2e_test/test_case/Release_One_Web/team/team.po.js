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
     this.getArrayLoc = function (elements)
     {
 		elements.then(function(elements)
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
			browser.sleep(500).then(function()
			{
				// console.log(x);
				for(var i = 0 ; i < length-1; ++i)
					expect(x[i]+100 < x[i+1] ).toBeTruthy( "Profile Image is overlay each other at Person #"+ (i+1) +" point ("+ x[i]+","+y[i]+")" );
			})
		});

     }

};
module.exports = new teamPage();
