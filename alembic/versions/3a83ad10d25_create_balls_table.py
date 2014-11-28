"""create balls table

Revision ID: 3a83ad10d25
Revises: None
Create Date: 2014-11-26 21:08:09.848328

"""

# revision identifiers, used by Alembic.
revision = '3a83ad10d25'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
	op.create_table(
        'ball',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('description', sa.Unicode(200)),
    )

def downgrade():
	op.drop_table('ball')
