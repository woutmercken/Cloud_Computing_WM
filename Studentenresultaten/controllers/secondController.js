const { body, validationResult } = require('express-validator');
const dotenv=require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const DATABASE_CONNECTION = process.env.DATABASE_CONNECTION ;
const DB_CONNECTION_OPTIONS = JSON.parse(process.env.DATABASE_CONNECTION_OPTIONS);

const Student = require("../models/studentModel");

module.exports.index = function(req, res, next) {
    let url = req.originalUrl
    res.render("second", {
        url,
    });
}


module.exports.findStudent = [
    body('number').trim()
    .isInt().withMessage('Input must be a number.'),
    async function(req, res, next) {
        let url = req.originalUrl
        let number = req.body.number
        console.log(number)
        let studentsMetHetAantalOnvoldoendes = [];
        let students
        try{
            await mongoose.connect(DATABASE_CONNECTION, DB_CONNECTION_OPTIONS);
            students =  await Student.find({});
            console.log(students);
            for (i in students)
            {
                let aantalOnvoldoendes = 0;
                for (j in students[i].courses){
                    if(students[i].courses[j].score < 10){
                        aantalOnvoldoendes++;
                    }
                }
                if (aantalOnvoldoendes >= number){
                    studentsMetHetAantalOnvoldoendes.push(students[i].name)
                }
            }
        } finally {
            await mongoose.connection.close();
        }
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.render("second", {
                url,
                students: studentsMetHetAantalOnvoldoendes,
                errors : validationErrors.errors
            });
            return;
        }
        res.render("second", {
            url,
            students: studentsMetHetAantalOnvoldoendes
        });
    }

] 
