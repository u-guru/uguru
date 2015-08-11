 describe('Manuel Choose University', function()
     {
          var onboarding_one = element(by.id('E2E-onboarding-1'));
          var onboarding_two = element(by.id('E2E-onboarding-2'));
          var uniInput       = element(by.id('university-input'));

     	beforeAll(function()
          {
                browser.actions()
               .mouseDown(onboarding_one)
               .mouseMove(onboarding_two)
               .mouseUp()
               .perform();
               protractor.get.SearchUniversity.click();

          });
          it('Null enter',function()
          {
               uniInput.clear().then(function()
               {
                         uniInput.sendKeys("");
               });     
               element.all(by.repeater('university in matchingUniversities')).count().then(function (count) {
                    expect(count).toBe(0);     
               });       
          })
		it('Normal Workflow',function()
		{
               uniInput.clear().then(function()
               {
                         uniInput.sendKeys("UNIVERSITY OF SAN FRANCISCO");
               });  
               element.all(by.repeater('university in matchingUniversities')).count().then(function (count) {
                    expect(count).toBe(1);     
               });       
		});
          it('Emter and clear Workflow',function()
          {
               uniInput.clear().then(function()
               {
                         uniInput.sendKeys("UNIVERSITY OF SAN FRANCISCO");
               });  
               uniInput.clear();
               element.all(by.repeater('university in matchingUniversities')).count().then(function (count) {
                    expect(count).toBe(0);     
               });       
          });

     	 it('Emter and Confirm Workflow',function()
          {
               uniInput.clear().then(function()
               {
                    uniInput.sendKeys("UNIVERSITY OF SAN FRANCISCO");
               });  
               element.all(by.repeater('university in matchingUniversities')).count().then(function (count) {
                    expect(count).toBe(1);     
               });
                 element.all(by.repeater('university in matchingUniversities')).then(function (item) {
                    item[0].click();
                    expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/new-home") ;
               });         
          });
     });