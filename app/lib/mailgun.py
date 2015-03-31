import requests
def create_mailing_list(university):
    return requests.post(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'address': '%s@nationalacademicresearch.org'% university,
              'description': "%s university list" % university,
              'access_level': "everyone"})

def format_json_to_mailgun_member_format(arr_email_info, university):
    import json
    new_arr_email_info = []
    for email_info in arr_email_info:

        if email_info.get('email'):
            new_arr_email_info.append({
                "name": email_info["name"],
                "address": email_info["email"],
                "description": "%s student" % university,
                "vars": email_info
                })
    return new_arr_email_info

def get_mailgun_list_info(list_name):
    return requests.get(
        "https://api.mailgun.net/v2/lists/%s" % list_name,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'))

def put_mailgun_list_info():
    return requests.put(
        "https://api.mailgun.net/v2/lists/virginia@nationalacademicresearch.org",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={"access_level":"everyone"})

def put_mailgun_list_info():
    return requests.put(
        "https://api.mailgun.net/v2/lists/virginia@nationalacademicresearch.org",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={"access_level":"everyone"})


def add_members_from_arr(arr):
    formatted_arr = format_json_to_mailgun_member_format(arr, "university_of_virginia")

    return requests.post(
        "https://api.mailgun.net/v2/lists/virginia-already-sent@nationalacademicresearch.org/members.json",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'upsert': True,
              'members': json.dumps(formatted_arr)})

def add_members_from_file(file_name):
    import json
    file_arr = open(file_name)
    arr = json.load(file_arr)
    arr = arr[5000:6000]
    university = file_name.split('.')[0]
    formatted_arr = format_json_to_mailgun_member_format(arr, university)

    return requests.post(
        "https://api.mailgun.net/v2/lists/virginia@nationalacademicresearch.org/members.json",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'upsert': True,
              'members': json.dumps(formatted_arr)})


def check_member_in_list(email, _list):
    return requests.get(
        ("https://api.mailgun.net/v2/lists/%s@nationalacademicresearch.org/members"
         "/%s"%(_list, email)),
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'))

def delete_member_in_list(email, _list):
    return requests.delete(
        ("https://api.mailgun.net/v2/lists/%s@nationalacademicresearch.org/members"
         "/%s"%(_list, email)),
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'))

def list_members(_list):
    return requests.get(
        "https://api.mailgun.net/v2/lists/%s@nationalacademicresearch.org/members" %_list,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'limit':100})

def get_n_list_members(num):
    from time import sleep
    import json
    hundred_chunks = (num / 100) + 1
    total_members = []
    for _ in range(0, hundred_chunks):
        raw = list_members('virginia')
        parsed = json.loads(raw.content)
        total_members += parsed['items']
        print len(total_members), 'added so far'
        sleep(2)

    total_members = total_members[0:num]
    print len(total_members), 'returned'

    final_total_members = []
    for recipient in total_members:
        final_total_members.append({
            'email': recipient['address'],
            'name': recipient['name'].split(' ')[1]
        })

    return final_total_members




# print count
