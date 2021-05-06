const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',
    password: 'CampCamp',
    database: 'directory_DB',
});

connection.connect((err) => {
    if (err) throw err;
    findDept();
});

const findDept = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Role',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Edit Role',
                'Edit Manager',
                'Exit'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    empView();
                    break;

                case 'View All Employees By Department':
                    deptSearch();
                    break;

                case 'View All Employees By Role':
                    roleSearch();
                    break;

                case 'Add Employee':
                    addEmp();
                    break;

                case 'Add Department':
                    addDept();
                    break;

                case 'Add Role':
                    addRole();
                    break;
                
                case 'Edit Role':
                    editRole();
                    break;     
                
                case 'Edit Manager':
                    editManager();
                    break;

                case 'Exit':
                    process.exit();

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const empView = () => {
    const query = 'SELECT role.title AS role, m.first_name AS managerFirstName, e.id, e.first_name, e.last_name FROM employee AS e LEFT JOIN role ON e.role_id = role.id LEFT JOIN employee AS m ON e.manager_id = m.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach((employee) => {
            console.log(
                `id: ${employee.id} || First Name: ${employee.first_name} || Last Name: ${employee.last_name} || Role: ${employee.role} || Manager: ${employee.managerFirstName}`
            )
        });
        findDept();
    })
};

const deptSearch = () => {
    const tableDept = 'SELECT name, id AS value FROM department';
    connection.query(tableDept, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt({
                name: 'department',
                type: 'rawlist',
                message: 'What department would you like to view?',
                choices: res
            })
            .then((response) => {
                const query = `SELECT role.title AS role, m.first_name AS managerFirstName, e.id, e.first_name, e.last_name FROM employee AS e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department AS d ON role.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE d.id = ${response.department};`;
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    res.forEach((employee) => {
                        console.log(
                            `id: ${employee.id} || First Name: ${employee.first_name} || Last Name: ${employee.last_name} || Role: ${employee.role} || Manager: ${employee.managerFirstName}`
                        )
                    })
                    findDept();
                })
            })
    })
}

const roleSearch = () => {
    const tableRole = 'SELECT title AS name, id AS value FROM role';
    connection.query(tableRole, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt({
                name: 'role',
                type: 'rawlist',
                message: 'What role would you like to view?',
                choices: res
            })
            .then((response) => {
                const query = `SELECT role.title AS role, m.first_name AS managerFirstName, e.id, e.first_name, e.last_name FROM employee AS e LEFT JOIN role ON e.role_id = role.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE e.role_id = ${response.role}`;
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    res.forEach((employee) => {
                        console.log(
                            `id: ${employee.id} || First Name: ${employee.first_name} || Last Name: ${employee.last_name} || Role: ${employee.role} || Manager: ${employee.managerFirstName}`
                        )
                    })
                    findDept();
                })
            })
    })

}

const addEmp = () => {
    const query = 'SELECT title AS name, id AS value FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err
        const query2 = `SELECT concat(first_name, ' ', last_name) AS name, id AS value FROM employee`;
        connection.query(query2, (err2, res2) => {
            if (err2) throw err2

            inquirer
                .prompt( [
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        name: 'role_id',
                        type: 'rawlist',
                        message: 'What is the employee\'s role?',
                        choices: res
                    },
                    {
                        name: 'manager_id',
                        type: 'rawlist',
                        message: 'Who is the manager of the employee',
                        choices: res2
                    }])
                .then((response) => {
                    const query3 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`
                    connection.query(query3, (err3, res3) => {
                        if (err3) throw err3;
                        findDept();
                    })

                }

                )

        })
    })
};

const addDept = () => {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?'
        })
        .then((response) => {
            const query4 = `INSERT INTO department (name) VALUES ('${response.name}')`
            connection.query(query4, (err4, res4) => {
                if (err4) throw err4;
                findDept();
            })
        })
};

const addRole = () => {
    const query = 'SELECT name, id AS value FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the new title?'
                },
                {
                    name: 'newSalary',
                    type: 'input',
                    message: 'What is the salary for the role?'
                },
                {
                    name: 'department_id',
                    type: 'rawlist',
                    message: 'What is the department for the role?',
                    choices: res
                }
            ]
            )
            .then((response) => {
                const query4 = `INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.newSalary}','${response.department_id}')`
                connection.query(query4, (err4, res4) => {
                    if (err4) throw err4;
                    findDept();
                })
            })
    })
};

const editRole = () => {
    const query = `SELECT concat(first_name, ' ', last_name) AS name, id AS value FROM employee`;
    connection.query(query, (err, res) => {
        if (err) throw err
        const query2 = 'SELECT title AS name, id AS value FROM role';
        connection.query(query2, (err2, res2) => {
            if (err2) throw err2

            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        type: 'rawlist',
                        message: 'Which employee would you like to update?',
                        choices: res
                    },
                    {
                        name: 'title',
                        type: 'rawlist',
                        message: 'What is the employee\'s new title?',
                        choices: res2
                    }
                ])
                .then((response) => {
                    const query3 = `UPDATE employee SET role_id = ${response.title} WHERE id = ${response.first_name}`
                    connection.query(query3, (err3, res3) => {
                        if (err3) throw err3;
                        findDept();
                    })
                })
        })
    })
}

const editManager = () => {
    const query = `SELECT concat(first_name, ' ', last_name) AS name, id AS value FROM employee`;
    connection.query(query, (err, res) => {
        if (err) throw err
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'rawlist',
                    message: 'Which employee would you like to update?',
                    choices: res
                },
                {
                    name: 'manager_id',
                    type: 'rawlist',
                    message: 'Who is the manager of the employee',
                    choices: res
                }
            ])
            .then((response) => {
                const query3 = `UPDATE employee SET manager_id = ${response.manager_id} WHERE id = ${response.first_name}`
                connection.query(query3, (err3, res3) => {
                    if (err3) throw err3;
                    findDept();
                })
            })
    })
}