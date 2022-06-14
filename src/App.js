import React from 'react'
import UserPlaylist from './ParseUserPlaylist'
import PublicPlaylist from './ParsePublicPlaylist'
import ParsePlaylist from './ParsePlaylist'

function App() {

	const [source, setSource] = React.useState('')
	const [playlistId, setPlaylistId] = React.useState('')

	switch(source){
		case 'user_playlist':
			if (playlistId)
				return <ParsePlaylist playlistId={playlistId}/>

			return (
				<div>
					<UserPlaylist setPlaylistId={setPlaylistId}/>
				</div>
			)
		case 'user_history':
			return (
				<div>
				dshkc
				</div>
			)
		case 'playlist':
			if (playlistId)
				return <ParsePlaylist playlistId={playlistId}/>

			return (
				<div>
					<PublicPlaylist setPlaylistId={setPlaylistId}/>
				</div>
			)
		default:
			return (
				<div>
					Select track list source type:

					<select onChange={e => setSource(e.target.value)} defaultValue='placeholder'>
						<option value='placeholder' disabled> --select-- </option>
						<option value='user_playlist'>User playlist</option>
						<option value='user_history'>User listening history</option>
						<option value='playlist'>Public playlist</option>
						{/*<option>Custom list</option>*/}
						{/*<option>Artist</option>*/}
					</select>
				</div>
			)
	}

}

export default App;
