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
        getComponents: getComponents
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
                { title: 'Components', tabs: {index: 0, options: [{title: 'Components'}, {title:'Containers'}, {title: 'Layouts'}, {title: 'Scenes'}, {title: 'Assets'}]}},
                { title: 'Documentation', tabs: ['CSS Style', 'Guides', 'Component LifeCycle']},
                { title: 'Moodboard', tabs: ['All', 'Components', '<b>+ Add one</b>']},
                { title: 'Tools'}
            ],
            sidebar: {
                index: 1
            }
        }

        function initUserStories() {

        }

        function generateMilestoneTabs(members) {
            var tabOptions = [{title: 'All'}];
            for (var i = 0; i < members.length; i++) {
                var indexMember = members[i];
                tabOptions.push({title: indexMember.name, profile_url: indexMember.profile_url, action_items: getActionItemsFor(indexMember.name)})
            }
            return {
                index: 1,
                options: tabOptions
            }
        }

        function getActionItemsFor(member_name) {
            if (member_name === 'Jeselle') {
                return {
                    resources: [
                        {
                            title: 'Guru Ranking',
                            icons: ['Gauge', 'Calculator', 'High Score List', 'Milestones'],
                            reference: 'Google Drive',
                            description: 'Go to google doc for more details <br> https://drive.google.com/drive/u/0/folders/0By5VIgFdqFHdTE9nc3h1ZUItVFE',
                            requirements: 'normalized'
                        }
                    ],
                    research: [
                        {   title: 'messages',
                            components: [{
                                    reference: 'refresher',
                                    stage: 1,
                                    name: 'Pull-to-Refresh',
                                    template: 'templates/components/dev/input/refresh.tpl',
                                    description: 'Find the best web example of pull to refresh',
                                    requirements: 'Must be web browser',
                                    spec: {
                                        responsive: {
                                            mobile:true,
                                            desktop: true
                                        },
                                        hifi: false,
                                    }
                                },
                                {
                                    reference: 'shared_calendar',
                                    stage: 1,
                                    name: 'Shared Calendar',
                                    template: 'Between Student and a Guru on messages'
                                },
                                {
                                    reference: 'message_types',
                                    name: 'Various Message Types',
                                    description: 'When a student/guru updates their location, calendar, etc, it will show that it was updated on the main message thread',
                                    requirements: 'Make it kinda like iMessage, and keep it as simple as possible'
                                }
                            ]
                        },
                        {   title: 'guru_promote',
                            components: [{
                                    reference: 'steps',
                                    stage: 1,
                                    template: 'templates/components/dev/containers/steps.tpl',
                                    name: 'Steps Container',
                                    description: 'A general content 3-6 steps container where each container has the number, icon, and header',
                                    spec: {
                                        responsive: {
                                            mobile: true,
                                            desktop: true
                                        },
                                        hifi: false
                                    }
                                }
                            ]
                        },
                        {   title: 'guru_ranking',
                            components: [{
                                    stage: 1,
                                    template: 'templates/components/dev/containers/steps.tpl',
                                    name: 'Guru High Score List',
                                    description: 'A general content 3-6 steps container where each container has the number, icon, and header',
                                    spec: {
                                        responsive: {
                                            mobile: true,
                                            desktop: true
                                        },
                                        hifi: false
                                    }
                                }
                            ]
                        }
                    ]
                    ,
                    hifi: [{
                            title: 'messages',
                            components:[
                                {
                                    title: 'refresher',
                                    stage: 1,
                                    name: 'Pull-to-Refresh',
                                    template: 'templates/components/dev/input/refresh.tpl',
                                    description: 'Find the best web example of pull to refresh',
                                    requirements: 'Must be web browser',
                                    spec: {
                                        responsive: {
                                            mobile:true,
                                            desktop: true
                                        },
                                        hifi: false,
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
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

    function getComponents() {
        return components;
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

var componentList = ['user icon', 'tag', 'tooltip', 'profile card', 'mini card', 'color picker', 'input', 'toggle', 'progress', 'sliding tab bar', 'rating', 'map marker', 'map', 'request tile', 'open round progress', 'copy url', 'copy url', 'credit tile', 'form popup', 'credit card with edit button', 'breaking bad tile', 'countdown', 'button', 'calendar tile', 'dropdowns', 'credit card', 'school card', 'id card', 'social network link bar', 'numbered list', 'range inputs', 'ribbon edge', 'pricing tile', 'profile section', 'badges', 'info popup', 'dashboard ticket']
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
        stage: 1,
        reference: 'refresher',
        name: 'Pull-to-Refresh',
        template: 'templates/components/dev/input/refresh.tpl',
        description: '',
        requirements: '',
        spec: {
            responsive: {
                mobile:true,
                desktop: true
            },
            hifi: false,
        },
        nested_components: ['animated_spinner'],
        states: [{name: 'Pulling Down', description: 'When the user starts pulling down'}, {name:'Pulling Down Text', description: 'Text to display as the user is pulling down'}, {name: 'Pulling Refresh', description: 'When user pulls either long enough, or lets go'}, {name: 'Refresh Complete', description: 'When refreshing is complete'}]
    },
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

