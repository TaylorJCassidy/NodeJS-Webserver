const http = require('http');

const {host,port} = require('./configs/hostandport.json');

const server = http.createServer((req,res) => {

}).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});