var Course = require('./coursePageObject.js');

describe('Course Test', function () {
	var course = new Course();
	// For just testing
	// beforeAll(function()
	// {
	// 	browser.getCurrentUrl().then(function(url)
	// 	{
	// 		if( url!= "http://"+localhost+":8100/#/home")
	// 		{
	// 			browser.get("http://"+localhost+":8100/#/become-guru");
	// 		}
	// 	})
	// });
	// it("skip",function()
	// {
	// 	browser.get("http://"+localhost+":8100/#/become-guru");
	// 	nextStep.click();
	// });
	// afterEach(function()
	// {
	// 	doc.checkLists("courses-list","course.short_name")
	// });
	// describe("check data",function()
	// {
	// 	it("check repeating data",function()
	// 	{
	// 	 	doc.checkLists("courses-list","course.short_name")
	// 	});
	// })

	// describe('check select results',function(){
	// 	it('check match number of selected ',function()
	// 	{
	// 		element(by.binding('user.guru_courses.length')).getText().then(function(text){
	// 			expect(text).toContain(count);
	// 		});
	// 	});
	// })
	// it("check the page",function()
	// {
	// 	//
	// });
	it('Current page title: Course',function()
	{
		// expect(element(by.css('#course .third')).getText()).toContain("ADD COURSES")
		course.CheckIsAtCoursePage();
	});

	it('Check Data repeating',function()
	{
		// doc.checkLists('courses-list','course.name');
		course.CheckRepeatingData();
	});

	// // Need to fix later
	describe("Infinite scroll test",function()
	{
		for( i = 16; i < 80; i+=16)
		{
			(function(index) {
	      		it ('Scroll down to #' + index+' Major',function()
		 		{
		 			course.ScrollCourseListTo(index);
				});
				it('Check more majors are load',function()
				{
					course.CheckMoreCourseIsLoad(index);
				});
				it ('Scroll back to top',function()
		 		{
		 			course.ScrollCourseListTo(0);
				});
	        })(i);
		}
	});

	describe('Search testing',function()
	{
		describe("Check search result is shown after search",function()
		{
			it('Send a key : s',function()
			{
		    	// doc.setInput('s',0,model);
		    	course.SearchCourseName('s');
			});
			it('Search result is not empty',function()
			{
		    	course.CheckCourseListNotEmpty();
			});
			// Take out if take too much time
			// it('check Data repeating',function()
			// {
			// 	doc.checkLists('major-list','major.name');
			// });
			it('Clear a key',function()
			{	
				course.ClearSearchBar();
			});
		})


		describe("Send A Key : art, and see result is right",function()
		{
			it('Send a key : art',function()
			{
		    	// doc.setInput('art',0,model);
		    	course.SearchCourseName('art');
			});

			it("Check list is right",function()
			{
				course.CheckListCourseContain('ART');
			});

			it('Clear a key',function()
			{	
				course.ClearSearchBar();
			});
		});

		describe('Choose a result and see the searchbar is clear and the chosen one has checkmark.',function()
		{
			
			it ("Enter ART HIS C117D",function()
			{
		    	// doc.setInput('ART HIS C117D',0,model,true);
		    	course.SearchCourseName('ART HIS C117D');
			});
			it('Choose the search result',function()
			{
		 		// doc.newPickList('courses-list',0);
		 		course.SelectCourse(0);
			});

			it('Search result is clear-out and the default list return back',function()
			{
				course.CheckListCourseContain('ECON');
			});
			it ("Search Bar is clear",function()
			{
				course.IsCourseSearchBarEmpty();
			});
		
			it ('Check course : "ART HIS C117D" has been Added',function()
			{
				course.SelectCourseHasRightName(1,0,'ART HIS C117D');
			});

			it ('Re type "ART HIS C117D",and see it has taken off from the list.',function()
			{
				course.SearchCourseName('ART HIS C117D');
				course.CheckCourseListEmpty();
			});
			//Skip Bug
			it('Reset [Skip bug]',function()
			{		
		    	course.ClearSearchBar();
		    	course.SearchCourseName('a');
		    	course.ClearSearchBar();

			})
		});


	});
	//Alert problem

// 	describe('remove one select course and see it return back to list',function()
// 	{
// 		var elements =  element.all(by.css('#courses-list li:not(.ng-hide)'))
// 		var  course ;
// 		it('Pick a course',function()
// 		{
// 			element.all(by.repeater('course in user.guru_courses')).then(function (items) {
// 				if(items.length  == 1)
// 				{
// 					items[0].click();
// 					browser.sleep(5000);
//                     wdBrowser.switchTo().alert().accept();
// //					doc.switchAlert();
// 				}
// 		    });	
// 		    doc.newPickList('courses-list',0);
// 		});
// 		it('Remove a selected Major',function()
// 		{
// 			element.all(by.repeater('course in user.guru_courses')).then(function (items) {
// 				items[0].click();
// 				doc.switchAlert();

// 		    });	

// 		});
// 		it('check delete successfully msg',function()
// 		{
// 			var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
// 			browser.wait(EC.presenceOf(newMsg),5000);
// 			newMsg.getAttribute('value').then(function(value)
// 			{
// 			  expect(value).toContain('successfully removed');
// 			}); 
// 		});
// 		it('remove course return back list',function()
// 		{
// 		    element.all(by.css('#courses-list li:not(.ng-hide)')).then(function (items) {
// 	    	    expect(items.length).toBe(20,'List is not updated yet');
// 	    	    expect(items[0].getText()).toBe('ECON 202',"ECON164 is not return back to the list")
// 		    });
// 		});
// 	});


	// describe('[Testing : Bug need to fix]delete 1 course and see other course is gone too',function()
	// {
	// 	var count = 5
	// 	it('Pick 5 course',function()
	// 	{
	// 	    doc.newPickList('courses-list',1);
	// 	    doc.newPickList('courses-list',2);
	//         doc.newPickList('courses-list',3);
	// 	    doc.newPickList('courses-list',4);
	// 	    doc.newPickList('courses-list',5);


	// 	});
	// 	// it('check match number of selected ',function()
	// 	// {
	// 	// 	element(by.binding('user.majors.length')).getText().then(function(text){
	// 	// 		expect(text).toContain(count);
	// 	// 	});
	// 	// });
	// 	it('check number of courses selected ',function()
	// 	{
	// 		element.all(by.css('.icon.ion-checkmark-round')).then(function(items){
	// 			expect(items.length).toBe(count,"Totaled Select course is not correct");
	//      	 });
	// 	});
	// 	it('delete a course',function()
	// 	{
	// 		// doc.newPickList('courses-list',1);
	// 		// doc.switchAlert();
	// 		element.all(by.repeater('course in user.guru_courses')).then(function (items) {
	// 			items[1].click();

	// 			doc.switchAlert();

	// 	    });	
	// 	});
	// 	it('check delete',function()
	// 	{
	// 		var newMsg = element(by.css(".loading-container")).element(by.tagName('span'));
	// 		browser.wait(EC.presenceOf(newMsg),5000);
	// 		newMsg.getAttribute('value').then(function(value)
	// 		{
	// 		  expect(value).toContain('successfully removed');
	// 		}); 
	// 	});
	// 	it('check reminding list',function()
	// 	{
	// 		element.all(by.repeater('course in user.guru_courses')).then(function (items) {
	// 	        expect(items.length).toBe(4);
	// 	    });
		  
	// 	});
	// });

	// describe("drag left",function()
	// {
	// 	it('Slide to Next Page',function()
	// 	{
	// 		doc.slideView(3,'left');
	// 	});
	// 	it('check Page title:CATEGORY',function()
	// 	{
	// 		expect(element(by.binding('category.name')).getText()).toBe("SELECT CATEGORY")
	// 	});
	// 	// it('Slide to Next Page',function()
	// 	// {
	// 	// 	doc.slideView(4,'right');
	// 	// });
	// 	// it('Current Page Title: Major',function()
	// 	// {
	// 	// 	expect(element(by.css('#course .third')).getText()).toContain("COURSE");
	// 	// });
	// });

	// it('Next slide',function()
	// {
 //        browser.wait(EC.visibilityOf(nextStep),1000,"Too many Next Step Button");
	// 	nextStep.click();
	// 	doc.slideView(3,'left');
	// });
	it('Next page',function()
		{
			course.GoToNextPage();
		});
	
	// this shouldn't use at here
	// it('Check Page title : Category',function()
	// {
	// 	expect(element(by.binding('category.name')).getText()).toBe("SELECT CATEGORY")
	// 	browser.sleep(1000)
	// });
	
});