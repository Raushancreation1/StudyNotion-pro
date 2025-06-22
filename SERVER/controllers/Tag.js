const Tag = require("../models/tags");

//create Tag handler function

exports.createTag = async(req, res) => {
    try{
        //fetch data
        const {name, description} = req.body;
        //validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails)

        //return response
        return res.status(200).json({
            success:true,
            message:"Tga Created Successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};


//getAllTags handler Function
exports.showAllTags = async (req, res) => {
    try{
        const allTage = await Tag.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:"All Tags returned Successfully",
            allTage,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

