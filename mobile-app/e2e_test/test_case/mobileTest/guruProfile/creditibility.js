describe('Guru Home Test', function () {

	var ele = element.all(by.tagName("ion-slide"));
	beforeAll(function()
	{
		browser.get("http://localhost:8100/#/guru");
		browser.sleep(2000)
	});
	describe("Welcome Pop Up",function()
	{
		it('Check Pop up ',function()
		{
			expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			element(by.css('[ng-click="closeWelcomePopup()"]')).click();
		});
	});
	describe("Check Button",function()
	{
		it('click Cred Button',function()
		{
			doc.tabBar('guru-tab-bar',2)
		});
		it('Check Url',function()
		{	
			expect(browser.getCurrentUrl()).toBe("http://localhost:8100/#/guru-ranking");
		});

		// it('click Cred Button',function()
		// {
		// 	doc.tabBar('guru-tab-bar',2)
		// });
		it("Check Side Meuns Hide",function()
		{
			expect(element(by.tagName('ion-side-menu')).isDisplayed()).toBe(false, "SideBar is showed");
		});
		it('Fresh Home Button',function()
		{
			browser.get("http://localhost:8100/#/guru");
		});
	});
	describe("Welcome Pop Up[Set Back To Default]",function()
	{
		it('Check Pop up ',function()
		{
			expect(element(by.css('.content-wrapper')).isDisplayed()).toBe(true);
		});
		it('Close Welcome',function()
		{
			//element(by.id('home-uguru-popup')).click();
			//element(by.css('[ng-click="closeWelcomePopup()"]')).click();
			browser.get("http://localhost:8100/#/guru-credibility");
		});
	});
	describe("Check all Creditability Page",function()
	{	
		var groupName  = ['TRANSCRIPT','FACEBOOK','PHONE','EMAIL','EXPERIENCE']
		var groupButton = ['transcript','Facebook','number','Email','Item']
		for(var i = 4; i < 5 ; ++ i)
		{
			(function(index,title,buttonName)
			{
				describe('Test Feattures : '+title , function()
				{
					it('Click : '+ title,function()
					{
						doc.newPickList('credit-slider',index);

					});
					
					it('Check Title : '+title,function()
					{
				   		  element.all(by.css('#credibility-content-wrapper h1')).then(function (items) {
				   		  	expect(items[index].getText()).toContain(title);
				   		  });

					});
					it('Check button Name : '+buttonName,function()
					{
				   		  element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
				   		  	expect(items[index].getText()).toContain(buttonName);
						 });
					});
					describe('[Incompleted ] Check Feattures functional : Add '+ buttonName,function()
					{
						it('click Button',function()
							{
								element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
									expect(items[index].getText()).toContain(buttonName);
									items[index].click();
								});
							});
				   		
			   		  		switch(index) 
			   		  		{
			   		  		    case 0:
			   		  		    	describe('Photo Upload Test',function()
			   		  		    	{
			   		  		    		it('Upload a large Photo',function()
			   		  		    		{
			   		  		    			// expect(true).toBe(false,"Not Completed Yet");
			   		  		    			doc.uploadPhoto("file-input-guru-add-transcript","large");
			   		  		    			doc.checkMsg("Saved!");

			   		  		    		});
			   		  		    		it('upload a small Photo',function()
			   		  		    		{
			   		  		    			// expect(true).toBe(false,"Not Completed Yet");
			   		  		    			doc.uploadPhoto("file-input-guru-add-transcript","small");
			   		  		    			doc.checkMsg("Saved!");

			   		  		    		});

			   		  		    	});
			   		  		        break;
			   		  		    case 1:
				   		  		    describe('Facebook Test',function()
				   		  		    {
				   		  		    	it('Login Facebook',function()
				   		  		    	{
				   		  		    		// expect(true).toBe(false,"Not Completed Yet");
											doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
											doc.checkMsg("Saved!");
				   		  		    	});
				   		  		    });
			   		  		        break;
			   		  	        case 2:
	  	           		  		    describe('Phone Number Test',function()
	  	           		  		    {
	  	           		  		    	it('Enter Empty Number',function()
	  	           		  		    	{
				   		  	        	    doc.openWrapper('asdff');

	  	           		  		    	});
	  	           		  		    	it('Enter Number : asdff',function()
	  	           		  		    	{
				   		  	       			doc.openWrapper('');

	  	           		  		    	});
	  	           		  		    	it('Enter Number : 123456789',function()
	  	           		  		    	{
											 doc.openWrapper('123456789')
											 doc.checkMsg('Saved!');

	  	           		  		    	});
	  	           		  		    });
			   		  	       		break;
			   		  		    case 3:
	  		       		  		    describe('Email Test',function()
	  		       		  		    {
	  		       		  		   	    it('Enter Empty Email',function()
	  	           		  		    	{
	  	           		  		    		// expect(true).toBe(false,"Not Completed Yet");
		    	   		  	        		doc.openWrapper('asdff');

	  	           		  		    	});
	  	           		  		    	it('Enter Email : asdff',function()
	  	           		  		    	{
	  	           		  		    		// expect(true).toBe(false,"Not Completed Yet");
		    	   		  	        		doc.openWrapper('');

	  	           		  		    	});
	  	           		  		    	it('Enter Email : 123456789',function()
	  	           		  		    	{
	  	           		  		    		// expect(true).toBe(false,"Not Completed Yet");
		       		  	        			doc.openWrapper('123456789')

	  	           		  		    	});

  	           		  		    		it('Enter Email : 123456789',function()
	  	           		  		    	{
	  	           		  		    		// expect(true).toBe(false,"Not Completed Yet");
		       		  	        			 doc.openWrapper('jason@sjsu.edu');
		       		  	        			 doc.checkMsg('Saved!');
	  	           		  		    	});
	  		       		  		    });
			   		  		    	break;
			   		  		    case 4:
	  		       		  		    describe('EXPERIENCE Test',function()
	  		       		  		    {
	  		       		  		    	it('Check Title is Correct',function()
	  		       		  		    	{
	  		       		  		    		expect(element.all(by.css('.modal-backdrop.active h1')).last().getText()).toBe("GURU EXPERIENCES","Wrong Page Title");
	  		       		  		    	});

	  		       		  		    	it('Empty EXPERIENCE info',function()
	  		       		  		    	{
	  		       		  		    		// expect(true).toBe(false,"Not Completed Yet");
	  		    							// doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
	  		    							element(by.css('.modal-backdrop.active button')).click()
	  		    							doc.checkMsg('Please enter in all fields');
	  		       		  		    	});

	  		       		  		    	describe('Valid EXPERIENCE INFO',function()
	  		       		  		    	{
  		    		   		  		    	it('Title info',function()
  		    		   		  		    	{
  		    		   		  		    		// expect(true).toBe(false,"Not Completed Yet");
  		    									// doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
  		    									element(by.css('.modal-backdrop.active input')).sendKeys("Guru Guy");
  		    		   		  		    	});
	  		    	   		  		    	it('[No Working For now] Year of Experience',function()
	  		    	   		  		    	{
	  		    	   		  		    		// expect(true).toBe(false,"Not Completed Yet");
	  		    								// doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
	  		    					
  		    								    browser.actions()
  		    								    	.mouseDown(element(by.css('.modal-backdrop.active input')))
		    								        .mouseMove({x: 100, y: 0}) // try different value of x
		    								        .mouseUp()
		    								        .perform();
  		    								    // dragAndDrop(element(by.css('.modal-backdrop.active input')), {x: 200, y: 0}).
  		    								    // perform();
	  		    	   		  		    	});
	  		    	   		  		    	it('Role Description',function()
	  		    	   		  		    	{
	  		    	   		  		    		//expect(true).toBe(false,"Not Completed Yet");
	  		    								element.all(by.css('.input-outline')).last().sendKeys("TEST TEST");

	  		    	   		  		    	});
	  		    	   		  		    	it('Save info',function()
	  		    	   		  		    	{
	  		    								element(by.css('.modal-backdrop.active button')).click()
	  		    								doc.checkMsg('Saved');
	  		    	   		  		    	});
	  		       		  		    	});
	  		       		  		  
	  		       		  		    	describe('[Incompleted]check Modal-back drop increased',function()
	  		       		  		    	{
	  		       		  		    		for(var e = 0 ; e< 5 ; ++ e)
	  		       		  		    		{
		  		       		  		    		it("Open",function(){
		  		       		  		    			element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
		  		       		  		    				items[index].click();
		  		       		  		    			});

		  		       		  		    		});
			  		       		  		    	it("closed",function(){
			  		       		  		    		element(by.css('.modal-backdrop.active .header-nav-next')).click()
			  		       		  		    	});
		  		       		  		    	}
			  		       		  		    it("Check CLASS : Modal-back should not increased",function(){
			  		       		  		    	element.all(by.css('.modal-backdrop.hide')).then(function(items)
			  		       		  		    	{
			  		       		  		    		expect(items.length).toBe(1,"Elemet : Modal-back keep inscreasing");
			  		       		  		    	})

			  		       		  		    });
	  		       		  		    	})
	  		       		  		    });
	  		       		  		    break;		
  		       		  		}
				});
					it('Check Creditability inscreasing : '+(index+1)*20+' %',function()
					{
						expect(true).toBe(false,"Not Completed Yet");
					});

					// it('[Incompleted ] Check Feattures functional : Add '+ buttonName,function()
					// {
				 //   		  element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
				 //   		  	expect(items[index].getText()).toContain(buttonName);
				 //   		  	items[index].click();
			  //  		  		switch(index) {
			  //  		  		    case 0:
			  //  		  		    	doc.uploadPhoto();
			  //  		  		        break;
			  //  		  		    case 1:
					// 				doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
			  //  		  		        break;
			  //  		  	        case 2:
				 //   		  	        // doc.openWrapper('asdff');
				 //   		  	        // doc.openWrapper('');
			  //  		  	        	doc.openWrapper('123456789')
			  //  		  	       		break;
			  //  		  		    case 3:
		   //  	   		  	        // doc.openWrapper('asdff');
		   //  	   		  	        // doc.openWrapper('');
		   //     		  	        	// doc.openWrapper('123456789')
		   //     		  	        	doc.openWrapper('jason@sjsu.edu');
			  //  		  		    	break;
			  //  		  		    case 4:




			  //  		  			    break;

			  //  		  		}
					// 	 });
					// 	doc.checkMsg('Saved!');
					// 	browser.sleep(10000)
					// });

			
				});
				
	        })(i,groupName[i],groupButton[i]);
		}
		
	});
});