import React from 'react'
import UserPlaylist from './ParseUserPlaylist'

function App() {

	const [source, setSource] = React.useState('')

	switch(source){
		case 'user_playlist':
			return (
				<div>
					<UserPlaylist/>
				</div>
			)
		case 'user_history':
			return (
				<div>
				dshkc
				</div>
			)
		case 'playlist':
			return (
				<div>
				tge
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
					</select>
				</div>
			)
	}

}

export default App;
