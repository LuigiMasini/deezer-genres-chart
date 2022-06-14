import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {DeezerToken} from './TokenProvider'

function Root () {

	const [accessToken, setAccessToken] = React.useState('')

	React.useEffect(() => {

		const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())

		if (params.code && params.code.length){
			fetch("/oauth/access_token.php?app_id="+process.env.REACT_APP_DEEZER_ID+"&secret="+process.env.REACT_APP_DEEZER_SECRET+"&code="+params.code+"&output=json")
			.then(res => res.json())
			.then(({access_token}) => {
				setAccessToken(access_token)
				window.history.replaceState('Logged in', '', window.location.origin)
			})
			.catch(err => console.error(err))
		}
	}, [])

	if(accessToken)
		return (
			<DeezerToken.Provider value={accessToken}>
				<App/>
			</DeezerToken.Provider>
		)

	return (
		<a
			href={"https://connect.deezer.com/oauth/auth.php?app_id="+process.env.REACT_APP_DEEZER_ID+"&redirect_uri="+encodeURI(process.env.REACT_APP_REDIRECT_URI)/*+"&perms=basic_access,email"*/}
			>
			Deezer Login
		</a>
	)
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root/>/*
	<React.StrictMode>
		<Root/>
	</React.StrictMode>*/
);
