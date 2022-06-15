import { find } from "../../utils/database.js";

export async function search(req, res) {
    let username = req.param('user')

    console.log(username)

    let response = await find(
        { discord_name: username },
        'users'
    );

    if (response[0] === undefined) {
        res.json(
            {
                "error": "no_user_found"
            }
        );

        return false;
    }

    res.json(response);
}