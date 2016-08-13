describe('User Workflow Test : Check incorrect access code',function()
{
	var ListOfCode =  doc.generateRandomString(["","1"],3,"cool")
   afterEach(function()
		    {
		    	   browser.manage().logs().get('browser').then(function(browserLogs) {
		    		  expect(browserLogs.length == 0).toBe(true,'log: ' + require('util').inspect(browserLogs))
		    	   });
		    });
    afterAll(function()
    		{
    			doc.ResetAll();
    		});
    describe('@Workflow : Pre-Student Page + Close Welcome Pop', function () {

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
						
						it("Check page changed & check message show correct",function()
						{
						   	access.CheckMessage(code);
						});
          			});
              })(ListOfCode[i]);
          }	
 
		 
		});
});
