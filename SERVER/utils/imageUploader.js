const cloudinary = require('cloudinary').v2


exports.uploadeImageToCloudinary = async (file, folder, height, quality) => {
    const options = {folder};
    if(height){
        options.height= height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resourec_type = "auto";
    return await cloudinary.uploader.upload(file.tepFilePath, options);
}