from campaign_utils import convertHTMLtoTextMode

### Generates templates to send through mandrill

## Target audience -> Berkeley gurus w/ total earned
def berkeleyCampaignOneTemplate(recipient, most_frequent_course):
    user_first_name = user.getFirstName().lower()
    subject = "checking in - are you still around %s?" % user_first_name
    html_body = """
    Hey %s,

    Just wanted to personally reach out and thank you for your patience.
    The next version is ready and we hope you're still around to try it first.

    You'll need a generated access code to reactivate your old account, which
    is one of the top 100 ranked accounts with $%s dollars earned.

    Are you still interested in tutoring %s, or %s this finals season?

    Best,
    --
    Samir
    Chief Guru
    """ % (user_first_name, user.total_earned, user.guru_courses[0], user.guru_courses[1])
    return html_body, subject


