import { find } from "../utils/database.js";

export async function getUser(req, res) {
    let author_id = req.body['author_id'];
    let target_id = req.body['target_id'];

    if (!author_id) {
        res.json(
            {
                "error": "No author_id provided!",
            }
        );
        return false;
    }

    console.log(`User request by ${req.ip} to ${author_id}\n`);

    let target_name = req.body['target_name'];
    if (target_id) {
        author_id = target_id;
    }

    let result = await find (
        { id: `${author_id}` },
        'users'
    );

    if (result[0] === undefined) {

        res.json(
            {
                "experience": false,
            }
        )

        return;
    }

    const keys = Object.keys(result[0]);
    const values = keys.map(function (key) {
        return result[0][key];
    });

    res.json(
        {
            "experience": values[2],
        }
    );
}
