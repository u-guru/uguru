import stripe, os

# stripe.api_key = os.environ.get('STRIPE_PUBLISHABLE_KEY')
stripe.api_key = 'sk_test_3PFFx8W4mSRwDaJ4JKkZMKtW'

def create_customer(user, token):

    try:
        stripe_customer = stripe.Customer.create(
          description="Customer for " + str(user.name) + ', ' + str(user.email),
          source=token
        )

        return stripe_customer.id
    except stripe.error.CardError, e:
          # Since it's a decline, stripe.error.CardError will be caught
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']

        return str(e.json_body)

    except stripe.error.StripeError, e:

        body = e.json_body
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']
        return str(e.json_body)

def create_recipient(user, token):

    try:
        stripe_recipient = stripe.Recipient.create(
          description="Recipient for " + str(user.name) + ', ' + str(user.email),
          type="individual",
          name=user.name,
          card=token
        )

        return stripe_recipient.id

    except stripe.error.CardError, e:
          # Since it's a decline, stripe.error.CardError will be caught
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']

        return str(e.json_body)

    except stripe.error.StripeError, e:

        body = e.json_body
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']

        return str(e.json_body)


def charge_customer(user, amount):

    default_card = None
    for card in user.cards:
        if card.is_default:
            default_card = card

    try:
        stripe_charge = stripe.Charge.create(
          amount=int(amount * 100),
          currency="usd",
          customer=default_card.stripe_customer_id, # obtained with Stripe.js
          description="Charge for " + str(user.name) + ", " + str(user.email)
        )

        return stripe_charge

      # Since it's a decline, stripe.error.CardError will be caught
    except stripe.error.CardError, e:
          # Since it's a decline, stripe.error.CardError will be caught
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']

        return str(e.json_body)

    except stripe.error.StripeError, e:

        body = e.json_body
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        # print "Code is: %s" % err['code']
        # # param is '' in this case
        # print "Param is: %s" % err['param']
        # print "Message is: %s" % err['message']
        return str(e.json_body)



def transfer_funds(user, amount):

    try:
        stripe_transfer = stripe.Transfer.create(
          amount=int(amount * 100),
          currency="usd",
          recipient=user.recipient_id,
          description="Transfer for " + str(user.name) + ", " + str(user.email)
        )

        return stripe_transfer

    except stripe.error.CardError, e:
          # Since it's a decline, stripe.error.CardError will be caught
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']

        return str(e.json_body)

    except stripe.error.StripeError, e:

        body = e.json_body
        err  = body['error']

        print "Status is: %s" % e.http_status
        print "Type is: %s" % err['type']
        print "Code is: %s" % err['code']
        # param is '' in this case
        print "Param is: %s" % err['param']
        print "Message is: %s" % err['message']
        return str(e.json_body)