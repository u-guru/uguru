describe('Account Unit Test : Edit Name', function () {

	var keyName = element(by.css('[ng-model="data.name"]'));
	var editName = element(by.id('E2E-editProfile-editName'));
	var msg = element(by.id('E2E-msg'));

	it ("Edit Empty Name",function()
		{
			editName.click();

			keyName.clear().then(function()
			{
				keyName.sendKeys("");
            });		

			element.all(by.repeater('button in buttons')).then(function (items)
			 {
            	 items[1].click();
        	 });

			msg.getAttribute('value').then(function(value )
			{
				expect(value).toBe("Please enter a valid name");
			});

		});
	it ("Edit Special Character Name",function()
		{
			editName.click();
			keyName.clear().then(function()
			{
				keyName.sendKeys("@!#!@#$5ƒ, test");
            });				
			element.all(by.repeater('button in buttons')).then(function (items) {
             items[1].click();
        	 });

			msg.getAttribute('value').then(function(value )
			{
				expect(value).toBe("Saved!");
			});
		});
	it ("Edit a Name",function()
		{
			editName.click();
			keyName.clear().then(function()
			{
				keyName.sendKeys("jason test");
            });				
			element.all(by.repeater('button in buttons')).then(function (items) {
             items[1].click();
        	 });

			msg.getAttribute('value').then(function(value )
			{
				expect(value).toBe("Saved!");
			});
		});
});