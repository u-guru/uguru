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

