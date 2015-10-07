'use strict';
var Category = function()
{
	this.nextStep      = element.all(by.css('[ng-click="nextSlide()"]'));
	this.Tilte 		   = element(by.css('#category-skills .ng-binding'));
	this.CategorySkill = element.all(by.repeater('skill in active_category.skills'));
	this.EntirePage    = element(by.css(".modal-backdrop.active"));
	this.ActiveSkills  = element.all(by.binding('category.active_skills_count'))
	this.nextStep = element.all(by.css('[ng-click="nextSlide()"]'));

	this.CheckTitleIsMatch = function(title)
	{
		browser.wait(EC.visibilityOf(this.Tilte),1000);
		expect(this.Tilte.getText()).toBe(title)
	};

	this.ChooseSkillSection = function()
	{
		doc.newPickList('#skills-list',index);
	};

	this.SelectSkill = function(index)
	{
		doc.newPickList('#skills-list',index);
	};

	this.SkillIsExist = function()
	{
		expect(this.CategorySkill.first().isPresent()).toBe(true,"No skills are present");
	};

	this.EnableAllSKills = function(index)
	{
    	this.CategorySkill.then(function (items)
    	{
    		for (var i = 0 ; i<items.length ; ++i)
    		{
				if(index != 0)
				{
        			items[i].click();
        			if (index===0)
						doc.switchAlert();	
				}
    		}
    	});	
	};
	this.clickCanvas = function (toRight, toBottom)
	 { 
	    browser.actions()
	      .mouseMove(this.EntirePage, {x: toRight, y: toBottom})
	      .click()
	      .perform();
	};
	this.CountSelectSKill = function(count,index)
	{
		this.ActiveSkills.then(function(items)
		{
			expect(items[index*2].getText()).toContain(count);

		});
	};
    this.GoToPhotoPage =function()
    {
    	this.nextStep.then(function(items)
		{
			expect(items[2].getText()).toBe('PHOTO')
			items[2].click();
		});
    };
}
module.exports = new Category();