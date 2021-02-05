import base64
import requests
from flask import current_app, jsonify, request, url_for
from app.api import bp
from app.api.errors import bad_request
from app.models import User, Track, Playlist
from app import db


@bp.route('/tracks/<track_id>', methods=['GET'])
def get_track(track_id):
    return jsonify(Track.query.get_or_404(track_id).to_dict())


@bp.route('/tracks', methods=['POST'])
def create_track():
    data = request.form
    if 'track_id' not in data:
        return bad_request('Must include track_id field')
    if Track.query.filter_by(track_id=data['track_id']).first():
        return bad_request('Please use a different track id')
    track = Track()
    track.from_dict(data)
    db.session.add(track)
    db.session.commit()
    response = jsonify(track.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_track', track_id=track.track_id)
    return response


@bp.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    playlists_list = user.playlists.all()
    playlists = []
    for playlist in playlists_list:
        playlists.append(playlist.to_dict())
    data = user.to_dict()
    data['playlists'] = playlists
    response = jsonify(data)
    return response


@bp.route('/users', methods=['POST'])
def create_user():
    data = request.form
    if 'user_id' not in data:
        return bad_request('Must include user_id field')
    if User.query.filter_by(user_id=data['user_id']).first():
        return bad_request('Please use a different user id')
    user = User()
    user.from_dict(data)
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_user', user_id=user.user_id)
    return response


@bp.route('/playlists/<playlist_id>', methods=['GET'])
def get_playlist(playlist_id):
    playlist = Playlist.query.get_or_404(playlist_id)
    tracks_list = playlist.tracks.all()
    tracks = []
    for track in tracks_list:
        tracks.append(track.to_dict())
    data = playlist.to_dict()
    data['tracks'] = tracks
    response = jsonify(data)
    return response


@bp.route('/playlists', methods=['POST'])
def create_playlist():
    data = request.get_json() or {}
    if 'user_id' not in data or 'status' not in data or 'playlist_id' not in data or 'track_id' not in data or 'tracks' not in data:
        return bad_request('Must include user_id, playlist_id, status, track_id, and tracks fields')
    if Playlist.query.filter_by(playlist_id=data['playlist_id']).first():
        return bad_request('Please use a different playlist id')
    user = User.query.filter_by(user_id=data['user_id']).first()
    if not user:
        user = User()
        user.from_dict(data)
        db.session.add(user)
    playlist = Playlist(user_id=user.user_id, status=data['status'], track_id=data['track_id'], playlist_id=data['playlist_id'])
    db.session.add(playlist)
    for track in data['tracks']:
        trk = Track.query.filter_by(track_id=track).first()
        if not trk:
            trk = Track(track_id=track)
            db.session.add(trk)
        playlist.add_track(trk)
    db.session.commit()
    tracks_list = playlist.tracks.all()
    tracks = []
    for track in tracks_list:
        tracks.append(track.to_dict())
    data = playlist.to_dict()
    data['tracks'] = tracks
    response = jsonify(data)
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_playlist', playlist_id=playlist.playlist_id)
    return response


@bp.route('/token', methods=['GET', 'POST'])
def get_token():
    if 'SPOTIFY_CLIENT_SECRET' not in current_app.config or \
        not current_app.config['SPOTIFY_CLIENT_SECRET'] or \
        'SPOTIFY_CLIENT_ID' not in current_app.config or \
            not current_app.config['SPOTIFY_CLIENT_ID']:
        return 'Error: the spotify service is not configured'

    auth_header_str = current_app.config["SPOTIFY_CLIENT_ID"] + ':' + current_app.config["SPOTIFY_CLIENT_SECRET"]
    auth_header_bytes = auth_header_str.encode('utf-8')
    auth_header_b64 = base64.b64encode(auth_header_bytes)
    auth_header = auth_header_b64.decode("utf-8")

    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': f'Basic {auth_header}'}
    data = {
        'grant_type': 'client_credentials'}

    if request.method == 'POST':
        if 'code' in request.form:
            data['code'] = request.form['code']
            data['redirect_uri'] = 'http://localhost:3000'
            data['grant_type'] = 'authorization_code'
        else:
            data['refresh_token'] = request.form['refresh_token']
            data['grant_type'] = 'refresh_token'

    response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
    json_response = response.json()
    return jsonify(json_response), response.status_code

