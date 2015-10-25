var Support = function()
{
	this.Message = $('.intercom-comment-body.intercom-embed-body');
	this.SupportWindow = $('.intercom-sheet-content-container')
	this.OpenSupport = function()
	{
		$('.intercom-launcher-button').click()
		dv.wait(EC.visibilityOf(this.SupportWindow),4000)

	}
	this.sendMessage = function(msg)
	{
		$$('textarea').get(1).sendKeys(msg);
		$$('textarea').get(1).sendKeys(protractor.Key.ENTER);
		dv.wait(EC.visibilityOf(this.Message),4000)
		expect(this.Message.getText()).toBe(msg);
	};

};

module.exports = new Support();
