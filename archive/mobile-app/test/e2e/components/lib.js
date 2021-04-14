var Library = function() {

  this.nextSlides = element.all(by.css('[ng-click="nextSlide()"]'))


  this.hasMapRendered = function()
  {
    
  }
  this.nextSlide = function(index)
  {
    browser.sleep(500);
    this.nextSlides.get(index).click();
  }
  /*********************************************************
  


  /*********************************************************
  *
  *
  *
  ********************************************************/
  this.ResetAll = function()
  {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.location.reload(true);')
    // browser.get("http://"+localhost+":8100/#/university");
  }

  this.ScrollPage = function(ele)
  {
      browser.executeScript('arguments[0].scrollIntoView()', ele.getWebElement());
  }


  /***********************************************************
  * slideView 
  * arg : index the page you awnna swipe
  * desc: swip the page to left or right.
  ************************************************************/
  this.slideThePageTo = function(index,direction)
  {
    var xV = -300;
    var yV = 0;
    var num =0;
    if (direction === 'left')
    {
      xV = -300;
      num = 1
    }
    else if (direction === 'right')
    {
      num = - 1
      xV =  300;
    }
      var ele = $$("u-slide");
    // if (tagName != null)
    //   ele = element.all(by.css('#request-content'));
    ele.then(function(items)
    {
        console.log("slides :"+ items.length);
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(items[index]),3000);
        browser.actions().
        dragAndDrop(items[index], {x: xV, y: yV}).
        perform();
        // browser.wait(EC.visibilityOf(items[index+num]),3000);
    }); 
  }

  this.setInput = function(element,str)
  {
    // if(str != "")
      expect(element.getAttribute('value')).toBe("","default empty inputs");
      element.clear();
      element.sendKeys(str);
      expect(element.getAttribute('value')).toBe(str);
  }
  this.manualClearSearchResult = function(element)
  {
      it('Manual clear the search result',function()
      {
        element.clear();
      })
  }
  this.autoClearSearchResult =function(ele)
  {
    it('Clear the result',function()
    {
      ele.click()
    })
  }
           

  /**********************************************************
  * Data List Functions  
  ***********************************************************/
  this.checkDataIncrease = function(elements,CompareIndex)
  {
    expect(elements.count()).toBeGreaterThan(CompareIndex, "No data is loading inside list");

  }
  this.scrollDataList = function(elements,index)
  {
      elements.then(function (items) {
        browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
    });
  }
  this.isDataListEmpty = function(elements)
  {
    expect(elements.isPresent()).toBe(true,'No data list is present');
    expect(elements.count()).not.toBe(0,'The list is empty');
  };

  this.selectItem = function(elements,random)
  {
    var length;
      elements.then(function (items) {
        if (random != null)      
          var temp = random;
        else
          var temp = Math.floor((Math.random() * (items.length-1)));
          items[temp].click();
      });
  }
  this.checkListContainText = function(elements,name)
  {
      elements.filter(function(elem, index) {
        return elem.getText().then(function(text) {
          return text.toUpperCase()=== name.toUpperCase();
        });
      }).then(function(filteredElements) {
        expect(filteredElements.length > 0).toBe(true,"Unable to find match data")
      });
  };

  this.isListViewInfiniteScroll = function(ele)
  {
      describe("Infinity scroll test",function()
      {
          for(var i = 8; i < 36; i+=8)
          {
              (function(index) {
                  it ('Scroll down to #' + index+' data in list',function()
                  {
                      lib.scrollDataList(ele,index);
                  });
                  it('Check school list is increased',function()
                  {
                      lib.checkDataIncrease(ele,index);
                  });
                  it ('Scroll back to top',function()
                  {
                      lib.scrollDataList(ele,0);
                  });
              })(i);
          }
      });
  }


  /**********************************************************
  *checkMsg 
  *arg : msg - message you wanna check
  *desc: check the system show the message you want to see
  ***********************************************************/
  this.checkMsg = function(msg)
  {
    // var newMsg = element(by.css(".loading .text-center.ng-binding"));
     var newMsg = element(by.binding("successLoaderText"));
    // browser.wait(EC.presenceOf(newMsg),3000, "Can't Find Message : "+msg);
    browser.wait(EC.invisibilityOf(newMsg),3000, "Message "+msg+" does not get invisibility");
    browser.sleep(5000);
    newMsg.getAttribute('value').then(function(value)
    {
      expect(value).toContain(msg);
    }); 
    // expect(newMsg.getText()).toContain(msg);
    // expect(true).toBe(false,"Incompleted")
  };
  /*******************************************************************************
  *generateRandomEmail
  *arg :
  *return : random number@jason-test.edu
  *desc : generate random email 
  *********************************************************************************/
  this.generateRandomEmail =function()
  {
        var d = new Date();
        var sec = d.getSeconds();
        var hr = d.getHours();
      return Date.UTC(2012,02,30,hr,sec)+'@jason-test.edu';
  }

  /*******************************************************************************
  *generateRandomString
  *arg :   speclist - your custom list, put [] if u have nothing wanna put
  *        size     - size of list you wanna get 
  *[Option]correct  - correct answer 
  *desc: generate Random list of String.
  ********************************************************************************/
  this.generateRandomString = function(speclist,size,correct)
  {
    var templist = speclist;
    for(var i = 0; i < size ; ++i)
      templist.push( Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '') );
    if(correct != null)
      templist.push(correct);
    return templist
  }
  /*************************************************************
  * switchAlert 
  *
  * desc : switch to alert msg and confirm it.
  ****************************************************************/
  this.switchAlert = function(str)
  {
    browser.wait(EC.alertIsPresent(), 5000);
    browser.switchTo().alert().then(function(alert) {
       expect(alert.getText()).toContain(str);
       return alert.accept();
   });
  }
  /*************************************************************************************
  *connectFB
  *arg : id -Fb account
  *      pw -Fb Password
  *desc: connect with fb
  **************************************************************************************/
  this.connectFB = function (id, pw)
  {
      element.all(by.css('[ng-click="connectWithFacebook()"]')).first().click();
      browser.sleep(800);
      //Switch Screen
      browser.getAllWindowHandles().then(function (handles) {
          // switch to the popup
          browser.switchTo().window(handles[1]);
          // browser.driver.wait(EC.presenceOf(browser.driver.findElement(by.id('email'))),5000);
          // do stuff with the popup
          browser.driver.findElement(by.id('email')).sendKeys(id);
          browser.driver.findElement(by.id('pass')).sendKeys(pw);
          browser.driver.findElement(by.id('u_0_2')).click();
          // go back to the main window
          browser.switchTo().window(handles[0]);
      });

       browser.driver.wait(function () {
          return browser.driver.getCurrentUrl().then(function (url) {
              return /#/.test(url);
          });
      }, 10000);
  }
}
module.exports = new Library();