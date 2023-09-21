const db = require("./config/connection")
const inquirer = require("inquirer");


const viewAllEmployees = () => {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}
const viewAllDepartments = () => {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}
const viewAllRoles = () => {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}
const addEmployee = () => {
    db.query("INSERT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}
const addDepartment = () => {
    db.query("INSERT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}
const addRole = () => {
    db.query("INSERT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}
const updateEmployeeRole = () => {
    db.query("UPDATE employee SET? WHERE?", function (err, res) {
        if (err) throw err;
        console.table(res);
        start()
    })
}


const start = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "view All Departments",
                "view All Roles",
            ]
        }
    ]).then((res) => {
        if (res.action === "View All Employees") {
            viewAllEmployees();
        } else if (res.action === "Add Employee") {
            addEmployee();
        } else if (res.action === "Add Department") {
            addDepartment();
        } else if (res.action === "Add Role") {
            addRole();
        } else if (res.action === "Update Employee Role") {
            updateEmployeeRole();
        } else if (res.action === "view All Departments") {
            viewAllDepartments();
        } else if (res.action === "view All Roles") {
            viewAllRoles();
        } else if (res.action === "Exit") {
            console.log("Goodbye!");
            process.exit();
        }
    });
}
start();