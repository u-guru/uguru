var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));
describe('Request Test : Sumbit a Question', function ()
 {
	var title = element(by.css(".title.dont-modify-bounds.ng-binding"))

 	it('Go Session page',function()
 		{
       		browser.wait(EC.visibilityOf(protractor.get.closeBar),3000).then(function()
       			{
	              protractor.get.closeBar.click();  

       			});
            browser.sleep(800); 
 			if(EC.invisibilityOf(protractor.get.request))
            	element(by.css('[ng-click="launchVerbModal()"]')).click();
            else
 				protractor.get.request.click();
        	element(by.css('[ng-click="launchTaskVerbModal()"]')).click();
        	element(by.css('[ng-click="launchRequestModal(2,1)"]')).click();
    		expect(title.getText()).toBe('Request a Task');
 		});
 	it('Enter Course',function()
 	{
 		var courseInput = element(by.name("course-input"));
 		courseInput.sendKeys("Get me a Coke");
		courseInput.getAttribute('value').then(function(value)
		{
			expect(value).toBe("Get me a Coke");
		});	
 	});
 	it('Load Location',function()
	{
		protractor.get.locationButton.click();
		element(by.css('[ng-click="attemptToGetLocation()"]')).click();
		browser.wait(EC.invisibilityOf(load),3000);
		expect(element(by.css('[ng-click="clearLocationButton()"]')).getText()).not.toBe("");
	});
	it("Edit description",function()
		{
			element(by.css('[ng-click="launchDescriptionModal()"]')).click();
	 		var descInput = element(by.id("description-input"));
	 		descInput.sendKeys("Test Test Test Test Test TestTest Test Test Test Test Test Test Test ");

		});
	
	it("Edit Tag",function()
		{
    		element.all(by.css('[ng-click="launchTagsModal()"]')).last().click();
	        element(by.id("tags-input")).sendKeys("HUEHUE");
	        element(by.css('[ng-click="saveTag()"]')).click();
		});
	it("save Desc",function()
		{	    
		    element(by.css('[ng-click="saveDescriptionAndCloseModal()"]')).click();
		});
	it("Pick an amount",function()
		{
		    var set0 = element(by.css('[ng-click="setPriceOption(0)"]'));
	        var set1 = element(by.css('[ng-click="setPriceOption(1)"]'));
	        var set2 = element(by.css('[ng-click="setPriceOption(2)"]'));
	        var set5 = element(by.css('[ng-click="setPriceOption(3)"]'));
	        set0.click();

		});
	it("Submit",function()
	{	    
        element(by.css('[ng-click="submitRequest()"]')).click();
		browser.wait(EC.invisibilityOf(element(by.id('E2E-submit'))),3000);
	});
 });	