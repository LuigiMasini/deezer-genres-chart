import React from 'react'

function Parser ({setPlaylistId}) {

	const [error, setError] = React.useState('')
	const inputRef = React.useRef()

	function check(e) {
		e.preventDefault()

		let res = inputRef.current.value.match(/deezer.com\/(?:.*\/)?playlist\/(\d+)$/)

		if (!res){	//not a link
			res = inputRef.current.value.match(/^(\d+)$/)
		}

		if(!res){
			setError('not a link nor an id')
			return
		}
		else if (!res[1]){
			setError('unable to extract an id')
			return
		}

		fetch('deezer/playlist/'+res[1])
		.then(res => res.json())
		.then(({error, id}) => {
			if (error) setError('The playlist does not exist')
			else setPlaylistId(res[1])
		})
		.catch(err => {
			console.warn(err)
			setError('unable to determine if the playlist exist')
		})

	}

	return (
		<form onSubmit={check}>
			<input ref={inputRef} type='text' placeholder='deezer playlist link or id'/>
			<input type='submit' value='search'/>
			<p className='error'>{error}</p>
		</form>
	)
}

export default Parser
