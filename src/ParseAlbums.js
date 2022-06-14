import React from 'react'
import {WithDeezerToken} from './TokenProvider'
import Plot from './Plotter'

function Parser ({albums, accessToken}) {

	const [genresCount, setGenres] = React.useState({})
	const [done, setDone] = React.useState(false)

	React.useEffect(() => {

		Promise.all(albums.map( (albumId, id) =>
			new Promise(resolve => setTimeout(resolve, 100*id))		//Deezer API limit is 50 requests / 5 s ---> 1 every 100 ms should be fine
			.then(() =>	fetch('/deezer/album/'+albumId+'?access_token='+accessToken))
			.then(res => res.json())
			.then(({genres}) => {
				var newGenresCount = genresCount

				//NOTE at the moment if a track has more than one genre, it will count as multiple tracks
				//to make it count as 1 we could divide +1 by genres.data.length
				//(every genre would count the same, but we know that for deezer the first is the most important
				//and the last is the least). How to procede?

				genres.data.forEach( genre => {
					if (typeof genresCount[genre.id] === 'object')
						newGenresCount[genre.id].count+=1;
					else
						newGenresCount[genre.id] = {
							count: 1,
							name: genre.name,
							picture: genre.picture,
						}
					setGenres(newGenresCount)
				})
			})
			.catch(err => console.error(err))
		))
		.then(() => setDone(true))

	}, [])

	if (Object.keys(genresCount).length)
		return <Plot genres={genresCount} total={albums.length} loading={!done}/>

	return <div>loading...</div>

}

export default WithDeezerToken(Parser)
