const fs = require('fs');

module.exports = {
    getWebfiles: function() {
        const {webdir} = require('../configs/webdir.json')
        const files = fs.readdirSync(webdir);
        const mimes = require('./getMimes.js').getMimes();
        const webfiles = getWebfiles(files,webdir,new Map(),mimes)
        webfiles.set('/', webfiles.get('/index.html'))
        return webfiles;

        /**
         * 
         * @param {Array} files 
         * @param {String} filePath 
         * @param {Map<String,Object>} webfiles 
         * @param {Map<String,String>} mimes 
         * @returns 
         */
        function getWebfiles(files,filePath,webfiles,mimes) {
            for (let i=0;i<files.length;i++) {
                let webfile = getWebfile(filePath + '/' +files[i],webfiles,mimes);
                if (webfile == null) {continue;}
                webfiles.set(webfile.path,webfile);
            }
            return webfiles;
        }

        /**
         * 
         * @param {String} filePath
         * @param {Map<String,Object>} webfiles
         * @param {Map<String,String>} mimes
         * @returns 
         */
        function getWebfile(filePath,webfiles,mimes) {
            let fileExt = filePath.match(/(?<=.\.)[^.]+$/);
            if (fileExt == null) {
                let files = fs.readdirSync(filePath);
                getWebfiles(files,filePath,webfiles,mimes);
            }
            else {                
                return {
                    path: filePath.substring(webdir.length),
                    header: mimes.get(fileExt[0]),
                    content: fs.readFileSync(filePath)
                };
            }
        }
    }
}