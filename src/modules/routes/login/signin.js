import { stringToHash } from "../../utils/hash.js";
import { find } from "../../utils/database.js";

export async function signIn(req, res) {
    let username = req.body['username'];
    let password = req.body['password'];
    let email = req.body['email'];

    if (username === undefined && email === undefined) {
        res.json(
            {
                "success": false,
                "error": "no_email/password_provided"
            }
        );
        return false;
    }

    if (password === undefined) {
        res.json(
            {
                "success": false,
                "error": "no_password_provided"
            }
        );
        return false;
    }

    // Password Hash
    const hashed_password = stringToHash(password);

    // Response from Database
    let response;
    if (email !== undefined) {
        response = await find(
            { email: `${email}` },
            'web_users'
        );
    } else if (username !== undefined) {
        response = await find(
            { username: `${username}` },
            'web_users'
        );
    }

    //UserNotFound
    if (response[0] === undefined) {
        res.json(
            {
                "success": false,
                "error": "user_not_found"
            }
        );
        return false;
    }

    // Wrong password
    if (response[0].password !== hashed_password) {
        res.json(
            {
                "success": false,
                "error": "password_not_matching"
            }
        )
        return false;
    }

    // Success
    res.json(
        {
            "success": true
        }
    );

    console.log(`SignIn request by ${req.ip}`,
        `username: ${username}\n`,
        `email: ${email}\n`,
        `hashed_password: ${hashed_password}\n`,
    );
}