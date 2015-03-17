from app.tasks import *
from app.models import *
from app.lib.guru_rank import *


def create_minimal_request():
    users = User.query.all()
    course = Course.query.get(139)
    request = Request()
    request.course_id = 139
    request.student_id = users[0].id
    db_session.add(request)
    db_session.commit()
    return request


### TASK, happens some time in the future
# def check_proposal_status(proposal_id):

# helper method
# def expire_proposal(proposal, proposal_status):
#     proposal.status = proposal.proposal_status
#     proposal.request.guru_id = None
#     db_session.commit()

# def create_guru_proposal(_request, guru, calendar):
#     proposal = Proposal.initProposal(_request.id, guru.id, calendar.id)
#     event_dict = {'status': Proposal.GURU_SENT, 'proposal_id':proposal.id}
#     event = Event.initFromDict(event_dict)
#     return proposal
    ## send notification to guru here
    ## send check_proposal_status_task

## expiration constants

def run_algo():

    # default algorithm
    test_request = create_minimal_request()
    best_guru_available = get_best_guru(test_request)

    calendar = Calendar()
    db_session.add(calendar)
    test_request.student_calendar = calendar
    db_session.commit()
    proposal = create_guru_proposal(test_request, best_guru_available, calendar)

    print 'proposing with id', proposal.id, 'to guru', best_guru_available.id, 'for request ', test_request.id
    check_proposal_status.apply_async(args=[proposal.id, proposal.status], countdown=proposal.GURU_STATE_EXP_TIME_ARR[proposal.status])
    print "checking status in ", proposal.GURU_STATE_EXP_TIME_ARR[proposal.status], 'seconds'
    print ''


    # print sorted_available_gurus



    # guru receives push_request (state 0)
        # when task checks in
            ## check_state (before, after)
            # if state 0, 0 --> expire request (helper method)
            # if state 0, 1 --> increase expiration time by GURU_STATE_1_EXP_TIME
            # if state 1, 2 --> increase expiration time from time_updated to time_updated
            # if state 3 --> return
        # expires --> go to next
        # accepts --> go to student --> accept
        #

    # 1. send gurus notifications (send_guru_notification_delayed)

    # 2. guru(s) receives proposal (actions --> accept, reject, expire)

    # 3. student receives proposal (actions --> reject, accept, expire)

    # 4.

    # notif_key = 'student_request'
    # args_tuple = ('50', 'CS10', 'Mami', '20min')
    # send_push_for_user_devices(user, notif_key, args_tuple)

