var inquirer = require('inquirer');
var generate = require('./generate')
const getGitUser = require('./git-user')
var questions = [
    {
        type: 'input',
        name: 'Name',
        message: "What's your project name ?"
    },
    {
        type: 'input',
        name: 'Description',
        message: "What's your project description ?"
    }
];
module.exports = function(src,des){
    return new Promise((resolve)=>{
        inquirer.prompt(questions).then(answers => {
            answers.UserName = getGitUser().name
            generate(answers,src,des)
                .then(()=>{
                    resolve()
                })
        });
    })

}
