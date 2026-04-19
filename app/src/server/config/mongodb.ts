import { Db, MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName: string = process.env.MONGODB_DBNAME || 'vkea';

const client: MongoClient = new MongoClient(uri);

let db: Db;

export function connect(): Db {
  db = client.db(dbName);
  return db;
}

export function getDB(): Db {
  if (!db) return connect();
  return db;
}
