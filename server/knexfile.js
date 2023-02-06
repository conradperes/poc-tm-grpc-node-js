const path = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Postgres2022!',
      port: '5432',
      database: 'grpc_equities',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
};