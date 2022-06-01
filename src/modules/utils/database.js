import { MongoClient } from "mongodb";

const db_url = 'mongodb://localhost:27017/';
const client = new MongoClient(db_url);

const dbName = 'levelsystem';

await client.connect();

const db = client.db(dbName);

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