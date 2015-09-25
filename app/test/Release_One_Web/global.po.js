
var global = function() {
  
  this.get = function(address) {
    dv.get(address);

  };
  this.getCurrent = function()
  {
   return dv.getCurrentUrl();
  };
  this.clickElement = function(name) {
  		dv.findElement(name).click();
  };
  this.getElement = function(name)
  {
  	return dv.findElement(name);
  }
  this.findElements = function(parent,child)
  {
    return dv.findElement(parent).findElements(child);
  }
  this.clickSameElement = function(parent,child,index)
  {
    this.findElements(parent,child).then(function(results)
    {
      results[index].click();
    });
  }
  this.checkAlertMsg = function(msg)
  {
    var alertDialog = browser.switchTo().alert();
	expect(alertDialog.getText()).toEqual(msg); 
    alertDialog.accept();  // Use to accept (simulate clicking ok)
  }

};
module.exports = new global();
