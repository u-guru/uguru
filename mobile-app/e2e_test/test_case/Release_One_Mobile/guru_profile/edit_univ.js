describe('Account Unit Test : Edit Uni', function () {
	
	it ("edit School",function()
			{
				var schoolName ; 
				element(by.id("E2E-schoolName")).getAttribute('value').then(function(value){
				//s	console.log("Path :"+src);
					schoolName = value;
					console.log("Check" + schoolName);

				});	
				editSchool.click();
	
				element(by.id('university-input')).clear().then(function(){
					if(schoolName !="San Jose State University")
						element(by.id('university-input')).sendKeys("San Jose State University");
					else
						element(by.id('university-input')).sendKeys("University of San Francisco");
				});
				browser.sleep(1000);
				element.all(by.repeater('university in matchingUniversities')).then(function (items) {
		              items[0].click();
		          	});
				browser.switchTo().alert().thenCatch(function (e) {
				    // 27 maps to bot.ErrorCode.NO_MODAL_DIALOG_OPEN: http://selenium.googlecode.com/git/docs/api/javascript/source/lib/atoms/error.js.src.html#l31
				   if (e.code == 27) {
				  		throw e;
				   }	
				}).then(function (alert) {
				    if (alert){
				     	return alert.accept();
				      }
				});

			});
});