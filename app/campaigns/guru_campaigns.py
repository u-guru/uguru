from campaign_utils import convertHTMLtoTextMode

### Generates templates to send through mandrill

## Target audience -> Berkeley gurus w/ total earned
def berkeleyCampaignOneTemplate(recipient_dict):
    user_dict = dict(recipient_dict)
    first_name = recipient_dict['first_name']   
    total_earned = recipient_dict['total_earned']
    balance = recipient_dict['balance']
    course_one = recipient_dict['course_one']
    course_two = recipient_dict['course_two']
    subject = "checking in - are you still around %s?" % first_name.lower()
    html_body = """
    Hey %s! 
    <br><br><br>
    Hope you've been well -- and I could use your help assisting Cal students with %s. Are you still down to tutor this finals season? 
    <br><br>
    Also... you still have $%s in your account that you can cash out right now!
    <br><br>
    Lmk if you're still interested -- I'll have to give you an access code to reactivate your account.
    <br><br><br><br>
    Samir<br>
    Chief Guru @<a href='https://uguru.me' target='_blank'>uguru</a>
    <br>
    <br>
    send from iphone, iApologize for typos
    """ % (first_name, course_one, balance)


def berkeleyCampaignTwoTemplate(recipient_dict):
    user_dict = dict(recipient_dict)
    first_name = recipient_dict['first_name']   
    total_earned = recipient_dict['total_earned']
    balance = recipient_dict['balance']
    course_one = recipient_dict['course_one']
    course_two = recipient_dict['course_two']

    subject = "checking in - are you still around %s?" % first_name.lower()
    html_body = """
    Hey %s! 
    <br><br><br>
    Hope you've been well -- and I could use your help assisting Cal students with %s. Are you still down to tutor this finals season? 
    <br><br>
    With the $%s dollars earned last year on the platform, I feel like you'll do great + you'll need a generated access code to reactivate your old account. 
    <br><br>
    lmk if you're still interested. 
    <br><br><br><br>
    Samir<br>
    Chief Guru @<a href='https://uguru.me' target='_blank'>uguru</a>
    <br>
    <br>
    send from iphone, iApologize for typos
    """ % (first_name, course_one, total_earned)



    return html_body, subject
