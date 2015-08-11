describe("Accept Edit :: ",function()
	{

		beforeAll(function()
	    {
	    	browser.driver.get('http://localhost:8100/#/new-home');
	    	browser.sleep(1500);
			browser.waitForAngular();
	    	browser.driver.get('http://localhost:8100/#/become-guru');
		});
		// beforeEach(function()
		// {
		// 	browser.sleep(1000);
		// });
	

		describe("page 1",function(){
			it("Add the courses",function()
			{

			});
			it ("delete the course",function()
			{
				;
			});
			it ("Slide the page",function(){

		          browser.driver.manage().window().getSize().then(function(windowObj)
		          	{
						  var yourOffset = { x: windowObj.width, y: 0 };
	       				console.log(windowObj.width,windowObj.height);
	       				 //  browser.actions()
	       				 // .mouseDown(protractor.get.guruCourse)
	       				 // .mouseMove(protractor.get.guruSkill)
	       				 // .mouseUp()
	       				 // .perform();
	       				 // browser.sleep(8000);
	       				console.log(browser.actions())
	       				
	       				 browser.sleep(8000);

		          	});

				
			});
		});
		
	});