import { fetchUserExperience } from "./database.js";
import dotenv from "dotenv";

export async function messageCreate(req, res) {

    dotenv.config({path: 'modules/utils/.env'})

    if (req.body["token"] !== process.env.TOKEN) {
        res.json(
            {
                'success': false,
                'error': 'Wrong token'
            }
        )

        return;
    }

    let user = req.body["author"].toLowerCase();

    await fetchUserExperience(user);


    res.json(
        {
            'success': true,
        }
    );
}