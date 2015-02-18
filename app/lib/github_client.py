#####GITHUB API WRAPPER FUNCTIONS#####
from github import Github

GITHUB_USERNAME = "sam1rm"
GITHUB_PASSWORD = "hustlin1"

UGURU_TEAM = ['Samir', 'Jasmine', 'Anand', 'Rob', 'Umi', 'Geet', 'Shun', 'Varada'];
URGENCY_SCALE = 10

#returns github_user
def init_github():
    g = Github(GITHUB_USERNAME, GITHUB_PASSWORD)
    g_user = g.get_user()
    repo = g_user.get_repo('uguru-mobile')
    return repo

def get_user(client):
    pass

def create_team_contributor_labels(repo):
    for member in UGURU_TEAM:
        contributor_string = 'contributor:' + member
        repo.create_label(contributor_string, '000000')
    print "labels created!"

def create_urgency_labels(repo):
    for num in range(1, 1 + URGENCY_SCALE):
        urgency_string = 'urgency:' + str(num)
        repo.create_label(urgency_string, '000000')

    print "labels created!"

def remove_attr_from_labels(labels):
    stripped_labels = []
    for label in labels:
        #see if it's a special label
        if 'urgency' in label.name.lower() or 'contributor' in label.name.lower():
            continue
        else:
            stripped_labels.append(label)
    return stripped_labels

def get_severity_from_labels(labels):
    for label in labels:
        if 'urgency' in label.name.lower():
            return label.name.split(':')[1]
    return 0

def get_contributor_from_labels(labels):
    for label in labels:
        if 'contibutor' in label.name.lower():
            return label.name.split(':')[1]
    return 'Samir'

def issue_to_json(issue):
    return {
        'time_created': issue.created_at.strftime('%I:%M %p, %a %b %d'),
        'labels': [label_to_json(label) for label in remove_attr_from_labels(issue.labels)],
        'title': issue.title,
        'body': issue.body,
        'severity': get_severity_from_labels(issue.labels),
        'number': issue.number,
        'contributor': get_contributor_from_labels(issue.labels)
    }

def get_issue(repo, number):
    return repo.get_issue(number=number)

def close_issue(issue, comment="team member deleted issue"):
    issue.edit(state="closed")
    issue.create_comment(comment)
    return issue

def label_to_json(label):
    return {
        'name': label.name,
        'color': label.color
    }

def get_issues(repo, state="all"):
    issues = repo.get_issues(state=state)
    return issues

def get_label_by_name(repo, name):
    return repo.get_label(name=name)

def create_issue(repo, labels, title, body):
    label_objs = [get_label_by_name(repo, label) for label in labels]
    new_issue = repo.create_issue(title=title, body=body, labels=label_objs)
    return repo

def get_labels(repo):
    return remove_attr_from_labels(repo.get_labels())

# get_all_issues, sort by recent
# create_an_issue
# delete an issue
# get_all_labels
# define convert to json
# create all users
# parse urgency

# issue = get_issue(repo, 21)
# close_issue(issue)