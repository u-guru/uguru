"""empty message

Revision ID: 536f14a2da0e
Revises: 24646358de05
Create Date: 2015-02-06 14:40:16.339881

"""

# revision identifiers, used by Alembic.
revision = '536f14a2da0e'
down_revision = '24646358de05'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('department',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('code', sa.String(), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('university_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['university_id'], ['university.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('relationship',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('guru_id', sa.Integer(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['guru_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rating',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_time_rated', sa.DateTime(), nullable=True),
    sa.Column('guru_time_rated', sa.DateTime(), nullable=True),
    sa.Column('student_rating', sa.Integer(), nullable=True),
    sa.Column('guru_rating', sa.Integer(), nullable=True),
    sa.Column('student_rating_description', sa.String(), nullable=True),
    sa.Column('guru_rating_description', sa.String(), nullable=True),
    sa.Column('guru_id', sa.Integer(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['guru_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('description', sa.DateTime(), nullable=True),
    sa.Column('status', sa.Integer(), nullable=True),
    sa.Column('course_id', sa.Integer(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['course_id'], ['course.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('proposal',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.Column('request_id', sa.Integer(), nullable=True),
    sa.Column('guru_id', sa.Integer(), nullable=True),
    sa.Column('guru_rank', sa.Integer(), nullable=True),
    sa.Column('status', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['guru_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['request_id'], ['request.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_sent', sa.DateTime(), nullable=True),
    sa.Column('time_seen', sa.DateTime(), nullable=True),
    sa.Column('contents', sa.String(), nullable=True),
    sa.Column('_type', sa.Integer(), nullable=True),
    sa.Column('relationship_id', sa.Integer(), nullable=True),
    sa.Column('session_id', sa.Integer(), nullable=True),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['receiver_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['relationship_id'], ['relationship.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['session_id'], ['session.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('description', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('session_id', sa.Integer(), nullable=True),
    sa.Column('request_id', sa.Integer(), nullable=True),
    sa.Column('proposal_id', sa.Integer(), nullable=True),
    sa.Column('relationship_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['proposal_id'], ['proposal.id'], ),
    sa.ForeignKeyConstraint(['relationship_id'], ['relationship.id'], ),
    sa.ForeignKeyConstraint(['request_id'], ['request.id'], ),
    sa.ForeignKeyConstraint(['session_id'], ['session.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('file',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=True),
    sa.Column('_type', sa.String(), nullable=True),
    sa.Column('size', sa.String(), nullable=True),
    sa.Column('time_created', sa.String(), nullable=True),
    sa.Column('time_updated', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('request_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('relationship_id', sa.Integer(), nullable=True),
    sa.Column('message_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['message_id'], ['message.id'], ),
    sa.ForeignKeyConstraint(['relationship_id'], ['relationship.id'], ),
    sa.ForeignKeyConstraint(['request_id'], ['request.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'position', sa.Column('request_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'position', 'request', ['request_id'], ['id'])
    op.add_column(u'session', sa.Column('rating_id', sa.Integer(), nullable=True))
    op.add_column(u'session', sa.Column('relationship_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'session', 'rating', ['rating_id'], ['id'])
    op.create_foreign_key(None, 'session', 'relationship', ['relationship_id'], ['id'])
    op.add_column(u'support', sa.Column('rating_id', sa.Integer(), nullable=True))
    op.add_column(u'support', sa.Column('time_resolved', sa.DateTime(), nullable=True))
    op.create_foreign_key(None, 'support', 'rating', ['rating_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'support', type_='foreignkey')
    op.drop_column(u'support', 'time_resolved')
    op.drop_column(u'support', 'rating_id')
    op.drop_constraint(None, 'session', type_='foreignkey')
    op.drop_constraint(None, 'session', type_='foreignkey')
    op.drop_column(u'session', 'relationship_id')
    op.drop_column(u'session', 'rating_id')
    op.drop_constraint(None, 'position', type_='foreignkey')
    op.drop_column(u'position', 'request_id')
    op.drop_table('file')
    op.drop_table('event')
    op.drop_table('message')
    op.drop_table('proposal')
    op.drop_table('request')
    op.drop_table('rating')
    op.drop_table('relationship')
    op.drop_table('department')
    ### end Alembic commands ###
