import React from 'react'
import {WithDeezerToken} from './TokenProvider'
import ParseAlbums from './ParseAlbums'

function Parser({playlistId, accessToken}) {

	const [tracks, setTracks] = React.useState([])
	const [done, setDone] = React.useState(false)

	React.useEffect(() => {

		function callBack ({data, total}) {
			const missingTracks = total - data.length - tracks.length
			setTracks(tracks => ([...tracks, ...data]))

			if (missingTracks > 0)
				return fetch('/deezer/playlist/'+playlistId+'/tracks?index='+(total-missingTracks)+'&access_token='+accessToken)
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
