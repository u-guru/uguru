




describe('Guru Creditability] Test', function () {

	var ele = element.all(by.tagName("ion-slide"));
	beforeAll(function()
	{
		browser.get("http://"+localhost+":8100/#/guru-credibility")
		// console.log("contexts : ", JSON.stringify(browser.driver.contexts()));
	});
	it("Check It is right address",function()
	{
		expect(browser.getCurrentUrl()).toContain("/#/guru-credibility");



	});
	it('should be able to use wdBrowser ', function (done) {

	  wdBrowser.title().then(function (title) {
	    expect(title).toEqual('AngularJS — Superheroic JavaScript MVW Framework');

	  }).nodeify(done);
	});

	describe("Check all Creditability Page",function()
	{	
		var groupName  = ['TRANSCRIPT','FACEBOOK','PHONE','EMAIL','EXPERIENCE']
		var groupButton = ['transcript','Facebook','number','Email','Item']
		// beforeEach(function()
		// {
		// });
		for(var i = 2; i < 3 ; ++ i)
		{
			(function(index,title,buttonName)
			{
				describe('Test FeAattures : '+title , function()
				{
					it('Click : '+ title,function()
					{
						doc.newPickList('credit-slider',index);

					});
					
					describe('[ Incompleted ] Check Feattures functional : Add '+ buttonName,function()
					{
							it('click Button',function()
							{
								element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
									expect(items[index].getText()).toContain(buttonName);
									if (index != 0 )
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
				   		  		    describe('[Incompleted]Facebook Test',function()
				   		  		    {
				   		  		    	it('Login Facebook',function()
				   		  		    	{
				   		  		    		expect(true).toBe(false,"Facebook Can't Not Be Test");
											//doc.connectFB("jason_dhcxgww_huang@tfbnw.net","jasonhuang1");
											//doc.checkMsg("Saved!");
											;
				   		  		    	});
				   		  		    });
			   		  		        break;
			   		  	        case 2:
	  	           		  		    describe('Phone Number Test',function()
	  	           		  		    {
  	  		       // 		  		    	it('close Wrapper',function()
  	  		       // 		  		    	{
  											 // doc.openWrapper('close');

  	  		       // 		  		    	});

  	  		       // 		  		    	it('Open  Wrapper',function()
  	  		       // 		  		    	{
  	  		       // 		  		    		element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
  	  		       // 		  		    			expect(items[index].getText()).toContain(buttonName);
  	  		       // 		  		    			if (index != 0 )
  	  		       // 		  		    				items[index].click();
  	  		       // 		  		    		});
  	  		       // 		  		    	});
	  	           		  		    	it('Enter Empty Number',function()
	  	           		  		    	{
				   		  	        	    doc.openWrapper('asdff');
	  	           		  		    	});
	  	        //    		  		    	it('Enter Number : asdff',function()
	  	        //    		  		    	{
	  	        //    		  		    		expect(true).toBe(false,"Not Completed Yet,Alert Message");

				   		  	//        			// doc.openWrapper('');

	  	        //    		  		    	});
	  	        //    		  		    	it('Enter Number : 123456789',function()
	  	        //    		  		    	{
	  	        //    		  		    		// expect(true).toBe(false,"Not Completed Yet,Alert Message");

											 // doc.openWrapper('123456789')
											 // doc.checkMsg('Saved!');

	  	        //    		  		    	});
	  	           		  		    });
			   		  	       		break;
			   		  		    case 3:
	  		       		  		    describe('Email Test',function()
	  		       		  		    {

	  		       // 		  		    	it('close Wrapper',function()
	  		       // 		  		    	{
											 // doc.openWrapper('close');

	  		       // 		  		    	});

	  		       // 		  		    	it('Open  Wrapper',function()
	  		       // 		  		    	{
	  		       // 		  		    		element.all(by.css('#credibility-content-wrapper button')).then(function (items) {
	  		       // 		  		    			expect(items[index].getText()).toContain(buttonName);
	  		       // 		  		    			if (index != 0 )
	  		       // 		  		    			items[index].click();
	  		       // 		  		    		});
	  		       // 		  		    	});

	  		       		  		   	    it('Enter Empty Email',function()
	  	           		  		    	{
	  	           		  		    		expect(true).toBe(false,"Not Completed Yet,Alert Message");
		    	   		  	        		//doc.openWrapper('asdff');

	  	           		  		    	});
	  	           		  		    	it('Enter Email : asdff',function()
	  	           		  		    	{
	  	           		  		    		expect(true).toBe(false,"Not Completed Yet,Alert Message");
		    	   		  	        		//doc.openWrapper('');

	  	           		  		    	});
	  	           		  		    	it('Enter Email : 123456789',function()
	  	           		  		    	{
	  	           		  		    		expect(true).toBe(false,"Not Completed Yet,Alert Message");
		       		  	        			// doc.openWrapper('123456789')

	  	           		  		    	});

  	           		  		    		it('Enter Email : 123456789',function()
	  	           		  		    	{
	  	           		  		    		expect(true).toBe(false,"Not Completed Yet,Alert Message");
		       		  	        			//  doc.openWrapper('jason@sjsu.edu');
		       		  	        			//  doc.checkMsg('Saved!');
	  	           		  		    	});
	  		       		  		    });
			   		  		    	break;
			   		  		    case 4:
	  		       		  		    describe('EXPERIENCE Test',function()
	  		       		  		    {
	  		       		  		    	it('Check Title is Correct',function()
	  		       		  		    	{
	  		       		  		    		expect(element.all(by.css('.modal-backdrop.active h1')).last().getText()).toBe("YEARS OF EXPERIENCE","Wrong Page Title");
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
	  		    					
  		    								    // browser.touchActions()
  		    								    // 	.mouseDown(element(by.css('.modal-backdrop.active input')))
		    								      //   .mouseMove({x: 200, y: 0}) // try different value of x
		    								      //   .mouseUp()
		    								      //   .perform();

		    								    browser.actions()
		    								      .mouseMove(element(by.css('.modal-backdrop.active input')), {x: 100, y: 0})
		    								      .click()
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
	  		    	   		  		    	it('Check Experience Is Added',function()
  		    	   		  		    		{
  		    	   		  		    			element(by.repeater('experience in user.guru_experiences').isPresent()).toBe(true, "List is not Added Yet");
  		    	   		  		    		});
	  		       		  		    	});	  		 
	  		       		  		    });
	  		       		  		    break;		
  		       		  		}
					});
				});
				
	        })(i,groupName[i],groupButton[i]);
		}
		it("test1",function()
		{
	 		browser.wait(EC.alertIsPresent(), 4000,"test");
		});
		it("test2",function()
		{
			
   		    var alertDialog = browser.switchTo().alert();
   		    // var alertDialog = browser.switchTo().alert();
   		    expect(alertDialog).toBeDefined();
   		    expect(alertDialog.getText()).toBe("HI");
   		    // console.log('Object alertDialog : ' , Object.keys(alertDialog));
   		    // console.log('alertDialog : ', alertDialog);
   		    // alertDialog.cancel(); 
   		    // alertDialog.cancel(); 
   		    // alertDialog.cancel(); 	
   		    // alertDialog.sendKeys(protractor.Key.ENTER);


		});
		it("test2-1",function()
		{
			  driver.switchTo().alert().accept();
		});
		it("test2-2",function()
		{
			
			    var alertDialog = browser.switchTo().alert();	
			    alertDialog.sendKeys(protractor.Key.ENTER);

		});
		it("test2-3",function()
		{
			// expect(browser.touchActions).toBeDefined();
			// browser.touchActions
			// 		.tap_and_hold(,)
			// 		.perform();
			var alert = wdBrowser.switchTo().alert();
			console.log('Object Switch : ' , Object.keys(alert));
			console.log('Switch : ', alert);
			alert.accept();
		});
	
		it("test3",function()
		{
   		    browser.sleep(10000);

   		    var alertDialog = browser.switchTo().alert();
   		    // var alertDialog = browser.switchTo().alert();
   		    expect(alertDialog).toBeDefined();
   		    
   		    alertDialog.then(function(alert) {
   		      // console.log(JSON.stringify(alert));
  			   console.log('Object alertDialog : ' , Object.keys(alert));
   		       console.log('alertDialog : ', alert);

   		      return alert.accept();
   		    });
		});
	});
});