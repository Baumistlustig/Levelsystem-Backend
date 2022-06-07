export async function signIn(req, res) {
    let username = req.body['username'];
    let password = req.body['password'];
    let email = req.body['email'];

    if ((username && email) === undefined) {
        console.log("debug")
    }
}