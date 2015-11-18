
describe('Access Page Test', function () {
  var ListOfCode =  doc.generateRandomString(["","1"],3,"cool")

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
    // describe('')
});