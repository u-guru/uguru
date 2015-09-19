var settingButton = element(by.id('settings-button'));
//var settingButton = element(by.id('settings-button'));

var connectFB = element(by.css('[ng-click="signupFacebook()"]'));

var logoff = element(by.css('[ng-click="logoutUser()"]'));
var logoff = element(by.css('[ng-click="logoutUser()"]'));

var request = element(by.id('request-button'));
var request = element(by.id('request-button'));

var sessionButton = element(by.css('[ng-click="launchRequestModal(0)"]'));

var locationButton = element(by.css('[ng-click="launchLocationModal()"]'));
var locationButton = element(by.css('[ng-click="launchLocationModal()"]'));

var helpButton = element(by.css('[ng-click="showAttachActionSheet()"]'));
var emailSignButton = element(by.id('email'));
var switchLoginMode = element(by.id('E2E_SwitchLog'));
var doneButton = element(by.id('done-button'));

var describeButton = element(by.id("E2E-describe"));
var describeButton = element(by.id("E2E-describe"));

var tagButton = element(by.id("E2E-tag"));
var tagButton = element(by.id("E2E-tag"));

var email = element(by.id('email-input'));
var password = element(by.id('password-input'));
var SubmitButton = element(by.id('done-button'));
var ErrorMsg = element(by.id('E2E-show'));
var FindUniversity =  element(by.id('E2E-university')); 
var taskButton = element(by.css('[ng-click="launchTaskVerbModal()"]'));
var choresButton = element(by.id('E2E-chores'));


var QuestionButton = element(by.css('[ng-click="launchRequestModal(1)"]'));
var SearchUniversity = element(by.id('E2E-manuelUni'));
//onbaroding
var roleSelect = element(by.id('role-select'));
exports.globals =
    {
  
        settingButton : settingButton,
        connectFB : connectFB,
        logoff: logoff,
        request: request,
        sessionButton: sessionButton,
        locationButton: locationButton,
        helpButton: helpButton,
        emailSignButton: emailSignButton,
        switchLoginMode: switchLoginMode,
        doneButton: doneButton,
        describeButton : describeButton,
        tagButton: tagButton,
        email: email,
        password: password,
        SubmitButton: SubmitButton,
        ErrorMsg: ErrorMsg,
        FindUniversity :  FindUniversity,
        questionButton: QuestionButton,
        taskButton : taskButton,
        choresButton :choresButton,
        request : request,
        locationButton :locationButton,
        describeButton :describeButton,
        tagButton :tagButton,
        SearchUniversity : SearchUniversity,
        roleSelect : roleSelect,
    };
exports.run =
{
    setUp: function (address,id, pw)
    {
      //  browser.driver.ignoreSynchronization = true;
        browser.driver.manage().window().setSize(414, 736);
        //browser.driver.get('http://localhost:8100/#/new-home');
        browser.driver.get(address);
        browser.waitForAngular();

        settingButton.click();

        //expect(connectFB.isEnabled()).toBe(true);
        connectFB.click();
        //Switch Screen
        browser.getAllWindowHandles().then(function (handles) {
            // switch to the popup
            browser.switchTo().window(handles[1]);

            // do stuff with the popup
            browser.driver.findElement(by.id('email')).sendKeys(id);
            browser.driver.findElement(by.id('pass')).sendKeys(pw);
            browser.driver.findElement(by.id('u_0_2')).click();
            // go back to the main window
            browser.switchTo().window(handles[0]);
        });

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                console.log(/remote/.test(url));
                return url;
            });
        }, 10000);
    },
    KeyIn : function(title,location,detail,tag)
    {
            //title
        element(by.name("course-input")).sendKeys(title);
    
            //location
        locationButton.click();
        browser.sleep(500);
        element(by.id("location-input")).sendKeys("s");
        browser.sleep(2000);
        element.all(by.repeater('location in root.vars.nearby_locations')).then(function (items) {
            //expect(items.length).toBe(1);
            //expect(items[0].getText()).toBe('Hum CS M10A');
            items[0].click();
        });
    
            //detail
        describeButton.click();
        element(by.id("description-input")).sendKeys(detail);
        element(by.id("E2E-SaveDescribe")).click();
        browser.sleep(500);
    
            //tag;
        tagButton.click();
        element(by.id("tags-input")).sendKeys(tag);
        element(by.id("E2E-saveTag")).click();
    
            //done
        var doneButton = element(by.css('[ng-click="submitRequest()"]'));

        doneButton.click();

        browser.sleep(3000);

    },

     pickOffer : function () {
        //
        var set0 = element(by.css('[ng-click="setPriceOption(0)"]'));
        var set1 = element(by.css('[ng-click="setPriceOption(1)"]'));
        var set2 = element(by.css('[ng-click="setPriceOption(2)"]'));
        var set5 = element(by.css('[ng-click="setPriceOption(3)"]'));
        var addCard = element(by.css('[ng-click="addCard()"]'));

        set0.click();
        addCard.click();
        browser.sleep(1000);
        element.all(by.id("card-input")).last().sendKeys("4242 4242 4242 4242");
        element.all(by.id("mm-input")).last().sendKeys("09");
        element.all(by.id("yy-input")).last().sendKeys("15");
        browser.sleep(1000);
        element(by.css('[ng-click="savePayment()"]')).click();
     },

     SignUp: function ()
     {
        var firstName = element(by.id('first-name-input'));
        var lastName = element(by.id('last-name-input'));
        firstName.sendKeys('John');
        lastName.sendKeys('hair');
        email.sendKeys('hair_lvrxrsl_one@tfbnw.net');
        password.sendKeys('makhani1');
        SubmitButton.click();

     },
     LogIn: function ()
    {
        if (email.getText() == "")
            email.sendKeys('hair_lvrxrsl_one@tfbnw.net');
        password.sendKeys('makhani1');
        SubmitButton.click();
     },
      Description : function ()
     {
         //Describtion 
         describeButton.click();
         element(by.id("description-input")).sendKeys("TEST TEST TEST TEST");
         /*
         // Upload picture
         element(by.id("E2E-attach")).click();	      
         element.all(by.repeater('b in buttons')).then(function (items) {
             items[0].click();
             browser.sleep(1000);
             // switch to the popup
           //  browser.switchTo().window(handles[1]);
           //browser.switchTo().window(handles[0]);
         });
         */
         // browser.driver.findElement(By.css(".input[type='files']")).sendKeys("C:\Users\TwFoB Work\Downloads\test.jpg");

         element(by.id("E2E-SaveDescribe")).click();
     },

     Tags : function()
    {

        //Tag 

        tagButton.click();
        element(by.id("tags-input")).sendKeys("HEUUHEUHEUHEHUUHEHUHU");
        element(by.id("E2E-saveTag")).click();
     },
     pickCourse : function ()
     {
         element.all(by.repeater('course in root.vars.matchingCourses')).then(function (items) {
             //expect(items.length).toBe(1);
             //expect(items[0].getText()).toBe('Hum CS M10A');
             items[0].click();
         });
     },
     location : function()
    {
        locationButton.click();
        browser.sleep(500);
        element(by.id("location-input")).sendKeys("s");
        browser.sleep(2000);
        element.all(by.repeater('location in root.vars.nearby_locations')).then(function (items) {
            //expect(items.length).toBe(1);
            //expect(items[0].getText()).toBe('Hum CS M10A');
            items[0].click();
        });
    },
      removeCourse : function (branch)
     {
         element.all(by.repeater('request in user.active_requests')).then(function (courses) {
             if (branch == 1)
             {
                 browser.actions().mouseDown(courses[0]).perform();
                 browser.sleep(1000);
                 var alertDialog = browser.switchTo().alert();
                 alertDialog.accept();  // Use to accept (simulate clicking ok)
             }
             else if(branch == 2)
             {
                 courses[0].click();
                 browser.sleep(1000);
                 helpButton.click();
                 browser.sleep(1000);
                 element(by.css('[ng-click="buttonClicked($index)"]')).click();
                 browser.sleep(1000);
                 var alertDialog = browser.switchTo().alert();
                 alertDialog.accept();  // Use to accept (simulate clicking ok)
             }

         });
      },
         ManuelUniversity : function (key)
      {
          SearchUniversity.click();
          element(by.id('university-input')).sendKeys(key);
          browser.sleep(1000);

          element.all(by.repeater('university in matchingUniversities')).then(function (items) {
              items[0].click();
          });
      }


};