const dotenv=require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const DATABASE_CONNECTION = process.env.DATABASE_CONNECTION ;
const DB_CONNECTION_OPTIONS = JSON.parse(process.env.DATABASE_CONNECTION_OPTIONS);
const { body, validationResult } = require('express-validator');
const Student = require("../models/studentModel");

module.exports.index = function(req, res, next) {
    let url = req.originalUrl
    res.render("first", {
        url: url
    });
};

module.exports.findStudent = [
    body('name').trim()
    .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),

    async function(req, res, next){
        let url = req.originalUrl;
        let name = req.body.name
        let student;
        try{
            await mongoose.connect(DATABASE_CONNECTION, DB_CONNECTION_OPTIONS);
            student =  await Student.find({name: name});
        } finally {
            await mongoose.connection.close();
        }
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.render("first", {
                url: url,
                errors : validationErrors.errors
            });
            return;
        }
        let courses = student[0].courses
        if(req.body.course != "")
        {
            courses = student[0].courses.filter(course => course.courseName == req.body.course);
        }
        res.render("first", {
            url: url,
            student: student,
            name: student[0].name,
            id: student[0].id,
            courses: courses
        })
    } 
] 