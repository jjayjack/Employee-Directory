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
    inquirer
        .prompt({
            name: 'first_name',
            type: '',
            message: ''
        })
};

const addDept = () => {
    inquirer
        .prompt({
            name: '',
            type: '',
            message: ''
        })
};

const addRole = () => {
    inquirer
        .prompt({
            name: '',
            type: '',
            message: ''
        })
};