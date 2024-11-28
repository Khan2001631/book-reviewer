import mongoose from 'mongoose'

// Connect to MongoDB
const connectDatabase = async() => {
    try {        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGOSE_DB_NAME}`);
        console.log(`\nMongoDB connected!!! DB Host: ${connectionInstance.connection.host}`);
    }
    catch(error) {
        console.log("MongoDB connection failed: ",error);
    }
}

export default connectDatabase