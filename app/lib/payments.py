import stripe

def create_stripe_customer(token, user):
    try:
        customer = stripe.Customer.create(
                    email=user.email,
                    card = token
                    )
    except stripe.error.CardError, e:
        return False

    user.customer_id = customer.id
    user.customer_last4 = customer['cards']['data'][0]['last4']
    return True

def create_stripe_recipient(token, user):
    try:
        recipient = stripe.Recipient.create(
                    name=user.name,
                    type="individual",
                    email=user.email,
                    card=token
                )
    except stripe.error.InvalidRequestError, e:
        return False
    except stripe.error.CardError, e:
        return False
    
    user.recipient_last4 = recipient['cards']['data'][0]['last4']
    user.recipient_id = recipient.id

    #Successfully created
    return True

#TODO: Validate this better
def create_stripe_transfer(amount, user):
    transfer = stripe.Transfer.create( # TODO : assigned but unused
        amount=int(amount * 100), # amount in cents, again
        currency="usd",
        recipient=user.recipient_id
    )
    return transfer