module.exports = {
  apps: [
    {
      name: 'queloric',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/queloric',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
}
