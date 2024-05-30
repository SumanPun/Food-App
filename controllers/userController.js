const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id});

        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //hide password
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User get successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in user api",
            error
        })
    }
}

//update user
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id});

        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        //update
        const {userName,address,phoneNumber} = req.body;
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phoneNumber) user.phoneNumber = phoneNumber

        await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update user api",
            error
        })
    }
}

const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id});

        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        //get data from user
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success: false,
                message: "Please provide old password or new password"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password"
            });
        }
        
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password changed successfully"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in change password api",
            error
        })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const {email,newPassword,answer} =req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message: "Enter all the fields"
            })
        }
        //find user with answer
        const user = await userModel.findOne({email,answer});

        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or answer"
            })
        }
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in reset password api",
            error
        })
    }
}

const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete profile api",
            error
        })
    }
}

module.exports = {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController}