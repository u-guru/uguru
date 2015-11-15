
describe('Onboarding Test case',function(){
    var onboarding_one = element(by.id('E2E-onboarding-1'));
	var onboarding_two = element(by.id('E2E-onboarding-2'));
    //check Question is disable.
   	
     beforeEach(function () {
        browser.driver.manage().window().setSize(414, 736);
        browser.driver.get('http://localhost:8100/#/onboarding');
        browser.sleep(1000);

        // var yourOffset = { x: 5, y: 5 };
        // browser.actions().mouseMove(onboarding_one, yourOffset).mouseDown().mouseMove(onboarding_one, { x: 0, y: 0 }).mouseMove(onboarding_two).mouseUp().perform();
     });
     describe('Can it slide well ?',function()
     {
	     it('slide right side?', function () {
		    browser.sleep(800);
		    browser.waitForAngular();

	         var yourOffset = { x: 5, y: 5 };
	        browser.actions().mouseMove(onboarding_one, yourOffset).mouseDown().mouseMove(onboarding_one, { x: 0, y: 0 }).mouseMove(onboarding_two).mouseUp().perform();
	    });
     });

     describe('Can it role-select  ?',function()
     {
     	var student = element(by.cssContainingText('option', 'student'));
     	var professional = element(by.cssContainingText('option', 'professional'));
     	var HSstudent = element(by.cssContainingText('option', 'HS student'));
     	beforeEach(function () 
     	{
		    browser.waitForAngular();
     		var yourOffset = { x: 5, y: 5 };
	        browser.actions().mouseMove(onboarding_one, yourOffset).mouseDown().mouseMove(onboarding_one, { x: 0, y: 0 }).mouseMove(onboarding_two).mouseUp().perform();
	       	protractor.get.roleSelect.click(); 

     	});
	    it('select student', function () {
			student.click();   
	    });
        
        it('select professional', function () {
 			professional.click();
		});
	    
	    it('select HS student', function () {
		 	HSstudent.click();     
	    });
     });
     describe('Find University', function()
     {
     	beforeEach(function () 
     	{
     		        browser.driver.get('http://localhost:8100/#/onboarding');
     		browser.sleep(800);
		    browser.waitForAngular();
     		var yourOffset = { x: 5, y: 5 };
	        browser.actions().mouseMove(onboarding_one, yourOffset).mouseDown().mouseMove(onboarding_one, { x: 0, y: 0 }).mouseMove(onboarding_two).mouseUp().perform();
     	});
     	describe('Manuel Choose University',function()
     	{
     		it('Normal Workflow',function()
     		{
     			protractor.run.ManuelUniversity("UNIVERSITY OF SAN FRANCISCO");
     			browser.sleep(1000);
     		});
     	});
     	describe('Auto Choose University',function()
 		{
 			it ('Auto find University',function()
 			{
 				protractor.get.FindUniversity.click();
 			});
 		});
     });
});