angular
.module('sharedServices')
.factory("TipService", [
	TipService,
		]);

function TipService() {
    var currentTips = [];

    return {
		generateTips: generateTips,
        currentTips: currentTips
	}

	function generateTips(user) {
        var activeTips = []

        var profile_attributes = getUserRemainingProfileAttr(user);
        var credibility_attributes = getUserRemainingCredibilityAttr(user);

        for (var i = 0; i < profile_attributes.length; i ++) {
            activeTips.push(createTipObject('Add',profile_attributes[i], 'guru-profile', 'enter', activeTips.length + 1))
        }

        for (var j = 0; j < credibility_attributes.length; j ++) {
            activeTips.push(createTipObject('Verify', credibility_attributes[j], 'guru-credibility', 'enter', activeTips.length + 1))
        }

        if (activeTips.length === 0) {
            activeTips.push(generateQuote())
            return activeTips;
        }

        return activeTips.slice(0, 5);
    }

    function getUserRemainingCredibilityAttr(user) {
        var result = [];

        // ask nick - hows this for best practice??
        !user.fb_id && result.push('profile picture');

        (!user.transcript_file || !user.transcript_file_url) && result.push('transcript')

        !(user.guru_experiences && user.guru_experiences.length) && result.push('guru experiences');

        !user.school_email_confirmed && result.push('.edu email');

        !user.phone_number_confirmed && result.push('phone number');
        return result;
    }


    function getUserRemainingProfileAttr(user) {
        var default_url = 'https://graph.facebook.com/10152573868267292/picture?width=100&height=100';
        var result = [];
        if (!user.profile_url || user.profile_url !== default_url) {
            result.push('profile photo')
        }

        if (!user.guru_courses || !user.guru_courses.length) {
            result.push('guru courses')
        }


        if (!user.guru_categories || !user.guru_categories.length) {
            result.push('guru skills')
        }

        // if (!user.guru_experiences || !user.guru_experiences.length) {
        //     result.push('guru experiences')
        // }

        if (!user.guru_languages || !user.guru_languages.length) {
            result.push('spoken languages')
        }

        if (!user.majors || !user.majors.length) {
            result.push('majors')
        }
        return result
    }

    function createTipObject(verb, attribute, state, transition, tip_index) {
        var adj = ['ranking', 'personal wealth', 'guru game', 'swag-ness'];
        randomInt = getRandomInt(adj.length)

        message = 'Fill out your ' + attribute + ' to increase your ' + adj[randomInt] + '!';

        return {
            'title': 'Tip #' + tip_index,
            'message': message,
            'next_state': '^.' + state,
            'action_text': verb + ' my ' + attribute,
            'transition': transition
        }
    }

    function generateQuote() {
        quotes = [
            '',
            '',
            ''
        ]
        var randomInt = getRandomInt(quotes.length)

        return {
            'message': quotes[randomInt],
            'action_text': action_text,
            'state': null,
            'transition': null,
        }
    }

    function getRandomInt(max) {
        //TODO
        return 1;
    }

}
