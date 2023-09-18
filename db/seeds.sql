INSERT INTO department(id, name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal");
INSERT INTO role(id, title, salary, department_id)
VALUES (1, "CEO", 500000, 1),
       (2, "Sales Lead", 130000, 2),
       (3, "Software Engineer", 180000, 3),
       (4, "Accountant", "155000", 4),
       (5, "Lawyer", 210000, 5);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, "Tyler", "Farrior", 1, null),
       (2, "John", "Wick", 2, 1),
       (3, "Jane", "Nelson", 3, 1),
       (4, "Mike", "Tyson", 4, 1),
       (5, "Tom", "Hanks", 5, 1);