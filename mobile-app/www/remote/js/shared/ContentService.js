

angular
	.module('sharedServices')
	.factory("ContentService", [
		ContentService
	]);

function ContentService() {


    var pricing = {
      header: "Estimated Pricing",
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

    var faq = [
      {
        question: "Is this college ruled?",
        popularity:10,
        answer: "Yes"
      },
      {
        question: "Gurus edit your content anonymously, unless you choose Option 1 on pricing, where we leave it up to you guys to reveal identities",
        popularity:10,
        answer: "Yes"
      },
      {
        question: "What payment forms do you support?",
        popularity:10,
        answer: "We take all popular credit cards, domestically and internationally"
      },
      {
        question: "Can other college applications see any of my content(i.e. college essays) uploaded?",
        popularity:10,
        answer: "Absolutely not. We take privacy very seriously and can assure you that your data is safe with us."
      },
      {
        question: "Can I request help anonymously?",
        popularity:10,
        answer: "You remain anonymous by default. However, our signup still requires your full name and email."
      },
      {
        question: "How can I increase my chances to be connected with a college Guru?",
        popularity:10,
        answer: "Provide detailed description of what you need help in. If you are not sure, try our live customer support."
      },
      {
        question: "I am not 100% happy with my experience - can I request a refund?",
        popularity:10,
        answer: "Absolutely, we will dispute the situation from both sides."
      },
      {
        question: "Can I request for a College Guru to rewrite parts of my essay?",
        popularity:10,
        answer: "This is strictly against our policy. Any violation or attempts to do so will result in a de-activated account. We do not tolerate cheating, just like the university you are applying to."
      },
      {
        question: "Do you sell my content to third party services?",
        popularity:10,
        answer: "Absolutely not. We respect your privacy and have no future plans to share any sensitive content."
      },
      {
        question: "I'm applying for many special scholarships, athletes, honors, and minorities. I need these to be able to afford college. Can we clarify this when we request help.",
        popularity:10,
        answer: "Yes. For Gurus that have used the exact same key terms in their description, we'll immediately let them know and connect you immediately if they are available."
      }
    ];

    var timeline = {

    }


    //MVP
    var affordability_modal = {

    }


    var sophisticated_modal = {

    }

    var parents = {

    }

    var how_it_works = {
      // to be changed
      header: "Get through the last application sprint successfully",
      top_half: [
        {
          step_number: 1,
          header: "Request Help",
          content: "From last-second essay feedback, to detailed teardowns, to unlimited Q&A with Gurus from your dream school."
        },
        {
          step_number: 2,
          header: "Gurus are instantly contacted",
          content: "We'll send out your request to all Guru's across the nation. Our goal is to match you with the perfect one."
        },
        {
          step_number: 3,
          header: "Match with the perfect Guru",
          content: "We'll send out your request to all Guru's across the nation. Our goal is to match you with the perfect one."
        }
      ],
      bottom_half:[
        {
          header: "You Remain Anonymous",
          content: "From quick essay polishing"
        },
        {
          header: "Satisfaction Guaranteed",
          content: "If your feedback wasn't valuable, we'll closely examine the situation and try to get you a full refund."
        },
        {
          header: "Stay out trouble",
          content: "We do not tolerate requests for re-writing essays. Make the most out of these Guru's valuable time."
        },
      ]
    };

    return {
      pricing: pricing,
      faq: faq,
      timeline: timeline,
      how_it_works: how_it_works,
      parents: parents,
      sophisticated_modal:sophisticated_modal,
      affordability_modal:affordability_modal,
    }

}