import { client } from "../server.js";


export async function dataBase(method, content) {

    const dbName = 'levelsystem';

    await client.connect();
    console.log('Connected successfully to MongoDB server\n');

    const db = client.db(dbName);
    const collection = db.collection('levelsystem');

    let result;

    switch (method) {
        case 'find':
            result = await collection.find(content).toArray();
            break;

        case 'insert':
            result = await collection.insertMany(content);
            break;

        case 'delete':
            result = await collection.deleteMany(content);
            break;
    }

    return result;
}