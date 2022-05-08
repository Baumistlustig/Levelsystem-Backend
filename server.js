import express from 'express';
import mysql from 'mysql';
import helmet from 'helmet';

// Modules
import { getUser } from "./modules/user.js";
import { pageNotFound } from "./modules/error/pagenotfound.js";
import { register } from "./modules/register.js";
import { login } from "./modules/login.js";

// Const
const app = express();
const port = 8090;


// Database
const db_connection = mysql.createConnection({
    host: "192.168.0.27:3306",
    user: "root",
    password: "",
});

db_connection.connect((err) => {
    if (err) {
        console.log(`Error occurred ${err}\n`);
    } else {
        console.log(`Connected to MySQL Server: ${db_connection}\n`);
    }
});


// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Root-Page
app.all('/', (req, res, next) =>{
    res.send('<p>Root Page</p>');
    console.log(`Request by ${req.ip}\n`);
});


// User-Page
app.get('/api/user/:userName', (req, res) => {
    getUser(req, res);
});


// Register
app.post('/api/register', (req, res) => {
    register(req, res);
});

app.post('/api/login', (req, res) => {
    login(req, res);
});

// PageNotFound
app.use(function(req,res){
    pageNotFound(req, res);
});


// Startup
app.listen(
    port, '0.0.0.0', '',
    function () {
        console.log(`Server listening on port ${port}\n`);
    }
);