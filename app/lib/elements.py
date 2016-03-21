base_dict = {
    "components": [],
    "layouts" :[],
    "assets": [],
    "user_stories": [],
    "action_items": [],
    "moodboards": [],
    "reference": [],
    "projects": []
}

projects = {
    "types": ["user_story", "admin_tools", "design/style guide"],
}

user_stories = [
    {"id": 1, "title": 'Anonymous User Checks out Uguru', "ref":"splash", "layouts":['mad-lib', 'map-university', '']},
    {"id": 2, "title": 'Anonymous User Checks out Become Guru/How it Works', "ref":"splash-bg-hiw", "layouts":[]},
    {"id": 3, "title": 'Anonymous User Gets Started/Signup', "ref":"splash-start", "layouts":[]},
    {"id": 4, "title": 'Student Explores Dashboard', "ref":"student-dash-first", "layouts":[]},
    {"id": 5, "title": 'Student Becomes a Guru', "ref":"student-becomes-guru", "layouts":[]},
    {"id": 6, "title": 'Guru Explores Guru Dashboard', "ref":"guru-dash-first", "layouts":[]},
    {"id": 7, "title": 'Student Creates/Cancels 1-Many Request', "ref":"student-requests", "layouts":[]},
    {"id": 8, "title": 'Guru Accepts/Rejects/Cancels 1-Many Student Requests', "ref":"guru-incoming-requests", "layouts":[]},
    {"id": 9, "title": 'Student receives & Accepts/Rejects/Cancels 1 - many incoming Gurus', "ref":"student-incoming-gurus", "layouts":[]},
    {"id": 10, "title": 'Student Accepts/Rejects/Cancels Guru', "ref":"student-accept-guru", "layouts":[]},
    {"id": 11, "title": 'Student & Guru Message/ & Share Location/Files/Contact Info', "ref":"student-guru-message", "layouts":[]},
    {"id": 12, "title": 'Guru/Student rate each other', "ref":"student-guru-rating", "layouts":[]},
    {"id": 13, "title": 'Guru Sets-up 1-Many Shops', "ref":"guru-profiles-setup", "layouts":[]},
    {"id": 14, "title": 'Guru becomes 100% Credibly', "ref":"guru-credibility", "layouts":[]},
    {"id": 15, "title": 'Student/Guru Refer Each Other', "ref":"student-guru-referrals", "layouts":[]},
    {"id": 16, "title": 'Guru Bills a Student through Billing/Enhanced Messaging', "ref":"guru-bills-student", "layouts":[]},
    {"id": 17, "title": 'Student adds card & purchases from Credit Shop', "ref":"student-payments-shop", "layouts":[]},
    {"id": 18, "title": 'Guru adds Debit Card && Cashes Out', "ref":"guru-cashes-out", "layouts":[]},
    {"id": 19, "title": 'Student/Guru edit their settings', "ref":"student-guru-settings", "layouts":[]},
    {"id": 20, "title": 'Guru checks out Guru Ranking', "ref":"guru-promote", "layouts":[]},
    {"id": 21, "title": 'Guru checks out Guru Promote', "ref":"guru-ranking", "layouts":[]}
]

base_user_story = {"title": '', "ref":"", "layouts":[]}

base_component = {'ref': [], 'cp_link': '', 'name': '', 'notes': '', 'sample': ''}

base_elements = {
    'component': base_component,
    'user_stories': base_user_story
}

component_list = [
    {
        "stage": 1,
        "ref": 'dropdown',
        "cp_link": '',
        "name": "Dropdowns",
        "notes": 'Seems not 100% unified, could be more fluid with another sample tool',
        "sample": {
            "template": '<dropdown ng-model="component.sample.scope"></dropdown>',
            "scope": {
                "options": ['apples', 'bananas', 'oranges'],
                "selectedIndex": 0
            }
        }
    },
    {
        "stage": 1,
        "ref": 'splash.dropdown',
        "cp_link": '',
        "name": "Dropdowns",
        "notes": 'Seems not 100% unified, could be more fluid with another sample tool',
        "sample": {
            "template": '<dropdown type="splash" ng-model="component.sample.scope"></dropdown>',
            "scope": {
                "options": ['apples', 'bananas', 'oranges'],
                "selectedIndex": 0
            }
        }
    },
    {
        "id": 2,
        "ref": 'user-icon',
        "name": 'User Icon',
        "notes": 'Add pre-loader states while the image is loading',
        "sample": {
            "template": '<user-icon size="component.sample.scope.size" url="component.sample.scope.profile_url"> </user-icon>',
            "scope": {
                "profile_url": 'http://en.gravatar.com/userimage/5102999/8d85d1b0830237f7baa8d92405449db7.jpg?size=200',
                "size": 'medium'
            }
        },
        "bugs": [{"assigned":"samir", "reason": "doesn't work"}]
    },
    {
        "id": 3,
        "ref": 'tooltip',
        "name": 'Tool Tip',
        "notes": 'CSS issues',
        "sample": {
            "template": '<tooltip direction="component.sample.scope.direction" title="component.sample.scope.title" button-text="component.sample.scope.button_text"/>',
            "scope": {
                "button_text": 'Okay',
                "title": 'This is a tool-tip',
                "direction":'bottom'
            }
        }
    },
    {
        "id": 4,
        "ref": 'rating-stars',
        "name": 'Rating Stars',
        "sample": {
            "template": '<rating style="width:100px;" avg="component.sample.scope.avg"/>',
            "scope": {
                "avg": 4.5
            }
        },
        "notes": 'doesnt show 0.5'
    },
    {
        "id": 5,
        "ref": 'tabs',
        "name": 'Tabs',
        "sample": {
            "template": '<tabs key="title" index="component.sample.scope.index" options="component.sample.scope.tabs" />',
            "scope": {
                "tabs": [{"title": 'Apples'}, {"title": 'Oranges'}, {"title": 'Bananas'}],
                "index": 1
            }
        }
    },
    {
        "id": 6,
        "ref": 'color-picker',
        "name": 'Color Picker',
        "sample": {
            "template": '<color-picker class="bg-smoke" selected-color="component.sample.scope.selectedColor"> </color-picker>',
            "scope": {
                "selectedColor":'auburn'
            }
        },
        "action_items": [{'Gabrielle': 'Place in guru profile under the third tab "which we can call miscellaneous"'}],
        "bugs": [{"girls": 'resolve inputs and save buttons vs blurs'}],
    },
    {
        "id": 7,
        "ref": 'mini-profile-card',
        "name": 'Mini Profile Card',
        "bugs": [{"girls": "classes are off, it doesn't make sense that my mini profile card has a large option."}]
    },
    {
        "id": 8,
        "ref": 'profile-card',
        "name": 'Profile Card',
        "bugs": [{"girls": "Discuss names convenient for everyone. I.e. PF -Card." }]
    },
    {
        "id": 9,
        "ref": 'tag',
        "name": 'Tag',
        "sample": {
            "template": '<tag desktop="desktopMode" type="splash" blank-num="component.sample.scope.blankNum" inner-text="component.sample.scope.innerText" category="component.sample.scope.category"> </tag>',
            "scope": {
                "innerText": 'Midnight',
                "desktopMode": True,
                "blankNum": 1,
                "category": {"name": 'Academic', "hex_color": 'academic', "id":5},
                "animArgs": {
                    "li": {"delays": ['class-on-activate-delay:1000', 'class-on-load-delay:1000']},
                }
            }
        },
        "bugs": [{"girls": 'Whats the different conceptually between a tag and a chip?'}]
    },
    {
        "id": 10,
        "ref": 'request-tag-base',
        "name": 'Base Tag',
        "sample": {
            "template": '<tag desktop="desktopMode" category="component.sample.scope.category" inner-text="component.sample.scope.innerText" type="base"> </tag>',
            "scope": {
                "innerText": 'Request Tab',
                "category": {"name": 'Academic', "hex_color": 'academic', "hex_class":'cerise', "id":5}
            }
        },
        "bugs": [{"girls": 'Whats the different conceptually between a tag and a chip?'}]
    },
    {
        "id": 11,
        "ref": 'request-tag-base',
        "name": 'Base Tag Input',
        "sample": {
            "template": '<tag desktop="desktopMode" category="component.sample.scope.category" inner-text="component.sample.scope.innerText" type="input"> </tag>',
            "scope": {
                "innerText": 'Tag Input Try Me',
                "category": {"name": 'Academic', "hex_color": 'academic', "hex_class":'azure', "id":5}
            },
        "bugs": [{"girls": 'Whats the different conceptually between a tag and a chip?'}]
        },
    },
    {
        "id": 12,
        "ref": 'svg-icon',
        "name": 'Svg Tag Template',
        "sample": {
            "template": '<svgi name="category.household" size="100x100" stroke="#FFFFFF"> </svgi>'
        }
    }
]

