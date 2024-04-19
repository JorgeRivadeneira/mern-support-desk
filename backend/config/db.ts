const mongoose = require('mongoose');
const colors = require('colors');

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error: any) {
        // console.log(`Error: ${error.message}`.red.underline.bold);
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}