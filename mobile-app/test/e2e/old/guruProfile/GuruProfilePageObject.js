var GuruProfile = function()
{
	this.photo = element(by.id('profile-icon'));
	this.photoImg = element(by.id('guru-profile-img'));
	this.ProfileName = element(by.id('profile-name'));

	//List 
	this.majorList = element.all(by.css('#profile-major li span'));
	this.courseList = element.all(by.css('#profile-courses li span'));
	this.skillList = element.all(by.css('#profile-skills li span'));
	this.skillListRemoveButton = element.all(by.css('#profile-skills li a'));


	//Buttons
	this.AddCourse = element(by.css('#profile-courses button'));
	this.AddMajor = element(by.css('#profile-major button'));
	this.AddSkill = element(by.css('#profile-skills button'));
	this.AddLanguage = element(by.css('#profile-languages button'));
	this.AddExperience = element(by.css('#profile-experiences button'))

	this.profileAdd = element.all(by.css('#profile-info .default'));
	this.photoClick = element(by.css('[ng-click="takeProfilePhoto()"]'))
	this.EditModeButton =  element(by.id('btn-edit-profile'));
	this.SaveButton = element(by.id('btn-save-profile'));

	//Modal Element
	this.ModalPage = element(by.css('.modal-backdrop.active'));
	this.ModalTitle = element(by.css('.modal-backdrop.active .text-center'));
	this.ModalCloseElement = element.all(by.css('.modal-backdrop.active section a'));
	this.ModalSkill = element.all(by.repeater('skill in active_category.skills'))
	this.ModalLists  = element.all(by.css('.modal-backdrop.active li'));
	// this.ModelClose = element(by.css('.modal-backdrop.active .header-down'));
	// this.ModelClose = element(by.css('.modal-backdrop.active .header-nav-back'));
	// this.ModelClose = element(by.css('.modal-backdrop.active .header-close'));


	this.getProfileName = function()
	{
		return this.ProfileName.getText();
	};	
	this.ActiveEditMode = function()
	{
		this.EditModeButton.click();
		browser.sleep(500);
	};
	this.CheckEditModeNotActived = function()
	{
		// expect(this.SaveButton.isPresent()).toBe(false,)
		expect(this.EditModeButton.isPresent()).toBe(true,"Edit Button Support to be present");
		expect(this.SaveButton.isPresent()).toBe(false,"Save Button Support to not present");
	};
	this.DeactiveEditMode = function()
	{
		this.SaveButton.click();
	};


	this.UploadPhoto = function (size)
	{
	   doc.uploadPhoto('file-input-guru-edit-profile',size);
	};
	this.checkImgIsUpdated = function()
	{
		this.photoImg.getAttribute('src').then(function(value)
		{
			expect(value).not.toBe("https://graph.facebook.com/10152573868267292/picture?width=100&height=100","Photo Is not upload");
		});
	};

	this.countMajor =function()
	{
		return this.majorList.count();
	}

	this.countCourse = function()
	{
		return this.courseList.count();
	}

	this.countSkill = function()
	{
		return this.skillList.count();
	}
	this.OpenModal = function(name)
	{
		switch(name)
		{
			case 'course':
				  doc.ScrollPage(this.AddCourse)
				this.AddCourse.click();
				break;

			case 'major' :
				doc.ScrollPage(this.AddMajor)
				this.AddMajor.click();
				break;

			case 'skill' :	
				doc.ScrollPage(this.AddSkill)
				this.AddSkill.click();
				break;

			case 'language':	
				doc.ScrollPage(this.AddLanguage)
				this.AddLanguage.click();
				break;

			case 'experience':	
				doc.ScrollPage(this.AddExperience)
				this.AddExperience.click();
				break;
		};
		browser.sleep(500);
		// browser.wait(EC.visibilityOf(this.ModalPage),3000);
		// expect(this.ModalTitle.getText()).toContain(name.toUpperCase());
	};
	this.OpenDesktopModal = function(name)
	{
		switch(name)
		{
			case 'course':
				// browser.wait(EC.visibilityOf($('[ng-click="launchGuruCoursesModal()"]')),3000);
				$('#cta-box-profile-courses').click();
				break;

			case 'major' :
				this.AddMajor.click();
				break;

			case 'skill' :	
				// browser.wait(EC.visibilityOf($('[ng-click="launchGuruSkillsModal()"]')),3000);

				$('#cta-box-profile-skills').click();
				break;

			case 'language':	
				// browser.wait(EC.visibilityOf($('[ng-click="launchGuruLanguagesModal()"]')),3000);

				$('#cta-box-profile-languages').click();
				break;

			case 'experience':	
				// browser.wait(EC.visibilityOf($('[ng-click="launchAddGuruExperienceModal()"]')),3000);

				$('#cta-box-profile-experiences').click();
				break;
		};

		// browser.wait(EC.visibilityOf(this.ModalPage),3000);
		// expect(this.ModalTitle.getText()).toContain(name.toUpperCase());
		browser.sleep(500);
	};

	this.closeDesktopModal = function(name)
	{
		switch(name)
		{
			case 'course':
				// browser.wait(EC.visibilityOf($('[ng-click="launchGuruCoursesModal()"]')),3000);
				// $('#cta-box-profile-courses').click();
				$('#cta-modal-profile-courses  .header-close.cta-modal-close').click();

				break;

			case 'major' :
				this.AddMajor.click();
				break;

			case 'skill' :	
				// browser.wait(EC.visibilityOf($('[ng-click="launchGuruSkillsModal()"]')),3000);

				$('#cta-modal-profile-skills  .header-close.cta-modal-close').click();
				break;

			case 'language':	
				// browser.wait(EC.visibilityOf($('[ng-click="launchGuruLanguagesModal()"]')),3000);

				// $('#cta-box-profile-languages').click();
				$('#cta-modal-profile-languages  .header-close.cta-modal-close').click();

				break;

			case 'experience':	
				// browser.wait(EC.visibilityOf($('[ng-click="launchAddGuruExperienceModal()"]')),3000);

				// $('#cta-box-profile-experiences').click();
				$('#cta-modal-profile-experiences  .header-close.cta-modal-close').click();

				break;
		};

		// browser.wait(EC.visibilityOf(this.ModalPage),3000);
		// expect(this.ModalTitle.getText()).toContain(name.toUpperCase());
		browser.sleep(500);
	};

	this.SelectElement = function(index)
	{
		 doc.newPickList('.modal-backdrop.active',index);
	};
	this.ModalHasData = function()
	{
		expect(this.ModalLists.first().isPresent()).toBe(true,'No data are found');
	};
	this.CloseModal = function()
	{
		this.ModalCloseElement.then(function(items)
		{
			items[0].click();
		});
		browser.wait(EC.stalenessOf(this.ModalPage),3000);
	};

	this.deleteAllSkillsInProfile = function()
	{
		this.skillListRemoveButton.then(function(items)
		{	
			for (var i = 0 ;items.length ; ++i) {
				items[i].click();
			}	
		})
	};

};

module.exports = new GuruProfile();
