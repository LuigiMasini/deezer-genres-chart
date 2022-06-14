import React from 'react'

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

function Plot({genres: genresCount, total}) {

	const [genres, setGenres] = React.useState(genresCount)
	const [data, setData] = React.useState({})
	const [captions, setCaptions] = React.useState({})

	React.useEffect(() => {
		setData(
			Object.entries(genres)
			.filter(([key, value]) => value.show)
			.reduce((previous, [key, value]) => {
				var next = previous
				next[key] = parseInt(value.count) / parseInt(total)
				return next
			}, {})
		)
	}, [genres, total])

	React.useEffect(() => {
		setCaptions(
			Object.entries(genres)
			.filter(([key, value]) => value.show)
			.reduce((previous, [key, value]) => {
				var next = previous
				next[key] = value.name
				return next
			}, {})
		)
	}, [genres])

	function onChange (e) {
		var newGenres=Object.assign({}, genres);
		newGenres[e.target.value].show=!genres[e.target.value].show
		setGenres(newGenres)
	}

	return (
		<div className="plot">

			 <form onChange={onChange}>
				{total} traccie analizzate
				{Object.entries(genres)
					.map(([key, value]) => (
					<p key={key}>
						<input
							id={key}
							name={key}
							value={key}
							type="checkbox"
							defaultChecked
							/>
						<label htmlFor={key}>{value.name}</label><br/>
					</p>
				))}
			</form>

			<div>
			{Object.keys(data).length && Object.keys(captions).length ?
				<RadarChart
					captions={captions}
					data={[{data, meta:{color:'blue'}}]}
				/>
				: null
			}
			</div>
		</div>
	)
}

export default Plot
