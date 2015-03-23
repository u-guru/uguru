import mandrill
MANDRILL_API_KEY = 'JgZAGUHchIAIlJmOCrE_4w'
mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)

def get_emails_sent_past_week(limit=1000):
    result = mandrill_client.messages.search(mandrill_client.messages.search(limit=limit))
    return result