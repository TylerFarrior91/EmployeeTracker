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
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's role ID?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the employee's manager ID?"
        }
    ]).then((res) => {
        db.query("INSERT INTO employee SET ?",
            {
                first_name: res.first_name,
                last_name: res.last_name,
                role_id: res.role_id,
                manager_id: res.manager_id
            })
        console.log("Employee added successfully!");
        start()
    })
}
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the department name?"
        }
    ]).then((res) => {
        db.query("INSERT INTO department SET ?",
            {
                name: res.department_name
            })
        console.log("Department added successfully!");
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