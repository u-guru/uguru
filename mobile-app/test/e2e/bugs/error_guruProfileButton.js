describe('#Error Test Flow : Edit Profile Button Check',function()
{

	beforeAll(function()
	{
        // browser.get("http://localhost:8100/#/");
            browser.refresh();
        // if(startButton.isPresent() === false)
            browser.get("http://"+localhost+":8100/#/guru-profile");
	});


	describe('Edit Mode is not Enable',function()
	{
		it('Check Edit is disabled',function()
		{
			// expect(element(by.id('btn-edit-profile')).isPresent()).toBe(true,"Edit Button Support to be present");
			// expect(element(by.id('btn-save-profile')).isPresent()).toBe(false,"Save Button Support to not present");
			guruprofile.CheckEditModeNotActived();
		});
	});
});
