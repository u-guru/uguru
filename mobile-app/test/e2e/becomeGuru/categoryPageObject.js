'use strict';
var Category = function()
{
	this.nextStep = element.all(by.css('[ng-click="nextSlide()"]'));
	this.Tilte = element(by.binding('category.name'));

	this.CheckTitleIsMatch = function(title)
	{
		browser.wait(EC.visibilityOf(this.Tilte)),1000);
		expect(this.Tilte).getText()).toBe(title)
	};

	this.ChooseSkillSection = function()
	{
		doc.newPickList('skills-list',index);
	}

}
module.exports = Category;