import { fetchUserExperience } from "./database.js";

export async function register(req, res) {
    console.log(`Register request by ${req.ip}\n`);
    await fetchUserExperience('miriam');
    res.send(
        '<p>Coming soon</p>'
    );
}