'use strict';
var Map = function() {
	this.Map = $('#map_canvas_home');
	this.MapIcons = $$('#mpa-icons');
	this.Filiter = $('#filter-button');
	this.FiliterItem = $$('#account-form .filter-list  li')
	this.UsrFilterItem = $$('header .filter-list  li')
	this.CloseFilter = $('[ng-click="closeFilters()"]')
	this.RestaurantList = $$('#home-courses li');

	//Propertize of a restaruant
	this.RestaurantDetail = $$('#account-form .grub-red div')
	this.RestaurantStats = $$('#account-form .restaurant-icons-list.grub-red-light li')
	// this.hasMapRendered = function()
	// {
	  
	// }
	this.hasMapRendered = function()
	{
		browser.wait(EC.visibilityOf(this.Map),4000);	
		expect(this.Map.isDisplayed()).toBe(true,"Unable to view the map")
	}
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
module.exports = new Map();