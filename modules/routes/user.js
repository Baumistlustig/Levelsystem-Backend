import { dataBase } from "./database.js";

export async function getUser(req, res) {
    let user = req.body["author"].toLowerCase();

    console.log(`User request by ${req.ip} to ${user}\n`)

    let result = await dataBase('find', {name: `${user}`}, '', 'users');

    if (result === []) {
        result = await dataBase(
            'insert',
            '',
            {
                name: `${user}`,
                experience: 0
            },
            'users'
        )
    }

    const keys = Object.keys(result[0]);
    const values = keys.map(function (key) {
        return result[0][key];
    });

    res.json(
        values[2]
    );
}
