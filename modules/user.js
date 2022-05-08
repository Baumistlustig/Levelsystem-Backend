export function getUser(req, res) {
    console.log(`User request by ${req.ip} to ${req.params.userName}\n`)

    //TODO: Send request to database => if req.params.userName exists, get this data


    let username = req.params.userName; // Name from Database

    if (username === 'baumistlustig') {
        res.json(
            {
                "experience": 1337,
                "online": true
            }
        )
    } else {
        res.json(
            {
                "existing": false
            }
        )
    }
}
