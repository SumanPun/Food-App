const mongoose = require('mongoose');


//mongoose database connect
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to datbase ${mongoose.connection.host} `)
    } catch (error) {
        console.log("DB error",error);
    }
}

module.exports = connectDb;
