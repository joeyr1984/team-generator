const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var engineeringTeam = [];

const rolePrompt = [
    {
        type: "rawlist",
        name: "employee",
        message: "Please select an employee role to add.",
        choices: ["Engineer", "Intern", "no more to add"]
    }
];
const engineerPrompt = [
    {
        type: "input",
        name: "engineerName",
        message: "Please enter Engineer's Name.",
        default: "Bill Nye"
    },
    {
        type: "number",
        name: "engineerId",
        message: "Please enter Engineer's ID.",
        default: 2
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "Please enter Engineer's E-mail.",
        default: "Billnye@gmail.com"
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "Please enter Engineer's Github.",
        default: "BillNye1984"
    }
];
const internPrompt = [
    {
        type: "input",
        name: "internName",
        message: "Please enter the Intern's Name.",
        default: "Bill Nye"
    },
    {
        type: "number",
        name: "internId",
        message: "Please enter the Intern's ID.",
        default: 2
    },
    {
        type: "input",
        name: "internEmail",
        message: "Please enter the Intern's E-mail.",
        default: "Billnye@gmail.com"
    },
    {
        type: "input",
        name: "internSchool",
        message: "Please enter the Intern's School.",
        default: "Cooley High"
    }
];
const managerPrompt = [
    {
        type: "input",
        name: "managerName",
        message: "Let me know about your team. \n Please enter the Manager's Name.",
        default: "Bill Nye"
    },
    {
        type: "number",
        name: "managerId",
        message: "Please enter the Manager's ID.",
        default: 2
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Please enter the Manager's E-mail.",
        default: "Billnye@gmail.com"
    },
    {
        type: "number",
        name: "officeNumber",
        message: "Please enter the Manager's Office Number.",
        default: 40
    }
];
function teamPrompts() {
    inquirer.prompt(rolePrompt).then(answers => {
        if (answers.employee === "Engineer") {
            inquirer.prompt(engineerPrompt).then(answers => {
                var newEmployee = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                engineeringTeam.push(newEmployee);
                teamPrompts();
            });
        } else if (answers.employee === "Intern") {
            inquirer.prompt(internPrompt).then(answers => {
                var newEmployee = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                engineeringTeam.push(newEmployee);
                teamPrompts();
            });
        } else {
            //console.log(engineeringTeam);
            
            var teamHtml = render(engineeringTeam);
            writeToFile(OUTPUT_DIR, outputPath, teamHtml);

        }
    });
}
function init() {
    inquirer.prompt(managerPrompt).then(answers => {
        var newEmployee = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
        engineeringTeam.push(newEmployee);
        teamPrompts();
    });

}
function writeToFile(directory, fileName, data) {
     if (!fs.existsSync(directory)) {
       fs.mkdirSync(directory);
           }
    fs.writeFile(fileName, data, function(err){
        if(err){
            return console.log(err);
            
        }
    });
}
init();

