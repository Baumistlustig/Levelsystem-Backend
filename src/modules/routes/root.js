export async function root(req, res) {
    res.send('<p>Root Page</p>');
    console.log(`Root request by ${req.ip}\n`);
}