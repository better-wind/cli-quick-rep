const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

module.exports = function(metaDate,src,dest){
    return new Promise((resolve)=>{
        Metalsmith(__dirname)
            .metadata(metaDate)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(fileName => {
                    const t = files[fileName].contents.toString()
                    files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
                })
                done()
            })
            .build(err => {
                if(err) console.log(err)
                resolve()
            })
    })
}

