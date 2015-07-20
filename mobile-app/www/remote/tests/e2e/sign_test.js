
describe('Account Unit Test', function () {
   beforeEach(function()
    {
        browser.driver.manage().window().setSize(414, 736);
        browser.driver.get('http://localhost:8100/#/new-home');
        browser.sleep(1000);
    });
    describe('Facebook',function(){
      beforeEach(function()
      {
          browser.driver.get('http://localhost:8100/#/new-home');
          browser.sleep(1000);

      });
      describe('Log in', function ()
      {
        it('Cancel Log in',function()
        {
            browser.sleep(800);
            browser.waitForAngular();
            protractor.get.settingButton.click();
            protractor.get.connectFB.click();

            browser.getAllWindowHandles().then(function (handles) {
              // switch to the popup
              browser.switchTo().window(handles[1]);
              browser.sleep(1000);

              browser.driver.findElement(by.id('u_0_3')).click();
              // go back to the main window
              browser.switchTo().window(handles[0]);
            });
           //browser.executeScript(function() {console.log('FB CONNECT FAILED..sedfsdf.')});
        });

        it('Login & Logoff',function()
        {
          browser.sleep(800);
          browser.waitForAngular();
          protractor.get.settingButton.click().then(function()
            {
                protractor.run.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
                browser.sleep(8000);
                protractor.run.logoff();
            });
        });
      });

      //Sign Up
      describe('Sign Up',function(){
        it("fb sign up",function(){
          browser.sleep(800);
          browser.waitForAngular();
          protractor.get.settingButton.click();
          protractor.get.viaEmail.click();
          protractor.get.switchLoginMode.click();
          protractor.get.signFB.click();
          //Switch Screen
          browser.getAllWindowHandles().then(function (handles) {
          // switch to the popup
          browser.switchTo().window(handles[1]);

          // do stuff with the popup
          browser.driver.findElement(by.id('jason_dhcxgww_huang@tfbnw.net')).sendKeys(id);
          browser.driver.findElement(by.id('pass')).sendKeys(pw);
          browser.driver.findElement(by.id('u_0_2')).click();
          // go back to the main window
          browser.switchTo().window(handles[0]);
         });
          browser.sleep(8000);
          protractor.run.logoff();
        });
        

      });

    });
    describe('Email',function(){
      beforeEach(function()
    {
        browser.driver.get('http://localhost:8100/#/new-home');
                  browser.sleep(1000);

    });
      describe('log in & log off',function()
      {
        it('log in successful',function(){
          browser.sleep(800);
          browser.waitForAngular();
          protractor.get.settingButton.click();
          protractor.get.viaEmail.click();
          protractor.get.switchLoginMode.click();
          protractor.run.LogIn('hair_lvrxrsl_one@tfbnw.net','makhani1');
          browser.sleep(8000);
          protractor.run.logoff();
          browser.sleep(2000);

        });
      });

      describe('SIgn up & log off',function()
      {
        it('With Exist account work flow',function(){
          browser.sleep(800);
          browser.waitForAngular();
          protractor.get.settingButton.click();
          protractor.get.viaEmail.click();
          protractor.run.SignUp();
          alertDialog.accept();  // Use to accept (simulate clicking ok)

          browser.sleep(1000);
          protractor.run.LogIn('hair_lvrxrsl_one@tfbnw.net','makhani1');
          browser.sleep(8000);
          protractor.run.logoff();

        });
        it('With new account work flow',function(){
          browser.sleep(800);
          browser.waitForAngular();
          protractor.get.settingButton.click();
          protractor.get.viaEmail.click();
          protractor.run.SignUp();
          browser.sleep(8000);
          protractor.run.logoff();

        });
      });

    });

});


    // afterEach(function() {
    //   browser.manage().logs().get('browser').then(function(browserLog) {
    //     expect(browserLog.length).toEqual(0);
    //     // Uncomment to actually see the log.
    //      console.log('log: ' + require('util').inspect(browserLog));
    //   });
    // });

     


                   

     
    



    