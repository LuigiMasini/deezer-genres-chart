import React from 'react'

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

function Plot({genres, total, loading}) {

	const [active, setActive] = React.useState(Object.fromEntries(Object.entries(genres).map(([key, value]) => ([key,true]))))
	const [data, setData] = React.useState({})
	const [captions, setCaptions] = React.useState({})

	React.useEffect(() => {
		const max = Math.max(
			...Object.entries(genres)
			.filter(item => active[item[0]])
			.map(item => item[1].count))

		setData(
			Object.entries(genres)
			.filter(([key, value]) => active[key])
			.reduce((previous, [key, value]) => {
				var next = previous
				next[key] = value.count / max
				return next
			}, {})
		)
	}, [active, genres, total])

	React.useEffect(() => {
		setCaptions(
			Object.entries(genres)
			.filter(([key, value]) => active[key])
			.reduce((previous, [key, value]) => {
				var next = previous
				next[key] = value.name
				return next
			}, {})
		)
	}, [active, genres])

	function onChange (e) {
		var newActive=Object.assign({}, active);
		newActive[e.target.value]=!active[e.target.value]
		setActive(newActive)
	}

	return (
		<div className="plot">

			 <form onChange={onChange}>
				{loading ? 'Loading...' : null}
				{total} traccie analizzate
				<br/>
				<br/>
				La somma potrebbe non essere uguale: alcune traccie hanno più di un genere e per ora contano come traccie separate

				{Object.entries(genres)
				.map(([key, value]) => (
					<p key={key}>
						<input
							id={key}
							name={key}
							value={key}
							type="checkbox"
							checked={active[key]}
							/>
						<label htmlFor={key}>{value.name} ({value.count})</label><br/>
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
