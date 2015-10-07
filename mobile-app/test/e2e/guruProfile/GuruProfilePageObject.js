var GuruProfile = function()
{
	this.photo = element(by.id('profile-icon'));
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
	this.ModalClose = element.all(by.css('.modal-backdrop.active a'));
	this.ModalSkill = element.all(by.repeater('skill in active_category.skills'))

	// this.ModelClose = element(by.css('.modal-backdrop.active .header-down'));
	// this.ModelClose = element(by.css('.modal-backdrop.active .header-nav-back'));
	// this.ModelClose = element(by.css('.modal-backdrop.active .header-close'));


	this.ActiveEditMode = function()
	{
		this.EditModeButton.click();
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

	this.OpenModal = function(name)
	{
		switch(name)
		{
			case 'course':
				this.AddCourse.click();
				break;

			case 'major' :
				this.AddMajor.click();
				break;

			case 'skill' :	
				this.AddSkill.click();
				break;

			case 'language':	
				this.AddLanguage.click();
				break;

			case 'experience':	
				this.AddExperience.click();
				break;
		};

		browser.wait(EC.visibilityOf(this.ModalPage),3000);
		expect(this.ModalTitle.getText()).toContain(name.toUpperCase());
	};

	this.SelectElement = function(index)
	{
		 doc.newPickList('.modal-backdrop.active',index);
	};

	this.CloseModal = function()
	{
		this.ModelClose.then(function(items)
		{
			items[0].click();
		});
	};



};

module.exports = new GuruProfile();
