from app import db
from datetime import datetime

tracks = db.Table('tracks',
                  db.Column('track_id', db.String(64), db.ForeignKey('track.track_id')),
                  db.Column('playlist_id', db.String(64), db.ForeignKey('playlist.playlist_id')),
                  )


class User(db.Model):
    user_id = db.Column(db.String(64), index=True, unique=True, primary_key=True)
    playlists = db.relationship('Playlist', backref='user', lazy='dynamic')

    def to_dict(self):
        data = {
            'user_id': self.user_id,
        }
        return data

    def from_dict(self, data):
        for field in ['user_id']:
            if field in data:
                setattr(self, field, data[field])

    def __repr__(self):
        return '<User {}>'.format(self.user_id)


class Track(db.Model):
    track_id = db.Column(db.String(64), index=True, unique=True, primary_key=True)

    def __repr__(self):
        return '<Track {}>'.format(self.track_id)

    def to_dict(self):
        data = {
            'track_id': self.track_id
        }
        return data

    def from_dict(self, data):
        for field in ['track_id']:
            if field in data:
                setattr(self, field, data[field])


class Playlist(db.Model):
    playlist_id = db.Column(db.String(64), index=True, unique=True, primary_key=True)
    name = db.Column(db.String(64))
    status = db.Column(db.String(10))
    user_id = db.Column(db.String(64), db.ForeignKey('user.user_id'))
    track_id = db.Column(db.String(64), index=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    tracks = db.relationship(
        'Track', secondary=tracks,
        backref=db.backref('playlist', lazy='dynamic'), lazy='dynamic')

    def add_track(self, track):
        self.tracks.append(track)

    def remove_track(self, track):
        self.tracks.remove(track)

    def to_dict(self):
        data = {
            'playlist_id': self.playlist_id,
            'status': self.status,
            'track_id': self.track_id,
            'user_id': self.user_id,
            'timestamp': self.timestamp,
            'playlist_name': self.name,
        }
        return data

    def __repr__(self):
        return '<Playlist {}>'.format(self.playlist_id)
