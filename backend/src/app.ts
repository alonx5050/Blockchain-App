import express from "express";
import taskController from "./controllers/taskController";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//  Limit requests to 100 per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});

app.use(express.json());
app.use("/api", taskController); // Connect the API routes correctly
app.use(limiter);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
