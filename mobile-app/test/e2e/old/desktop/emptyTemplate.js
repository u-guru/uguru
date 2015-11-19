describe('User Workflow Test',function()
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
});
