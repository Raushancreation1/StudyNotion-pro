const jwt = require("jsonwebtoken");
require ("dotenv").config();
const User = require("../models/User");

// auth

exports.auth = async (req, res, next) => {
    try{
        //extract tocken
        const tocken = req.cookies.tocken || req.body.tocken || req.header("Authorisation").replace("Bearer ", "");

        //if tocken missing, then return response
        if(!tocken) {
            return res.status(401).jason({
                success:false,
                message:'Tocken is missing',
            });
        }

        //verify the tocken
        try{
            const decode = jwt.verify(tocken, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            return res.status(401).jason({
                success:false,
                message:'tocken is invalid',
            });
        }
    }
    catch(error){
        return res.status(401).jason({
            success:false,
            message:'Something went wrong while validating the tocken',
        });

    }
}


//isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student") {
            return res.status(401).jason({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
    }
    catch{
        return res.status(500).jason ({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor") {
            return res.status(401).jason({
                success:false,
                message:'This is a protected route for Instructor only',
            });
        }
        next();
    }
    catch{
        return res.status(500).jason ({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}


//isAdmin

exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Admin") {
            return res.status(401).jason({
                success:false,
                message:'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch{
        return res.status(500).jason ({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}

