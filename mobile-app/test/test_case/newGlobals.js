
var global = function() {
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
  /**********************************************************
  *
  *
  *
  ***********************************************************/
  this.tabBar = function(id,index)
  {
    str = '#'+id+' a';
    browser.wait(EC.visibilityOf(element(by.id(id))),3000);
    element.all(by.css(str)).then(function(items)
    {
        browser.wait(EC.elementToBeClickable(items[index]),3000);
        items[index].click();
    });
  }
  /***********************************************************
  *
  *
  *
  ************************************************************/
  this.ScrollPage = function(ele)
  {
      browser.executeScript('arguments[0].scrollIntoView()', ele.getWebElement());
  }
  /***********************************************************
  * slideView 
  * arg : index the page you awnna swipe
  * desc: swip the page to left or right.
  ************************************************************/
  this.slideView = function(index,direction,tagName)
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
      var ele = element.all(by.tagName("ion-slide"));
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
  /***********************************************************
  *
  *
  *
  ************************************************************/
  this.socialButton = function(index,name)
  {
    var bool = true;
    // if (bool != null)
    //   this.bool = bool
      element.all(by.css('#social-login button')).then(function (buttons) {
        // body...
            expect(buttons[index].isDisplayed()).toBe(true );
            expect(buttons[index].getText()).toBe(name,"Button : '"+ name+"' is not showed");
            buttons[index].click();
      });
//       group.element.all(by.tagName('button')).then(function(buttons)
//       {
// //         
//       });
  }
  /************************************************************
  *
  *
  *
  ************************************************************/
  this.checkItemDisplay= function(name,isDisplay,command)
  {
      element.all(by.css('.side-menu-list ion-item')).filter(function(elem, index) 
      {
          return elem.getText().then(function(text)
          {
              return text === name;
          });
      }).then(function(filteredElements) 
        {
           var length = filteredElements.length;
            expect(length == 1).toBe(isDisplay,"Missing :"+ name );
             if (length === 1 && isDisplay===true &&command ==='click')
                 filteredElements[0].click();
            // else if (length > 1)
            //     expect(length > 1).toBe(false )
        });
  }
  /************************************************************
  * pickSideMenu
  * arg : inex - index i
  *       name - name to match ion-item name
  * desc : check the side meun name and pick that one
  *************************************************************/
  this.pickSideMenu = function(index,name)
  {
    element.all(by.css('.side-menu-list ion-item')).then(function(items)
      {
            expect(items[index].getText()).toBe(name);
            items[index].click();
      });
  }
  /*********************************************************
  * checkTitle 
  *
  * desc :  check the title of the current page
  ***********************************************************/
  this.checkTitle = function(title)
  {
     element.all(by.css('.header-nav-center h1')).last().getText().then(function(value)
      {
        expect(value.toLowerCase()).toBe(title);
      });
  };
  /**********************************************************
  *
  *
  *
  **********************************************************/
  this.waitLoading = function()
  {
    var spin = element(by.id("circle"));
    browser.wait(EC.presenceOf(spin),3000, "No loading spin is shown");
    browser.wait(EC.invisibilityOf(spin),3000, "Loading spin is not disappeared");
  };
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
  /*************************************
  *isListShow 
  *arg :          name1 of ng-repeater
  *      [Option] name2 of ng-repeater
  *desc: check if the list is showed. 
         and the list 2 you don't wanna show 
         when list 1 is showing
  **************************************/
  this.isListShow = function(name1,name2)
  {
    var List1 = element(by.repeater(name1));
    var List2 = null
    browser.wait(EC.visibilityOf(List1),3000);
    expect(List1.isDisplayed()).toBe(true);

    if (name2 != null){
        List2 = element(by.repeater(name2));
        expect(List2.isDisplayed()).toBe(false,"Element : "+ name2 +" should be hidden");
    }
  }
  /****************************************************
  * checkList 
  * arg : name - name of the ng-repeat, 
  *       typeEle - element name insdie the repeat
  *       attriName - What Attribute value 
  * desc: this function will check the element
  *       inside the list has the same result or not 
  *******************************************************/
  this.checkList = function(name,typeEle,attriName)
  {
      str = '#'+name+' li:not(.ng-hide)';
    element.all(by.css(str)).then(function (items) {
          // expect(items.length).toBe(5);
          var temp;
          for(var j = 0 ; j < items.length ; j++)
          {
            items[j].element(typeEle).getAttribute(attriName).then(function(value)
            {
              temp = value;

              for (var i = j+1 ; i <items.length ; i++)
              {
                items[i].element(typeEle).getAttribute(attriName).then(function(value)
                {
                  expect(value).not.toBe(temp,"should have different address, Index : "+ j + " " , i);
                }); 
              }
            }); 
          }
              
    });
  }

  this.checkLists = function(id,binding,itemName,index)
  { 
    str = '#'+id+' li:not(.ng-hide)';
    element.all(by.css(str)).then(function (items) {
          var length = (items.length)
          var length2 = items.length - length;
          var dataName;
          var name
          var groupName;
          var tempName;
          var tempGroupName;

          if(itemName != null && index != null)
          {
              expect(items[index].element(by.binding(binding)).getText()).toContain(itemName)
          }
          else
          {
            // console.log (length);
           for(var j = 0 ; j < length; ++j)
           {
                  name= items[j].element(by.binding(binding)).getText().then(function(text){
                    return text;
                  });
                  //class type 
                  groupName=items[j].getAttribute('ng-repeat').then(function(value){
                    return value;
                  });

                  for(var i = j+1; i < length ; i++)
                  {
                        //cmopare name
                      tempName= items[i].element(by.binding(binding)).getText().then(function(text){
                         return text;
                      });

                      //class type 
                      tempGroupName= items[i].getAttribute('ng-repeat').then(function(value){
                        return value;
                      });

                     expect(name).not.toBe(tempName, "Data Repeating");
                   //  expect(groupName).toBe(tempGroupName, "Difrerent ng Group");
                  }
            } 
          }
          
    });
  }
  /****************************************************
  * pickList 
  * arg : name - name of the ng-repeat, 
  * desc: this function will pick a random Item listed in the list
  *******************************************************/
  this.pickList = function(name)
  {
    element.all(by.repeater(name)).then(function (items) {
              // expect(items.length).toBe(5);
            var temp = Math.floor((Math.random() * (items.length-1)));
            items[temp].click();
    });
  }
  this.newPickList = function(name,random)
  {
    var length;
    var str ;

     str = name+' li:not(.ng-hide)';
     element.all(by.css(str)).then(function (items) {
      if (random != null)      
        var temp = random;
      else
        var temp = Math.floor((Math.random() * (items.length-1)));
       // browser.wait(EC.elementToBeClickable( items[temp]),5000,'wait too long to get item clickable');
        items[temp].click();
        // console.log(items.length,temp)
    });
  }
  /**********************************************
  *setInput
  *arg : str - a string u wannt search
  *      [option] index - which input u wannat choose first will be default
  *      [option] check it is clear or not 
  *desc: enter character 
  *      and check the result is the same or not
  ***********************************************/
  this.setInput = function(str,index,model,clear)
  {
    var i = 0;
    var check = true
    
    if (clear != null)
      check = false
    if (index != null)
      i = index;

    element.all(by.model(model)).then(function(inputs)
    // element.all(by.tagName("input")).then(function(inputs)
      {
         // console.log(inputs.length);
        if (check == true)
         {
           inputs[i].getAttribute('value').then(function(result)
            {
              expect(result).toBe('','Input does not clear out');
            });
         }  
        inputs[i].clear();
        inputs[i].sendKeys(str);
        inputs[i].getAttribute('value').then(function(result)
        {
          expect(result).toBe(str);
        });
      });
  } 
   /**********************************************
  *emptyInput
  *arg : index - index of inputs 
  *desc: empty a specific Input Value
  ***********************************************/
  this.emptyInput = function(index)
  {
    element.all(by.tagName("input")).then(function(inputs)
      {
          inputs[index].clear();
          inputs[index].getAttribute('value').then(function(result)
              {
                expect(result).toBe("");
              });     
      });

  
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
        var dateObject = new Date();

       var uniqueId =
                dateObject.getMonth() + '' +
                dateObject.getDate() + '' +
                dateObject.getTime();
      var randomnumber = Math.floor(Math.random() * 9001);

      if (uniqueId.length > 10){

                              uniqueId = uniqueId.substring(0, 10);

      }
      var uniqueId = parseInt(randomnumber) + parseInt(uniqueId);
      return uniqueId+'@jason-test.edu';
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
  /*********************************************************************
  *
  *
  **********************************************************************/
  this.clickCanvas = function (ele,toRight, toBottom) { 
      browser.actions()
        .mouseMove(ele, {x: toRight, y: toBottom})
        .click()
        .perform();
  };
  /**********************************************
  *
  *
  ***********************************************/
  this.drag = function(ele,toRight,toBottom)
  {
      browser.actions()
      .dragAndDrop(ele, {x: toRight, y: toBottom})
      .perform();
  }

  /*************************************************************
  * switchAlert 
  *
  * desc : switch to alert msg and confirm it.
  ****************************************************************/
  this.switchAlert = function()
  {
     browser.wait(EC.alertIsPresent(browser.switchTo().alert()), 4000);
     // var alertDialog = browser.switchTo().alert();
     browser.switchTo().alert().accept();  // Use to accept (simulate clicking ok)
  }
  /***************************************************************
  **
  *
  *
  ***************************************************************/
  this.uploadPhoto = function(name,size)
  {
      var path = require('path');
      var fileToUpload = '../'+size+'.jpg';
      var absolutePath = path.resolve(__dirname, fileToUpload);
      // expect(absolutePath).toBe('HI');
      element(by.id(name)).sendKeys(absolutePath);
  }
  /***********************************************************************
  *
  *
  *
  *************************************************************************/
  this.openWrapper= function(option1,option2)
  {      

      browser.wait(EC.visibilityOf(element(by.css('.uguru-popup.high-z-index.sidebar-popup.show'))),3000,"Taking too long to show Wrapper");
      element(by.css('.uguru-popup.high-z-index.sidebar-popup.show input')).clear();
      element(by.css('.uguru-popup.high-z-index.sidebar-popup.show input')).sendKeys(option1);
      element(by.css('.uguru-popup.high-z-index.sidebar-popup.show button')).click();
      // if(option1 != 123456789 || option1 != 'jason@sjsu.edu')
      //     browser.wait(function() {
      //       return browser.switchTo().alert().then(
      //           function() 
      //           {
      //              expect(browser.switchTo().alert().getText()).toContain("Please enter valid");
      //              browser.switchTo().alert().accept();

      //            return true;
      //           }, 
      //           function()
      //            {
      //             return false;
      //            }
      //       );
      //   },3000,"Input-value should not be passed");
      // else if(option1 === 'close')
      // {
      //   element(by.css('.uguru-popup.high-z-index.sidebar-popup.show a')).click();
      //   expect((element(by.css('.uguru-popup.high-z-index.sidebar-popup.show')).isPresent())).toBe(false);
      // }
  }
  /****************************************************
  *
  *
  *
  ****************************************************/
  this.closeWrapper =function()
  {

  }
  /*************************************************************************************
  *connectFB
  *arg : id -Fb account
  *      pw -Fb Password
  *desc: connect with fb
  **************************************************************************************/
  this.connectFB = function (id, pw)
  {
      // element.all(by.css('[ng-click="connectWithFacebook()"]')).first().click();
      // browser.sleep(800);
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
  //End of the Functions
};

module.exports = new global();
