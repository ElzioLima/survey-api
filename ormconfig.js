module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    cache: {
      type: 'database',
      duration: 1000 * 60,
      options: {
        database: 'postgres',
        schema: 'public',
        table: 'cache'
      }
    },
    migrations: [
      `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/@core/infra/repos/postgres/migrations/*.{js,ts}`
    ],
    entities: [
      `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/@core/infra/repos/postgres/entities/index.{js,ts}`
    ],
    cli: {
      migrationsDir: `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/@core/infra/repos/postgres/migrations/`
    }
  }
]