import { stringToHash } from "../../utils/hash.js";
import { find } from "../../utils/database.js";

export async function signIn(req, res) {
    let password = req.body['password'];
    let email = req.body['email'];

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
    let response = await find(
        { email: `${email}` },
        'web_users'
    );

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

    // Not Verified
    if (!response[0].verified) {
        res.json(
            {
                "success": false,
                "error": "user_not_verified"
            }
        );
        return false;
    }

    // Success
    res.json(
        {
            "success": true
        }
    );

    console.log(`SignIn request by ${req.ip}\n`,
        `username: ${response[0].username}\n`,
        `email: ${email}\n`,
        `hashed_password: ${hashed_password}\n`,
    );
}