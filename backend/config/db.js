import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`MongoDB connected: ${conn.connection.host}`.blue.bold)
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB