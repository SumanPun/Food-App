const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "username is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    address:{
        type:Array
    },
    phoneNumber:{
        type:String,
        required:[true, "phoneNumber is required"]
    },
    userType:{
        type:String,
        required:[true, "user type is required"],
        default: 'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    answer:{
        type:String,
        required: [true, "Answer is required"]
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);