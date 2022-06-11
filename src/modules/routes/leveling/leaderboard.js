import { find} from "../../utils/database.js";

export async function leaderboard(req, res) {
    console.log(`Leaderboard request by ${req.ip}\n`);

    let response = await find(
        '',
        'users'
    );

    if (response[4] === undefined) {
        res.json(
            {
                "error": "Not enough users in database!",
            }
        );
        return false;
    }

    let experiences = {};

    for (let i = 0; i < response.length; i++) {
        const keys = Object.keys(response[i]);
        const values = keys.map(function (key) {
            return response[i][key];
        });

        experiences[values[1]] = values[2];
    }

    const keys = Object.keys(experiences);
    keys.sort(function(a,b){
        return experiences[b] - experiences[a];
    });

    let usernames = [];

    for (let i = 0; i < keys.length; i++)  {
        console.log(keys[i])
        let resolution = await find(
            { id: keys[i] },
            'users'
        );

        usernames.push(resolution[0].linkedUsers.discord.name);
    }

    res.send([
        {
            "user_id": keys[0],
            "username": usernames[0],
            "experience": experiences[keys[0]],
        },
        {
            "user_id": keys[1],
            "username": usernames[1],
            "experience": experiences[keys[1]],
        },
        {
            "user_id": keys[2],
            "username": usernames[2],
            "experience": experiences[keys[2]],
        },
        {
            "user_id": keys[3],
            "username": usernames[3],
            "experience": experiences[keys[3]],
        },
        {
            "user_id": keys[4],
            "username": usernames[4],
            "experience": experiences[keys[4]],
        }
        ]
    );
}