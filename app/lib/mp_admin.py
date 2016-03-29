from mixpanel import Mixpanel
import requests

mp = Mixpanel('28635453906d5f7d1a0383e6da3292df', 'd557efd7196433033a7a136fa016ef59', '3e9825a431a4944b5037c7bf6d909690')

def createAdminProfiles():
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    teamNames = ['Samir', 'Jeselle', 'Gabrielle', 'Jason', 'Base']
    teamLastNames = ['Makhani', 'Obina', 'Wee', 'Huang', 'Component']
    index = 0
    for person in teamNames:
        mp.people_set(str(index), {
            '$distinct_id': str(index) + '',
            '$first_name': teamNames[index],
            '$last_name': teamLastNames[index],
            '$email': teamNames[index] + '@uguru.me'
            })
        index += 1

def getQueryDict(url, params={}):
    import urllib, urllib2, time #for sending requests
    base_params = {}
    base_params['api_key']= '28635453906d5f7d1a0383e6da3292df'
    # params['api_secret'] = 'd557efd7196433033a7a136fa016ef59'
    base_params['expire'] = int(time.time())+600 # 600 is ten minutes from now
    base_params.update(params)

    if 'sig' in base_params: del base_params['sig']
    base_params['sig'] = hash_args(mp, base_params)

    request_url = 'https://mixpanel.com/api/2.0/%s/?%s' % (url ,unicode_urlencode(base_params))

    request = requests.get(request_url).text
    return request

def formatMPResponse(resp):
    import json
    arr = json.loads(resp)
    return arr

def unicode_urlencode(params):
    import urllib
    """
        Convert lists to JSON encoded strings, and correctly handle any
        unicode URL parameters.
    """
    if isinstance(params, dict):
        params = params.items()
    for i, param in enumerate(params):
        if isinstance(param[1], list):
            params[i] = (param[0], json.dumps(param[1]),)

    return urllib.urlencode(
        [(k, isinstance(v, unicode) and v.encode('utf-8') or v) for k, v in params]
    )

def getBasePlatformDict():
    browserTypes = ['chrome', 'safari', 'firefox'];
    browserScreens = ['mobile', 'desktop'];
    browserStates = ['small', 'medium', 'large', 'xl'];
    platformResultArr = []
    for b_type in browserTypes:
        for screen in browserScreens:
            for b_state in browserStates:

                if screen == "desktop" and b_state == 'xl':
                    continue

                platformResultArr.append({
                        'platform': b_type,
                        'screen_size': b_state,
                        'type': screen,
                        'test_status': 'unsure',
                        'test_client': 'manual',
                        'passed': False

                })

    return platformResultArr

def hash_args(self, args, secret=None):
        import hashlib
        """
            Hashes arguments by joining key=value pairs, appending a secret, and
            then taking the MD5 hex digest.
        """
        for a in args:
            if isinstance(args[a], list): args[a] = json.dumps(args[a])

        args_joined = ''
        for a in sorted(args.keys()):
            if isinstance(a, unicode):
                args_joined += a.encode('utf-8')
            else:
                args_joined += str(a)

            args_joined += '='

            if isinstance(args[a], unicode):
                args_joined += args[a].encode('utf-8')
            else:
                args_joined += str(args[a])

        hash = hashlib.md5(args_joined)
        hash.update('d557efd7196433033a7a136fa016ef59')
        return hash.hexdigest()


def loadMostUpdatedElementsJson():
    import json
    _dict = json.load(open('./app/lib/elements.json'))
    return _dict


### Initialize elements component
def syncLocalElementsToMP():
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    elements = loadMostUpdatedElementsJson()
    mp.people_set('4', {
        'elements': elements
    })
    print "local elements successfully synced"

def resolveLocalElements():
    elements = loadMostUpdatedElementsJson()
    for story in elements['user_stories']:
        story = updateElemWithUpdatedBaseFields(story, 'user_story')
        elements['layouts'] = baseElementExistsForParentChildrenRefs(elements['layouts'], story, 'layouts')
        elements['scenes'] = baseElementExistsForParentChildrenRefs(elements['scenes'], story, 'scenes')


    # for scene in elements['scenes']:
    #     elements['scenes'] = baseElementExistsForUserStory(elements['scenes'], story)

    saveElementsJson(elements)
    printElementsStats(elements)


def printElementsStats(elements):
    for key in elements.keys():
        print "#%s:%s" % (key, len(elements[key]))


## Updates one based on changes final step
def updateElementComponent(_dict):
    mp = Mixpanel('3e9825a431a4944b5037c7bf6d909690')
    mp.people_set('4', {
        'elements': _dict
    })

def updateElemWithUpdatedBaseFields(elem, elem_type):
    from elements import base_elements
    user_elem_base = base_elements[elem_type]
    for key in user_elem_base.keys():
        base_value = user_elem_base[key]
        if key not in elem:
            elem[key] = base_value
            print "adding %s key to %s" % (key, elem['name'])
    return elem


def baseElementExistsForParentChildrenRefs(all_elem_types, parent, child_type):
    parent_children = parent[child_type]
    all_elem_refs = [elem['ref'] for elem in all_elem_types]
    for elem in parent_children:
        if elem not in all_elem_refs:
            new_elem = createNewElem(elem, child_type, len(all_elem_types) + 1)
            all_elem_types.append(new_elem)
    return all_elem_types

def baseElementExistsForUserStory(elements, user_story):
    user_story_layouts = user_story['layouts']
    elem_refs = [elem['ref'] for elem in elements]
    for elem in user_story_layouts:
        if elem not in elem_refs:
            new_elem =  createNewElem(elem, len(elements) + 1)
            elements.append(new_layout)
    return elements



def createNewElem(elem_ref, elem_type, _id):
    from elements import base_elements
    base_layout = dict(base_elements[elem_type])
    base_layout['id'] = _id
    base_layout['ref'] = elem_ref
    return base_layout







## Adds a new element to any of the dashboard section
## todo create cli
def addNewElement(element, _dict):
    from elements import base_elements
    mp_elements_dict = getMostUpdatedMPElements()
    new_id = len(mp_elements_dict[element]) + 1
    _dict['id'] = new_id
    mp_elements_dict[element].append(_dict)
    updateElementComponent(mp_elements_dict)
    return mp_elements_dict

def getMostUpdatedMPElements():
    user = formatMPResponse(getQueryDict('engage', {'distinct_id': 4}))
    elements =  user['results'][0]['$properties']['elements']
    return elements

def applyChangeToElement(section, _id, change_dict):
    elemToChange = None
    mpRecentElements = getMostUpdatedMPElements()
    if getMostUpdatedElements.get(section):
        allSectionElems = mpRecentElements[section]
        for elem in allSectionElems:
            if elem.get('id') == _id:
                elemToChange = elem
                elemToChange['missing_fields'] = []
                break
        if elemToChange:
            changeDictKeys = change_dict.keys()
            elemToChange['previous_elem_spec'] = dict(elemToChange)
            for key in changeDictKeys:
                if key in elemToChange:
                    elemToChange[key] = changeDictKeys[key]
                else:
                    elemToChange['missing_fields'].append({key: changeDictKeys[key]})
    mpRecentElements[section] = allSectionElems
    updateElementComponent(mpRecentElements)
    return mpRecentElements



### resolve previous elem spec
### resolving missing fields
def resolveElements():
    import json
    _dict = json.load(open('./app/lib/elements.json'))
    return _dict

def saveDictToElementsJson():
    _dict = getMostUpdatedMPElements()
    saveElementsJson(_dict)
    print "saved to elements.json"

def saveElementsJson(_dict):
    import json
    with open('./app/lib/elements.json', 'wb') as fp:
        json.dump(_dict, fp, sort_keys = True, indent = 4)

def resolveDictToElementsJson():
    import json
    master_elements_dict = json.load(open('./app/lib/elements.json'))
    mp_elements_dict = getMostUpdatedMPElements()
    return master_elements_dict == mp_elements_dict

def validateCreateArgs(args):

    def elemTypeIsValid(elem_type):
        return True

    def refIdIsValid(elem_type):
        return True

    if (len(args)) < 3:
        print "INSUFFICIENT ARGS: %s, required amt: 3" % (len(args))
        return False

    elem_type = args[0]
    state_type = title = scene_obj = state_obj = description = priority = difficulty= description = None
    if 'state:' in elem_type:
        state_type = elem_type.split(":")[1]

    scene_ref_id = args[1]
    assigned_to = args[2]
    if len(args) > 3:
        title = args[3]
    if len(args) > 4:
        description = args[4]
    if len(args) > 5:
        eta = int(args[5])
    if len(args) > 6:
        priority = int(args[6])
    if len(args) > 7:
        difficulty = int(args[7])

    if not elemTypeIsValid(elem_type):
        print "INVALID ELEMENT TYPE: %s" % (len(elem_type))
        return False, None
    if False and refIdIsValid(ref_id):
        print "INVALID ELEMENT TYPE: %s" % (len(elem_type))
        return False, None

    all_elements = loadMostUpdatedElementsJson()
    scene_index = 0
    if scene_ref_id:
        for scene in all_elements['scenes']:
            if scene['ref'] == scene_ref_id or str(scene['id']) == scene_ref_id:
                scene_obj = scene
                break
            scene_index += 1



    currentNumStates = len(all_elements['scenes'][scene_index])
    scene_obj = addStateToScene(state_type, assigned_to, scene_obj, (currentNumStates + 1), title, description, eta, priority, difficulty)
    all_elements['scenes'][scene_index] = scene_obj

    return True, all_elements

def addStateToScene(_type, assign, scene_obj, index, title, description=None, eta=None, priority=None, difficulty=None):
    from elements import base_elements


    state_obj = base_elements['state']
    state_obj['type'] = _type
    state_obj['assigned'].append(assign)
    state_obj['name'] = title.title()
    state_obj['description'] = description
    state_obj['estimated_time'] = eta
    state_obj['priority'] = priority
    state_obj['difficulty'] = difficulty
    state_obj['index'] = index
    from datetime import datetime
    date = datetime.now().date()
    state_obj['time_created'] = "%s/%s" % (date.month, date.day)


    if not scene_obj.get('element_states') or not len(scene_obj['element_states'].keys()):
        scene_obj['element_states'] = base_elements['element_states']

    scene_obj['element_states'][_type].append(state_obj)
    state_obj['ref'] = (scene_obj['name'] + '-state-' + str(len(scene_obj['element_states'][_type]))).replace(' ', '-').lower()

    return scene_obj

def removeStateFromScene(r_scene, state, _type):
    import json
    elements = json.load(open('./app/lib/elements.json'))
    print len(elements['scenes']);
    for scene in elements['scenes']:
        if scene['ref'] == r_scene['ref'] or len(elements['scenes']) > 0:
            element_states = elements['scenes'][0]
            if element_states and _type in element_states:
                print element_states[_type]

def newTestingObj(count, scene_ref):
    return {
        'id': count + 1,
        'ref': scene_ref + '-testing-' + str(count + 1),
        'parent_ref': scene_ref,
        'priority': 5,
        'estimated_time': 5,
        'name': '',
        'description': '',
        'substates': [] ## substates
    }


def modifyStateFromScene(r_scene, r_state, _type, action="edit"):
    import json
    elements = json.load(open('./app/lib/elements.json'))
    # sceneIndex = stateIndex = substateIndex 0
    for scene in elements['scenes']:
        if scene['ref'] == r_scene['ref']:
            element_scene = scene
            if element_scene.get('element_states'):
                element_states = element_scene['element_states']

                if action == 'create':
                        from pprint import pprint
                        print _type
                        pprint(r_state)
                        if _type == "testing":
                            lengthTesting = len(element_scene['element_states'][_type])
                            testingObj = newTestingObj(lengthTesting, scene['ref'])
                            testingObj['name'] = r_state['name']
                            testingObj['description'] = r_state['description']
                            element_scene['element_states'][_type].append(testingObj)
                        else:
                            element_scene['element_states'][_type].append(r_state)
                        return elements

                if element_states.get(_type):
                    scene_type_states = element_states[_type]

                    if action == "remove" or action == "update":
                        for state in scene_type_states:
                            # find matching state
                            if state.get('ref') and state.get('ref') == r_state['ref']:
                                if action == "update":
                                    main_state_index = scene_type_states.index(state)
                                    element_scene['element_states'][_type] = [r_state if main_state_index==index else _state for _state in scene_type_states]
                                elif action == "remove":
                                    element_scene['element_states'][_type].remove(state)
                                    return elements


def modifySubStateFromScene(r_scene, r_substate, r_state, _type, action="edit"):
    import json
    elements = json.load(open('./app/lib/elements.json'))
    # sceneIndex = stateIndex = substateIndex 0
    for scene in elements['scenes']:
        if scene['ref'] == r_scene['ref']:
            element_scene = scene
            print 'found', element_scene['ref']
            if element_scene.get('element_states'):
                element_states = element_scene['element_states']
                if element_states.get(_type):
                    scene_type_states = element_states[_type]
                    for state in scene_type_states:
                        if state.get('ref') and state.get('ref') == r_state['ref']:
                            if action == "create" and state.get('substates'):

                                state['substates'].append(r_substate)
                                return elements
                            for substate in state['substates']:
                                if substate.get('ref') and substate['ref'] == r_substate['ref']:
                                    if action == "remove":
                                        state['substates'].remove(substate)
                                        return elements
                                    if action == "update":
                                        substateIndex = state['substates'].index(substate)
                                        state['substates'] = [r_substate if index==substateIndex else state['substates'][index] for index in range(0, len(state['substates']))]
                                        return elements


            # for substate in element_scene.get(_type):
            #     print substate
            #     if (substate.get('ref') == r_substate.get('ref')):
            #         print
            #         print substate, 'found the substate'
            #         print
    # print len(elements['scenes']);
    # reprocessActionItems(elements)



def reprocessActionItems(elements):
    elements['action_items'] = {'samir': [], 'jason': [], 'gabrielle': [], 'jeselle': []}
    action_item_mapping = {'fluid': 'gabrielle', 'testing': 'jason', 'function': 'samir', 'hifi': 'jeselle'}
    for key in elements.keys():
        if key == 'action_items': continue
        if key == 'scenes' and len(elements[key]):
            all_scenes = elements[key]
            for scene in all_scenes:
                if scene.get('element_states'):
                    diff_state_keys = scene['element_states'].keys()
                    for state_key in diff_state_keys:
                        if scene['element_states'][state_key]:
                            action_items = scene['element_states'][state_key]
                            for item in action_items:
                                member_name = action_item_mapping.get(item['type'])
                                elements['action_items'][member_name].append(item)
            # scene_element_state_keys = elements[key]['element_states'].keys()
            # for key in scene_element_state_keys:
            #     print key

    member_names = elements['action_items'].keys()
    for member in member_names:
        elements['action_items'][member] = sorted(elements['action_items'][member], key=lambda k:k['priority'], reverse=True)


def printAllElementTypes(element_type, sub_element=None, grandchild_element=None):
    all_elements = loadMostUpdatedElementsJson()
    for elem in all_elements[element_type]:
        print elem['id'], elem['ref'], elem['name']


def getInteractiveRequirements():
    return {
        "all_options": ['state:["hifi", "functional", "fluid", "testing"]', 'substate', 'layouts', 'scene', 'container', 'moodboard', 'project', 'admin'],
        "required_spec": {
            "scene": ["name", "description", "template_url", "type"],
            "state": ["name", "desciption", "template_url", "type", "assigned", "substates:nested"],
            "type": [],
            "substate": [],
            "name": [],
            "description": [],
        },
        "optional_spec": {
            "state": ["difficulty", "estimated_time", "index", "priority", "notes"],
        },
        "sub-state": [],
        "scene": [],
        "layouts": [],

    }

def cliFormat(arr_args, action="create"):
    result_str = "\n\nPlease select an option to %s:\n\n\n" % action
    index = 0
    print_args = arr_args + []
    for arg in print_args:
        print_args[index] = str(index + 1) + ". " + arg
        index += 1
        arg = str(index) + '.' + '  ' + arg
    from pprint import pprint
    result_str +=  "\n".join(print_args)
    print result_str + '\n\n'
    return arr_args

def cliTemplate(arr_args):
    option = raw_input("Please choose a number from 1 - %s\n\n>>>  " % len(arr_args))
    option_type = type(option)
    try:
        option = int(option)
        option_type = int
    except:
        pass
    while option_type != int or (int(option) < 1 and int(option) > len(arr_args)):
        print "\ninvalid input --", "please try again\n\n".upper()
        option = raw_input("Please choose a number from 1 - %s\n\n>>>  " % len(arr_args))
        option_type = type(option)
        try:
            option = int(option)
            option_type = int
        except:
            continue
    selected_option = arr_args[int(option) - 1]
    return selected_option, int(option) - 1

def cliFormTemplate(arr_args, _type="required"):
    print "\n\nThese are the %s %s fields to fill out\n\n>>>  " % (len(arr_args), _type)
    filled_args = []
    forced_exit = False
    total_fields = len(arr_args)
    remaining_args = list(arr_args)
    while len(filled_args) != total_fields and not forced_exit:
        prioritized_field = remaining_args[0]
        option = raw_input("Please add a %s\n\n>>>\n" % prioritized_field)
        if len(option) > 5:
            filled_args.append(prioritized_field)
            remaining_args = remaining_args[1:]
        print "\n\nstatus:%s filled out of %s -- only %s left!\n\n" % (len(filled_args), len(arr_args), len(remaining_args))
        index = 1
        for arg in filled_args:
            print "#%s. %s\n >>> %s" % (index, arr_args[index - 1], filled_args[index - 1])
            index += 1
        print "\n\n"
    return filled_args

import sys
args = sys.argv
if 'i' in args:
    print """\n\nsave -- save locally\nupdate -- update local to MP\nresolve -- resolve & init new elements\nprint [layouts, |any element type]-- prints any element type\ncreate [state:[hifi, dynamic, functional, test], container, component] -- creates element type\n\n
    """
    print "update -- update a specific element [id or ref_id] [elem_type]"
if 'save' in args and len(args) == 2:
    saveDictToElementsJson()
if 'update' in args and len(args) == 2:
    syncLocalElementsToMP()
if 'sync' in args and len(args) == 2:
    print "syncing local --> MP"
    syncLocalElementsToMP()
    from time import sleep
    sleep(1)
    print "syncing MP --> Local"
    saveDictToElementsJson()
if 'resolve' in args and len(args) == 2:
    resolveLocalElements()
if 'print' in args and args.index('print') == 1 and len(args) == 3:
    element_type = args[2]
    print element_type
    from elements import base_elements
    if element_type not in base_elements.keys():
        print "UNSUPPORTED ELEMENT TYPE\n\nHere are the supported ones: %s" % (base_elements.keys())
    else:
        printAllElementTypes(element_type)


if 'create' in args or '-c' in args:
    ## 0. Process args && spec
    ## 1. Create
    ## 2. Interactive resolve all arguments
    ## 3. Assign ref accordingly
    ## 4. Link all refs
    ## 4. Sync with MP
    allElementRequirements = getInteractiveRequirements()

    ## arg #1 - select a type
    if len(args) == 3:
        all_options = allElementRequirements["all_options"]
        from pprint import pprint

        all_options = cliFormat(all_options)
        selected_option, selected_index = cliTemplate(all_options)

        all_requirements = allElementRequirements['required_spec'][selected_option.split(':')[0]]
        all_reqs = cliFormTemplate(all_requirements)
        print filled_args, 'filled'
        import sys
        sys.exit()

    # arg #2 what are we editing?
    elif len(args) == 4:
        pass
        ## arg #2 - fill out the fields
    else:
        import sys
        sys.exit()
    validateResults, elements = validateCreateArgs(args[2:])
    if validateResults:
        reprocessActionItems(elements)
        saveElementsJson(elements)
        print 'state successfully created and updated in elements.json'

if 'get' in args or '-g' in args:
    if len(args) == 2:

        allElementRequirements = getInteractiveRequirements()
        all_options = allElementRequirements["all_options"]

        all_options = cliFormat(all_options, action="edit")
        selected_option, selected_index = cliTemplate(all_options)

        mp_dict = getMostUpdatedMPElements()

        option_arr = mp_dict[selected_option.split(':')[0]]
        option_arr_keys = [option['ref'] for option in option_arr]
        from pprint import pprint
        pprint(option_arr_keys)


    if len(args) == 3:
        selected_option = args[2]
        mp_dict = getMostUpdatedMPElements()

        option_arr = mp_dict[selected_option.split(':')[0]]
        option_arr_keys = [option['ref'] for option in option_arr]
        from pprint import pprint
        pprint(option_arr_keys)


if 'edit' in args or '-e' in args:
    if len(args) == 3:

        allElementRequirements = getInteractiveRequirements()
        all_options = allElementRequirements["all_options"]

        all_options = cliFormat(all_options, action="edit")
        selected_option, selected_index = cliTemplate(all_options)

if 'link' in args or '-l' in args:
    validateResults, elements = validateCreateArgs(args[2:])
    if validateResults:
        reprocessActionItems(elements)
        saveElementsJson(elements)
        print 'state successfully created and updated in elements.json'

if 'remove' in args or '-r' in args:
    validateResults, elements = validateCreateArgs(args[2:])
    if validateResults:
        reprocessActionItems(elements)
        saveElementsJson(elements)
        print 'state successfully created and updated in elements.json'




