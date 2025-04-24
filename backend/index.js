import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authenticationRouter from "./routes/authentication.route.js";
import projectRouter from "./routes/project.route.js";
import bidRouter from "./routes/bid.route.js"
const app = express()


const PORT = 3000;

app.use(express.json())
app.use(cors())

app.use("/authenticate", authenticationRouter)
app.use("/projects", projectRouter)
app.use("/bids", bidRouter)

mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT, () => {
    console.log((`${PORT} is listening`));
})

app.get("/", (req, res) => {
    res.json("app is listening ")
})