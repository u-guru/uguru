
var global = function() {
  /***********************************************************
  *
  *
  *
  ************************************************************/
  this.socialButton = function(index,name)
  {
      element.all(by.css('#social-login button')).then(function (buttons) {
        // body...
            expect(buttons[index].isDisplayed()).toBe(true);
            expect(buttons[index].getText()).toBe(name,"Button : '"+ name+"' is not showed");
            buttons[index].click();
      });
//       group.element.all(by.tagName('button')).then(function(buttons)
//       {
// //         
//       });
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
  /**********************************************************
  *checkMsg 
  *arg : msg - message you wanna check
  *desc: check the system show the message you want to see
  ***********************************************************/
  this.checkMsg = function(msg)
  {
    var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
    browser.wait(EC.presenceOf(newMsg),3000);
    newMsg.getAttribute('value').then(function(value)
    {
      expect(value).toBe(msg);
    }); 
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
    element.all(by.repeater(name)).then(function (items) {
          // expect(items.length).toBe(5);
          var temp;
          items[0].element(typeEle).getAttribute(attriName).then(function(value)
          {
            temp = value;
            for (var i = 0 ; i <items.length ; i++)
            {
              items[i].element(typeEle).getAttribute(attriName).then(function(value)
              {
                expect(value).not.toBe(temp,"should have different address");
              }); 
            }
          });           
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
              expect(items.length).toBe(5);
            var temp = Math.floor((Math.random() * (items.length-1)));
            items[temp].click();
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
  this.setInput = function(str,index,clear)
  {
    var i = 0;
    var check = false
    if (clear != null)
      check = clear
    if (index != null)
      i = index;
    element.all(by.tagName("input")).then(function(inputs)
      {
        if (check == true)
         {
           inputs[i].getAttribute('value').then(function(result)
            {
              expect(result).toBe('');
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
      return Date.UTC(2012,02,30,hr,sec,ms)+'@jason-test.edu';
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
  //End of the Functions
};

module.exports = new global();
