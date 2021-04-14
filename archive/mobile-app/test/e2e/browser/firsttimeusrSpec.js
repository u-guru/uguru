
describe('Firt time usr Test', function () {
  var ListOfCode =  doc.generateRandomString(["","1"],1,"cool")
  beforeAll(function()
      {
        doc.ResetAll();
      });
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
          // university.SelectSchool(0);
          $$('#school-list li a').get(0).click();
        });
    }); 
    describe('Go Throught Become guru test',function()
    {
        var sections = $$('#guru-onboarding-grid li a')
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
              // course.SelectCourse(0);
              $$('#desktop-courses li a').get(0).click()
            });
            it('Select course',function()
            {
              // course.SelectCourse(1);
              $$('#desktop-courses li a').get(1).click()

            }); 
            it('Select course',function()
            {
              // course.SelectCourse(2);
              $$('#desktop-courses li a').get(2).click()

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
            $$('[ng-repeat="category in categories"]').get(0).click()

          });

          it('Select skill',function()
          {
            // console.log( $$('[ng-repeat="category in categories"]').get(1).$$('[ng-repeat = "subcategory in category.subcategories"] input').counts()); 
           $$('[ng-repeat = "subcategory in category.subcategories"] input').get(2).click()
           $$('[ng-repeat = "subcategory in category.subcategories"] input').get(1).click()
          })

          it('close skill',function()
          {
            $$('[ng-click="hideCategorySkillsModal()"]').get(0).click();
          });

          it('close a Category',function()
          {
            categorypage.$('.cta-modal-close').click();
          })

        });
        if(global.browserName == "CHROME")
        {
          describe('Upload a photo',function()
          {
            it('Open photo',function()
            {
              sections.get(2).click();
            });
            it('Upload Photo',function()
            {
              photo.UploadPhoto('small');
            });

          });
        }
        else
        {
          it('Skip upload',function()
          {
            $('[ng-click="skipBecomeGuruAndGoToGuru()"]').click();
          });
        }
        it('Check A success message is shown',function()
        {
          doc.checkMsg("Awesome! You're all set");
        });
        it('check page is guru-home',function()
        {
          expect(browser.getCurrentUrl()).toContain('guru-home');
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
      it("Active setting",function()
      {

        setting.click();
      });
    });

    describe('Edit profile',function()
    {
      var editprofile = $('#cta-box-profile')
      var intro = $('[ng-click="launchGuruIntroductionModal()"]')
      var contact = $('#cta-box-profile-contact')
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
          expect($('#profile-intro textarea').getText()).toBe('123123123');
        });
      });
    
      describe('Contact',function()
      {
        var contactOptions = $$('#contact-type-list input');
        var contactSave = $$('[ng-click="closeAndSaveContactGuruModal()"]')
        it('open Contact page',function()
        {
          contact.click();
        });
        
        it('select contact ',function()
        {
          browser.wait(EC.visibilityOf($$('#contact-type-list input')).get(0))
          contactOptions.get(0).click();
          contactOptions.get(3).click();
        });

        it('Saved Contact',function()
        { 
          contactSave.click()
          expect($('#guru-introduction-modal').isDisplayed()).toBe(false);
        });
      });
      var str = ['course','language','experience','skill'];

      describe('Major/Course/Category/language',function()
      {
        it('active edit mode',function()
        {
          $('#btn-edit-profile').click();
        });

        for(var i = 0 ; i < str.length ;++ i)
        {
          (function (title,index) {
              describe('Open '+title+' Modal', function () {
            
              it('Open Modal',function()
              {
                guruprofile.OpenDesktopModal(title);
              });
                it('close Modal',function()
                {
                  // $$('.header-close.cta-modal-close').get(index+2).click();
                  // guruprofile.CloseModal();
                  guruprofile.closeDesktopModal(title);
                });

              }); 
          })(str[i],i)
        }
         it('save edit mode',function()
        {
          $('#btn-save-profile').click();
        });
      })
      
      it('close Edit profile',function()
      {
        $$('#desktop-guru-profile .cta-modal-close').get(0).click();

      });
    })

    describe('Edit Credibility',function()
    {
        it('Go to guru-credibility',function()
        {
          // browser.get("http://"+localhost+":5000/static/remote/index.html#/guru-home");
          // browser.get("http://"+localhost+":5000/static/remote/index.html#/guru-home");

          browser.wait(EC.elementToBeClickable( $("#cta-box-credibility")),2000);
        });

        it('activate guru-credibility',function()
        {
          browser.sleep(800);
          $("#cta-box-credibility").click()
          browser.wait(EC.visibilityOf($('#desktop-credibility')),2000)
        });

            var groupName  = ['TRANSCRIPT','FACEBOOK','PHONE','EMAIL','EXPERIENCE']
            var groupButton = ['transcript','Facebook','number','Email','Item']

            for(var i = 2 ; i < 5 ; ++ i)
            {
              (function(index,title,buttonName)
              {
                describe('Test FeAattures : '+title , function()
                {
                  it('Click : '+ title,function()
                  {
                    // doc.newPickList('credit-slider',index);
                      // doc.newPickList('#credit-grid',index);
                      if(index!=0)
                        $$('#credit-grid li a').get(index).click();
                  });
                  describe('[ Incompleted ] Check Feattures functional : Add '+ buttonName,function()
                  {
                        switch(index) 
                          {
                              case 0:
                                describe('Photo Upload Test',function()
                                {
                     
                                  it('upload a small Photo',function()
                                  {
                                    // expect(true).toBe(false,"Not Completed Yet");
                                    doc.uploadPhoto("file-input-guru-add-transcript","small");
                                    doc.checkMsg("Saved!");

                                  });

                                });
                                  break;
                              case 1:
                                describe('[Incompleted]Facebook Test',function()
                                {
                                  it('Login Facebook',function()
                                  {
                                    // expect(true).toBe(false,"Facebook Can't Not Be Test");
                                    doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");                            
                                  });
                                  // it("check message successed",function()
                                  // {
                                  //   doc.checkMsg("Saved!");
                                  // })
                                });
                                  break;
                                case 2:
                                      describe('Phone Number Test',function()
                                      {
                
                                        it('Enter Number : 123456789',function()
                                        {
                                          // expect(true).toBe(false,"Not Completed Yet,Alert Message");

                                           // doc.openWrapper('123456789')
                                           browser.wait(EC.visibilityOf($('.uguru-popup.high-z-index.sidebar-popup.show')),2000);
                                           $('[ng-model="popupInput.phoneConfirm"]').sendKeys("1231231234")
                                           $('.uguru-popup.high-z-index.sidebar-popup.show button').click();
                                           doc.checkMsg('Saved!');

                                        });
                                      });
                                  break;
                              case 3:
                                    describe('Email Test',function()
                                    {

                                        it('Enter Email : jason@sjsu.edu',function()
                                        {
                                         // doc.openWrapper('jason@sjsu.edu');
                                         browser.wait(EC.visibilityOf($('.uguru-popup.high-z-index.sidebar-popup.show')),2000);

                                          $('[ng-model="popupInput.emailConfirm"]').sendKeys("jason@sjsu.edu")
                                          $('.uguru-popup.high-z-index.sidebar-popup.show button').click();
                                           doc.checkMsg('Email sent to jason@sjsu.edu');
                                        });
                                    });
                                break;
                              case 4:
                                    describe('EXPERIENCE Test',function()
                                    {

                                      describe('Valid EXPERIENCE INFO',function()
                                      {
                                        it('Title info',function()
                                        {
                                                  // expect(true).toBe(false,"Not Completed Yet");
                                            // doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
                                            element(by.css('.modal-backdrop.active input')).sendKeys("Guru Guy");
                                        });
                                        it('[No Working For now] Year of Experience',function()
                                        {
        
                                            browser.actions()
                                              .mouseMove(element(by.css('.modal-backdrop.active input')), {x: 100, y: 0})
                                              .click()
                                              .perform();    
                                              // dragAndDrop(element(by.css('.modal-backdrop.active input')), {x: 200, y: 0}).
                                              // perform();
                                        });
                                        it('Role Description',function()
                                        {
                                          //expect(true).toBe(false,"Not Completed Yet");
                                            element.all(by.css('.input-outline')).last().sendKeys("TEST TEST");

                                        });
                                        it('Save info',function()
                                        {
                                            element(by.css('.modal-backdrop.active button')).click()
                                        });
                                        it('Check Experience Is Saved',function()
                                        {
                                            doc.checkMsg('saved!');
                                        });
                                      });        
                                    });
                                    break;    
                              }
                  });

                  // it('Check Creditability inscreasing : '+(index+1)*20+' %',function()
                  // {
                  //  // expect(true).toBe(false,"Not Completed Yet");
                 //     doc.tabBar('guru-tab-bar',0)
                //    expect(CredValue.getText()).toContain((index+1)*20,"Incorrect % of Creditability");
                  //  browser.get("http://"+localhost+":8100/#/guru-credibility");    
                  // });  

                });
                
                  })(i,groupName[i],groupButton[i]);
            }
    })


});