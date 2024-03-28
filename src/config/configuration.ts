export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET,
  postgres_host: process.env.POSTGERS_HOST,
  postgres_port: process.env.POSTGRES_PORT,
  postgres_user: process.env.POSTGRES_USER,
  postgres_password: process.env.POSTGRES_PASSWORD,
  postgres_db: process.env.POSTGRES_DB,
});
