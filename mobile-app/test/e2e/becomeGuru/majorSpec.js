
var Major = require('./majorPageObject.js');

describe('Major Test', function () {
	var ele = element.all(by.tagName("ion-slide"));

	var major = new Major();
	// beforeAll(function()
	// {
	// 	browser.getCurrentUrl().then(function(url)
	// 	{
	// 		if( url!= "http://"+localhost+":8100/#/home")
	// 			browser.get("http://"+localhost+":8100/#/home");
	// 	})
	
	// });
	// describe('Welcome uguru logo pop',function()
	// {
	// 	it('Check welcome logo pop up ',function()
	// 	{
	// 		major.CheckPopUpIsShown()
	// 	});
	// 	it('Close welcome logo',function()
	// 	{
	// 		major.CloseThePopUp();
	// 	});	
	// 	it ('Start becomeGuru process',function()
	// 	{
	// 		major.BeginBecomeGuru();
	// 	});
	// });
	//for close the bug request
	// it ('Start Become Guru Process',function()
	// 	{
	// 		var closeButton = element.all(by.css('.modal-backdrop.active .header-down')).last();
	// 		browser.wait(EC.visibilityOf(closeButton),3000);
	// 		closeButton.click();
	// 		guruButton.click();
	// 	});

	describe('Check Current page is correct & data is preload',function()
	{
		it('Start Become Guru',function()
		{
			major.BeginBecomeGuru();
		});
		it('Current Page Title: Major',function()
		{
			major.CheckTitleIsCorrect();
		});

		it('check major-list has duplicate major',function()
		{
			major.CheckRepeatingData();		
		});
	})


	describe("Infinity scroll test for major-list",function()
	{
		for( i = 8; i < 40; i+=8)
		{
			(function(index) {
	      		it ('Scroll down to #' + index+' Major',function()
		 		{
		 			major.ScrollMajorListTo(index);
				});
				it('Check more majors are load',function()
				{
					major.CheckMoreMajorIsLoad(index);
				});
				it ('Scroll back to top',function()
		 		{
		 			major.ScrollMajorListTo(0);
				});
	        })(i);
		}
	});



	describe('Search test',function()
	{
		describe('Search results is displayed when a key is entered',function()
		{
			it('Send a key : b',function()
			{
		    	major.SearchMajorName('b');
			});
			it('Check the Search result is not empty',function()
			{
		    	major.CheckMajorListNotEmpty();
			});
			// Take out if take too much time
			it('check major-list has duplicate major',function()
			{
				major.CheckRepeatingData();		
			});

			it('clear the key',function()
			{
		    	// doc.setInput('',0,model);
				major.ClearSearchBar();
			});
		});
		
		describe("Search 'computer', and see if the result is right",function()
		{
			it('Send a key : computer',function()
			{
		    	// doc.setInput('computer',0,model);
		    	major.SearchMajorName('computer');

			});

			it("Check list is right",function()
			{
		    	major.CheckMajorListLength(3);
			});
			it('Check Data only as  Computer Science, Computer Science and Engineering ,Linguistics and Computer Science',function()
			{
				major.CheckMajorContainNameByOrder('Computer Science',0);
				major.CheckMajorContainNameByOrder('Computer Science and Engineering',1);
				major.CheckMajorContainNameByOrder('Linguistics and Computer Science',2);

			});

			// describe('Select a search-result and see the searchbar got clear && the selected major has checkmark.',function()
			describe('When a search-result is select, does searchbar got clear && the selected major has checkmark.',function()
			{
				it('Select the search-result',function()
				{
			 	    // doc.newPickList('major-list',0);
			 	   	major.SelectMajor(0);
				});
				it ("Check search input has been clear",function()
				{
			    	// doc.setInput('',0,model,true);
			    	major.IsMajorSearchBarEmpty()

				});
				it('Searched major-list is back to default-list',function()
				{
					major.CheckMajorListBackToDefault()
				});
				it ('Major : "Computer Science" has checkmark',function()
				{
					major.SelectMajorHasRightName(1,0,'Computer Science');
				});

				it ('Re-search "computer science",and see it has been taken off from the #major-list.',function()
				{
			    	major.SearchMajorName('computer science');
			    	major.CheckMajorListLength(2);
				});
			});

		
			describe("Cancel Become Guru Process, and check everything reset back to default",function()
			{
				it("Cancel Process of Become Guru",function()
				{
					backStep.click();
					major.CancelBecomeGuruProcess();
				});

				// it('Check Wrap Pop up ',function()
				// {
				// 	browser.wait(EC.visibilityOf(element(by.id('home-uguru-popup'))),3000);
				// 	// expect(element(by.id('home-uguru-popup')).isDisplayed()).toBe(true);
				// });
				// it('Close Welcome',function()
				// {
				// 	//element(by.id('home-uguru-popup')).click();
				// 	element(by.css('[ng-click="closeWelcomePopup()"]')).click();
				// });
				it('check Side Bar is Hidding',function()
				{
					//this should be putting at Side Bar Page Objects
					expect(element(by.css('.menu.menu-right')).isDisplayed()).toBe(false,"side bar should be hidden");
					// browser.get("http://"+localhost+":8100/#/become-guru");
				});
				it (' Start Become Guru Process',function()
				{
					major.BeginBecomeGuru();
				});

				it ('Check Evything is back to default',function()
				{
			    	major.IsMajorSearchBarEmpty();
			    	major.SelectMajorIsNotPresent();
			    	major.CheckMajorListBackToDefault()
				});
				//Skip Bug
				it('Reset Value[Skip Bug]',function()
				{		
					major.ClearSearchBar();
					major.SearchMajorName('a');
					major.ClearSearchBar();
				});

			});
		});
		// End of Search Test 
	});


	// //Alert Problem
	// // describe('Removed the selected major and see it back to list',function()
	// // {
	// // 	var MajorName = null;
	// // 	it('send a key : Computer Science and Engineering',function()
	// // 	{
	// //     	doc.setInput('Computer Science and Engineering',0,model);
	// // 	});

	// // 	it('Choose Computer Science and Engineering Major ',function()
	// // 	{

	// // 		element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {

	// // 			if(items.length != 1)
	// // 			{
	// // 				items[0].getText().then(function(text)
	// // 					{
	// // 						expect(items.length).toBe(1,"Search Result should not show Major : "+text)
	// // 					});
	// // 				doc.newPickList('major-list',1);
	// // 			}
	// // 			else
	// // 				doc.newPickList('major-list',0);

	// //     	});
	// // 	});
	// // 		//Skip Bug
	// // 	it('Reset',function()
	// // 	{		
	// //     	doc.setInput('a',0,model,true);
	// // 		element.all(by.tagName("input")).then(function(inputs)
	// //       	{
	// //       		inputs[0].clear();
	// //       	});
	// // 	})

	// // 	it('Remove a selected Major',function()
	// // 	{

	// // 		element.all(by.repeater('major in user.majors')).then(function (items) {
	// // 			if(items.length  == 2)
	// // 				items[1].click();
	// // 			else
	// // 				items[0].click();

	// // 			doc.switchAlert();
	// // 			// doc.switchAlert();
 // //    			  browser.wait(function() {
	// // 			    return browser.switchTo().alert().then(
	// // 			        function() 
	// // 			        {
	// // 			         browser.switchTo().alert().accept();
	// // 			         return false;
	// // 			        }, 
	// // 			        function()
	// // 			         {
	// // 			          return true;
	// // 			         }
	// // 			    );
	// // 			},3000,"Input should not pass");
	// // 	    });	
	// // 	});
	// // 	it('Check delete',function()
	// // 	{
	// // 		var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
	// // 		browser.wait(EC.presenceOf(newMsg),5000);
	// // 		newMsg.getAttribute('value').then(function(value)
	// // 		{
	// // 		  expect(value).toContain('successfully removed',"No Message is Showing [loading-container]");
	// // 		}); 
	// // 	});

	// // 	it('Search "Computer Science and Engineering" and Find ',function()
	// // 	{
	// //     	doc.setInput('Computer Science and Engineering',0,model);
	// // 		element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
	// // 			if(items.length == 0)
	// //     			expect(items.length).not.toBe(1,"Computer Science and Engineering is not return to list");
	// //     		else if (items.length == 1)
	// // 				expect(items[0].getText()).toContain("Computer Science and Engineering");			     	
	// // 			else 
	// //     			expect(items.length).not.toBe(1,"Search Engine is not working");
	// //     	});
	// // 	});
	// // 	it ('Clear Search And See the Full list Is back',function()
	// // 	{
	// // 		element.all(by.tagName("input")).then(function(inputs)
	// //       	{
	// //       		inputs[2].clear();
	// //       	});
	// // 		element.all(by.css('#major-list li:not(.ng-hide)')).then(function (items) {
	// //     		expect(items.length > 10).toBe(true,"Choosen Result is still in the list");
	// //     	});

	// // 	});
	// // 	it('Reset',function()
	// // 	{		
	// //     	doc.setInput('a',0,model,true);
	// // 		element.all(by.tagName("input")).then(function(inputs)
	// //       	{
	// //       		inputs[0].clear();
	// //       	});
	// // 	})
	// // });

	// // describe('delete 1 major and see other major is gone too',function()
	// // {
	// // 	var count = 5
	// // 	it('Pick 5 Major',function()
	// // 	{
	// // 		element.all(by.repeater('major in user.majors')).then(function (items) {
	// // 			if(items.length  == 1)
	// // 			{
	// // 				items[0].click();
	// // 				doc.switchAlert();
	// // 				doc.switchAlert();
	// // 			}
	// // 	    });	
	// // 	    doc.newPickList('major-list',1);
	// // 	    doc.newPickList('major-list',2);
	// //         doc.newPickList('major-list',3);
	// // 	    doc.newPickList('major-list',4);
	// // 	    doc.newPickList('major-list',5);


	// // 	});
	// // 	// it('check match number of selected ',function()
	// // 	// {
	// // 	// 	element(by.binding('user.majors.length')).getText().then(function(text){
	// // 	// 		expect(text).toContain(count);
	// // 	// 	});
	// // 	// });
	// // 	it('check number of courses selected ',function()
	// // 	{
	// // 		element.all(by.css('.icon.ion-checkmark-round')).then(function(items){
	// // 			expect(items.length).toBe(count,"Totaled Select Major is not correct");
	// //      	 });
	// // 	});
	// // 	it('delete a major',function()
	// // 	{
	// // 		// doc.newPickList('major-list',1);

	// // 		// browser.sleep(1000);
	// // 		// doc.switchAlert();
	// // 		// doc.switchAlert();
	// // 		element.all(by.repeater('major in user.majors')).then(function (items) {
	// // 				items[1].click();
		

	// // 			doc.switchAlert();
	// // 			doc.switchAlert();

	// // 	    });	

	// // 	});
	// // 	it('check delete',function()
	// // 	{
	// // 		var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
	// // 		browser.wait(EC.presenceOf(newMsg),5000);
	// // 		newMsg.getAttribute('value').then(function(value)
	// // 		{
	// // 		  expect(value).toContain('successfully removed');
	// // 		}); 
	// // 	});
	// // 	it('check reminding list',function()
	// // 	{
	// // 		element.all(by.repeater('major in user.majors')).then(function (items) {
	// // 	        expect(items.length).toBe(4);
	// // 	    });
		  
	// // 	});
	// // });
	// // Not working for now
	// // describe("Check Drag Left",function()
	// // {
	// // 	it('Drag to Right side',function()
	// // 	{
	// // 		doc.slideView(2,'right');
	// // 	});	
	// // 	it('Check Position',function()
	// // 	{
	// // 		element(by.id('major')).getLocation().then(function(result)
	// // 			{
	// //    				expect(result.x).toBe(0,"location X is moved");
	// // 			});
	// // 	});
	// // });
	// // describe("drag left",function()
	// // {
	// // 	it('Slide to Next Page',function()
	// // 	{
	// // 		doc.slideView(2,'left');
	// // 	});
	// // 	it('check Page title:coures',function()
	// // 	{
	// // 		expect(element(by.css('#course .third')).getText()).toContain("COURSE");
	// // 	});
	// // 	it('Slide to Next Page',function()
	// // 	{
	// // 		doc.slideView(3,'right');
	// // 	});
	// // 	it('Current Page Title: Major',function()
	// // 	{
	// // 		expect(element(by.css('#major .third')).getText()).toContain("SELECT YOUR MAJOR")
	// // 	});
	// // });
	
	describe("Go to course page",function()
	{
		it('Next slide',function()
		{
			major.GoToCoursePage();
		});

		it('check page title: coures',function()
		{
			// This Should Use Course pageObject
			expect(element(by.css('#course .third')).getText()).toContain("COURSE");
		});
	})
	
	

});