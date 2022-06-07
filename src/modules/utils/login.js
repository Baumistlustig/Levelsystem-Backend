import request from "request";
import {stringToHash} from "./hash.js";

export async function checkEmail(email) {
    await request.get(
        { url: `https://emailvalidation.abstractapi.com/v1/?api_key=e004c8f3f0de4199b0e9d24516e36fb9&email=${email}` },
        async (err, response) => {
            if (err) {
                throw err;
            }

            return JSON.parse(response.body).is_valid_format.value;
        }
    );
}

export async function checkPassword(password) {

    let hash = stringToHash(password);

    hash = hash.substring(0, 5);

    await request(
        { url: `https://api.pwnedpasswords.com/range/${hash}` },
        async (err, response) => {
            if (err) {
                throw err;
            }
        }
    )
}