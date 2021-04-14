var Access = require('./accessPageObject.js');

describe('Access Page Test', function () {

	var ListOfCode =  doc.generateRandomString(["","1"],3,"cool")
  var access = new Access();

    // Skip Drag issue
   	// describe("Check Page is Not Dragalbe",function()
   	// {
   	// 	it("drag left",function()
   	// 	{
				// element(by.id('access')).getLocation().then(function(result)
   	// 			{
		  //  			expect(result.x).toBe(0,"location X of Access Page is moved");

   	// 			});
   	// 		doc.slideView(0,"left")
   	// 	});
   	// 	it('Check element',function()
   	// 	{
   	// 		element(by.id('access')).getLocation().then(function(result)
   	// 			{
		  //  			expect(result.x).toBe(0,"location X of Access Page is moved");
   	// 			});
   	// 	});
   	// 	it('Go Bakc Access',function()
   	// 	{
   	// 		  browser.refresh();
   	// 	})

   	// });



	


	for( i = 0; i < ListOfCode.length; ++ i)
	{
        (function(code) {
        	describe('Test random access code #'+i,function()
    			 {
              it("Enter random access code : "+ code,function()
      				{
      					//doc.setInput(testSpec,0,false);
                    // doc.setInput(testSpec,0,'access.codeInput',false);
                    access.EnterAccessCode(code)
      				});
      	 

           		it("Check message is shown correct",function()
      				{
      					// startButton.click();
                access.RedeemClick();
       			   	access.CheckMessage(code);
        			});
    			});
        })(ListOfCode[i]);
    }	
      describe('When access code is typed in, press the enter key, & it should transition',function()
        {
          it('Refresh page',function()
          {
            browser.refresh();
          })
          it('Send key : cool',function()
          {
                access.EnterAccessCode('cool');
          });

          it('Press enter',function()
          {
               access.KeyBoardEnter();
          });

          it('Check page changed & check message show : Access Granted',function()
          {
              access.CheckMessage('cool');
          });
        });
  


});