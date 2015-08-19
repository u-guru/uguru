
var AngularHomepage = function() {
  this.schoolInput = browser.driver.findElement(by.id('search-bar'));
  
  this.get = function() {
    browser.get('http://staging.uguru.me');
  };

  this.setName = function(name) {
    this.schoolInput.sendKeys(name);
  };

};
module.exports = AngularHomepage;
