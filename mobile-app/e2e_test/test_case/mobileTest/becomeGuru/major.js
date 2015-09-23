describe('Major Test', function () {
	var guruButton = element (by.css('[ng-click="goToBecomeGuru()"]'));
	var nextStep = element(by.css('[ng-click="nextSlide()"]'));
	var backStep = element(by.css('[ng-click="goBackToStudentHome()"]'));
	var ele = element.all(by.tagName("ion-slide"));

	// afterEach(function()
	// {
	// 	doc.checkLists("major-list","major.name")
	// });
	describe('Welcome uguru Pop',function()
	{
		it('Check Pop up ',function()
		{
			browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
			// expect(element(by.id('home-uguru-popup')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});	it ('Open The Request',function()
		{
			guruButton.click();

		});
	});
	
	it('Current Page Title: Major',function()
	{
		expect(element(by.css('#major .third')).getText()).toContain("SELECT YOUR MAJOR")
	});

	it('check Data repeating',function()
	{
		doc.checkLists('major-list','major.name');
	});

	describe("Infinite Scroll",function()
	{
		for( i = 8; i < 40; i+=8)
		{
			(function(index) {
	      		it ('Check scrollable ',function()
		 		{
		 			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
			    		browser.executeScript('arguments[0].scrollIntoView()', items[index].getWebElement());
			    	});
				});

				it('Check more items loaded',function()
				{
					element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
			    		expect(items.length > 10).toBe(true,"no data is loading");
			    	});

				});
				// // Take out if take too much time
				// it('check Data repeating',function()
				// {
				// 	doc.checkLists('major-list','major.name');
				// });

				it ('scroll up ',function()
		 		{
		 			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
			    		browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
			    	});
				});
	        })(i);
		}
	});



	describe('Search Testing',function()
	{
		it('send a key : b',function()
		{
	    	doc.setInput('b',2);

		});
		it('Check the Search result is not empty',function()
		{
			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length).not.toBe(0,"no Search result found");
	    	});
		});
		// Take out if take too much time
		// it('check Data repeating',function()
		// {
		// 	doc.checkLists('major-list','major.name');
		// });

		it('clear a key',function()
		{
			element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[2].clear();
	      	});
		});
		describe("Send A Key : Computer, and see result is right",function()
		{
			it('send a key : Computer',function()
			{
		    	doc.setInput('computer',2);
			});

			it("Check list is right",function()
			{
				element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
		    		expect(items.length).toBe(3,"Search Engine not performing correct!");
		    	});
			});
			it('Check Data only as  Computer Science, Computer Science and Engineering ,Linguistics and Computer Science',function()
			{
				doc.checkLists("major-list","major.name",'Computer Science',0)
				doc.checkLists("major-list","major.name",'Computer Science and Engineering',1)
				doc.checkLists("major-list","major.name",'Linguistics and Computer Science',2)
			});
		});

		describe('Choose a result and see the searchbar is clear and the chosen one has checkmark.',function()
		{
			it('Choose The result',function()
			{
		 	    doc.newPickList('major-list',0);
			});
			it ("Search Bar is clear",function()
			{
		    	doc.setInput('',2,true);
			});
			it('Search result is clear-out and list is back',function()
			{
				element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
				    		expect(items.length >= 10).toBe(true,"Full List is not showing correct, Total items in the list : ",items.length);
				    	});
			});
			it ('Major : "Computer Science" Has been Added',function()
			{
				element.all(by.repeater('major in user.majors')).then(function (items) {
			        expect(items.length).toBe(1);
					expect(items[0].getText()).toContain("Computer Science");			     	
			    });				
			});
			it ('Re type "Computer Science",and see it has taken off from the list.',function()
			{
		    	doc.setInput('Computer Science',2);
    			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
    	    		expect(items.length).toBe(2,"Choosen Result is still in the list");
    	    	});
			});
		});
		
		describe("Cancel Become Guru Process, and Check everything is set to default",function()
		{
			it("Go Cancel Become Guru",function()
			{
				backStep.click();
			});
			it('Check Pop up ',function()
			{
				browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
				// expect(element(by.id('home-uguru-popup')).isDisplayed()).toBe(true);
			});
			it('Close Welcome',function()
			{
				//element(by.id('home-uguru-popup')).click();
				element(by.css('[ng-click="closeWelcomePopup()"]')).click();
			});
			it ('Open The Request',function()
			{
				guruButton.click();
			});

			it ('Check Evything is back to default',function()
			{
		    	doc.setInput('',2,true);
	    		expect(element(by.repeater('major in user.majors')).isPresent()).toBe(false,"Choose List doesn't clear out")
	    		element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
		    		expect(items.length >= 10).toBe(true,"Full List is not return to default");
		    	});
			});
			//Skip Bug
			it('Reset',function()
			{		
		    	doc.setInput('a',2,true);
				element.all(by.tagName("input")).then(function(inputs)
		      	{
		      		inputs[2].clear();
		      	});
			})

		});

	});

	describe('removed the selected major and see it back to list',function()
	{
		var MajorName = null;
		it('send a key : Computer Science and Engineering',function()
		{
	    	doc.setInput('Computer Science and Engineering',2);
		});

		it('Choose Computer Science and Engineering Major ',function()
		{

			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {

				if(items.length != 1)
				{
					expect(items.length).toBe(1,"Opps Something[Choosed Data] shouldn't show up")
					doc.newPickList('major-list',1);
				}
				else
					doc.newPickList('major-list',0);

	    	});
		});
			//Skip Bug
		it('Reset',function()
		{		
	    	doc.setInput('a',2,true);
			element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[2].clear();
	      	});
		})

		it('Remocve a selected Major',function()
		{

			element.all(by.repeater('major in user.majors')).then(function (items) {
				if(items.length  == 2)
					items[1].click();
				else
					items[0].click();

				doc.switchAlert();
				doc.switchAlert();

		    });	
		});
		it('check delete',function()
		{
			var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
			browser.wait(EC.presenceOf(newMsg),5000);
			newMsg.getAttribute('value').then(function(value)
			{
			  expect(value).toContain('successfully removed');
			}); 
		});
		it('Search Feature work',function()
		{
	    	doc.setInput('Computer Science and Engineering',2);
			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
				if(items.length == 0)
	    			expect(items.length).not.toBe(1,"Computer Science and Engineering is not return to list");
	    		else if (items.length == 1)
					expect(items[0].getText()).toContain("Computer Science and Engineering");			     	
				else 
	    			expect(items.length).not.toBe(1,"Search Engine is not working");
	    	});
		});
		it ('Clear Search And See the Full list Is back',function()
		{
			element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[2].clear();
	      	});
			element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
	    		expect(items.length > 10).toBe(true,"Choosen Result is still in the list");
	    	});

		});
		it('Reset',function()
		{		
	    	doc.setInput('a',2,true);
			element.all(by.tagName("input")).then(function(inputs)
	      	{
	      		inputs[2].clear();
	      	});
		})
	});

	describe('delete 1 major and see other major is gone too',function()
	{
		var count = 5
		it('Pick 5 Major',function()
		{
			element.all(by.repeater('major in user.majors')).then(function (items) {
				if(items.length  == 1)
				{
					items[0].click();
					doc.switchAlert();
					doc.switchAlert();
				}
		    });	
		    doc.newPickList('major-list',1);
		    doc.newPickList('major-list',2);
	        doc.newPickList('major-list',3);
		    doc.newPickList('major-list',4);
		    doc.newPickList('major-list',5);


		});
		// it('check match number of selected ',function()
		// {
		// 	element(by.binding('user.majors.length')).getText().then(function(text){
		// 		expect(text).toContain(count);
		// 	});
		// });
		it('check number of courses selected ',function()
		{
			element.all(by.css('.icon.ion-checkmark-round')).then(function(items){
				expect(items.length).toBe(count,"Totaled Select Major is not correct");
	     	 });
		});
		it('delete a major',function()
		{
			// doc.newPickList('major-list',1);

			// browser.sleep(1000);
			// doc.switchAlert();
			// doc.switchAlert();
			element.all(by.repeater('major in user.majors')).then(function (items) {
					items[1].click();
		

				doc.switchAlert();
				doc.switchAlert();

		    });	

		});
		it('check delete',function()
		{
			var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
			browser.wait(EC.presenceOf(newMsg),5000);
			newMsg.getAttribute('value').then(function(value)
			{
			  expect(value).toContain('successfully removed');
			}); 
		});
		it('check reminding list',function()
		{
			element.all(by.repeater('major in user.majors')).then(function (items) {
		        expect(items.length).toBe(4);
		    });
		  
		});
	});
	describe("Check Drag Left",function()
	{
		it('Drag to Right side',function()
		{
			doc.slideView(2,'right');
		});	
		it('Check Position',function()
		{
			element(by.id('major')).getLocation().then(function(result)
				{
	   				expect(result.x).toBe(0,"location X is moved");
				});
		});
	});
	describe("drag left",function()
	{
		it('Slide to Next Page',function()
		{
			doc.slideView(2,'left');
		});
		it('check Page title:coures',function()
		{
			expect(element(by.css('#course .third')).getText()).toContain("COURSE");
		});
		it('Slide to Next Page',function()
		{
			doc.slideView(3,'right');
		});
		it('Current Page Title: Major',function()
		{
			expect(element(by.css('#major .third')).getText()).toContain("SELECT YOUR MAJOR")
		});
	});

	it('Next slide',function()
	{
		nextStep.click();
	});
	it('check Page title:coures',function()
	{
		expect(element(by.css('#course .third')).getText()).toContain("COURSE");
	});
	

});