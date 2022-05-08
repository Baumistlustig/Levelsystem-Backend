export function register(req, res) {
    console.log(`Register request by ${req.ip}\n`);

    if (req.params.Name === 'baumistlustig') {
        console.log('debug')
    }

    res.send(
        '<p>Coming soon</p>'
    )
}