describe('Account Unit Test : Edit Pay', function () {
	var editPay = element(by.id('max-hourly-select'));
	var msg = element(by.id('E2E-msg'));
	var payOptions = element(by.cssContainingText('option', 'student'));

	it ("edit pay",function(){
		editPay.click();
		var rand = Math.floor((Math.random() * 9) + 0);

		// driver.findElements(by.cssContainingText('option')).then(function(elements) {
		// console.log("elements: " + elements.length);
		// //console.log("class: " + elements[0].getAttribute("label"));
		// });


		// if(rand === 0)
		// 	element(by.cssContainingText('option', 'Free')).click();
		// else
		// 	element(by.cssContainingText('option', (rand+1))).click();

		// browser.sleep(8000);

		// browser.findElements(by.tagName('option')).then(function(options) 
		// {
		// 	options[rand].click();
		// });

	});

});