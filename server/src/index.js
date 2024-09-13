import express from "express";
import cors from "cors";


import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import propertyRouter from "./routers/property.router.js";

import connectDB from "./mongodb/index.js";


const app = express();
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173' ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }));
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.send({message: "Hello World"});
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/property', propertyRouter);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server started on http://localhost:8080"));
    } catch (error) {
        console.log(error);
    }
}

startServer();