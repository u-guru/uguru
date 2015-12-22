

angular
	.module('sharedServices')
	.factory("ContentService", [
		ContentService
	]);

function ContentService() {

  return {
    getEssayContent:GetEssayContent()
  }

  function getEssayContent() {

    var pricing = {
      cards: {
        one: {
          header: 'HEADER HEADER HEADER',
          subheader: 'subheader subheader subheader subheader subheader subheader subheader subheader subheader subheader',
          attributes: ['attributes attributes attributes', 'attributes attributes attributes', 'attributes attributes attributes'],
          pricing: 50
        },
        two: {
          header: 'HEADER HEADER HEADER',
          subheader: 'subheader subheader subheader subheader subheader subheader subheader subheader subheader subheader',
          attributes: ['attributes attributes attributes', 'attributes attributes attributes', 'attributes attributes attributes'],
          pricing: 50
        },
        three: {
          header: 'HEADER HEADER HEADER',
          subheader: 'subheader subheader subheader subheader subheader subheader subheader subheader subheader subheader',
          attributes: ['attributes attributes attributes', 'attributes attributes attributes', 'attributes attributes attributes'],
          pricing: 50
        }
      },
      footer: {
        sophisticated: "If you seek something more sophisticated, we have a couple of these left",
        affordability: "if none of these meet your needs or are out of budget, contact us for a quick reply",
      }
    }

    var faq = {

    }

    var timeline = {

    }

    var affordability_modal = {

    }

    var sophisticated_modal = {

    }

    var parents = {

    }

    return {
      pricing: pricing,
      faq: faq,
      timeline: timeline,
      how_it_works: how_it_works,
      parents: parents,
      modal: modal,
      sophisticated_modal:sophisticated_modal,
      affordability_modal:affordability_modal,
    }


  }

}