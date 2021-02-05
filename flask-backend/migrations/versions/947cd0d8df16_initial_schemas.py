"""initial schemas

Revision ID: 947cd0d8df16
Revises: 
Create Date: 2021-02-04 23:58:43.610679

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '947cd0d8df16'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('track',
    sa.Column('track_id', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('track_id')
    )
    op.create_index(op.f('ix_track_track_id'), 'track', ['track_id'], unique=True)
    op.create_table('user',
    sa.Column('user_id', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_index(op.f('ix_user_user_id'), 'user', ['user_id'], unique=True)
    op.create_table('playlist',
    sa.Column('playlist_id', sa.String(length=64), nullable=False),
    sa.Column('user_id', sa.String(length=64), nullable=True),
    sa.Column('track_id', sa.String(length=64), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('playlist_id')
    )
    op.create_index(op.f('ix_playlist_playlist_id'), 'playlist', ['playlist_id'], unique=True)
    op.create_index(op.f('ix_playlist_timestamp'), 'playlist', ['timestamp'], unique=False)
    op.create_index(op.f('ix_playlist_track_id'), 'playlist', ['track_id'], unique=False)
    op.create_table('tracks',
    sa.Column('track_id', sa.String(length=64), nullable=True),
    sa.Column('playlist_id', sa.String(length=64), nullable=True),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlist.playlist_id'], ),
    sa.ForeignKeyConstraint(['track_id'], ['track.track_id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tracks')
    op.drop_index(op.f('ix_playlist_track_id'), table_name='playlist')
    op.drop_index(op.f('ix_playlist_timestamp'), table_name='playlist')
    op.drop_index(op.f('ix_playlist_playlist_id'), table_name='playlist')
    op.drop_table('playlist')
    op.drop_index(op.f('ix_user_user_id'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_track_track_id'), table_name='track')
    op.drop_table('track')
    # ### end Alembic commands ###
