import { find, insert, update } from "../utils/database.js";
import { accessToken } from "../utils/token.js";

export async function messageCreate(req, res) {

    let username = req.body["author"].toLowerCase();
    let user_id = req.body['author_id'];

     if (accessToken(req.body['token'])) {
         res.json(
             {
                 'success': false,
                 'error': 'Wrong token'
             }
         )
         return;
     }

    let response = await find(
        { id: `${user_id}`},
        'users'
    );

    if (response[0] !== undefined) {

        const keys = Object.keys(response[0]);
        const values = keys.map(function (key) {
            return response[0][key];
        });

        let experience = (values[2]) += 1;

        await update(
            { id: `${user_id}`},
            { $set: { experience: experience } },
            'users'
        );
    } else {
        await insert(
            {
                id: `${ user_id }`,
                experience: 1,
                linkedUsers: {
                    discord: {
                        id: `${ user_id }`,
                        name: `${ username }`,
                    },
                    minecraft: {
                        id: ``,
                        name: ``,
                    }
                }
            },
            'users'
        )
    }

    res.json(
        {
            'success': true,
        }
    );
}