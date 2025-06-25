const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadeImageToCloudinary} = require("../utils/imageUploader");



// createCourse handler function
exports.createCourse = async (req, res) => {
    try {

        //fetch data
        const {courseName, courseDescription, whatYoutWillLearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYoutWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
        } 

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructor details:", instructorDetails);
        //TODO: verify that userid and instructorDetails._id are same or different ?
        
        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'instructor Details not found',
            });
        }

        //check given tag is valid or not 
        const tagDetails = await Tag.findById(tag);
         
        if(!tagDetails) {
            return res.status(404).json({
                success:false,
                message:'tag Details not found',
            });
        }

        //upload image top cloudinary
        const thumbnailImage = await uploadeImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYoutWillLearn: whatYoutWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        //add the new course to the user schema of instructor 
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        //update the Tag schema
        //Today : WH 

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error:error.message,
        })

    }
};


//getAllCourses hendler function

exports.showAllCourses = async (res, req) => {
    try {
        const allCourses = await Course.find({}, {})
        
        return res.status(200).json({
            success:true,
            message:'Data for all Courses fetched successfully',
            data:allCourses,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data ',
            error:error.message,
        });
    }
}