describe('Account Unit Test : Edit Major', function () {
	var editeditMajor = element(by.id('E2E-editProfile-editMajor'));
	var msg = element(by.id('E2E-msg'));

	it ("edit a major",function(){
		editeditMajor.click();
		element(by.id('major-input')).clear().then(function(){
				element(by.id('major-input')).sendKeys("Computer Science")			
		});
		element.all(by.repeater('major in matchingMajors')).then(function (items) {
              items[0].click();
          	});
		browser.sleep(1000);
		protractor.get.doneButton.click();
		msg.getAttribute('value').then(function(value )
		{
			expect(value).toBe("Saved!");
		});	
		// element(by.id("E2E-Back")).click();					
	});

});