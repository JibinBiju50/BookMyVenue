import "dotenv/config";
import mongoose from 'mongoose'

const connectDB = async () => {
    console.log("Mongo URI exists:", Boolean(process.env.MONGODB_URI));
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB connected..")
        console.log("MongoDB host:", connect.connection.host);
        console.log("MongoDB database:", connect.connection.name);
    } catch (error) {
        console.log(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;