import dotenv from 'dotenv';

dotenv.config();

export interface IDatabaseConfig {
  host: string;
  userName: string;
  password: string;
  port: number;
  dbName: string;
}

const getDatabaseConfig = () => {
  const host = process.env.PGHOST;
  const login = process.env.PGUSER;
  const password = process.env.PGPASSWORD;
  const dbName = process.env.PGDATABASE;
  const port = process.env.PGPORT;

  console.log(host, login, password, dbName, port)

  if (!host || !login || !dbName || !password || !port || isNaN(+port)) {
    throw new Error('Required env db variables not defined or invalid');
  }

  const config: IDatabaseConfig = {
    host: host,
    port: +port,
    userName: login,
    password: password,
    dbName: dbName,
  };

  return config;
};

export const databaseConfig: IDatabaseConfig = getDatabaseConfig();
