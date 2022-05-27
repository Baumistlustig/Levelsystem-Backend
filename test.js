import { dataBase } from "./src/modules/utils/database.js";

console.log(await dataBase(
    'find',
    '',
    '',
    'users'
));