import express from 'express';
import mysql from 'mysql';
import helmet from 'helmet';

const app = express();

const port = 8090;

const connection = mysql.createConnection({
    host: "192.168.0.27:3306",
    user: "root",
    password: "",
});

connection.connect((err) => {
    if (err) {
        console.log("Error occured ", err);
    } else {
        console.log(`Connected to MySQL Server: ${connection}`);
    }
})


// Middleware
app.use(express.static('public'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Root-Page
app.get('/', (req, res, next) =>{
    res.send('<p>Root Page</p>')
    console.log(`Request by ${req.ip}`);
})


//
app.get('/api/user/:userName', (req, res, next) => {
    console.log(`Request by ${req.ip}`)

    //TODO: Send request to database => if req.params.userName exists, get this data

    let username = req.params.userName; // Name from Database

    if (username === 'baumistlustig') {
        res.json(
            {
                "experience": 1337,
            }
        )
    } else {
        res.json(
            {
                "existing": false
            }
        )
    }
});


// PageNotFound
app.use(function(req,res){
    res.status(
        404
    ).json(
        {
            "Error: ": 404
        }
    )
});


app.listen(port);