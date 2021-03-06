"""status

Revision ID: a01892b2624e
Revises: 947cd0d8df16
Create Date: 2021-02-05 01:44:44.636669

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a01892b2624e'
down_revision = '947cd0d8df16'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('playlist', sa.Column('status', sa.String(length=10), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('playlist', 'status')
    # ### end Alembic commands ###
