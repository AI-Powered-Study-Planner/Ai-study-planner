import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected");
        
    } catch (error) {
        console.log("error mongodb not connecting", error.message);
        process.exit(1)        
    }
}

export default connectDb