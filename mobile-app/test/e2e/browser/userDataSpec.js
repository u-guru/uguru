
describe('Usr data check test', function () {
  var ListOfCode =  doc.generateRandomString(["","1"],1,"cool")
    beforeAll(function()
        {
          doc.ResetAll();
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
                });
                
                  })(i,groupName[i],groupButton[i]);
            }
    })


});