#! /usr/bin/env node
import inquirer from "inquirer";
const employeeList = [];
async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter Empolyee ID:'
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter Empolyee name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter Empolyee salary:'
        },
    ]);
    employeeList.push(answers);
    console.log('Employee added successfully!');
    console.log(`Employee ID = ${answers.id}, Employee Name = ${answers.name}, Employee Salary = ${answers.salary}`);
}
async function editEmployee() {
    const id = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter Employee ID to edit:'
        }
    ]);
    const index = employeeList.findIndex(emp => emp.id === id);
    if (index !== -1) {
        const updates = await inquirer.prompt([
            {
                tyep: 'input',
                name: 'name',
                message: ' Enter new name:',
                default: employeeList[index].name
            },
            {
                tyep: 'input',
                name: 'salary',
                message: ' Enter new salary:',
                default: employeeList[index].salary
            },
        ]);
        employeeList[index] = { ...employeeList[index], ...updates };
    }
    else {
        console.log('Employee not found!');
    }
    menu();
}
async function deleteEmployee() {
    const id = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter Employee ID to delete:'
        }
    ]);
    const index = employeeList.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employeeList.splice(index, 1);
        console.log('Employee deleted sucessfully!');
    }
    else {
        console.log('Employee not found!');
    }
    menu();
}
async function Exit() {
    console.log('Exiting...');
    process.exit();
}
async function menu() {
    const option = await inquirer.prompt([
        {
            type: 'list',
            name: 'optionsList',
            message: 'Choose an object:',
            choices: [
                'Add Employee',
                'Edit Employee',
                'Delete Employee',
                'Exit'
            ]
        }
    ]);
    switch (option.optionsList) {
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Edit Employee':
            await editEmployee();
            break;
        case 'Delete Employee':
            await deleteEmployee();
            break;
        case 'Exit':
            await Exit();
            break;
        default:
            console.log('Something Went Wrong!!!');
            break;
    }
}
menu();
