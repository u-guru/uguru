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

def create_mailing_list_json(university):
    university_id = university['id']
    university_name = university['name'].replace(' ', '_')
    university_population = str(university['population'])
    university_rank = university['rank']
    return requests.post(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'address': '%s@nationalacademicresearch.org'% university_name,
              'description': "name:%s|id:%d|population:%s|sent:0|rank:%d|scrapable:%s" % (university['name'], university_id, university_population, university_rank, "true"),
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

    print 'adding', len(mailgun_formatted_arr), 'to', university_name
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
    print arr['items'][0]['address']
    print '\nretrieving ...\n'
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        uni_population = float(description_parsed[2].split(':')[1])
        percentage = int(count / (uni_population * 1.0) * 100)
        if count > 0:
            results_arr.append({'name': uni_name,'count': count})
        else:
            no_results_arr.append({'name': uni_name,'count': count, 'address':list_info['address']})
        # print uni_name, ' || ', str(int(count)) + ' out of ' + str(int(uni_population)) + ' students',' || ', str(percentage) + '% complete'

    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'skip':100}
        )

    arr = json.loads(response.text)
    print '\nretrieving ... ...\n'
    print len(arr['items'])
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        uni_population = float(description_parsed[2].split(':')[1])
        percentage = int(count / (uni_population * 1.0) * 100)
        if count > 0:
            results_arr.append({'name': uni_name,'count': count})
        else:
            no_results_arr.append({'name': uni_name,'count': count, 'address':list_info['address']})
        # print uni_name, ' || ', str(int(count)) + ' out of ' + str(int(uni_population)) + ' students',' || ', str(percentage) + '% complete'


    response = requests.get(
        "https://api.mailgun.net/v2/lists",
        auth=('api', 'key-bfe01b1e2cb76d45e086c2fa5e813781'),
        data={'skip':200}
        )

    arr = json.loads(response.text)
    print '\nretrieving ... ... ...\n\n'
    print len(arr['items'])
    for list_info in arr['items']:
        count = float(list_info['members_count'])
        description = list_info['description']
        description_parsed = description.split('|')
        uni_name = description_parsed[0].split(':')[1]
        uni_id = description_parsed[1].split(':')[1]
        uni_population = float(description_parsed[2].split(':')[1])
        percentage = int(count / (uni_population * 1.0) * 100)
        if count > 0:
            results_arr.append({'name': uni_name,'count': count})
        else:
            no_results_arr.append({'name': uni_name,'count': count, 'address':list_info['address']})
        # print uni_name, ' || ', str(int(count)) + ' out of ' + str(int(uni_population)) + ' students',' || ', str(percentage) + '% complete'

    if results_arr:
        results_arr = sorted(results_arr, key=lambda r:r['count'], reverse=True)
        print '# of universities with emails:', len(results_arr), '\n'
        index = 1
        for result in results_arr:
            print '#%d. %s has %d students' % (index, result['name'], result['count'])
            index+=1
    return results_arr, no_results_arr


def get_university_progress(university_name):
    university_list_address = format_university_name_for_mandrill(university_name)
    response = get_mailgun_list_info(university_list_address)
    print response



if __name__ == "__main__":
    import json
    all_unis = json.load(open('fa15_all.json'))
    to_avoid = [170, 140, 17, 146, 156, 26]
    for university in all_unis:
        if university['rank'] not in to_avoid:
            print university['name']
            create_mailing_list_json(university)



