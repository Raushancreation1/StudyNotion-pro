const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
   

    sectionName:{
        type:String,
    },
    timeDuration:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ],
    

    
});

module.exports = mongoose.model("Section", sectionSchema);
