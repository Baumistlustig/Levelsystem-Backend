import { dataBase } from "../utils/database.js";

export async function getUser(req, res) {

    let username = req.body['author'];
    let user_id = req.body['author_id'];


    console.log(`User request by ${req.ip} to ${username}\n`)

    let result = await dataBase (
        'find',
        { id: '634856429538508801'},
        '',
        'users'
    );

    if (result[0] === undefined) {

        console.log('debug')

        result = await dataBase(
            'insert',
            '',
            {
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

    const keys = Object.keys(result[0]);
    const values = keys.map(function (key) {
        return result[0][key];
    });

    res.json(
        values[2]
    );
}
