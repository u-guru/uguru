import time
from apns import APNs, Frame, Payload

apns = APNs(use_sandbox=True, cert_file='uguru-cert.pem', key_file='uguru-key.pem')

token_hex = 'b15c34d2639300184ed4b29cba73ed4f897bcfb7092b0cf6d090edf389e56256'
payload = Payload(alert="TIT COCK", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)
