
var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));
var side= element(by.id('side_menu'));
describe('Delete a request', function () {
	var courseName;
	var count = element.all(by.repeater('request in user.active_requests')).count();

	it("Remove a request",function()
		{
			element.all(by.repeater('request in user.active_requests')).then(function (courses) {
 				 courseName = courses[0].element(by.id("E2E-className")).getText();
  				 expect(courses[0].element(by.id("E2E-className")).getText()).toContain(courseName); 
  				 console.log("fd "+count);
                 browser.actions().mouseDown(courses[0]).perform();
                 browser.sleep(1000);
                 var alertDialog = browser.switchTo().alert();
				 expect(alertDialog.getText()).toEqual("Are you sure you want to cancel this request?"); 
                 
                 alertDialog.accept();  // Use to accept (simulate clicking ok)
                 msg.getAttribute('value').then(function(value)
				{
               		expect(value).toContain(courseName);
				});	
                 --count;
             });
		});
	it('check Request canceled',function()
	{
	    expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/new-home");

		if (count > 0)
		{
			element.all(by.repeater('request in user.active_requests')).then(function (courses) {
				courseName = courses[0].element(by.id("E2E-className")).getText();
				expect(courses[0].element(by.id("E2E-className")).getText()).toContain(courseName); 
			});
		}
	});
});