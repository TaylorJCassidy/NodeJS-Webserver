const http = require('http');

const {host,port} = require('./configs/hostandport.json');
const {notfoundurl} = require('./configs/webdir.json');
const webfiles = require('./utils/getWebfiles').getWebfiles();

http.createServer((req,res) => {
    try {
        if (webfiles.has(req.url)) {
            const webfile = webfiles.get(req.url);
            res.writeHead(200,webfile.header);
            res.end(webfile.content);
        }
        else {
            const notfoundpage = webfiles.get(notfoundurl);
            res.writeHead(404,'Not found',notfoundpage.header);
            res.end(notfoundpage.content);
        }
    }
    catch(e) {
        res.writeHead(404,'There has been an internal error');
        res.end();
        console.log(e + '\n' + e.message)
    } 
}).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});