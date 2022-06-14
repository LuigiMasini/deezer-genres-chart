import React from 'react'
import {WithDeezerToken} from './TokenProvider'
import Plot from './Plotter'

function Parser ({albums, accessToken}) {

	const [genresCount, setGenres] = React.useState({})
	const [done, setDone] = React.useState(false)

	React.useEffect(() => {

		Promise.all(albums.map( (albumId, id, array) =>
			fetch('/deezer/album/'+albumId+'?access_token='+accessToken)
			.then(res => res.json())
			.then(({genres}) => {
				var newGenresCount = genresCount

				genres.data.forEach( genre => {
					if (typeof genresCount[genre.id] === 'object')
						newGenresCount[genre.id].count++
					else
						newGenresCount[genre.id] = {
							count: 1,
							name: genre.name,
							picture: genre.picture,
							show: true,
						}
					setGenres(newGenresCount)
				})
			})
			.catch(err => console.error(err))
		))
		.then(() => setDone(true))

	}, [])

	if (done)
		return <Plot genres={genresCount} total={albums.length}/>

	return <div>loading...</div>

}

export default WithDeezerToken(Parser)
