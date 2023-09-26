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
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the role department ID?"
        }
    ]).then((res) => {
        db.query("INSERT INTO role SET?",
            {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            })
        console.log("Role added successfully!");
        start()
    })

}

const updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
        inquirer.prompt([{
            type: 'list',
            name: 'name',
            message: "Which employee would you like to update?",
            choices: employees
        }]).then(res => {
            const employee = res.name;
            const params = [];
            params.push(employee);
            db.query(`SELECT * FROM role`, (err, data) => {
                if (err) throw err;
                const roles = data.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([{
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's new role?",
                    choices: roles
                }]).then(res => {
                    const role = res.role;
                    params.push(role);
                    let employee = params[0]
                    params[0] = role
                    params[1] = employee
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, params, (err, result) => {
                        if (err) throw err;
                        console.log("Employee has been updated!");
                        start();
                    });
                });
            });
        });
    });
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