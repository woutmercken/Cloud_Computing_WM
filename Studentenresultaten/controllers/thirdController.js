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
    res.render("third", {
        url: url
    });
};

module.exports.changeScore =  async function(req, res, next){
        let url = req.originalUrl;
        let student;
        if(req.body.studentName == undefined)
        {
            let name = req.body.name;
            try{
                await mongoose.connect(DATABASE_CONNECTION, DB_CONNECTION_OPTIONS);
                student =  await Student.find({name: name});
            } finally {
                await mongoose.connection.close();
            }
                res.render("third", {
                    url: url,
                    student: student,
                    name: student[0].name,
                    id: student[0].id,
                    courses: student[0].courses
                })  
        }
        else{
            let name = req.body.studentName;
            try{
                await mongoose.connect(DATABASE_CONNECTION, DB_CONNECTION_OPTIONS);
                student =  await Student.find({name: name});
            } finally {
                await mongoose.connection.close();
            }
            courses = JSON.parse(JSON.stringify( student[0].courses));
            scores = req.body.scores;
            for (i in courses)
            {
                 courses[i].score = scores[i];
            }
            try{
                await mongoose.connect(DATABASE_CONNECTION, DB_CONNECTION_OPTIONS);
                let result = await Student.findOneAndUpdate(
                    { courses : student[0].courses }, 
                    { $set : {courses: courses } },
                    { returnDocument : "after" }
        );
        console.log( result );
            } finally {
                await mongoose.connection.close();
            }
            res.render("third", {
                url: url,
            })  
        }
    } 
