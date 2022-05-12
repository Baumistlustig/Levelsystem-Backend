export function messageCreate(req, res) {
    let user = req.body["author"];
    console.log(user)

    //TODO: Send Request to database and ask if user exists

    res.json(
        {
            'success': true
        }
    );
}