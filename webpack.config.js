const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    mode: env.mode || 'development'
  }, argv);
  
  if (config.devServer) {
    config.devServer.allowedHosts = 'all';
    config.devServer.host = '0.0.0.0';
    config.devServer.port = 5000;
    config.devServer.client = {
      webSocketURL: {
        port: 5000
      }
    };
  }
  
  return config;
};
