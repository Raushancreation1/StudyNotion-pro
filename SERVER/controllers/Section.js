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
        const newSection = await Section.create({sectionName});
        //update course with section ObjectID
        const updateCourse = await Course.findByIdAndUpdate(
                                          courseId,
                                          {
                                            $push:{
                                                courseContent:newSection._id,
                                            }
                                          },
                                          {new:true},
                                          );
            //HW: use populate to replace sections/sub-sections both in the updateCourseDetails
       
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updateCourseDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again0",
            error:error.message,
        })

    }
}


exports.updateSection = async(res, req) => {
    try {


        //data input
        const {sectionName, sectionId } = req.body;
        //data validation
         if(!sectionName || sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //update data
    const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
    //return res 
    return res.status(200).json({
            success:true,
            message:'Section created successfully',
            
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again0",
            error:error.message,
        });
    }
}




exports.deleteSection = async (res,req) => {
    try{

        //get ID -- assuming that we are sending ID in params
        const {sectionId} = req.params
        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //return response
         return res.status(200).json({
            success:true,
            message:'Section Delete successfully'
            
        })
    }
    
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again0",
            error:error.message,
        });
    }
}