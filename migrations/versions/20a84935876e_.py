"""empty message

Revision ID: 20a84935876e
Revises: 1b2c3c83a2a0
Create Date: 2015-12-10 19:01:45.058568

"""

# revision identifiers, used by Alembic.
revision = '20a84935876e'
down_revision = '1b2c3c83a2a0'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('session', sa.Column('course_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'session', 'course', ['course_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'session', type_='foreignkey')
    op.drop_column('session', 'course_id')
    ### end Alembic commands ###