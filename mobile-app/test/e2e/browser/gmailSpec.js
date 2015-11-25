describe('Log in an account',function()
	{
		 global.isAngularSite = function(flag){
                browser.ignoreSynchronization = !flag;
                global.protractor = protractor;
                global.browser = browser;
                global.$ = browser.$;
                global.$$ = browser.$$;
                global.element = browser.element;     
                global.dv = browser.driver;
                global.EC = protractor.ExpectedConditions;
            };
         beforeEach(function() {
           isAngularSite(false);

         });

		it('Direct to gmail',function()
		{
			browser.driver.get("https://mail.google.com/");
		});

		it('Enter email : jason@sjsu.edu',function()
		{
    	    // account.enterEmail('jason@sjsu.edu');
    	    $('#Email').sendKeys('jason@uguru.me');
    	    $('#next').click();

			// browser.driver.findElement(by.id('Email')).sendKeys('jason@uguru.me');
			// browser.driver.findElement(By.id('next')).click();

		});

		it('Enter password : test',function()
		{
	        // // account.enterPassword('test');
    	    // browser.wait(EC.visibilityOf($('Passwd')),3000);
    	    browser.sleep(2000);
	        $('#Passwd').sendKeys('f9026972');
	        $('#signIn').click()
	        // browser.wait(EC.visibilityOf( browser.driver.findElement(By.id('Passwd'))),5000)
	        // browser.driver.findElement(By.id('Passwd')).sendKeys('f9026972');
	        // browser.driver.findElement(By.id('signIn')).click();
		});

		it('Log in ',function()
		{
			// $('[ng-click="loginUser()"]').click();
			// doc.checkMsg('Login Successful!');
			browser.wait(EC.visibilityOf($('.T-I.J-J5-Ji.T-I-KE.L3')),5000)
			// browser.wait(EC.visibilityOf( browser.driver.findElement(By.css('T-I.J-J5-Ji.T-I-KE.L3'))),5000)
		});
	});

