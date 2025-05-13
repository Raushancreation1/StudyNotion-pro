const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Send OTP
exports.sendOTP = async(req, res) => {

   try{
        //fetch the email from the request body
        const {email} = req.body;

        //check if the user already exists
        const checkUserPresent = await User.findOne({email});

        //if user already exists, then return a response
        if(checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User already registered ",
            })
        }

        // generate OTP 
        var otp = otpGenerator.generator(6, { 
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated:",otp);

        //check unique otp or not
        let result = await OTP.findOne({oyp: otp});

        while(result) {
                otp = otpGenerator.generator(6, { 
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                result = await OTP.findOne({oyp: otp});
        }

        const otpPayload = {
            email, otp
        };
        // create a new OTP
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP created:", otpBody);

        //return a response 
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }


};


//singUp
exports.singUp = async(req, res) => {

    try{
                //data fetching from request body
            const {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                contactNumber,
                otp
            } = req.body;
            // validation

            if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
                return res.status(403).json ({
                    success: false,
                    message: "All fields are required",
                })
            }
            //2 passwords should be same
            if(password !== confirmPassword) {
                return res.status(403).json ({
                    success: false,
                    message: "password and confirmPassword Value does not match, please try again ",
                });
            }
            //check user already exists or not
            const existingUser = await User.findOne({email});
            if(existingUser) {
                return res.status(400).json({
                    success:false,
                    message:'User already registered',
                });
            }


            //find most recent OTP stored in the user
            const recentOtp = await OTP.findOne({email}).sort({createdAt: -1}).limit(1);
            console.log("RECENT :-", recentOtp);

            //validate the OTP
            if(recentOtp.length == 0) {
                //OTP not found 
                return res.status(400).json({
                    success: false,
                    message: "OTP Found",
                })
            }else if(otp !== recentOtp.otp) {
                //OTP Invalid
                return res.status(400).json({
                    success: false,
                    message:"Invalid OTP"
                });
            }

            //hash the password

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashedPassword :- ", hashedPassword);

            //entry create in DB
            const profileDetails = await profile.create({
                gender: null,
                dateOfBirth: null,
                about: null,
                contactNumber:null,
            });

            const user = await User.create({
                firstName,
                lastName,
                email,
                contactNumber,
                password: hashedPassword,
                accountType,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
            })

            //return a response
            return res.status(200).json({
                success: true,
                message:"User registered successfully",
                user,
            })

        }
         catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "User cannot be registrered. please try again",
            });

          }
}

//Login
exports.login = async (req, res) => {
    try{
        //get data from req body
        const {email, password} = req.body;
        // validate the data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message:"All fields are required, please try again",
            });
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User is not registered, please signUp first",
            });
        }
        //generate JWT, after password match
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user. id,
                role: user.role,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            console.log("token", token);
            user.token = token;
            user.password = undefined;
        
            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Login successfully",
            })

        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failed, please try again",
        });

    }
};


//changePassword