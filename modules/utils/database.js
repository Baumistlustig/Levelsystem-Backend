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

export async function fetchUserExperience(username, user_id) {
    let response = await dataBase(
        'find',
        { id: `${user_id}`},
        '',
        'users'
    );

    if (response[0] !== undefined) {

        const keys = Object.keys(response[0]);
        const values = keys.map(function (key) {
            return response[0][key];
        });

        let experience = (values[2]) += 1;

        await dataBase(
            'update',
            { id: `${user_id}`},
            { $set: { experience: experience } },
            'users'
        );
    } else {
        await dataBase(
            'insert',
            '',
            {
                id: `${user_id}`,
                experience: 1,
                linkedUsers: {
                    discord: {
                        id: `${user_id}`,
                        name: `${username}`
                    },
                    minecraft: {
                        id: ``,
                        name: ``
                    }
                }
            },
            'users'
        )
    }
}