from app.models import User, Card
from pprint import pprint
user = User.query.get(3122)
pprint(user.cards)


count = 0
for card in Card.query.all():
    if not card.is_transfer_card and not card.is_payment_card and not card.is_bank_account:
    # card.user_id = None
        count += 1
print count


count = 0
for card in Card.query.all():
    if card.is_bank_account:
        count += 1
print count