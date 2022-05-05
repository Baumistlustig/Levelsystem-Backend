import * as http from "http";

const options = {
    port: 8090,
    host: '0.0.0.0',
    path: '/api/user/baumistlustig'
};

let callback;
callback = function(response) {
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

http.request(options, callback).end();
