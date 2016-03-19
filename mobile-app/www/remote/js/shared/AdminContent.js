angular.module('sharedServices')
.factory("AdminContent", [
	'$localstorage',
	AdminContent
	]);

function AdminContent($localstorage) {
    //initiates all vars
    var moodboardContent, userStories, glosseryContent, mainContent, mainLayout, responsibilitiesContent, teamMembers;

    //initializes all vars
    initAllContent();

    return {
        moodboardContent: moodboardContent,
        responsibilitiesContent: responsibilitiesContent,
        getGlosseryContent: getGlosseryContent,
        getMainLayout: getMainLayout,
        getMembers: getMembers,
        getComponents: getComponents,
        getLayouts: getLayouts,
        getUserStories: getUserStories
    }

    function initAllContent() {
        moodboardContent = initMoodboardContentDict();
        glosseryContent = initGlosseryContent();
        mainContent = initMainContent();
        teamMembers = getMembers();
        mainLayout = initMainLayout(teamMembers);
    }

    function getMainLayout() {
        return mainLayout;
    }

    function getUserStories() {
        var userStoryListV1 = [
            {id: 1, title: 'Anonymous User Checks out Uguru', ref:"splash", layouts:['mad-lib', 'map-university', '']},
            {id: 2, title: 'Anonymous User Checks out Become Guru/How it Works', ref:"splash-bg-hiw", layouts:[]},
            {id: 3, title: 'Anonymous User Gets Started/Signup', ref:"splash-start", layouts:[]},
            {id: 4, title: 'Student Explores Dashboard', ref:"student-dash-first", layouts:[]},
            {id: 5, title: 'Student Becomes a Guru', ref:"student-becomes-guru", layouts:[]},
            {id: 6, title: 'Guru Explores Guru Dashboard', ref:"guru-dash-first", layouts:[]},
            {id: 7, title: 'Student Creates/Cancels 1-Many Request', ref:"student-requests", layouts:[]},
            {id: 8, title: 'Guru Accepts/Rejects/Cancels 1-Many Student Requests', ref:"guru-incoming-requests", layouts:[]},
            {id: 9, title: 'Student receives & Accepts/Rejects/Cancels 1 - many incoming Gurus', ref:"student-incoming-gurus", layouts:[]},
            {id: 10, title: 'Student Accepts/Rejects/Cancels Guru', ref:"student-accept-guru", layouts:[]},
            {id: 11, title: 'Student & Guru Message/ & Share Location/Files/Contact Info', ref:"student-guru-message", layouts:[]},
            {id: 12, title: 'Guru/Student rate each other', ref:"student-guru-rating", layouts:[]},
            {id: 13, title: 'Guru Sets-up 1-Many Shops', ref:"guru-profiles-setup", layouts:[]},
            {id: 14, title: 'Guru becomes 100% Credibly', ref:"guru-credibility", layouts:[]},
            {id: 15, title: 'Student/Guru Refer Each Other', ref:"student-guru-referrals", layouts:[]},
            {id: 16, title: 'Guru Bills a Student through Billing/Enhanced Messaging', ref:"guru-bills-student", layouts:[]},
            {id: 17, title: 'Student adds card & purchases from Credit Shop', ref:"student-payments-shop", layouts:[]},
            {id: 18, title: 'Guru adds Debit Card && Cashes Out', ref:"guru-cashes-out", layouts:[]},
            {id: 19, title: 'Student/Guru edit their settings', ref:"student-guru-settings", layouts:[]},
            {id: 20, title: 'Guru checks out Guru Ranking', ref:"guru-promote", layouts:[]},
            {id: 21, title: 'Guru checks out Guru Promote', ref:"guru-ranking", layouts:[]}
        ]
        return userStoryListV1;
    }

    function getUserLayouts() {

    }

    function getMembers() {
        return [
            {
                name: "Jeselle",
                profile_url: 'https://uguru.me/static/web/images/team/jeselle.png',
                priorities: {
                    components: ['tabs', 'steps', 'dropdown', 'refresher']
                }
            },
            {
                name: "Gabrielle",
                profile_url: 'http://en.gravatar.com/userimage/5102999/8d85d1b0830237f7baa8d92405449db7.jpg?size=200'
            },
            {
                name: "Jason",
                profile_url: 'https://uguru.me/static/web/images/team/jason.png'
            },
            {
                name: 'Samir',
                profile_url: 'https://uguru.me/static/web/images/team/samir.png'
            },
            {
                name: 'Girls',
                profile_url_1: 'https://uguru.me/static/web/images/team/jeselle.png',
                profile_url_2: 'http://en.gravatar.com/userimage/5102999/8d85d1b0830237f7baa8d92405449db7.jpg?size=200'
            }
        ]
    }


    function initMainContent() {
        return;
    }

    function initMainLayout(members) {
        // var sidebarOptions = ['Milestones', 'Docs', 'Components', 'Responsibilities', 'Moodboard', 'Tools']
        return {
            sections: [
                {
                    title: 'Projects',
                    tabs: generateMilestoneTabs(members),
                    sections: {
                        user_stories: initUserStories(),
                        admin_setup: initAdminSetup()
                    }
                },
                { title: 'Components', tabs: {index: 0, options: [{title: 'Components', header: 'All lightweight components'}, {title:'Containers', header: 'All components that include many other nested components'}, {title: 'Layouts'}, {title: 'User Stories'}, {title: 'Assets'}]}},
                { title: 'Reference', tabs: {index:0, options: [{title: 'Docs', header: 'Any rules that we have created ourselves'}, {title: 'HTML/CSS Guide', header: 'Raw HTML, Directives, Base CSS'}, {title: 'Colors', header: 'Color Palettes for different use cases'}, {title: 'Themes + Demographics', header: 'I.e. Guru, Student, Parents'}, {title:'Animation', header: 'Directives + Best Practices'}]}},
                { title: 'Moodboard', tabs: {index: 0, options: [{title: 'Uguru / Internal', header: 'What are you most proud of?'}, {title: 'Components', header: 'External components we really like'}, {title: 'Fluid + Animation', header: 'External animations/Fluid example we really like'}, {title: 'Creative/Thematic', header: 'Out of this world level'}, {title: 'Library', header: 'Great, specific libraries we really like'}]}},
                { title: 'Tools', tabs: {index: 0, options: [{title: 'External Exporter'}, {title: 'Internal Editor'}, {title: 'Component Creator'}, {title: 'Asset Importer'}, {title: 'Codepen Tools'}]}}
            ],
            sidebar: {
                index: 0
            }
        }

        function initUserStories() {

        }

        function generateMilestoneTabs(members) {
            var tabOptions = [{title: 'All User <br> Stories'}];
            for (var i = 0; i < members.length; i++) {
                var indexMember = members[i];
                tabOptions.push({title: indexMember.name, profile_url: indexMember.profile_url, action_items: getActionItemsFor(indexMember.name)})
            }
            return {
                index: 0,
                options: tabOptions
            }
        }



        function getActionItemsFor(member_name) {
            var actionList = {
                'jeselle': {
                    layouts: layoutList
                },
                'girls': {
                    research: [{project: 'Admin Setup', description: 'Decide tags to use for moodboard, make a list of changes you want to have/make over time.', title: 'Making Dashboard Yours'},
                                {project: 'Components', description: 'Lets finalize a loader that we can use within containers that load images, as well as the main. Our current black one is OK & we can do better.', tite: 'Wrapping up'},
                                {project: 'Admin Setup', description: 'Ongoing.. If time permits today (no more than 1 hour daily).', tite: 'Wrapping up'}],
                },
                'jason': {
                    components: componentList
                },
                'gabrielle': {
                    components: componentList,
                    setup: generateSetupActionItems()
                },
                'samir': {
                    components: componentList
                }

            }
            var resultActionArr = [];
            // if (member_name.toLowerCase() === 'jeselle') {
                var actionDict = actionList[member_name.toLowerCase()]
                var actionDictKeysArr = Object.keys(actionDict);
                for (var i = 0; i < actionDictKeysArr.length; i++) {
                    var actionType = actionDictKeysArr[i];
                    var actionTypeActions = actionDict[actionType];
                    for (var j = 0; j < actionTypeActions.length; j++) {
                        var indexAction = actionTypeActions[j];
                        indexAction.action_type = actionType;
                        resultActionArr.push(indexAction);
                    }
                }
            return resultActionArr;
        }

        function initAdminSetup() {
            return [
                {
                    title: 'Admin Tools'
                },
                {
                    title: 'Design Guide'
                },
                {
                    title: 'Style Guide'
                }
            ]

        }
        // return {
        //     sidebar: initSidebarDict(sidebarOptions)
        // }

        // function initSidebarDict(arr_options) {
        //     var arrFinalOptions = [];
        //     for (var i = 0; i < arr_options.length; i++) {

        //     }
        //     return {
        //         options: arrFinalOptions,
        //         index: 0
        //     }
        // }
    }

    function initGlosseryContent() {
        return docs;
    }

    function generateSetupActionItems() {
        return gabrielleSetupList;
    }

    function getComponents() {
        return componentList;
    }

    function getLayouts() {
        return layoutList;
    }

    function getGlosseryContent() {
        return glosseryContent;
    }

    function initMoodboardContentDict() {
        return {
            examples: {
                animation: [],
                components: [],
                idk: []
            },
            tags: ['URGENT', 'ONE DAY', 'SURPRISE', 'HOLY SHIT']
        }
    }
}



var docs = {
    lifecycleComponent: {
        header: 'LifeCycle of a HiFi Component',
        steps: [
            {
                title: 'Find the best first',
                description: "Even if that's not possible right now, at least we have something to shoot for. Can also provide as the motivating factor of 'what it could be.'"
            },
            {
                title: 'Analyze',
                description: "Is this component already part of our style guide? If there are no major changes, SKIP. <br><br> Does the component have any nested components? Any custom we don't have? If so, repeat this process for that nested component after this one"
            },
            {
                title: 'Create a HiFi',
                description: "Does the component have any nested components? Any custom we don't have? If so, repeat this process for that nested component after this one"
            },
        ]
    },
    perfectComponent: {
        header: 'Steps to Adding a New Component',
        steps: [
            {
                title: 'Find great examples to <i>start</i> with',
                description: 'These will be added to the moodboard'
            }
        ]
    }
}

var layoutList = [
        {
            id: 0,
            mp_ref: null,
            type: 'layout',
            progress: 'hifi',
            name: 'Guru Ranking',
            ref: 'guru-ranking-layout',
            external: {
                codepen: [{title: 'Export directive to codepen'}, {title: 'Export RAW to codepen'}]
            },
            gallery_ref: {
                parents: [{type:'User Story', name: 'Guru Checks Guru Ranking'}],
                children: [{type: 'component', name: 'Circular Progress Bar'}, {type: 'component', name: 'University Background Image'}, {type: 'container', name: 'High Score List'}, {type: 'container', name: 'Action Item List'}],
            },
            action_items: [{user: 'Jeselle', action_items: ["#1. Resolve impact level - an icon that will show how much a certain action will contribute to their rankings. Scale will be 1-3 or 1-5 based on which one is more elegant design. I'm thinking the phone signal bars (att) with color indicating health like green for great, and just gray for minimal", "High score list (static) for 5-10 items. Feel free to play with the attributes per list item. Right now they are the name, stars, and ranking. Others can include course tags, # of reviews, whatever feels most natural", "Action item list (since lists are fresh). What’s the bare minimum we have to add in the interface to have an action item visually indicate that it will take you the destination (lets say Profile > Guru Profile Photo), without having a button for each item? It cannot be hover because on mobile we don’t have that. You have flexibility to alter copy, i.e. 'Your ranking will be ___ after _____' vs just the pure component."]}],
            details: {
                description: 'When a Guru clicks on "Guru Ranking tile" on their dashboard, this is the CTA that will popup. There will 3-4 other options, right now it is only showing one.',
                notes: 'This is the first spec so please ask for as much extra detail you need & I will standardize into the next one.',
                requirements: 'Isolation to the new components within the container. Get HiFis of the new components first and then work your way outward into the layout. '
            },
            states: ["Student is not ranked because email is not activated. Grayed out components with overlay with a cta button to action items tab bar ", "Student is ranked and sees their place on the high score list, with the ranking progress indicator"],
            bugs: [],
            sample: {
                template_url: 'templates/components/dev/layouts/guru.ranking.tpl',
                scope: {
                    guru_hs_list: [{index: 1, name: 'Jeselle O.', guru_ranking: 1}, {index: 2, name: 'Jason M', guru_ranking: 2}, {index: 2, name: 'Gabrielle W', guru_ranking: 3}, {index: 4, name: 'Gabrielle W', guru_ranking: 4, is_user:true}],
                    user: {
                        ranking_actions: [{index: 1, text: 'Refer two friends', new_ranking: 10, impact_level: 3}, {index: 1, text: 'Tutor two students in CS10 this week', new_ranking: 5, impact_level: 1}],
                        guru_ranking: 99,
                        name: 'Samir M'
                    },
                    list_index: 0,
                    header: 'Guru Ranking',
                    tabIndex: 0,
                    tab_options: ['High Score List', 'Next Steps']
                }
            },
            template_url: 'templates/dev/something.tpl',
            moodboard_refs: []
        }
]

var componentList = [
    {
        stage: 1,
        ref: 'dropdown',
        cp_link: '',
        name: "Dropdowns",
        notes: 'Seems not 100% unified, could be more fluid with another sample tool',
        sample: {
            template: '<dropdown ng-model="component.sample.scope"></dropdown>',
            scope: {
                options: ['apples', 'bananas', 'oranges'],
                selectedIndex: 0
            }
        }
    },
    {
        id: 2,
        ref: 'user-icon',
        name: 'User Icon',
        notes: 'Add pre-loader states while the image is loading',
        sample: {
            template: '<user-icon size="component.sample.scope.size" url="component.sample.scope.profile_url"> </user-icon>',
            scope: {
                profile_url: 'http://en.gravatar.com/userimage/5102999/8d85d1b0830237f7baa8d92405449db7.jpg?size=200',
                size: 'medium'
            }
        },
        bugs: [{assigned:"samir", reason: "doesn't work"}]
    },
    {
        id: 3,
        ref: 'tooltip',
        name: 'Tool Tip',
        notes: 'CSS issues',
        sample: {
            template: '<tooltip direction="component.sample.scope.direction" title="component.sample.scope.title" button-text="component.sample.scope.button_text"/>',
            scope: {
                button_text: 'Okay',
                title: 'This is a tool-tip',
                direction:'bottom'
            }
        }
    },
    {
        id: 4,
        ref: 'rating-stars',
        name: 'Rating Stars',
        sample: {
            template: '<rating style="width:100px;" avg="component.sample.scope.avg"/>',
            scope: {
                avg: 4.5
            }
        },
        notes: 'doesnt show 0.5'
    },
    {
        id: 5,
        ref: 'tabs',
        name: 'Tabs',
        sample: {
            template: '<tabs key="title" index="component.sample.scope.index" options="component.sample.scope.tabs" />',
            scope: {
                tabs: [{title: 'Apples'}, {title: 'Oranges'}, {title: 'Bananas'}],
                index: 1
            }
        }
    },
    {
        id: 6,
        ref: 'color-picker',
        name: 'Color Picker',
        sample: {
            template: '<color-picker class="bg-smoke" selected-color="component.sample.scope.selectedColor"> </color-picker>',
            scope: {
                selectedColor:'auburn'
            }
        },
        action_items: [{'Gabrielle': 'Place in guru profile under the third tab "which we can call miscellaneous"'}],
        bugs: [{girls: 'resolve inputs and save buttons vs blurs'}],
    },
    {
        id: 7,
        ref: 'mini-profile-card',
        name: 'Mini Profile Card',
        bugs: [{girls: "classes are off, it doesn't make sense that my mini profile card has a 'large option.'"}]
    },
    {
        id: 8,
        ref: 'profile-card',
        name: 'Profile Card',
        bugs: [{girls: "Discuss names convenient for everyone. I.e. PF -Card. "}]
    }

]


function getDefaultObjReferenceDict() {
    return {
        gallery: getGalleryItemRef(), //components
        projects: getProjectsItemRef(), //reference
        action_items: getActionItemsRef(), //action items
        tools: {},
        moodboard: getMoodboardRef(),
    }

    function getMoodboardRef() {

    }

    function getActionItemsRef() {
        return {
            owner: 'Samir',
            priority: 1,
            quality: 'hifi',
            quality_spec: {
                default: 'hifi',
                options: ['MVP', 'hifi', 'moodboardworthy']
            },
            deliverable: {},
            deliverable_spec: {
                default: 'codepen',
                options: ['codebase', 'codepen', 'admin']
            },
            gallery_ref: {},
            complete: false
        }
    }

    function getGalleryRef() {
        return {
            id: 0,
            mp_ref: null,
            type_spec: {
                default: 'component',
                options: ['asset', 'component', 'container', 'container group', 'layout', 'user story'],
            },
            progress: {
                default: 'spec',
                options: ['spec', 'functional', 'hifi', 'fluid', 'tested', 'staging', 'production'],
            },
            external: {
                codepen: [{title: 'Export directive to codepen'}, {title: 'Export RAW to codepen'}]
            },
            gallery_ref: {
                parents: [],
                children: [],
            },
            action_items: [],
            details: {
                description: 'this is where the goals will go',
                notes: 'this is where the notes will go',
                comments: {}
            },
            gallery_states: [],
            bugs: [],
            ref: 'tabs',
            name: 'Tabs',
            sample: {
                template: '<tabs class="txt-white" tabs="component.sample.scope.tabs" />',
                scope: {
                    tabs: ['Apples', 'Oranges', 'Bananas'],
                    index: 1
                }
            },
            template_url: 'templates/dev/something.tpl',
            variations: {
                parent_1: 'insert scope',
                parent_2: 'insert scope',
                general: 'insert mapping function'
            },
            moodboard_refs: []
        }
    }
}

function compileGallery() {
    var galleryList = ['Components', 'Containers', 'Layouts', 'Scenes', 'User Stories', 'Assets'];
}

var componentListVanilla = ['user icon', 'tag', 'tooltip', 'ratings', 'tabs',
     'map marker', 'map', 'profile card', 'mini card', 'color picker', 'input', 'toggle', 'progress', 'request tile', 'open round progress', 'copy url', 'credit tile', 'form popup', 'credit card with edit button', 'countdown', 'button', 'calendar tile', 'credit card', 'school card', 'social network link bar', 'numbered list', 'range inputs', 'ribbon edge', 'pricing tile', 'profile section', 'badges', 'info popup', 'dashboard ticket', 'projector slide']
//notes for whem compiling
// make red if status is incomplete
// tests --> false, then send to jason

var defaultComponentFields = {
    events: [],
    states: [],
    status: 'complete',
    full_status: {
         dynamic: true,
        cross_platform: true,
        responsive: true,
        functional: true,
        hifi: true,
        tests: true
    },
    template_url: '',
    scope: {},
    id: 1,
    ref: 'shortest_name',
    name: false,
    layout_ref: [],
    child_component: [],
    moodboard_reference: [],
    core: false,
    hasCollection: false,
    notes: '',
    description: '',
    assigned: ''
    //has different mobile form
    //is a core component
}

//default components

var defaultComponentStatus = {
    dynamic: true,
    cross_platform: true,
    responsive: true,
    functional: true,
    hifi: true,
    tests: true
}

var componentDefaults = {
    states: defaultComponentStatus,
    fields: defaultComponentFields
}




var components = [
    {
        reference: 'tabs',
        stage: 1,
        template: 'templates/components/dev/containers/tabs.tpl',
        name: 'Tab Bar'
    },
    {
        stage: 1,
        reference: 'steps',
        scope: {
            steps: [{img_base: 'remote/', title: 'Request a Guru', icon_url: 'templates/svg/main/calendar.html', description: 'This is how you would request a guru'}, {img_base: 'remote/' ,title: 'Just Chill', icon_url: 'templates/svg/main/lightbulb.html', description: 'Gurus will fight to meet you - ur the hot shot'}],
            header: 'Steps to Success'
        },
        template: '<step-by-step steps="selected_component.scope.steps" header="selected_component.scope.header"></step-by-step>',
        name: 'Steps Container',
        spec: {
            responsive: {
                mobile: true,
                desktop: true
            },
            hifi: false
        }
    },
    {
        stage: 1,
        reference: 'dropdown',
        template: 'templates/components/dev/input/dropdown.tpl',
        name: "Base Dropdown"
    }
]



function compileActions() {

}

function compileComponents() {
    return compon
}

function compileTests() {

}

function compileAssets() {

}

gabrielleSetupList = ['place some svgs @ components > assets', 'filter icon w/ transparent tab bar', 'standardize the subnavbars'];