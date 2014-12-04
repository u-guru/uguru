"""Adding new fields for samir's new jank-ass dank-ass temp DB

Revision ID: 515853c23e1c
Revises: 51cff19af108
Create Date: 2014-12-03 22:34:20.522878

"""

# revision identifiers, used by Alembic.
revision = '515853c23e1c'
down_revision = '51cff19af108'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('conversation', sa.Column('is_active', sa.Boolean(), nullable=True))
    op.add_column('request', sa.Column('pending_tutor_description', sa.String(), nullable=True))
    op.add_column('request', sa.Column('pending_tutor_id', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('request', 'pending_tutor_id')
    op.drop_column('request', 'pending_tutor_description')
    op.drop_column('conversation', 'is_active')
    ### end Alembic commands ###
