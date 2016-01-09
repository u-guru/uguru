

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
        popularity: 10,
        answer: "Yes"
      },
      {
        question: "Do Gurus edit my content anonymously?",
        popularity: 10,
        answer: "Yes - unless you choose Option 1 on pricing, where we leave it up to you guys to reveal identities"
      },
      {
        question: "What payment forms do you support?",
        popularity: 10,
        answer: "We take all popular credit cards, domestically and internationally"
      },
      {
        question: "Can other college applications see any of my uploaded content (i.e. college essays)?",
        popularity: 10,
        answer: "Absolutely not. We take privacy very seriously and can assure you that your data is safe with us."
      },
      {
        question: "Can I request help anonymously?",
        popularity: 10,
        answer: "You remain anonymous by default. However, our signup still requires your full name and email."
      },
      {
        question: "How can I increase my chances to be connected with a college Guru?",
        popularity: 10,
        answer: "Provide detailed description of what you need help in. If you are not sure, try our live customer support."
      },
      {
        question: "I am not 100% happy with my experience - can I request a refund?",
        popularity: 10,
        answer: "Absolutely, we will dispute the situation from both sides."
      },
      {
        question: "Can I request for a college Guru to rewrite parts of my essay?",
        popularity: 10,
        answer: "This is strictly against our policy. Any violation or attempts to do so will result in a de-activated account. We do not tolerate cheating, just like the university you are applying to."
      },
      {
        question: "Do you sell my content to third party services?",
        popularity: 10,
        answer: "Absolutely not. We respect your privacy and have no future plans to share any sensitive content."
      },
      {
        question: "I'm applying for many different special scholarships, including athletics, honors, and minorities. I need these to be able to afford college. Can I clarify this when I request help?",
        popularity: 10,
        answer: "Yes. For Gurus that have used the exact same key terms in their description, we'll immediately let them know and connect you immediately if they are available."
      }
    ];

    var timeline = {

    }

    var honorPledge = [
      {content: "I will not request that any portion of my work be rewritten by a Guru."},
      {content: "I understand that if I do, I risk immediately losing access to my Uguru account."},
      {content: "All of the work I'm submitting for feedback is my work and my work only."},
      {content: "I understand that Uguru's services may not result in acceptance to any school."},
      {content: "I understand that addicting usage of Uguru may result in cancer."}
    ]

    //MVP
    var affordability_modal = {

    }


    var sophisticated_modal = {

    }

    var parents = {

    }

    var generateUniversitySpecificBecomeGuruText = function(university) {
      return{
          header: "The Most Flexible Part-Time",
          top_half: [{
              icon: "Profile Card",
              header: "Full Stack Profile",
              tag: 'See Preview',
              content: "A platform where you come first. Complete control over your profile. Customize, set prices, bill others",
            },
            {
              icon: "Chart icon",
              header: "Analytics & Promotion Tool",
              tags: 'See Preview',
              content: "Digital marketing kits, business cards, high quality graphics and much more.",
            },
            {
              icon: "credit card",
              header: "Your own payment portal",
              content: "Money goes straight to your bank account. Send an invoice to whoever, whenever",
            },
          ],
          bottom_half:[
            {
              icon: "Profile Card from Guru Onboarding",
              header: "Have Multiple Profiles for Multiple Skills",
              content: "Create an academic shop for course-related skills, photography shop to earn from grad photos, tech shop for iPhone repair..",
            },
            {
              icon: "Credit Card",
              header: "Zero Transaction Fees",
              tag: 'See Preview',
              content: "Earn your first $500 within a month & then we'll discuss business partnerships and monthly subscriptions. You come first.",
            },
            {
              icon: "",
              header: "Work anytime, anywhere, even in your PJs",
              content: "Toggle a switch on when you are available to earn side cash, and we'll market you. Focus on great quality, we'll take care of the rest",
            },
          ]
        };

    }
    var generateUniversitySpecificHowItWorks = function(university) {
      return {header: "Earn Sidecash + Help Your Peers Succeed",
        top_half: [{
              icon: "https://d30y9cdsu7xlg0.cloudfront.net/noun-svg/136434.svg?Expires=1452346781&Signature=XHvIEw8pDw4Vhg6IZyEBf6b0sdgJAES~RTwxXPP-OEWaZhltzurLkFh6KdPWho4KLsx~UAdV53kNVLu9NX5pcOxrCg3cjQaImlFdIIXnWq8Am2PIKGbcHzhJnDknu5QLCzaEJc-xD8mqk-wy7hNRWUAaKUx~ioHzHQGXLMZuPBA_&Key-Pair-Id=APKAI5ZVHAXN65CHVU2Q",
              header: "24/7, Anytime, Anywhere",
              tag: null,
              content: "Request course help @7am, or request a midnight snack at 11pm. Trust me, one of your peers " + ((university.short_name && ' ') || '') + 'is up',
            },
            {
              icon: "https://d30y9cdsu7xlg0.cloudfront.net/noun-svg/139071.svg?Expires=1452347225&Signature=V3nefdC-oWx1j2uH6KDrl6m6WAjbyo52B8HPGkYLrRTn6aEgsfvFZyLdQ2XHyJleNGzdMxxFVxjJD2yC2Am8WtlAs9UoFxYsdHCuC2yShQhCHz42zb1MmMjRCs3yKlEmI6ao8I6XFf~Mucv05SJxCXoxXYqLnPzgh--ldy8lluA_&Key-Pair-Id=APKAI5ZVHAXN65CHVU2Q",
              header: "Save $$$ on Academic Help",
              content: "Get help from a quick 5-min question to several hours at super-cheap rates, averaging at $13/hr"
            },
            {
              icon: "https://d30y9cdsu7xlg0.cloudfront.net/noun-svg/14634.svg?Expires=1452347158&Signature=G5XkxjC8k7AqecF6pc0golzfD~X2wftnZxqo8peFvahEILGeEmUMWs-2z6ytl85Iy7sExP0t-x1fTDKAPdFShmipO9JkfTtw3meAgbfOmc1aCGpgmY~S9EgH4p3L7zGrdy7odCt~epR0DrhHsKb4SMklJeWb7a~68PC4cBt3KQU_&Key-Pair-Id=APKAI5ZVHAXN65CHVU2Q",
              header: "Same Course, Same Professor",
              content: "We'll connect you a student who has already aced it recently, and possible the same professor!"
            }
          ],
          bottom_half:[
            {
              svg_url: "shield-lock",
              header: "Stay Organized & Improve Focus",
              tag: 'Coming Soon!',
              content: "Apps to help calculate & project your GPA, + other power-ups coming soon!"
            },
            {
              svg_url: "satisfaction",
              header: "Prepare for Your Career",
              content: "Connect with mentors related to your major, or peers who have your dream internship. They're just one tap away."
            },
            {
              icon: "dollar sign",
              tag: 'Read More',
              header: "Earn Side Cash, Work For Yourself",
              content: "Help your peers in aced courses, your talents, or pretty much anything else"
            },
          ]
        };

    }





    return {
      pricing: pricing,
      faq: faq,
      timeline: timeline,
      generateUniversitySpecificHowItWorks:generateUniversitySpecificHowItWorks,
      generateUniversitySpecificBecomeGuruText:generateUniversitySpecificBecomeGuruText,
      honorPledge: honorPledge,
      parents: parents,
      sophisticated_modal:sophisticated_modal,
      affordability_modal:affordability_modal,
    }

}