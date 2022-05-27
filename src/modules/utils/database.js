import { MongoClient } from "mongodb";

const db_url = 'mongodb://localhost:27017/';
const client = new MongoClient(db_url);

export async function dataBase(method, filter, amplifier, target_collection) {

    const dbName = 'levelsystem';

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(target_collection);

    let result;

    switch (method) {
        case 'find':
            result = await collection.find(filter).toArray();
            break;

        case 'insert':
            result = await collection.insertOne(amplifier);
            break;

        case 'delete':
            result = await collection.deleteMany(filter);
            break;

        case 'update':
            result = await collection.updateOne(filter, amplifier);
            break;

        default:
            result = 'Error!';
            break;
    }

    return result;
}