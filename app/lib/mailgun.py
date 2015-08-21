import requests
def add_students_to_mailing_list(university_name, student_objs):
    import json
    university_list_address = format_university_name_for_mandrill(university_name)
    standard_keys = ['name', 'email', 'gender', 'year', 'type', 'phone', 'major']
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

