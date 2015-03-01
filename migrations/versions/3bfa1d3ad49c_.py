"""empty message

Revision ID: 3bfa1d3ad49c
Revises: 1bd0001087f7
Create Date: 2015-02-28 16:09:40.319394

"""

# revision identifiers, used by Alembic.
revision = '3bfa1d3ad49c'
down_revision = '1bd0001087f7'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('event', sa.Column('impacted_user_id', sa.Integer(), nullable=True))
    op.add_column('event', sa.Column('impacted_user_notified', sa.Boolean(), nullable=True))
    op.create_foreign_key(None, 'event', 'user', ['impacted_user_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'event', type_='foreignkey')
    op.drop_column('event', 'impacted_user_notified')
    op.drop_column('event', 'impacted_user_id')
    ### end Alembic commands ###
