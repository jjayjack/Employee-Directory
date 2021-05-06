DROP DATABASE IF EXISTS directory_DB;
CREATE database directory_DB;

USE directory_DB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NULL,
    PRIMARY KEY (id),
    role_id INT NOT NULL,
    FOREIGN KEY role_id REFERENCES role(id),

    manager_id INT NOT NULL,
    FOREIGN KEY manager_id REFERENCES employee(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NULL,
    PRIMARY KEY (id),
    department_id INT NOT NULL,
    FOREIGN KEY department_id REFERENCES department(id) 
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

SELECT role.title 
AS role, e.first_name 
AS managerFirstName, id, first_name, last_name 
FROM employee 
LEFT JOIN role 
ON employee.role_id = role.id 
LEFT JOIN employee 
AS e ON employee.manager_id = e.id;

