import * as data from './config/data.json' assert {type: "json"};

export function accessToken(token) {
    return token === data.access_token;
}