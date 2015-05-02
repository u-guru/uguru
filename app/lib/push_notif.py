import time
from apns import APNs, Frame, Payload

from gcm import GCM
ANDROID_API_KEY = "AIzaSyDwyrdLCMru6MrmFZqAjIDEwRsPTON4lPc"

gcm_client = GCM(ANDROID_API_KEY)
# apns_client = APNs(use_sandbox=True, cert_file='app/lib/certs/push_cert.pem', key_file='app/lib/certs/push_key_no_pass.pem')
apns_client = APNs(cert_file='app/lib/certs/PushUguruCert.pem', key_file='app/lib/certs/PushUguruKeyNoPass.pem')

### TODO: SEND TO USERS MULTIPLE DEVICES
### Edge Test Push Cases:
### 1. User has multiple devices (they receive all of them)

def send_ios_notification(message, user_apns_token):
    token_hex = user_apns_token
    payload = Payload(alert=message, sound="default", badge=1)
    apns_client.gateway_server.send_notification(user_apns_token, payload)


def send_android_notification(message, registration_id):
    data = {'message': message}
    gcm_client.plaintext_request(registration_id=registration_id, data=data)


def compose_push_notif_message(notif_key, args_tuple):
    return str(push_notif_copy[notif_key] % args_tuple)

def send_push_for_user_devices(user, notif_key, args_tuple):
    #TODO add delay
    message = compose_push_notif_message(notif_key, args_tuple)

    for device in user.devices:
        print str(user.name), 'is receiving', message
        print device.id, device.platform, device.push_notif, device.push_notif_enabled
        # if device is ios & push enabled

        if device.platform and device.push_notif and device.push_notif_enabled:
            device_os = device.platform.lower()
            if device_os == 'ios':

                user_apns_token = device.push_notif
                send_ios_notification(message, user_apns_token)

            if device_os == 'android':

                android_reg_id = device.push_notif
                send_android_notification(message, android_reg_id)

def send_message_to_receiver(sender, receiver, course, delay_seconds=None):
    args_tuple = (
        sender.name.split(' ')[0].title(),
        course.short_name.upper()
        )
    if not delay_seconds:
        send_push_for_user_devices(receiver, 'message_received', args_tuple)
    else:
        send_push_for_user_devices.delay(user=sender, \
            notif_key='message_received',
            args_tuple=args_tuple,
            countdown= delay_seconds )

def send_student_has_accepted_to_guru(session, guru, delay_seconds=None):

    total_hours = session.hours
    #TODO FIX
    if not session.hours:
        session.hours = 1
        session.minutes = 0
    if session.minutes:
        total_hours += int((session.minutes / 60.0 * 100)/100)
    else:
        total_hours = session.hours
    estimated_price = session.request.DEFAULT_PRICE * total_hours
    args_tuple = (
        str(estimated_price)
        )
    if not delay_seconds:
        send_push_for_user_devices(guru, 'student_chose_guru', args_tuple)
    else:
        send_push_for_user_devices.delay(user=guru, \
            notif_key='student_chose_guru',
            args_tuple=args_tuple,
            countdown= delay_seconds )

def send_guru_proposal_to_student(proposal, student, delay_seconds=None):
    args_tuple = (
        proposal.guru.name.split(' ')[0].title(),
        str(10)
    )

    if not delay_seconds:
        send_push_for_user_devices(student, 'guru_can_help', args_tuple)
    else:
        send_push_for_user_devices.delay(user=student, \
            notif_key='guru_can_help',
            args_tuple=args_tuple,
            countdown= delay_seconds )

def send_student_request_to_guru(_request, guru, delay_seconds=None):
    args_tuple = (
        _request.DEFAULT_PRICE,
        _request.time_estimate,
        _request.student.name.split(" ")[0],
        _request.course.short_name.upper()
    )

    # send push to to guru
    if not delay_seconds:
        send_push_for_user_devices(guru, 'student_request', args_tuple)
    else:
        send_push_for_user_devices.delay(user=guru, \
            notif_key='student_request',
            args_tuple=args_tuple,
            countdown= delay_seconds )




# TODO , finish the copy
push_notif_copy = {
    "student_request": """Make $%s total in %smin helping %s in %s. Swipe for more details & increase response rate""",

    "guru_can_help": """%s can help! Swipe for more details. %s min until this expires.""",

    "student_chose_guru": """Congrats! You're one step away from earning $%s, Swipe & start preparing now.""",

    "guru_student_canceled": "",
    "guru_student_rejected": "",
    "message_received":"""You have one new message from %s about %s""",
    "message_received_nudged": "",

}
