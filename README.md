# [Spot-A-Song](https://spot-a-song.com)
> An intelligent algorithm that enables users to create awesome playlists based on a song.

Website live at: https://spot-a-song.com/

<p align="center">
  <img src="https://media.giphy.com/media/6CbDLZsB6n0OoXhsuZ/giphy.gif" />
</p>

## App Screenshots
<table align="center">
  <tr>
    <th>Home</th>
    <th>Login</th>
    <th>Playlist</th>
    <th>Playlist Modal</th>
  </tr>
  <tr>
    <td><img width="300em" src="https://i.imgur.com/uTSY8Vi.png" alt="Home" /></td>
    <td><img width="300em" src="https://i.imgur.com/GUh7nU7.png" alt="Login" /></td>
    <td><img width="300em" src="https://i.imgur.com/Bez0FDF.png" alt="Playlist" /></td>
    <td><img width="300em" src="https://i.imgur.com/zwkP2S4.png" alt="Playlist Modal" /></td>
  </tr>
</table>

<table align="center">
  <tr>
    <th>Spotify</th>
    <th>Profile</th>
    <th>Playlists</th>
    <th>And More!</th>
  </tr>
  <tr>
    <td><img width="300em" src="https://i.imgur.com/rKqhzRy.png" alt="Spotify" /></td>
    <td><img width="300em" src="https://i.imgur.com/vzNETfE.png" alt="Profile" /></td>
    <td><img width="300em" src="https://i.imgur.com/oZoTMrb.png" alt="Playlists" /></td>
    <td><img width="300em" src="https://i.imgur.com/xWVmMIe.png" alt="And More!" /></td>
  </tr>
</table>

## Features
- You can create a playlist based on a song
- You can listen to song previews
- You can re-arrange and modify your playlist to your liking
- You can give your new playlist a name and save it to your Spotify account
- You can reference the playlists you've created any time in your playlists section
- You can view other features like top tracks in the app home

## Quickstart
  ```React Frontend```
  
Run the following commands to bootstrap your environment

```bash
git clone https://github.com/Polvyer/Spot-A-Song.git
cd Spot-A-Song/react-frontend
npm install
```

To run the web application use:

```bash
npm start
```

  ```Flask Backend```
  
Before running shell commands, set the ```FLASK_APP``` and ```FLASK_DEBUG``` environment variables

```bash
export FLASK_APP=/path/to/spot-a-song.py
export FLASK_DEBUG=1
```

Then run the following commands to bootstrap your environment

```bash
git clone https://github.com/Polvyer/Spot-A-Song.git
cd Spot-A-Song/flask-backend
pip install -r requirements.txt
```

Run the following commands to create your app's database tables and perform the initial migration

```bash
flask db init
flask db migrate
flask db upgrade
```

To run the web application use:

```bash
flask run
```

## Shell

To open the interactive shell, run

```bash
flask shell
```

By default, you will have access to the flask app and models.

## Migrations

Whenever a database migration needs to be made. Run the following commands
```bash
flask db migrate
```

This will generate a new migration script. Then run
```bash
flask db upgrade
```

To apply the migration.

For a full migration command reference, run ```flask db --help```.
