import React from 'react'
import {WithDeezerToken} from './TokenProvider'
import ParseAlbums from './ParseAlbums'

function Parser({playlistId, accessToken}) {

	const [tracks, setTracks] = React.useState([])
	const [done, setDone] = React.useState(false)

	React.useEffect(() => {
		let counter = 0;

		function callBack ({data, total}) {
			const missingTracks = total - data.length - counter
			counter+=data.length
			setTracks(tracks => ([...tracks, ...data]))

			if (missingTracks > 0)
				return new Promise(resolve => setTimeout(resolve, 100))		//Deezer API limit is 50 requests / 5 s ---> 1 every 100 ms should be fine
				.then(() => fetch('/deezer/playlist/'+playlistId+'/tracks?index='+counter+'&access_token='+accessToken))
				.then(res => res.json())
				.then(callBack)
			else
				setDone(true)
		}

		fetch('/deezer/playlist/'+playlistId+'/tracks?access_token='+accessToken)
		.then(res => res.json())
		.then(callBack)
		.catch(err => console.error(err))
	}, [])

	if (done)
		return <ParseAlbums albums={tracks.map(({album}) => album.id )}/>

	return <div>Loading...</div>
}

export default WithDeezerToken(Parser)
