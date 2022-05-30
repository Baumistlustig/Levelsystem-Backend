import { find } from "../utils/database.js";

export async function getDiscord(req, res) {

    console.log(`getDiscord request by ${req.ip}\n`);

    let target = req.body['minecraft_id'];

    let result = await find(
        '',
        'users'
    );

    let user;

    for (let i = 0; i < result.length; i++) {
        let minecraft_id = result[i].linkedUsers.minecraft.id;

        target = target.replace(/-/g, "");

        if (minecraft_id === target.toString()) {
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

    res.send(discord_id);
}