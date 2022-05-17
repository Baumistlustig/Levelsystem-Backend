import { fetchUserExperience } from "../utils/database.js";
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

    await fetchUserExperience(username, user_id);

    res.json(
        {
            'success': true,
        }
    );
}