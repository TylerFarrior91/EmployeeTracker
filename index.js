const db = require("./config/connection")
const inquirer = require("inquirer");

db.connect(function(err) {
    if(err) throw err;
    console.log("MYSQL CONNECTED")
    start();
});

const start = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees"]
        }
    ]).then((res) => {
        if(res.action === "View All Employees") {
            viewAllEmployees();
        }
    })
}

const viewAllEmployees = () => {
    db.query("SELECT * FROM employee", function(err, res) {
        if(err) throw err;
        console.table(res);
        start()
    })
}

