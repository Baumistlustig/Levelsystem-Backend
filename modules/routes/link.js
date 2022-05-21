import request from "request";

import { accessToken } from "../utils/token.js";
import { dataBase } from "../utils/database.js";

export async function linkUser(req, res) {

    console.log(`Link request by ${req.ip}`);

    let user_id = req.body['author_id'];
    let username = req.body['author'];

    let token = req.body['token'];

    let minecraft_user = req.body['minecraft'];
    let minecraft_id;

    if (username !== undefined) {
        username = username.toLowerCase();
    }

    // AccessToken

    if (accessToken(token)) {
        res.json(
            {
                'success': false,
                'error': 'Wrong token'
            }
        )
        return;
    }

    async function http(minecraft_user) {
        await request.get(
            { url: `https://api.minecraftservices.com/minecraft/profile/lookup/name/${minecraft_user} `},
            async (err, response) => {
                minecraft_id = JSON.parse(response.body);

                minecraft_id = minecraft_id[Object.keys(minecraft_id)[0]];

                let resolution = await dataBase(
                    'find',
                    { id: `${user_id}` },
                    '',
                    'users'
                );

                if (resolution[0] !== undefined) {

                    await dataBase(
                        'update',
                        { id: `${user_id}` },
                        {
                            $set: { linkedUsers: { minecraft: { id: minecraft_id }, discord: { id: `${user_id}`, name: `${username}` } }, } },
                        'users'
                    );
                } else {
                    await dataBase(
                        'insert',
                        '',
                        {
                            id: `${user_id}`,
                            experience: 0,
                            linkedUsers: {
                                discord: {
                                    id: `${user_id}`,
                                    name: `${username}`
                                },
                                minecraft: {
                                    id: `${minecraft_id}`,
                                    name: `${minecraft_user}`
                                }
                            }
                        },
                        'users'
                    )
                }

                res.json(
                    {
                        'success': `${minecraft_id}`
                    }
                );
            }
        );
    }

    await http(minecraft_user);


}