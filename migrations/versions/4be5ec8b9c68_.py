"""empty message

Revision ID: 4be5ec8b9c68
Revises: 37ac80bcd8db
Create Date: 2016-02-09 20:48:08.121355

"""

# revision identifiers, used by Alembic.
revision = '4be5ec8b9c68'
down_revision = '37ac80bcd8db'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('request', sa.Column('tz_offset', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('request', 'tz_offset')
    ### end Alembic commands ###
