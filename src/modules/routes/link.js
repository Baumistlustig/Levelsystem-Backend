import request from "request";

import { accessToken } from "../utils/token.js";
import { find, update } from "../utils/database.js";

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
                "success": false,
                "error": "Wrong token"
            }
        )
        return;
    }

    await request.get(
        { url: `https://api.minecraftservices.com/minecraft/profile/lookup/name/${minecraft_user} `},
        async (err, response) => {
            minecraft_id = JSON.parse(response.body);
            minecraft_id = JSON.parse(response.body)[Object.keys(minecraft_id)[0]];

            let result = await find(
                { id: `${user_id}` },
                'users'
            );

            if (result[0] !== undefined) {

                await update(
                    { id: `${user_id}` },
                    { $set: { linkedUsers: { minecraft: { id: minecraft_id }, discord: { id: `${user_id}`, name: `${username}` } }, } },
                    'users'
                );
            } else {
                res.json(
                    {
                        "existing": false,
                    }
                );

                return;
            }

            res.json(
                {
                    "existing": true,
                }
            );
        }
    );
}