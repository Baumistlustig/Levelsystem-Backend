import { fetchUserExperience } from "./database.js";

export async function messageCreate(req, res) {
    let user = req.body["author"].toLowerCase();

    await fetchUserExperience(user);


    res.json(
        {
            'success': true,
            'username': user
        }
    );
}