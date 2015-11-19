'use strict';
var Demographic = function() {
	this.HighSchool ;
	this.College;
	this.Alumni;
	this.Parent;

	this.Group = $$('#demo-grid li a');
	this.nextSlides = element.all(by.css('[ng-click="nextSlide()"]'))

	this.chooseUser = function(name)
	{
		browser.sleep(500);
		this.Group.filter(function(elem, index) {
		  return elem.getText().then(function(text) {
		    return text.toUpperCase() === name.toUpperCase();
		  });
		}).then(function(filteredElements) {
		  filteredElements[0].click();
		});
	}

	this.IsSelect = function(name)
	{
		this.Group.filter(function(elem, index) {
		  return elem.getText().then(function(text) {
		    return text === name;
		  });
		}).then(function(filteredElements) {
		  filteredElements[0].click();
		  
		});
	};
	this.nextSlide = function(index)
	{
		    		browser.sleep(500);
		this.nextSlides.get(index).click();
	}
	this.GoToDemo = function()
	{
		
		this.nextSlides.then(function(items)
		{
			for(var i = 0 ; i < items.length-1; ++i)
			{
				items[i].click();
			}
		});
	}
}
module.exports = new Demographic();