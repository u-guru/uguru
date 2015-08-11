 describe('Role-select',function()
 {
	var onboarding_one = element(by.id('E2E-onboarding-1'));
	var onboarding_two = element(by.id('E2E-onboarding-2'));
	var student = element(by.cssContainingText('option', 'student'));
 	var professional = element(by.cssContainingText('option', 'professional'));
 	var HSstudent = element(by.cssContainingText('option', 'HS student'));
 	var roleSelect = element(by.id('role-select'));

	beforeAll(function()
   	 {
		 browser.actions()
		.mouseDown(onboarding_one)
		.mouseMove(onboarding_two)
		.mouseUp()
		.perform();
    });
    it('select student', function () {
		student.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();

    });
    
    it('select professional', function () {
		professional.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();
	});
    
    it('select HS student', function () {
	 	HSstudent.click();     
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeTruthy();

    });
    it('select student', function () {
		student.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();

    });
	 it('select student', function () {
		student.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();

    });
    it('select professional', function () {
		professional.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();
	});
    
    it('select HS student', function () {
	 	HSstudent.click();     
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeTruthy();

    });
 	it('select professional', function () {
		professional.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();
	});
   
    it('select HS student', function () {
	 	HSstudent.click();     
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeTruthy();

    });
  	it('select professional', function () {
		professional.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();
	});
   it('select HS student', function () {
	 	HSstudent.click();     
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeTruthy();

    });
      it('select HS student', function () {
	 	HSstudent.click();     
		expect(element(by.id('E2E-student')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeTruthy();

    });
	 it('select student', function () {
		student.click();
		expect(element(by.id('E2E-student')).isDisplayed()).toBeTruthy();
		expect(element(by.id('E2E-prof')).isDisplayed()).toBeFalsy();
		expect(element(by.id('E2E-hs')).isDisplayed()).toBeFalsy();

    });

 });