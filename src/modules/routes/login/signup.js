import { checkEmail, checkPassword } from "../../utils/login.js";
import { find } from "../../utils/database.js";

export async function signup(req, res) {
    let email = req.body['email'];
    let username = req.body['username'];
    let password = req.body['password'];

    let result = await find({ user: username }, 'web_users');

    if (result[0] !== undefined) {
        console.log(result[0])
        res.json(
            {
                "success": false,
                "error": "user_already_exists"
            }
        );
        return false;
    }

    result = await find({ email: email }, 'web_users');

    if (result[0] !== undefined) {
        res.json(
            {
                "success": false,
                "error": "email_already_exists"
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

    if (!await checkPassword(password)) {
        res.json(
            {
                "success": false,
                "error": "password_not_valid",
            }
        );
        return false;
    }




}