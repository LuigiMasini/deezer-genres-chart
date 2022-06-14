const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
	app.use(createProxyMiddleware(
		'/oauth',
		{
			target: "https://connect.deezer.com",
			changeOrigin: true
		})
	);
	app.use(createProxyMiddleware(
		'/deezer',
		{
			pathRewrite: {'^/deezer' : ''},
			target: "https://api.deezer.com",
			changeOrigin: true
		})
	);
	app.use(createProxyMiddleware(
		'/images',
		{
			target: "https://e-cdns-images.dzcdn.net",
			changeOrigin: true
		})
	)
};
