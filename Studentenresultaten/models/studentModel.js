const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
        id:{
            type: Number,
            index: { unique: true }
        },
        name: {
                type: String,
                minLength: 3,
                trim: true,
                required: [ true, "Name is required" ]
        }, 
        courses :{
            type: Array
        }
    },
    { collection: "students" }
);

module.exports = mongoose.model("Student", studentSchema );