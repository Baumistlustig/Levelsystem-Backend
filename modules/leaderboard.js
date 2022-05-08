export function leaderboard(req, res) {
    console.log(`Leaderboard request by ${req.ip}\n`);

    //TODO: Send request to database of the highest experience score

    res.json(
        {
            "first": {
                "username": "baumistlustig",
                "experience": 1337,
            },
            "second": {
                "username": "emma",
                "experience": 4242,
            },
            "third": {
                "username": "alissa",
                "experience": 4200,
            },
            "fourth": {
                "username": "miriam",
                "experience": 420,
            },
            "fifth": {
                "username": "johnnsy",
                "experience": 187,
            }
        }
    );
}