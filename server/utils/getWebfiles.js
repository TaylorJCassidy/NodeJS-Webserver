const fs = require('fs');

module.exports = {
    getWebfiles: function() {
        const {webdir} = require('../configs/webdir.json')
        const files = fs.readdirSync(webdir);
        const headers = require('../utils/getHeaders.js').getHeaders();
        const webfiles = getWebfiles(files,webdir,new Map(),headers)
        webfiles.set('/', webfiles.get('/index.html'))
        return webfiles;

        /**
         * 
         * @param {Array} files 
         * @param {String} filePath 
         * @param {Map<String,Object>} webfiles 
         * @param {Map<String,String>} headers 
         * @returns 
         */
        function getWebfiles(files,filePath,webfiles,headers) {
            for (let i=0;i<files.length;i++) {
                let webfile = getWebfile(filePath + '/' +files[i],webfiles,headers);
                if (webfile == null) {continue;}
                webfiles.set(webfile.path,webfile);
            }
            return webfiles;
        }

        /**
         * 
         * @param {String} filePath 
         * @param {Map<String,Object>} webfiles 
         * @param {Map<String,String>} headers 
         * @returns 
         */
        function getWebfile(filePath,webfiles,headers) {
            let fileExt = filePath.match(/(?<=.\.)[^.]+$/);
            if (fileExt == null) {
                let files = fs.readdirSync(filePath);
                getWebfiles(files,filePath,webfiles,headers);
            }
            else {
                fileExt = fileExt[0];
                const path = filePath.substring(webdir.length);
                const header = headers.get(fileExt);
                const content = fs.readFileSync(filePath);
                
                return {
                    path: path,
                    header: header,
                    content: content
                };
            }
        }
    }
}