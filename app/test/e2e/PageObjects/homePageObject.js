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
	// this.checkImgSize = function (element,width,height)
	// {

	// 	element.getSize().then(function(size)
	// 	{
	// 		expect(size.width).toBe(width,"Width not match");
	// 		expect(size.height).toBe(height,"Height not match");
	// 	});


	// }

	this.checkImgSize = function (ele1,ele2,ratio)
	{


		ele2.getSize().then(function(size)
		{
			var innerW = size.width * ratio;
			var innerH = size.height * ratio;

			ele1.getSize().then(function(value)
			{
				expect(value.width).toBe(innerW,"ele1 width should equal ele2 width* "+ratio*100+"%");
				expect(value.height).toBe(innerH,"ele1 height should equal ele2 height* "+ratio*100+"%");
			});

		});

	}
	this.checkLocationX= function (ele1,ele2)
	{

		// element.getLocation().then(function(loc)
		// {
		// 	expect(loc.x).toBe(x,"x not match");
		// 	expect(loc.y).toBe(y,"y not match");
		// });
		ele2.getLocation().then(function(loc)
		{
			var rightX = loc.x;
			
			ele1.getLocation().then(function(value)
			{
				expect(value.x).toBe(rightX,"ele1.x is not at the same position of ele2");
			});

		});

	}
	this.checkLocationY= function (ele1,ele2)
	{

		ele2.getLocation().then(function(loc)
		{
			var rightY = loc.y;
			
			ele1.getLocation().then(function(value)
			{
				expect(value.y).toBe(rightY,"ele1.y is not at the same position of ele2");
			});

		});

	}
};

module.exports = new Home();
