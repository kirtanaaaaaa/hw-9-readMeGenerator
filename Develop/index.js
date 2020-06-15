const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

inquirer
  .prompt({
    type: "input",
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
      console.log(res.data);
      const username = res.data.login;
      const email = res.data.email;
      const avatarUrl = res.data.avatar_url;
      const avatar = `![Avatar](`+ avatarUrl +`)`;
      const doc = `username:` + username + `\n` + `email:` + email + `\n` + avatar + `\n`;

      fs.writeFile("readMe.md", doc, function(err) {
        if (err) {
          throw err;
        } 
    });
  })
  .then(function(){
      inquirer.prompt([   
      {
        type: "input",
        name: "title",
        message: "what is the title of your project?"
      },
      {
        type: "input",
        name: "description",
        message: "Describe your project."
      },
      {
        type: "input",
        name: "installation",
        message: "what was the installation process?"
      },
      {
        type: "input",
        name: "usage",
        message: "Describe the usage of your project."
      },
      {
        type: "input",
        name: "license",
        message: "Indicate the license details."
      },
      {
        type: "input",
        name: "contributors",
        message: "Who contributed to this project"
      },
      {
        type: "input",
        name: "tests",
        message: "What tests were conducted?"
      }
    ])
  });     
})


`## Table of Contents
  
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)

## Description
  
${answers.description}

## Installation 

${answers.installation}

## Usage

${answers.usage}

## Licenses

${answers.license}

## Tests

${answers.tests}

## Contributors

${answers.contributors}
`





//const questions = [

//];

//function writeToFile(fileName, data) {
//}

//function init() {

//}

//init(); 
