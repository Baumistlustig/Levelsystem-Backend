import dotenv from "dotenv";

export function accessToken(token) {

    dotenv.config({ path: 'modules/utils/config/.env' });

    if (token !== process.env.TOKEN) {
        return false;
    }
}