const http = require('http');

const port = 8080;
const host = 'localhost';

const server = http.createServer((req,res) => {

}).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});