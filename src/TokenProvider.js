import React from 'react'

const DeezerToken = React.createContext(undefined);

const WithDeezerToken = Component => props => (
	<DeezerToken.Consumer>
	{ accessToken => <Component accessToken={accessToken} {...props}/> }
	</DeezerToken.Consumer>
)

export {DeezerToken, WithDeezerToken}
