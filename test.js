import request from 'request'

const options = {
    url: 'http://localhost:8090/api/message',
    form: {
        author: 'test'
    }
};

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(JSON.parse(body));
});