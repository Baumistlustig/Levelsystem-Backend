export async function root(req, res) {
    res.redirect('https://github.com/Baumistlustig/Levelsystem-Backend');
    console.log(`Root request by ${req.ip}\n`);
}