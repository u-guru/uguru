"""empty message

Revision ID: 177bdb33eb5f
Revises: 501b4ed64e4a
Create Date: 2015-12-23 21:57:47.169482

"""

# revision identifiers, used by Alembic.
revision = '177bdb33eb5f'
down_revision = '501b4ed64e4a'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user-university_assoc',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('university_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['university_id'], ['university.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    op.add_column(u'file', sa.Column('high_school', sa.Boolean(), nullable=True))
    op.add_column(u'file', sa.Column('university_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'file', 'university', ['university_id'], ['id'])
    op.add_column(u'request', sa.Column('high_school', sa.Boolean(), nullable=True))
    op.add_column(u'request', sa.Column('hs_request_option', sa.String(), nullable=True))
    op.add_column(u'user', sa.Column('hs_student', sa.Boolean(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column(u'user', 'hs_student')
    op.drop_column(u'request', 'hs_request_option')
    op.drop_column(u'request', 'high_school')
    op.drop_constraint(None, 'file', type_='foreignkey')
    op.drop_column(u'file', 'university_id')
    op.drop_column(u'file', 'high_school')
    op.drop_table('user-university_assoc')
    ### end Alembic commands ###
