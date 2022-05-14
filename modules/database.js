import { client } from "../server.js";

export async function dataBase(method, filter, amplifier, target_collection) {

    const dbName = 'levelsystem';

    await client.connect();
    console.log('Connected successfully to MongoDB server\n');

    const db = client.db(dbName);
    const collection = db.collection(target_collection);

    let result;

    switch (method) {
        case 'find':
            result = await collection.find(filter).toArray();
            break;

        case 'insert':
            result = await collection.insertMany(amplifier);
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

export async function fetchUserExperience(user) {
    let response = await dataBase('find', { name: user }, '', 'users');

    console.log(response);

    if (response[0]) {

        const keys = Object.keys(response[0]);
        const values = keys.map(function (key) {
            return response[0][key];
        });

        let experience = (values[2]) += 1;

        await dataBase('update', { name: user }, { $set: { experience: experience } } , 'users');
    } else {
        await dataBase(
            'insert',
            '',
            {
                name: `${user}`,
                experience: 1,
            },
            'users'
        )
    }
}