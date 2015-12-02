from mixpanel import Mixpanel

mp = Mixpanel('a023529351da6a26661d05b4b1bd6758')

def create_mp_profile(user, ip=None):
    init_prof_dict = {
        '$first_name': user.name.split(' ')[0],
        '$last_name': user.name.split(' ')[-1],
        '$email': user.email,
        '$phone': user.phone_number,
        'fb_id': user.fb_id,
        'time_created': user.time_created,
        'profile_url': user.profile_url,
        '$ip': ip,
        'is_admin': user.is_admin
    }
    response = mp.people_set(str(user.id), init_prof_dict)
    return response

def isSandboxMode(email):
    if '@uguru.me' in email or 'example' in email or 'test' in email:
        return True
    return False


def createCampaignUserProfile(unique_id, formatted_dict):
    from pprint import pprint
    formatted_dict['campaign_user'] = True

    formatted_dict['testing'] = isSandboxMode(unique_id)
    print "Final formatted dict to send to mixpanel"
    pprint(formatted_dict)
    response = mp.people_set(unique_id, formatted_dict)
    return response


def parseMandrillPayloadToMixpanel(payload):
    mp_dict = {
        '$email': payload.get('msg').get('email'),
        'time_created': payload.get('ts'),
        '$ip': payload.get('ip'),
        'ua': payload.get('user_agent_parsed'),
        'ua_raw': payload.get('user_agent'),
        'location': payload.get('location'),
        'event_type': payload.get('event') ,
        'click_info': payload.get('click'),
        'open_info': payload.get('opens'),
        'metadata': payload.get('metadata'),
        'is_mobile': payload.get('user_agent_parsed').get('mobile'),
        'email_info': payload.get('msg'),
        'email_id': payload.get('_id'),
    }

    ## format special properties
    if mp_dict.get('metadata') and mp_dict['metadata'].get('name'):
        mp_dict['$name'] = mp_dict['metadata'].get('name')
        mp_dict['$first_name'] = mp_dict['$name'].split(' ')[0].title()
        mp_dict['$last_name'] = mp_dict['$name'].split(' ')[-1].title()
    if mp_dict.get('$email'):
        mp_dict['$distinct_id'] = mp_dict['$email']
    if mp_dict.get('location') and mp_dict['location'].get('city'):
        mp_dict['$city'] = mp_dict['location']['city']
    if mp_dict.get('location') and mp_dict['location'].get('region'):
        mp_dict['$region'] = mp_dict['location']['region']
    if mp_dict.get('location') and mp_dict['location'].get('country_short'):
        mp_dict['$country_code'] = mp_dict['location']['country_short']

    return mp_dict