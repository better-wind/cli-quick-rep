const program = require('commander')
const chalk = require('chalk')
const exists = require('fs').existsSync
const rm = require('rimraf').sync
const ora = require('ora')
const logger = require('../lib/logger')
const download = require('../lib/download')
const asking = require('../lib/ask')
const path = require('path')


program.usage('<project-name>').parse(process.argv)
/**
 * Help.
 */

program.on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new project with webpack'))
    console.log('    $ qbr wpk my-project')
    console.log()
})

/**
 * Help.
 */

function help () {
    program.parse(process.argv)
    if (program.args.length < 1) return program.help()
}
help()

let projectName = program.args[0]
var target = path.join(__dirname,'download-temp')
const fileName = path.join(__dirname,'../',projectName)

run()

function run(){
    downloadAndGenerate()
}
function downloadAndGenerate(){
    const spinner = ora('downloading template')
    spinner.start()
    download(target,fileName)
        .then(()=>{
            spinner.stop()
            logger.success('Generated "%s".', fileName)
            return asking(target,fileName)
        })
        .then(()=>{
            rm(target)
        })
        .catch((err)=>{
            spinner.stop()
            logger.fatal('Failed to download repo ' + fileName + ': ' + err)
        })
}