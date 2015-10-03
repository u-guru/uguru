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

def update_all_mailing_list_description(university, description):
    university_id = university.id
    university_name = university.name.replace(' ', '_')
    university_population = university.population
    return requests.put(
        "https://api.mailgun.net/v2/lists/%s@nationalacademicresearch.org" % university_name,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'address': ''% university_name,
              'description': "name:%s|id:%d|population:%d|sent:0" % (university.name, university_id, university_population),
              'access_level': "everyone"})

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

    return requests.post(
        "https://api.mailgun.net/v2/lists/%s/members.json" % university_list_address,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'upsert': True,
              'members': json.dumps(mailgun_formatted_arr)})

def get_all_university_progress():
    import json
    results_arr = []
    no_results_arr = []
    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781')
        )
    arr = json.loads(response.text)
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        if 'rank' in description:
            list_info['rank'] = description_parsed[-2].split(':')[1]
        else:
            list_info['rank'] = 220
        uni_population = str(description_parsed[2].split(':')[1])
        # percentage = int(count / (uni_population * 1.0) * 100)
        if count > 0:
            results_arr.append({'id':uni_id, 'name': uni_name,'count': count, 'rank': list_info['rank'], 'population':uni_population})
        else:
            no_results_arr.append({'name': uni_name,'count': count, 'rank': list_info['rank'], 'population':uni_population})

    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'skip':100}
        )

    arr = json.loads(response.text)
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        if 'rank' in description:
            list_info['rank'] = description_parsed[-2].split(':')[1]
        else:
            list_info['rank'] = 220
        uni_population = str(description_parsed[2].split(':')[1])
        # percentage = int(count / (uni_population * 1.0) * 100)
        if count > 0:
            results_arr.append({'id':uni_id, 'name': uni_name,'count': count, 'rank': list_info['rank'], 'population':uni_population})
        else:
            no_results_arr.append({'name': uni_name,'count': count, 'rank': list_info['rank'], 'population':uni_population})


    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'skip':200}
        )

    arr = json.loads(response.text)
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        if 'rank' in description:
            list_info['rank'] = description_parsed[-2].split(':')[1]
        else:
            list_info['rank'] = 220
        uni_population = str(description_parsed[2].split(':')[1])
        # percentage = int(count / (uni_population * 1.0) * 100)
        if count > 0:
            results_arr.append({'id':uni_id, 'name': uni_name,'count': count, 'rank': list_info['rank'], 'population':uni_population})
        else:
            no_results_arr.append({'id':uni_id,'name': uni_name,'count': count, 'rank': list_info['rank'], 'population':uni_population})

    if results_arr:
        results_arr = sorted(results_arr, key=lambda r:r['count'], reverse=True)

        # index = 1
        # for result in results_arr:
            # index+=1
        return results_arr


def get_university_progress(university_name):
    university_list_address = format_university_name_for_mandrill(university_name)
    response = get_mailgun_list_info(university_list_address)

def set_university_scraper_value(university_name, scraper_value):
    ## get the most upto-date mailgun description for this university

    mailing_address = university_name.replace(' ', '_').lower() + '@nationalacademicresearch.org'
    mailgunUniversityObj = requests.get(
        "https://api.mailgun.net/v2/lists/%s" % mailing_address,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781')
        )
    import json
    universityDict = json.loads(mailgunUniversityObj.text)
    newDescriptionSplit = universityDict['list']['description'].split(':')
    newDescriptionSplit[-1] = str(scraper_value).lower()
    newDescriptionString = ":".join(newDescriptionSplit)
    response = requests.put(
        "https://api.mailgun.net/v2/lists/%s" % mailing_address,
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'description':newDescriptionString}
        )



if __name__ == "__main__":
    results = get_all_university_progress()



