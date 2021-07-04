import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import colors from "colors"
import tagRoutes from "./Routes/tagRoutes.js"

///// dotenv file config
dotenv.config()


///// database connection
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server Running...")
})

//////// routes 
app.use("/hashtags", tagRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT} `))