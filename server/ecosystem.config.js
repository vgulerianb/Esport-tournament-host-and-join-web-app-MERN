module.exports = {
    /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    */
    apps: [
      {
          name: 'react-app',
          script: './server/index.js',
          cwd: process.cwd(),
          env: {
              COMMON_VARIABLE: 'true'
          }
      }
    ]
  };  