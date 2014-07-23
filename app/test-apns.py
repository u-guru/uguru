import time
from apns import APNs, Frame, Payload

apns = APNs(use_sandbox=True, cert_file='uguru-cert.pem', key_file='uguru-key.pem')

token_hex = 'b15c34d2639300184ed4b29cba73ed4f897bcfb7092b0cf6d090edf389e56256'
payload = Payload(alert="Samir needs help with CS10. You can make $30", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)


token_hex = 'b15c34d2639300184ed4b29cba73ed4f897bcfb7092b0cf6d090edf389e56256'
payload = Payload(alert="You've been matched with Samir. Message now", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)

token_hex = 'b15c34d2639300184ed4b29cba73ed4f897bcfb7092b0cf6d090edf389e56256'
payload = Payload(alert="You have received one new message from Michael", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)

token_hex = 'b15c34d2639300184ed4b29cba73ed4f897bcfb7092b0cf6d090edf389e56256'
payload = Payload(alert="You just made $45. Cash out now.", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)