var EC = protractor.ExpectedConditions;
var msg = element(by.id('E2E-msg'));
var load= element(by.id('E2E-spinner'));

describe('Ranking Unit Test : Go rank Page', function () {
	var rankButton = element(by.css('[ng-click="goToRankings()"]'));
	it ("go rank page",function(){
		rankButton.click();
   		expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-ranking");
 		

	});

});