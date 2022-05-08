export function pageNotFound(req, res) {
    console.log(`PageNotFound IP: ${req.ip} Path: ${req.path}\n`)
    res.status(
        404
    ).json(
        {
            "Error: ": 404
        }
    )
}