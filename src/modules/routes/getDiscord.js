import { find } from "../utils/database.js";

export async function getDiscord(req, res) {

    let target = req.body['minecraft_id'];

    let result = await find(
        '',
        'users'
    );

    console.log(result);

    let user;

    for (let i = 0; i < result.length; i++) {
        let minecraft_id = result[i].linkedUsers.minecraft.id;

        if (minecraft_id === target) {
            user = i;
            break;
        }
    }

    if (!user && user !== 0) {
        res.json(
            {
                "discord_id": false,
            }
        );

        return;
    }

    let discord_id = result[user].id;

    res.json(
        {
            "discord_id": discord_id,
        }
    );
}