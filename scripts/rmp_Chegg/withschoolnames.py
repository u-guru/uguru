import tor_client, json
 
SCHOOLS = [{"id": 742, "name": "oregon-state-university"}, {"id": 775, "name": "portland-state-university"}, {"id": 1074, "name": "university-of-irvine"}]
 
def get_school_url(id):
        return "http://search.mtvnservices.com/typeahead/suggest/?solrformat=true&rows=2000&q=%2A%3A%2A+AND+schoolid_s%3A" + str(id) + "&defType=edismax&qf=teacherfullname_t%5E1000+autosuggest&bf=pow%28total_number_of_ratings_i%2C2.1%29&sort=total_number_of_ratings_i+desc&siteName=rmp&start=0&fl=pk_id+teacherfirstname_t+teacherlastname_t+total_number_of_ratings_i+averageratingscore_rf+schoolid_s"
       
def get_teacher_url(id):
        return "http://www.ratemyprofessors.com/paginate/professors/ratings?tid=" + str(id) + "&page=1"
       
if __name__ == '__main__':     
        for school in SCHOOLS:
                teacher_ids = []
               
                url = get_school_url(school["id"])
               
                response = json.loads(tor_client.get(url).text)["response"]["docs"]
               
                for teacher in response:
                        teacher_ids.append(teacher["pk_id"])
                       
                class_frequencies = {}
                       
                for teacher in teacher_ids:
                        url = get_teacher_url(teacher)
                       
                        response = json.loads(requests.get(url).text)["ratings"]
                       
                        for rating in response:
                                class_name = rating["rClass"].replace(' ', '')
                       
                                try:
                                        frequency = class_frequencies[class_name]
                                except KeyError:
                                        frequency = 0
                                       
                                frequency += 1
                                       
                                class_frequencies[class_name] = frequency
                               
                with open(school["name"] + ".json", 'w') as outfile:
                        json.dump(class_frequencies, outfile)
               
                print("Information dumped to " + school["name"] + ".json")