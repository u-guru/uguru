import time
from apns import APNs, Frame, Payload

apns = APNs(use_sandbox=True, cert_file='uguru-cert.pem', key_file='uguru-newkey.pem')

token_hex = '91258cbd9d521d53ca5d5a6534a82bb9aef13ee9071b3067af4598a93cc02922'
payload = Payload(alert="Suck a dick!", sound="default", badge=1)
apns.gateway_server.send_notification(token_hex, payload)
