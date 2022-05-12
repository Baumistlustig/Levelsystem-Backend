import express from 'express';
import helmet from 'helmet';

// Modules
import { getUser } from "./modules/user.js";
import { pageNotFound } from "./modules/error/pagenotfound.js";
import { register } from "./modules/register.js";
import { login } from "./modules/login.js";
import { leaderboard } from "./modules/leaderboard.js";
import { messageCreate } from "./modules/messages.js";

// Const
const app = express();
const port = 8090;


// Database



// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Root-Page
app.all('/', (req, res) =>{
    res.send('<p>Root Page</p>');
    console.log(`Request by ${req.ip}\n`);
});


// ----------- GET ----------- //

// Leaderboard
app.get('/api/leaderboard', leaderboard);

// User-Page
app.get('/api/user/:userName', getUser);


// ----------- POST ----------- //

// Login
app.post('/api/login', login);

// Register
app.post('/api/register', register);

// Messages
app.post('/api/message', messageCreate);

// PageNotFound
app.use(pageNotFound);


// Startup
app.listen(
    port, '0.0.0.0', '',
    function () {
        console.log(`Server listening on port ${port}\n`);
    }
);