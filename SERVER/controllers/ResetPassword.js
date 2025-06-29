
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


//resetPasswordTocken
exports.resetPasswordTocken = async (req, res) => {
    try{
        //get email from req body
        const email = req.body.email;
        //check user for this email, email calidation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({
                success: false,
                message:'Your Email is not registered with us '
            })
        }
        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate(
                                    {email:email},
                                    {
                                        token:token,
                                        resetPasswordExpires:Date.now() + 5*60*1000,
                                    },
                                    {new:token}); 
        //create url
         const url = `http://localhost:3000/update-password/${token}`;
        //sand mail containing the url 
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
        //return Response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change password '
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Somthing went worng while sending reset pwd mail'
        })

    }
}


//resetPassword 

exports.resetPassword = async (req, res) => {
    try{
                //data fetch
            const {password, consfirmPassword, token} = req.body;
            //validation
            if(password !== consfirmPassword) {
                return res.json({
                    success:false,
                    message:'Password not matching',
                });
            }
            //get userdetails from db using token
            const userDetails = await Uint8Arrayser.findOne({token:token}); 
            //if no entry - invalid token
            if(!userDetails) {
                return res.json({
                    success:false,
                    message:'Token is invalid',
                });
            }
            //Token time check
            if(userDetails.resetPasswordExpires < Date.now () ) {
                return res.json ({
                    success:false,
                    message:'Token is expired, please regenerate your token',
                });
            }
            //hasd pwd 
            const hashedPassword = await bcrypt.hash(password, 10);
            //password Update
            await User.findByIdAndUpdate(
                {token:token},
                {password:hashedPassword},
                {new:true},
            );
            //return response
            return res.status(200).json ({
                success:true,
                message:'Password reset successful',
            });

    }
    catch(error){
         console.log(error);
        return res.status(500).json({
            success:false,
            message:'Somthing went worng while sending resetpassword mail'
        })
    }
}

