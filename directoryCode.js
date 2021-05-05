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

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const empView = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        table(
            `id: ${employee.id} || First Name: ${employee.first_name} || Last Name: ${employee.last_name} || Role: ${employee.role_id} || Manager: ${employee.manager_id}`
        )
        findDept();
    })
};

const deptSearch = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'rawlist',
            message: 'What department would you like to view?',
            choices: ['Production', 'R&D', 'Purchasing', 'Marketing', 'HR', 'Accounting & Finance']
        })
        
};

const roleSearch = () => {
    inquirer
        .prompt({
            name: '',
            type: '',
            message: ''
        })
};

const addEmp = () => {
    inquirer
        .prompt({
            name: '',
            type: '',
            message: ''
        })
};

const addDept = () => {
    inquirer
        .prompt( {
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