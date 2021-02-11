from app import create_app, db
from models import User, Track, Playlist

app = create_app()


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Track': Track, 'Playlist': Playlist}
