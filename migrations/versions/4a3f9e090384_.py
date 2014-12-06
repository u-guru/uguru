"""added gender to user

Revision ID: 4a3f9e090384
Revises: 41c02efd8a7d
Create Date: 2014-12-05 19:24:08.646790

"""

# revision identifiers, used by Alembic.
revision = '4a3f9e090384'
down_revision = '41c02efd8a7d'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', sa.String(length=64), nullable=True))

    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('gender')

    ### end Alembic commands ###
