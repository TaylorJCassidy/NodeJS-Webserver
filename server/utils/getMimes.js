const fs = require('fs')

module.exports = {
    getMimes: function() {
        let mimes = fs.readFileSync('./server/configs/supportedMimes.csv','utf8');
        mimes = mimes.split('\n');
        for (let i=0;i<mimes.length;i++) {
            mimes[i] = mimes[i].split(',');
        }
        return new Map(mimes);
    }
}