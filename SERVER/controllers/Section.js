const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        //data Fetch
        const {sectionName, courseId} =req.body;
        //data validation 
        if(!sectionName || courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //ctrate section
        //update course with section ObjectID
        //return response
    }
    catch(error){

    }
}