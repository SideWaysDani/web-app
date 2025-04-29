module.exports = {
  apps: [
    {
      name: 'quietalpha-server',
      script: 'src/app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: 'logs/error.log',
      out_file: 'logs/output.log',
      time: true, // Add timestamps to logs
    },
  ],
};
