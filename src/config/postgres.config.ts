export const postgresConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'popcorn',
  synchronize: true, // 👈 this is critical
};
