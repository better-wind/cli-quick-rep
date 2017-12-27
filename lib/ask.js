var inquirer = require('inquirer');
var generate = require('./generate')
var questions = [
    {
        type: 'input',
        name: 'Name',
        message: "What's your name"
    }
];
module.exports = function(src,des){
    return new Promise((resolve)=>{
        inquirer.prompt(questions).then(answers => {
            generate(answers,src,des)
                .then(()=>{
                    resolve()
                })
        });
    })

}
