//Before each equest.
//Click request
//Click Session
var homeButton = element(by.id('home-button'));
var browseButton = element(by.id('browse-button'));
var settingButton = element(by.id('settings-button'));
var request = element(by.id('request-button'));
//var sessionButton = element(by.buttonText("Session"));
var sessionButton =  element(by.css('[ng-click="launchRequestModal(0)"]'));

var verbCancelButton = element(by.id('verb-cancel-button'));
var sidemenu = element(by.id('side_menu'));
// var doneButton = element(by.css('[ng-click="submitRequest()"]'));

var CancelButton = element(by.buttonText("Cancel"));
var CourseButton = element(by.css('ng-click="focusCourseInput()"'));

var LocatButton
var ToggleButton;
var TimeButton;
var CalenderButton;
var DescribeButton;
var AttachedButton;

beforeEach(function () {
    //        // before function
    //       // browser.get('http://192.168.42.83:8100/');
    //        //element(by.id('request-button-text')).click();
    //       // waits(2000);
    //        //element(by.buttonText("Session"));
    //        //console.log("THE TAG" + request.getText());
    //         homeButton.click();
    //browser.manage().window().setSize(414, 736);
    browser.manage().window().setSize(375, 667);

    request.click();
    sessionButton.click();


});
describe('All the button is disabled except Cancel and Enter Course', function () {


    describe('Cancel button', function () {
        //Cancel is Disabled
        it('is Enabled', function () {
            expect(CancelButton.isEnabled()).toBe(true);
        });
    });


    describe('Done button', function () {
        //Done is Disabled
        it('is Enabled, but not able to submit', function () {

            // setTimeout(function() {
            waits(2000);
            var doneButton = element(by.id('done-button'));
            console.log('done button', JSON.stringify(doneButton))

            doneButton.click();
            waits(2000);

            var test = element.all(by.css('.loading-container')).last();
            //expect( test.element(by.css('.loading span')).getText()).toContain("");
            expect( element(by.css('.loading span')).getText()).toContain("Please enter a course");

            // },2000);
        });

    });


    describe('Course button', function () {
        //Check Course  is Enabled
        it('is disabled', function () {
        element(by.name("course-input")).sendKeys("CS");
        //expect(CourseButton.isEnabled()).toBe(true);
        waits(5000);
         expect($('[ng-show=[progress && root.vars.matchingCourses.length > 0].autocomplete-wrapper').isDisplayed()).toBeTruthy();
        });

    });

});
