import time
from apns import APNs, Frame, Payload

apns = APNs(use_sandbox=True, cert_file='uguru-cert.pem', key_file='uguru-key.pem')

token_hex = '91258cbd9d521d53ca5d5a6534a82bb9aef13ee9071b3067af4598a93cc02922'
payload = Payload(alert="Samir needs help with CS10. You can make $30", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)

payload = Payload(alert="You've been matched with Samir. Message now", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)

payload = Payload(alert="You have received one new message from Michael", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)


payload = Payload(alert="You just made $45. Cash out now.", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)