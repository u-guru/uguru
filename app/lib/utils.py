def send_support_email(sender_email, sender_contents, args=None):
    import mandrill
    MANDRILL_API_KEY = os.environ['MANDRILL_PASSWORD']
    mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)

    user_first_name = user.name.split(" ")[0]
    html = student_packages_html(user_first_name)
    to_emails = []
    to_emails.append({
        'email':user.email,
        'name':user.name,
        'type': 'to'
    })

    message = {
        'html':html,
        'subject': user_first_name + ', save at least $5 on your next ' + skill_name + ' session with ' + tutor_name,
        'from_email': 'samir@uguru.me',
        'from_name': 'Samir from uGuru',
        'to': to_emails,
        'headers': {'Reply-To': 'samir@uguru.me'},
        'important': True,
        'track_opens': True,
        'track_clicks': True,
        'preserve_recipients':False,
        'tags':['student-packages']
    }

    result = mandrill_client.messages.send(message=message)

def js_date_to_python_datetime(js_date):
    if not js_date: return None
    from datetime import datetime
    return datetime.fromtimestamp(int(js_date)/1000.0)

def python_datetime_to_js_date(py_date):
    import time
    return (time.mktime(py_date.timetuple()) * 1000)

def check_user_agent_desktop(mobile_boolean):
    return not mobile_boolean


def pretty_date(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    """
    from datetime import datetime
    now = datetime.now()
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time,datetime):
        diff = now - time 
    elif not time:
        diff = now - now
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "just now"
        if second_diff < 60:
            return str(second_diff) + " seconds ago"
        if second_diff < 120:
            return  "a minute ago"
        if second_diff < 3600:
            return str( second_diff / 60 ) + " minutes ago"
        if second_diff < 7200:
            return "an hour ago"
        if second_diff < 86400:
            return str( second_diff / 3600 ) + " hours ago"
    if day_diff == 1:
        return "Yesterday"
    if day_diff < 7:
        return str(day_diff) + " days ago"
    if day_diff < 31:
        return str(day_diff/7) + " weeks ago"
    if day_diff < 365:
        return str(day_diff/30) + " months ago"
    return str(day_diff/365) + " years ago"