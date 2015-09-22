var checkElementIsNotClickable = function(element) {

    element.click().then(function(){
        console.log('click function works!');
            throw  element.id + " " + "Click button should not work!";
        }, function() {
            console.log('click function not working');
    });

}

// Describe a feature
var homeButton = element(by.id('home-button'));
var courseButton = element(by.id('courses-button'));
var browseButton = element(by.id('browse-button'));
var settingButton = element(by.id('settings-button'));
var request = element(by.id('request-button'));
var verbCancelButton = element(by.id('verb-cancel-button'));
var sidemenu = element(by.id('side_menu'));
describe('Testing Home Page', function () {
        // beforeEach(function () {
        //        // before function
        //       // browser.get('http://192.168.42.83:8100/');
        //        //element(by.id('request-button-text')).click();
        //       // waits(2000);
        //        //element(by.buttonText("Session"));
        //        //console.log("THE TAG" + request.getText());
        //         homeButton.click();

    //    });
    beforeEach(function () {
        browser.manage().window().setSize(414 , 736);

    });
        //Step: 0 check whether all elements are present
        it('Make sure main text has rendered', function(){
                var awesomeStatus = element(by.id('home-page'));
                expect(awesomeStatus.getText()).toContain("Aww, you haven't made");
                var awesomeStatus = element(by.id('home-page'));
                expect(awesomeStatus.getText()).toContain("Aww, you haven't made");
        });

        //Step: 0 check whether all elements are present
        it('check whether all elements are all present', function () {
            expect(homeButton.isPresent()).toBe(true);
            expect(courseButton.isPresent()).toBe(true);
            expect(browseButton.isPresent()).toBe(false);
            expect(settingButton.isPresent()).toBe(true);
        });

        // Step 1: check whether all functionalitties the way they should
        it('Check whether modal fires when the request button is clicked', function () {

            //===gameplan ===
            //click the button $
            request.click();
            //detect that the page has changed
            expect(verbCancelButton.isPresent()).toBe(true);
            checkElementIsNotClickable(request);

            //ExpectedConditions.invisibilityOf

            //Check visibility of cancel button on the verbs page
            //if it does it click
            verbCancelButton.click();

            //check visibility of home page
             expect(request.isPresent()).toBe(true);
        });

         it('The view transitions to settings icon when it is clicked', function () {
    //     console.log('TODO');
             //beofre click check is not displayed
             var position = element(by.id('main'));
             //console.log("Style " + position.getlocation());
             position.getLocation().then(function (location)
             {
                 expect(location.x).toEqual(0);

             });
            
             //click the button
             settingButton.click();
             waits(10000);
             //detect that the page has changed
             position.getLocation().then(function (location) {
                 expect(location.x).toEqual(-20);
             });
          
            
         });

        // it('The view transitions to courses icon when it is clicked', function () {
        //     console.log('TODO');
        // });

        // it('Do courses start loading in the background?', function () {
        //     console.log('TODO');

        //     //expect it loads less than 5 seconds otherwise server needs to be faster
        // });


});

/****

// Describe a feature
var homeButton = element(by.id('home-button'));
var courseButton = element(by.id('courses-button'));
var browseButton = element(by.id('browse-button'));
var settingButton = element(by.id('settings-button'));
var request = element(by.css('[ng-click="launchRequestModal()"]'));
var cancel = element(by.css('[ng-click="launchRequestModal()"]'));
describe('Testing Home Page', function () {


    it('Make sure main text has rendered', function () {
        var awesomeStatus = element(by.id('home-page'));
        expect(awesomeStatus.getText()).toContain("Aww, you haven't made");
    });
    it('check home page button', function () {
        expect(homeButton.isPresent()).toBe(true);
        expect(courseButton.isPresent()).toBe(true);
        expect(browseButton.isPresent()).toBe(true);
        expect(settingButton.isPresent()).toBe(true);

    });
    /*
        it('Home-button', function(){

        });
        it('courses-button', function () {
        });
        it('browse-button', function () {

        });
        it('settings-button', function () {
        });
    
      */
//});

/*
describe('Testing Home Page', function () {


    beforeEach(function () {
        // before function
        browser.get('http://192.168.42.83:8100/');
        element(by.id('request-button-text')).click();
        // waits(2000);
        //element(by.buttonText("Session"));
        //console.log("THE TAG" + request.getText());
        request.click();

    });
    /*
    it('Load the home page', function () {
       // console.log(browser.getTitle());
        expect(browser.getTitle()).toEqual('http://192.168.42.83:8100/#/new-home');

    });
    */
    /*
    it('check the tab', function () {

        var title = element.all(by.css('.title')).last();
        // expect(title.getText()).toContain("Request a Session");
        expect(title.getText()).toEqual("Request a Session");
        expect(homeButton.isDisplayed()).toBe(true);
        expect(courseButton.isDisplayed()).toBe(true);
        expect(browseButton.isDisplayed()).toBe(true);
        expect(settingButton.isDisplayed()).toBe(true);

    });
    //
    it('request-button-text', function () {
        //expect(by.css(':button')).toEqual('What do you need?');
        //     var test = element(by.css('placeholder'));


        //expect(test.getText()).toEqual("3639 Courses");
    });

});
*/