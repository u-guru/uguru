
describe('Firt time usr Test', function () {
  var ListOfCode =  doc.generateRandomString(["","1"],1,"cool")

    describe('@Workflow : Pre-Student Page', function () {

        for( i = 0; i < ListOfCode.length; ++ i)
        {
              (function(code) {
                describe('Test random access code #'+i,function()
                 {
            it("Enter random access code : "+ code,function()
              {
                   access.EnterAccessCode(code)
              });


            it('Press enter',function()
            {
              access.RedeemClick();
            });
            it("Check page changed & check message show : Access Granted",function()
            {
                access.CheckMessage(code);
            });
                });
              })(ListOfCode[i]);
          } 
        it("Sekect a university",function()
        {
          university.SelectSchool(0);
        });
    }); 
    describe('Go Throught Become guru test',function()
    {
        var sections = $$('#guru-onboarding-grid li')
        describe('check correct url and have 3 sections',function()
        {

          it('check it is become guru url',function()
          {
            expect(browser.getCurrentUrl()).toContain('desktop-become-guru')
          })
          it('check these are 3 sections',function()
          {
            expect(sections.count()).toBe(3);
          });
        })

        describe('select courses',function()
        {
            var coursepage = $('#cta-modal-courses')
            it('Open courses',function()
            {
              sections.get(0).click();
            });
            it('Select course',function()
            { 
              browser.wait(EC.visibilityOf(coursepage),3000)
              course.SelectCourse(0);
            });
            it('Select course',function()
            {
              course.SelectCourse(1);
            }); it('Select course',function()
            {
              course.SelectCourse(2);
            });
            it('Check Select Courses has 3',function()
            {
              expect($$('[ng-repeat="course in user.guru_courses"]').count()).toBe(3);
            }); 
            it('close course section',function()
            {
                coursepage.$('.cta-modal-close').click();
            });
        });
        describe('select category',function()
        {
          var categorypage = $('#desktop-skills')

          it('Open category',function()
          {
            sections.get(1).click();
          });

          it('Open a Category',function()
          {
            browser.wait(EC.visibilityOf(categorypage),3000)

            // category.SelectSkill(1);
            $$('[ng-repeat="category in categories"]').get(1).click()
          });

          it('Select skill',function()
          {
             $$('[ng-repeat="category in categories"]').get(1).$$('[ng-repeat = "subcategory in category.subcategories"]').get(2).click()
             $$('[ng-repeat="category in categories"]').get(1).$$('[ng-repeat = "subcategory in category.subcategories"]').get(1).click()

          })

          it('close skill',function()
          {
            $$('[ng-click="hideCategorySkillsModal()"]').get(1).click();
          });

          it('close a Category',function()
          {
            categorypage.$('.cta-modal-close').click();
          })

        });

        describe('Upload a photo',function()
        {
          it('Open category',function()
          {
            sections.get(2).click();
          });
          it('Upload Photo',function()
          {
            photo.UploadPhoto('small');
          });

        });
        it('Check A success message is shown',function()
        {
          doc.checkMsg("Awesome! You're all set");
        });
    });

    describe('Sign up a new account',function()
    {
      var setting = $('#top-settings');

      it("Active setting",function()
      {
        setting.click();
      });

      it('Open signup',function()
      {
        $$('[href="#/desktop-login"]').get(1).click();
      });

      it('Enter Name : ',function()
      {
        account.enterName('jason huang');

      });

      it('Enter Email : ',function()
      {
        account.enterEmail();
      });

      it('Enter Password : ',function()
      {
        account.enterPassword('test123');
      });

      it('Create account',function()
      {
          // account.CreateAccount();
          $('[ng-click="completeSignup()"]').click()
      });
      it('check Sign up successful -- INCONSISTANT',function()
      {
            doc.checkMsg("Account Successfully Created");
      });
      it('check page is guru-home',function()
      {
        expect(browser.getCurrentUrl()).toContain('guru-home');
      });
    });

    describe('Edit profile',function()
    {
      var editprofile = $('#cta-box-profile')
      var intro = $('[ng-click="launchGuruIntroductionModal()"]')
      it ('active editprofile',function()
      {
        editprofile.click();
        browser.wait(EC.visibilityOf($('#desktop-guru-profile')),3000);
      })

      it('Upload Photo',function()
      {
        photo.UploadPhoto('small');
      });
      
      describe('Edit intro',function()
      {
        it('open introduction page',function()
        {
          intro.click();
        });
        
        it('Enter text for introduction & Save',function()
        {
          $('#guru-intro-input textarea').sendKeys("123123123");
          $('[ng-click="saveGuruIntroductionModalAndHide()"]').click();
          doc.checkMsg("Introduction Saved");
        });

        it('Check intro is saved',function()
        { 
          expect($('#profile-intro p').getText()).toBe('123123123');
        });
      });
    
      describe('Contact',function()
      {
        
      });

    })
    describe('Edit Credibility',function()
    {

    })


});