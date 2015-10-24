var Home = function()
{
	// this.SchoolSearchBar = dv.findElement(by.id('search-bar'));
	this.DefaultSchoolList = $$('#search-results li')
	this.SchoolSearchBar = $('#search-bar');
	this.FirstSchool = $$('#search-container span').get(2)
	this.schoolBanner = $('#top-school-logo')
	this.SearchSchool = function (name)
	{
		this.SchoolSearchBar.sendKeys(name);
	}
	this.ChooseDefaultUniversity = function(index) 
	{
		// this.DefaultSchoolList.get(index).click();
		dv.wait(EC.visibilityOf(this.FirstSchool),4000)
		this.FirstSchool.click();
	}
	this.checkImgSize = function (element,width,height)
	{

		element.getSize().then(function(size)
		{
			expect(size.width).toBe(width,"Width not match");
			expect(size.height).toBe(height,"Height not match");
		});


	}
	this.checkLocation = function (element,x,y)
	{

		element.getLocation().then(function(loc)
		{
			expect(loc.x).toBe(x,"x not match");
			expect(loc.y).toBe(y,"y not match");
		});


	}
};

module.exports = new Home();
