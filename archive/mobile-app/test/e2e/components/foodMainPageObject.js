'use strict';
var Home = function() {
	this.RestaurantList = $$('#home-courses .semester-item.active.grub-red');
	this.RestaurantDetail = $$('#account-form .grub-red div')
	this.RestaurantStats = $$('#account-form .restaurant-icons-list.grub-red-light li')
	this.RestaurantName = $$('#home-courses li h3')
	this.searchButton = $('[thr-click="openSearch()"]')
	this.searchInput = $('[ng-model="search_text.grub"]')

	this.activeSearch = function()
	{	
		this.searchButton.click();
		browser.wait(EC.visibilityOf(this.searchInput),4000,"No Search bar is shown");
	};

	this.searchRestaurant = function(str)
	{
		lib.setInput(this.searchInput,str)
	};

};
module.exports = new Home();