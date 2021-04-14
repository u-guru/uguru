import requests
def create_mailing_list(university):
    university_id = university.id
    university_name = university.name.replace(' ', '_')
    university_population = university.population
    return requests.post(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'address': '%s@nationalacademicresearch.org'% university_name,
              'description': "name:%s|id:%d|population:%d|sent:0" % (university.name, university_id, university_population),
              'access_level': "everyone"})

def add_students_to_mailing_list(university_name, student_objs):
    import json
    university_list_address = format_university_name_for_mandrill(university_name)
    standard_keys = ['name', 'email', 'gender', 'year', 'type', 'phone', 'major','first_name','last_name']
    # validate dictionary
    mailgun_formatted_arr = []
    for student_obj in student_objs:
        for key in student_obj.keys():
            if key not in standard_keys:
                raise

        mailgun_formatted_arr.append({
                'name': student_obj.get('name'),
                'address': student_obj.get('email'),
                'vars': student_obj
            })

    print 'adding', len(mailgun_formatted_arr), 'to', university_name
    return requests.post(
        "https://api.mailgun.net/v2/lists/%s/members.json" % university_list_address,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'upsert': True,
              'members': json.dumps(mailgun_formatted_arr)})

def get_all_university_progress():
    import json
    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        )
    arr = json.loads(response.text)
    print '\n\n ========= University Scraping Progress ========== \n\n'
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        uni_population = float(description_parsed[2].split(':')[1])
        percentage = int(count / (uni_population * 1.0) * 100)
        print uni_name, ' || ', str(int(count)) + ' out of ' + str(int(uni_population)) + ' students',' || ', str(percentage) + '% complete'

def get_university_progress(university_name):
    university_list_address = format_university_name_for_mandrill(university_name)
    response = get_mailgun_list_info(university_list_address)
    print response

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

def format_university_name_for_mandrill(name):
    name = name.lower().replace(' ', '_')
    address = name + '@nationalacademicresearch.org'
    return address


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

if __name__ == "__main__":
    get_all_university_progress()



# print count
