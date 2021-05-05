DROP DATABASE IF EXISTS directory_DB;
CREATE database directory_DB;

USE directory_DB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY role_id REFERENCES role(id),
    FOREIGN KEY manager_id REFERENCES role
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NULL,
    FOREIGN KEY department_id REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

SELECT 'column_name(s)'
FROM employee'table1'
INNER JOIN role'table2'
ON 'table1.column_name' = 'table2.column_name'
INNER JOIN departmentShippers 
ON Orders.ShipperID = Shippers.ShipperID);

