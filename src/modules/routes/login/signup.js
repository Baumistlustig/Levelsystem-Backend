import { checkEmail, checkPassword } from "../../utils/login.js";
import { find, insert } from "../../utils/database.js";
import { stringToHash } from "../../utils/hash.js";

export async function signup(req, res) {
    let email = req.body['email'];
    let username = req.body['username'];
    let password = req.body['password'];

    if (username === undefined) {
        res.json(
            {
                "success": false,
                "error": "arguments_not_fulfilled",
            }
        )
        return false;
    }

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

    if (response[0] !== undefined) {
        res.json(
            {
                "success": false,
                "error": "email_already_exists"
            }
        );
        return false;
    }

    if (response[0] !== undefined) {
        res.json(
            {
                "success": false,
                "error": "user_already_exists"
            }
        );
        return false;
    }

    if (await checkEmail(email)) {
        res.json(
            {
                "success": false,
                "error": "email_not_valid",
            }
        );
        return false;
    }

    /*if (!await checkPassword(password)) {
        res.json(
            {
                "success": false,
                "error": "password_not_valid",
            }
        );
        return false;
    }*/

    // Generate Password hash
    const hashed_password = stringToHash(password);

    await insert(
        {
            username: `${username}`,
            password: `${hashed_password}`,
            email: `${email}`,
            verified: false,
        },
        'web_users',
    );

    res.json(
        {
            "success": true,
        }
    );

    console.log(`SignUp request by ${req.ip}`,
        `username: ${username}\n`,
        `email: ${email}\n`,
        `hashed_password: ${hashed_password}\n`,
    );
}