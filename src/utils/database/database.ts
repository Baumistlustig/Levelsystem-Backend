import { MongoClient } from "mongodb";
import { databaseConfig } from "./database.config";

const db_url = `mongodb://${databaseConfig.HOST}:${databaseConfig.PORT}/`;
const client = new MongoClient(db_url);

client.connect().then(
  r =>
    console.log(
      `Connected to ${databaseConfig.HOST}:${databaseConfig.PORT} to database ${databaseConfig.DB}`
    )
);

const db = client.db(databaseConfig.DB);

// ----------- DATABASE METHODS ----------- //

// Find
export async function find(filter, target_collection) {
  return await db.collection(target_collection).find(filter).toArray();
}

// Insert
export async function insert(amplifier, target_collection) {
  return await db.collection(target_collection).insertOne(amplifier);
}

// Delete
export async function del(filter, target_collection) {
  return await db.collection(target_collection).deleteMany(filter);
}

//Update
export async function update(filter, amplifier, target_collection) {
  return await db.collection(target_collection).updateOne(filter, amplifier);
}