const { createProxyMiddleware } = require('http-proxy-middleware');

//===============================================================================================================//

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
			target: `${process.env.REACT_APP_SERVER_PROXY_HOST}:${process.env.REACT_APP_SERVER_PROXY_PORT}`,
      changeOrigin: false
    })
	);
	app.use(
    '/mongoexpress',
    createProxyMiddleware({
			target: `${process.env.REACT_APP_MONGO_EXPRESS_PROXY_HOST}:${process.env.REACT_APP_MONGO_EXPRESS_PROXY_PORT}`,
      changeOrigin: false
    })
  );
};
