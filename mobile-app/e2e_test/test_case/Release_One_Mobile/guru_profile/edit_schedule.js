describe('Account Unit Test : Edit Schedule', function () {
	var editTime = element(by.id('E2E-editProfile-editLateNight'));
	var msg = element(by.id('E2E-msg'));
	var payOptions = element(by.cssContainingText('option', 'student'));

	it ("edit Time",function(){
		
		editTime.click();
		var rand = Math.floor((Math.random() * 9) + 0);

		browser.findElements(by.tagName('option')).then(function(options) 
		{
			options[rand].click();
		});
	

	});

});