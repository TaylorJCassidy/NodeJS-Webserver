const fs = require('fs')

module.exports = {
    getHeaders: function() {
        let headers = fs.readFileSync('./server/configs/supportedMimes.csv','utf8');
        headers = headers.split('\n');
        for (let i=0;i<headers.length;i++) {
            headers[i] = headers[i].split(',');
        }
        return new Map(headers);
    }
}