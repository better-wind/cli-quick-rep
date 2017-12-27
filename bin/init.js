const program = require('commander')

program.version(require('../package.json').version)
    .usage('<command> [项目名称]')
    .command('wpk', 'webpack构建js项目')
    .parse(process.argv)
