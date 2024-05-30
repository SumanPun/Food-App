const express = require('express');
const { getUserController, updateUserController, changePassword, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


//routes
//get user
router.get("/getUser",authMiddleware, getUserController);
//update user
router.put("/updateUser",authMiddleware, updateUserController);
//change password
router.post("/updatePassword",authMiddleware, updatePasswordController);
//reset password
router.post("/resetPassword",authMiddleware, resetPasswordController);
//delte profile
router.delete("/deleteUser/:id",authMiddleware, deleteProfileController);


module.exports = router;