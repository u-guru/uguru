angular.module('uguru.rest')
.factory('Content', ['Restangular',
    function(Restangular) {


        var Content;
        Content = {
            getAll: function() {
                return getAllContent();
            }
        }

        return Content;
    }
]);


function getAllContent(user) {

    return [
        {
            sidebar_title: "How to be the #1 Guru",
            header: "Popular Use Cases",
            paragraphs: [
                {
                    subheader: "Simpler Payments",
                    text: "Payments go straight to your bank. Zero transaction fees. You keep 100% of the money you earned. After all - you deserve it."
                },
                {
                    subheader: "Full Control",
                    text: "Your profile highlights you and doesn’t look like every other Guru who specializes in different skills. "
                },
                {
                    subheader: "Convenient",
                    text: "All your student conversations are in one place instead of old text conversations, FB messenger, or archived emails. "
                },
                {
                    subheader: "Flexibility",
                    text: "You've tutored regular hours, but prefer to turn on a switch when you feel like it."
                },
                {
                    subheader: "Just Easier",
                    text: "You’re lazy or deserve to be lazy. Let us market you. We’ll do the work while you focus on quality assistance."
                }
            ]
        },
        {
            sidebar_title: "Use Cases",
            header: "Popular Use Cases",
            paragraphs: [
                {
                    subheader: "Simpler Payments",
                    text: "Payments go straight to your bank. Zero transaction fees. You keep 100% of the money you earned. After all - you deserve it."
                },
                {
                    subheader: "Full Control",
                    text: "Your profile highlights you and doesn’t look like every other Guru who specializes in different skills. "
                },
                {
                    subheader: "Convenient",
                    text: "All your student conversations are in one place instead of old text conversations, FB messenger, or archived emails. "
                },
                {
                    subheader: "Flexibility",
                    text: "You've tutored regular hours, but prefer to turn on a switch when you feel like it."
                },
                {
                    subheader: "Just Easier",
                    text: "You’re lazy or deserve to be lazy. Let us market you. We’ll do the work while you focus on quality assistance."
                }
            ]
        },
        {
            sidebar_title: "How pricing works",
            header: "0% Transaction Fees. SRS",
            paragraphs: [
                {
                    subheader: "We've tutored before and 20% makes us puke",
                    text: "Our priorities are to make you happy & making <i> at least </i> hundreds on a weekly basis, before we propose pricing plans."
                },
                {
                    subheader: "What if we don't like the new model?",
                    text: "Then we have failed you ultimately, and will work towards a different model."
                },
                {
                    subheader: "How do you plan to monetize?",
                    text: "A freemium, subscription model of $X dollars per month when you make over $Y per week, where $Y >= $100 and $X is fixed and less than 5% of $Y."
                },
                {
                    subheader: "What if we don't make $Y per week?",
                    text: "Then you will not be charged, even if it's a couple cents under. In that case, we have failed you ultimately as well! :P. Same applies for 100% satisfaction, or money back guarantee."
                },
                {
                    subheader: "What are some premium features?",
                    text: "We're not sure yet, but we can assure you that you will still be able to communicate, accept payments, and self-promote your profile without subscription. A lot of the features with subscription will enhance your profiles & drive more fresh eyes to your profile."
                }
            ]
        },
        {
            sidebar_title: "Frequently Asked Questions",
            header: "FAQS",
            paragraphs: [
                {
                    subheader: "We've tutored before and 20% makes us puke",
                    text: "Our priorities are to make you happy & making <i> at least </i> hundreds on a weekly basis, before we propose pricing plans."
                },
                {
                    subheader: "What if we don't like the new model?",
                    text: "Then we have failed you ultimately, and will work towards a different model."
                },
                {
                    subheader: "How do you plan to monetize?",
                    text: "A freemium, subscription model of $X dollars per month when you make over $Y per week, where $Y >= $100 and $X is fixed and less than 5% of $Y."
                },
                {
                    subheader: "What if we don't make $Y per week?",
                    text: "Then you will not be charged, even if it's a couple cents under. In that case, we have failed you ultimately as well! :P. Same applies for 100% satisfaction, or money back guarantee."
                },
                {
                    subheader: "What are some premium features?",
                    text: "We're not sure yet, but we can assure you that you will still be able to communicate, accept payments, and self-promote your profile without subscription. A lot of the features with subscription will enhance your profiles & drive more fresh eyes to your profile."
                }
            ]
        }
        ,{
            sidebar_title: "Uguru and Chill",
            header: "The feedback zone",
            paragraphs: [
                {
                    subheader: "Bored of making money? You're not the first.",
                    text: "This is a less 'urgent' support. Any thoughts you have that could make your experience better, please let us know. We'll reply within 24 hours - and if you suggest something awesome, we'll absolutely reward you for it."
                }
            ]
        },
        {
            sidebar_title: "24/7 Support",
            header: "FAQS",
            paragraphs: [
                {
                    subheader: "We've tutored before and 20% makes us puke",
                    text: "Our priorities are to make you happy & making <i> at least </i> hundreds on a weekly basis, before we propose pricing plans."
                },
                {
                    subheader: "What if we don't like the new model?",
                    text: "Then we have failed you ultimately, and will work towards a different model."
                },
                {
                    subheader: "How do you plan to monetize?",
                    text: "A freemium, subscription model of $X dollars per month when you make over $Y per week, where $Y >= $100 and $X is fixed and less than 5% of $Y."
                },
                {
                    subheader: "What if we don't make $Y per week?",
                    text: "Then you will not be charged, even if it's a couple cents under. In that case, we have failed you ultimately as well! :P. Same applies for 100% satisfaction, or money back guarantee."
                },
                {
                    subheader: "What are some premium features?",
                    text: "We're not sure yet, but we can assure you that you will still be able to communicate, accept payments, and self-promote your profile without subscription. A lot of the features with subscription will enhance your profiles & drive more fresh eyes to your profile."
                }
            ]
        },

    ]

}