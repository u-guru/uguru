"""empty message

Revision ID: 5ad2a6cf2f02
Revises: 7583748da7e
Create Date: 2015-06-14 23:47:54.925974

"""

# revision identifiers, used by Alembic.
revision = '5ad2a6cf2f02'
down_revision = '7583748da7e'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('skill',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_added', sa.DateTime(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('short_name', sa.String(), nullable=True),
    sa.Column('full_name', sa.String(), nullable=True),
    sa.Column('admin_approved', sa.Boolean(), nullable=True),
    sa.Column('contributed_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['contributed_user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user-skill_assoc',
    sa.Column('skill_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['skill_id'], ['skill.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    op.add_column(u'request', sa.Column('guru_hourly', sa.Float(), nullable=True))
    op.add_column(u'tag', sa.Column('is_profession', sa.Boolean(), nullable=True))
    op.add_column(u'user', sa.Column('max_hourly', sa.Float(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column(u'user', 'max_hourly')
    op.drop_column(u'tag', 'is_profession')
    op.drop_column(u'request', 'guru_hourly')
    op.drop_table('user-skill_assoc')
    op.drop_table('skill')
    ### end Alembic commands ###
