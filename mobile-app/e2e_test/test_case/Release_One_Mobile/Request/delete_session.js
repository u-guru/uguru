
var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('Delete a request', function () {
	var courseName;
	it("Remove a request",function()
		{
			element.all(by.repeater('request in user.active_requests')).then(function (courses) {
            
                 browser.actions().mouseDown(courses[0]).perform();
 				 //expect(courses[0].getText()).toContain("MUS HST 135B"); 
  				 expect(courses[0].element(by.id("E2E-className")).getText()).toContain("MUS HST 135Bddd"); 

                 //browser.sleep(1000);
                 var alertDialog = browser.switchTo().alert();
				 expect(alertDialog.getText()).toEqual("Are you sure you want to cancel this request"); 
                 //alertDialog.accept();  // Use to accept (simulate clicking ok)

             });
		});
	it('check Request canceled',function()
	{
	// expect(alertDialog.getText()).toContain("request canceled");

	});
});