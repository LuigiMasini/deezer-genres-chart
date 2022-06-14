import React from 'react'
import {WithDeezerToken} from './TokenProvider'
import ParsePlaylist from './ParsePlaylist'

function Parser ({accessToken}) {

	const [playlists, setPlaylists] = React.useState()
	const [playlistsLeft, setPlaylistsLeft] = React.useState()
	const [playlistId, setPlaylistId] = React.useState()

	React.useEffect(() => {
		fetch('/deezer/user/me/playlists?access_token='+accessToken)
		.then(res => res.json())
		.then( ({data, total}) => {
			setPlaylists(data)
			setPlaylistsLeft(total - data.length)
		})
		.catch(err => console.error(err))
	}, [])

	function loadMore (e) {
		e.preventDefault()

		fetch('/deezer/user/me/playlists?index='+playlists.length+'&access_token='+accessToken)
		.then(res => res.json())
		.then( ({data, total}) => {
			setPlaylistsLeft(total - data.length - playlists.length)
			setPlaylists([...playlists, ...data])
		})
	}

	if (playlistId)
		return <ParsePlaylist playlistId={playlistId}/>

	if(playlists)
		return (
			<div className="playlists">
				{playlists.map( ({id, title, picture_medium, creator}) =>
					<div key={id} onClick={() => setPlaylistId(id)} className="playlist">
						<img src={'/images'+picture_medium.split('/images')[1]} alt={title + ' playlist cover'} width="100" height="100"/>
						<div>{title} - {creator.name}</div>
					</div>)
				}

				{playlistsLeft ? <div className="button"><a onClick={loadMore}>{playlistsLeft} more</a></div> : null}
			</div>
		)
	return <div>Loading...</div>
}

export default WithDeezerToken(Parser)
