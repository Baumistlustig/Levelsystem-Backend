import express from 'express';
import helmet from 'helmet';

// ----------- Modules ----------- //
import { getUser } from "./modules/routes/user.js";
import { pageNotFound } from "./modules/error/pagenotfound.js";
import { leaderboard } from "./modules/routes/leaderboard.js";
import { messageCreate } from "./modules/routes/messages.js";
import { linkUser } from "./modules/routes/link.js";
import { getDiscord } from "./modules/routes/getDiscord.js";


// ----------- Const ----------- //
export const app = express();
export const port = 8090;


// ----------- Middleware ----------- //
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Root-Page
app.all('/', (req, res) =>{
    res.send('<p>Root Page</p>');
    console.log(` Root request by ${req.ip}\n`);
});


// ----------- GET ----------- //

// User-Page
app.get('/api/user', getUser);

// Leaderboard
app.get('/api/leaderboard', leaderboard);


// ----------- POST ----------- //

// Messages
app.post('/api/message', messageCreate);

// Link
app.post('/api/link', linkUser);

// getDiscord
app.post('/api/getDiscord', getDiscord);

// ----------- ERROR ----------- //

// PageNotFound
app.use(pageNotFound);


// ----------- INIT ----------- //
app.listen(
    port, '0.0.0.0', '',
    function () {
        console.log(`Server listening on port ${port}\n`);
    }
);