import * as https from "https";

function getOptions(port, host, path, method, headers) {
    return {
        port: port,
        host: host,
        path: path,
        method: method,
        headers: headers,
    };
}


function callback(response) {
    let str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {
        console.log(str);
    });
}

https.request(getOptions(8090,
    '0.0.0.0',
    '/api/user/baumistlustig',
    'POST',
    {
                'Content-Type': 'application/json'
            }
), callback).end();