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

/*
    describe('Location button ', function () {

        //Location is disabled
        it('is disabled', function () {
        expect(LocatButton.isEnabled()).toBe(true);
        });

    });

    describe('Toggle button ', function () {

        //Toggle is disabled
        it('is disabled', function () {
        expect(ToggleButton.isEnabled()).toBe(true);
        });

    });

    describe('Time button ', function () {

        //Time is disabled
        it('is disabled', function () {
            except(TimeButton.isEnabled()).toBe(true);

        });


    });

    describe('Calender button', function () {

        //Calender is disabled
        it('is disabled', function () {

            except(CalenderButton.isEnabled()).toBe(true);

        });

    });

    describe('Describe button', function () {

        //Describe is disabled
        it('is disabled', function () {
        except(DescribeButton.isEnabled()).toBe(true);
        });

    });

    describe('Attached button', function () {

        //Attached files are disabled too.
        it('is disabled', function () {
        except(AttachedButton.isEnabled()).toBe(true);
        });

    });

    describe('Tags button', function () {

        // Tags are disabled.
        it('is disabled', function () {
            except(TagsButton.isEnabled()).toBe(true);
        });
    });
});
*/
/*
=======
            except(TagsButton.isDisabled()).toBe(true);
        });
    });
});

>>>>>>> a7e79da41b3ae50f37edbfa04705c938ae62eadd
describe('Cancel Button active', function () {
    it('can cancel the request forun', function () {
        //Check can it cancel the the request forum?
        CancelButton.click();
        request.click();
        sessionButton.click();
        //Get Check Page location
        excpet(RequestForm.getText()).toContain("Request a Session");
    });
});

describe('Testing Course Input', function () {

    //check data are loaded or not
    beforeEach(function () {
        describe('Course Data', function () {
            it('load successful?', function () {
                //not empty

            });
        });
    });
    //Is Keyborad is poping up?
    describe('Keyborad', function () {
        it('poping up?', function () {
            expect(Keyboard.isDisplayed()).toBe(true);
        });
    });

    //Key-in Course
    describe('Key in Course', function () {
        //not empty

        describe('Course Data', function () {
            Keyboard.sendKeys('CS');
            //not empty
            it('is not empty', function () {

                expect(KeyboardData).not.toEqual(0);

            });

        });
        describe('Course Data', function () {
            Keyboard.sendKeys('');
            // empty
            it('is empty', function () {
                expect(KeyboardData).toEqual(0);
            });

        });
    });
    //choose the course;



});
describe('Location', function () {
    //Location pag display
    describe('Location', function () {
        it('is displayed?', function () {
            expect(Location.isDisplayed()).toBe(true);
        });
    });
    //Is Keyborad is poping up?
    describe('Keyborad', function () {
        it('poping up?', function () {
            expect(Keyboard.isDisplayed()).toBe(true);
        });
    });
    //Location is able to select or not
    describe('Selecting Location', function () {
        it('can select?', function () {
            //   expect(Location.isDisplayed()).toBe(true);
            location.click();
        });
    });
    // return to menu
    describe('Return', function () {
        it('Return?', function () {
            expect(Location.isDisplayed()).toBe(false);
        });
    });
    // albe to delete the location?
    describe('Cross Button', function () {
        it('remove Location?', function () {
            remove.click()
            expect(locationText.getText()).toContain("");
        });
    });
});

describe('Time', function () {
    //The timing displayed when it is clicked
    describe('Timmer', function () {
        it('poping up?', function () {
            expect(Time.isDisplayed()).toBe(true);
        });
    });
    //Able to scroll the time
    //able to select the time
    describe('select time', function () {
        it('select?', function () {
            TimeButton.click();
        });
    });
});
describe('Calender', function () {
    //able to drag
    //able to resize
    //check all 3 tabs
    //able to cancel
    //anble to Done

});

describe('The Describe', function () {
    //check cancel button
    describe('Cancel Button', function () {
        it('Cancel?', function () {
            Cancel.click();
            expect(Title.getText()).contain("Request a session");
        });
    });
    //check done button disabled
    describe('Done Button', function () {
        it('disabled?', function () {

<<<<<<< HEAD
            expect(Done.isEnabled()).toBe(true);
=======
            expect(Done.isDisabled()).toBe(true);
>>>>>>> a7e79da41b3ae50f37edbfa04705c938ae62eadd
        });
    });
    //key in the text
    describe('Key in text', function () {

        describe('Keyborad', function () {
            it('poping up?', function () {
                expect(Keyboard.isDisplayed()).toBe(true);
            });
        });

        describe('Course Data', function () {
            describe('Course Data', function () {

                //not empty
                it('is not empty', function () {
                    Keyboard.sendKeys('oajsdifajs;diogasigdhiashgihsiaggjjgjggj');
                    expect(KeyboardData).notEmpty();

                });
                it('submit', function () {
                    // sumbit
                });
            });

        });
    });
    //Not sure How does thit one
    describe('Tags', function () {

        //Click tags
        //or key in tags

        //Submit the tags
    });
    //attach file

        //camera
    //delete files
});
<<<<<<< HEAD
*/

