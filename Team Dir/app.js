const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []
const idArray = []

function appCreate() {
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "what is your engineers name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "please enter your engineers name";
                }
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "what is your engineers github name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "please enter your engineer github name"
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "what is your engineers email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true
                    }
                    return "please enter a valid email?"
                }
            },
            {
                type: "input",
                name: "engineerID",
                message: "what is your engineers Id Number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "Id already taken chose a different one?"
                        } else {
                            return true
                        }
                    }
                    return "please enter a number greater then 0"
                }
            }

                .then(answers => {
                    const engineer = new Engineer(answers.engineerName, answers.engineerEmail, answers.engineerGithub, answers.engineerId);
                    teamMembers.push(engineer);
                    idArray.push(answers.engineerId);
                    createTeam();



                },
                    function addIntern() {
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "internSchool",
                                message: "what is your schools name?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true
                                    }
                                    return "please enter your school name";
                                }
                            },
                        
                            {
                                type: "input",
                                name: "internName",
                                message: "what is your name?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true
                                    }
                                    return "please enter your name";
                                }
                            },

                            {
                                type: "input",
                                name: "internEmail",
                                message: "what is your email?",
                                validate: answer => {
                                    const pass = answer.match(
                                        /\S+@\S+\.\S+/
                                    );
                                    if (pass) {
                                        return true
                                    }
                                    return "please enter a valid email?"
                                }
                            },
                            {
                                type: "input",
                                name: "internId",
                                message: "what is your Id Number?",
                                validate: answer => {
                                    const pass = answer.match(
                                        /^[1-9]\d*$/
                                    );
                                    if (pass) {
                                        if (idArray.includes(answer)) {
                                            return "Id already taken chose a different one?"
                                        } else {
                                            return true
                                        }
                                    }
                                    return "please enter a number greater then 0"
                                }
                            }
                        .then(answers => {
                                    const intern = new Intern(answers.internSchool, answers.internEmail, answers.internId, answers.internName);
                                    teamMembers.push(intern);
                                    idArray.push(answers.internId);
                                    createTeam();


                                },
                                    function addManager() {
                                        inquirer.prompt([
                                            {
                                                type: "input",
                                                name: "managerOfficeNumber",
                                                message: "what is your office nunmer?",
                                                validate: answer => {
                                                    if (answer !== "") {
                                                        return true
                                                    }
                                                    return "please enter your office number?";
                                                }
                                            },
                                            {
                                                type: "input",
                                                name: "managerName",
                                                message: "what is your name?",
                                                validate: answer => {
                                                    if (answer !== "") {
                                                        return true
                                                    }
                                                    return "please enter your name";
                                                }
                                            },

                                            {
                                                type: "input",
                                                name: "managerEmail",
                                                message: "what is your email?",
                                                validate: answer => {
                                                    const pass = answer.match(
                                                        /\S+@\S+\.\S+/
                                                    );
                                                    if (pass) {
                                                        return true
                                                    }
                                                    return "please enter a valid email?"
                                                }
                                            },
                                            {
                                                type: "input",
                                                name: "managerID",
                                                message: "what is your Id Number?",
                                                validate: answer => {
                                                    const pass = answer.match(
                                                        /^[1-9]\d*$/
                                                    );
                                                    if (pass) {
                                                        if (idArray.includes(answer)) {
                                                            return "Id already taken chose a different one?"
                                                        } else {
                                                            return true
                                                        }
                                                    }
                                                    return "please enter a number greater then 0"
                                                }
                                            }
                                        .then(answers => {
                                                    const manager = new manager(answers.managerName, answers.managerEmail, answers.managerId, answers.managerOfficeNumber);
                                                    teamMembers.push(manager);
                                                    idArray.push(answers.managerId);
                                                    createTeam();


                                                },
function createTeam (){
    inquirer.prompt([
     {
      type:"list",
      name:"employeeChoice",
      message:"what type of team member would you like to add",
      choices:[
          "intern", "manager", "engineer","I dont want to add anymore team members"
      ]

     }   
    ]).then (userChoice=>{
        switch(userChoice.employeeChoice){
            case "intern":
                addIntern();
                break;

                case "manager":
                addManager();
                break;

                case "engineer":
                    addEngineer();
                   break;
                   default:
                       buildTeam();
        }
    })


},                                         
function buildTeam(){
    if (!fs.existsSync(OUTPUT_DIR)) 
    {      fs.mkdirSync(OUTPUT_DIR)
        } 
           fs.writeFileSync(outputPath, render(teamMembers), "utf-8");


},                                           
appCreate()                                                                                      
                                                                                  

























