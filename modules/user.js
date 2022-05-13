import { dataBase } from "./database.js";

export async function getUser(req, res) {
    let username = req.params.userName.toLowerCase(); // Name from Database

    console.log(`User request by ${req.ip} to ${username}\n`)

    let result = await dataBase('find', {name: `${username}`});

    res.json(
        result
    );
}
