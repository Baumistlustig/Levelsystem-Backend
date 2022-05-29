import { find} from "../utils/database.js";

export async function leaderboard(req, res) {
    console.log(`Leaderboard request by ${req.ip}\n`);

    let response = await find(
        '',
        'users'
    );


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

    res.json(
        {
            "first": {
                "user_id": keys[0],
                "username": response[0].linkedUsers.discord.name,
                "experience": experiences[keys[0]],
            },
            "second": {
                "user_id": keys[1],
                "username": response[1].linkedUsers.discord.name,
                "experience": experiences[keys[1]],
            },
            "third": {
                "user_id": keys[2],
                "username": response[2].linkedUsers.discord.name,
                "experience": experiences[keys[2]],
            },
            "fourth": {
                "user_id": keys[3],
                "username": response[3].linkedUsers.discord.name,
                "experience": experiences[keys[3]],
            },
            "fifth": {
                "user_id": keys[4],
                "username": response[4].linkedUsers.discord.name,
                "experience": experiences[keys[4]],
            }
        }
    );
}