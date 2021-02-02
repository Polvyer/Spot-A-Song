import base64
import requests
from flask import current_app, jsonify, request
from app.api import bp


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

