"""empty message

Revision ID: 2be24328f877
Revises: 197b8dd8caf1
Create Date: 2015-02-16 13:44:52.423298

"""

# revision identifiers, used by Alembic.
revision = '2be24328f877'
down_revision = '197b8dd8caf1'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('build', sa.Column('major_num', sa.Integer(), nullable=True))
    op.add_column('build', sa.Column('minor_num', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('build', 'minor_num')
    op.drop_column('build', 'major_num')
    ### end Alembic commands ###
