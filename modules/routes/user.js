import { dataBase } from "../utils/database.js";

export async function getUser(req, res) {

    let author_name = req.body['author_username'];
    let author_id = req.body['author_id'];
    let target_id = req.body['target_id'];
    let target_name = req.body['target_name'];

    if (target_id) {
        author_id = target_id;
        author_name = target_name;
    }

    console.log(target_id)

    console.log(`User request by ${req.ip} to ${author_id}\n`)

    let result = await dataBase (
        'find',
        { id: `${author_id}` },
        '',
        'users'
    );

    if (result[0] === undefined) {

        result = await dataBase(
            'insert',
            '',
            {
                id: author_id,
                experience: 1,
                linkedUsers: {
                    discord: {
                        id: `${author_id}`,
                        name: `${author_name}`
                    },
                    minecraft: {
                        id: ``,
                        name: ``
                    }
                },
            },
            'users'
        )

        res.json(
            'existing false'
        )

        return;
    }

    const keys = Object.keys(result[0]);
    const values = keys.map(function (key) {
        return result[0][key];
    });

    res.json({
        "experience": values[2],
    });
}
