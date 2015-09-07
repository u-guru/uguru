
var global = function() {
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
  *isListEmpty 
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
  *arg : a string u wannt search
  *desc: enter character 
  *      and check the result is the same or not
  ***********************************************/
  this.setInput = function(str)
  {
    var input = element.all(by.tagName("input")).last();
    input.clear();
    input.sendKeys(str);
    input.getAttribute('value').then(function(result)
    {
      expect(result).toBe(str);
    });
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
};
module.exports = new global();
