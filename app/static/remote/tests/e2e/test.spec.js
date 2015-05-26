// Describe a feature
describe('Testing Home Page', function(){
        it('Make sure main text has rendered', function(){
                var awesomeStatus = element(by.id('home-page'));
                expect(awesomeStatus.getText()).toContain("Aww, you haven't made");
                var awesomeStatus = element(by.id('home-page'));
                expect(awesomeStatus.getText()).toContain("Aww, you haven't made");
        });
        it('Do we have all buttons?', function(){
                element(by.id('home-button')).click();
        });

});