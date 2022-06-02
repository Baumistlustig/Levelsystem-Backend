import express from 'express';
import helmet from 'helmet';

// ----------- Modules ----------- //
import { getUser } from "./modules/routes/user.js";
import { pageNotFound } from "./modules/error/pagenotfound.js";
import { leaderboard } from "./modules/routes/leaderboard.js";
import { messageCreate } from "./modules/routes/messages.js";
import { linkUser } from "./modules/routes/link.js";
import { getDiscord } from "./modules/routes/getDiscord.js";
import { root } from "./modules/routes/root.js";


// ----------- Const ----------- //
export const app = express();
export const port = 8090;


// ----------- Middleware ----------- //
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


// ----------- ROUTES ----------- //

// ----- ROOT-PAGE ----- //
app.all('/', root);


// ----- GET ----- //

// User-Page
app.get('/api/user', getUser);

// Leaderboard
app.get('/api/leaderboard', leaderboard);

// getDiscord
app.get('/api/getDiscord/:author_id', getDiscord);

// ----- POST ----- //

// Messages
app.post('/api/message', messageCreate);

// Link
app.post('/api/link', linkUser);

// ----- ERROR ----- //

// PageNotFound
app.use(pageNotFound);


// ----------- INIT ----------- //
app.listen(
    port, '0.0.0.0', '',
    function () {
        console.log(`Server listening on port ${port}\n`);
    }
);