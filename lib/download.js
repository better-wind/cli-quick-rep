const download = require('download-git-repo')
const path = require('path')
const fs = require('fs')
module.exports = function(target,src){
    return new Promise((reslove,reject)=>{
        download('luyi10year/template-cli',
            target, { clone: true }, (err) => {
                if(err) {
                    reject(err)
                } else {
                    reslove()
                }
            })
    })

}


