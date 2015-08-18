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
            	element(by.css('[ng-click="launchVerbModal()"]')).click()
            else
 				protractor.get.request.click();
       		browser.wait(EC.visibilityOf(element(by.css('[ng-click="launchRequestModal(1)"]'))),3000).then(function()
			{
            	element(by.css('[ng-click="launchRequestModal(1)"]')).click()

			});
    		expect(title.getText()).toBe('Ask a Question');
 		});
 	it('Enter Course',function()
 	{
 		var courseInput = element(by.name("course-input"));
 		courseInput.sendKeys("CS");
 		element.all(by.repeater('course in root.vars.matchingCourses')).then(function(items)
		{
			//expect(items.length).toBe(1);
			//expect(items[0].getText()).toBe('Hum CS M10A');
			items[0].click();
		});
		courseInput.getAttribute('value').then(function(value)
		{
			expect(value).toBe("Hum CS M10A");
		});	
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

	it("Submit",function()
	{	    
        element(by.css('[ng-click="submitRequest()"]')).click();
	});
	it("Pick an amount",function()
	{
	    var set0 = element(by.css('[ng-click="setPriceOption(0)"]'));
        var set1 = element(by.css('[ng-click="setPriceOption(1)"]'));
        var set2 = element(by.css('[ng-click="setPriceOption(2)"]'));
        var set5 = element(by.css('[ng-click="setPriceOption(3)"]'));
   		browser.wait(EC.visibilityOf(set0),10000).then(function()
		{
      		 set0.click();

		});
	});
	it("Confirm",function()
	{	    
        element.all(by.css('[ng-click="submitRequest()"]')).last().click();
		browser.wait(EC.visibilityOf(element(by.id('E2E-submit'))),3000);
		browser.wait(EC.invisibilityOf(element(by.id('E2E-submit'))),3000);
	});
 });	