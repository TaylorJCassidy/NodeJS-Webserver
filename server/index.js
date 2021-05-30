const http = require('http');

const {host,port} = require('./configs/hostandport.json');
const webfiles = require('./utils/getWebfiles').getWebfiles();

http.createServer((req,res) => {
    try {
        const webfile = webfiles.get(req.url);
        res.writeHead(200,webfile.header);
        res.end(webfile.content)
    }
    catch(e) {
        res.writeHead(404,'There has been an internal error');
        res.end();
    } 
}).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});