"""empty message

Revision ID: ea28a9b38a
Revises: 295459b37a74
Create Date: 2014-11-28 17:48:39.710334

"""

# revision identifiers, used by Alembic.
revision = 'ea28a9b38a'
down_revision = '295459b37a74'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user-address_assoc',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user-address_assoc')
    ### end Alembic commands ###
