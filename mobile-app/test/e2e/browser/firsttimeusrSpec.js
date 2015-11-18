
describe('Firt time usr Test', function () {
  var ListOfCode =  doc.generateRandomString(["","1"],3,"cool")

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
          university.SelectSchool(0);
        });
    }); 
    describe('Go Throught Become guru test',function()
    {
        var sections = $$('#guru-onboarding-grid li')
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

        

    });
});