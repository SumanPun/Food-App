const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req,res) =>{
    try {
        
        const {userName, email, password,phoneNumber,address, answer} = req.body;
        //validation
        if(!userName || !email || !password || !phoneNumber || !address || !answer){
            return res.status(500).send({
                success: false,
                message: 'Enter all fields'
            })
        }
       // check user
        const existing = await userModel.findOne({email});
        if(existing) {
            return res.status(500).send({
                success: false,
                message: 'Email already register'
            })
        }

        //hash password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create new user
        var user = await userModel.create({
            userName,
            email,
            password:hashPassword,
            phoneNumber,
            address,    
            answer
        });
        
        return res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in register api',
            error,
        })
    }
}

//Login
const loginController = async (req, res) => {
    try {
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Email and Password is required"
            });
        }

        //check user
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).send({
            success: false,
            message: "user did not found"
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(500).send({
            success: false,
            message: "Invalid credentials"
        });

        //token
        const token = JWT.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login successfull",
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login api",
            error
        })
    }
}


module.exports = {registerController, loginController}