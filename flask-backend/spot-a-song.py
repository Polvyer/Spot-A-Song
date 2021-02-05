from app import create_app, db
from app.models import User, Track, Playlist

app = create_app()


def clear_db():
    users = User.query.all()
    for user in users:
        db.session.delete(user)
    tracks = Track.query.all()
    for track in tracks:
        db.session.delete(track)
    playlists = Playlist.query.all()
    for playlist in playlists:
        db.session.delete(playlist)
    db.session.commit()
    return


def get_db():
    users = User.query.all()
    tracks = Track.query.all()
    playlists = Playlist.query.all()
    print(users)
    print(tracks)
    print(playlists)


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Track': Track, 'Playlist': Playlist, 'Clear': clear_db, 'All': get_db}
