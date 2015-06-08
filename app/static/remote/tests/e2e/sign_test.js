var settingButton = element(by.id('settings-button'));
var connectFB = element(by.css('[ng-click="signupFacebook()"]'))
var logoff = element(by.css('[ng-click="logoutUser()"]'))
describe('Testing Home Page', function () {

  beforeEach(function () {

        browser.manage().window().setSize(414, 736);
        browser.driver.get('http://localhost:8100/remote');

        settingButton.click();
        
        //expect(connectFB.isEnabled()).toBe(true);
            connectFB.click();
            //Switch Screen
            browser.getAllWindowHandles().then(function (handles) {
              // switch to the popup
              browser.switchTo().window(handles[1]);

              // do stuff with the popup
                browser.driver.findElement(by.id('email')).sendKeys('hair_lvrxrsl_one@tfbnw.net');
                browser.driver.findElement(by.id('pass')).sendKeys('makhani1');
                browser.driver.findElement(by.id('u_0_2')).click();
              // go back to the main window
              browser.switchTo().window(handles[0]);
            });

            return browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                     console.log(/remote/.test(url));
                  return url;
                });
            }, 10000);

    },30000);

        //Cancel is Disabled
        it('is Login', function () {
           
           browser.sleep(500);
           settingButton.click().then(function(){
           logoff.click();    

           });
            browser.sleep(5000);

                        

        },30000);


    

});