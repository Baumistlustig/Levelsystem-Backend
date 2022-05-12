export function getUser(req, res, next) {
    let username = req.params.userName; // Name from Database

    console.log(`User request by ${req.ip} to ${username}\n`)


    //TODO: Send request to database => if req.params.userName exists, get this data

    if (username === 'baumistlustig') {
        res.json(
            {
                "experience": 1337,
                "online": true
            }
        );
    } else {
        res.json(
            {
                "existing": false
            }
        );
    }
}
