const { v4: uuidv4 } = require('uuid');
const sql = require('../db/mysql')

const id_prefix = 'sid-';

class Student {

    constructor(student) {
        this.id = id_prefix + uuidv4();
        this.name = student.name
        this.age = student.age;
        this.year = student.year;
        this.is_deleted = false;
    }
}

module.exports = Student;