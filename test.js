import { dataBase } from "./modules/utils/database.js";

console.log(await dataBase(
    'find',
    '',
    '',
    'users'
));