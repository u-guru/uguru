import stripe

#TODO, write this much better
def create_stripe_customer(token, user):
    try:
        customer = stripe.Customer.create(
                    email=user.email,
                    card = token
                    )
    except stripe.error.CardError, e:
        return 'error'

    user.customer_id = customer.id
    user.customer_last4 = customer['cards']['data'][0]['last4']
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise 
    return 'success'

def create_stripe_recipient(token, user):
    logging.info("Create stripe recipient" + str(user))
    recipient = stripe.Recipient.create(
                    name=user.name,
                    type="individual",
                    email=user.email,
                    card=token
                )
    user.recipient_last4 = recipient['cards']['data'][0]['last4']
    logging.info(user.recipient_last4)
    user.recipient_id = recipient.id
    try:
        db_session.commit()
    except:
        db_session.rollback()
        raise