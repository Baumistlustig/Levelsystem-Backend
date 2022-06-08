export async function requireType () {
    return (req, res, next) => {
        if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
            res.status(400).send('Server requires application/x-www-form-urlencoded')
        } else {
            next()
        }
    }
}