import express from "express";
import taskController from "./controllers/taskController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use("/api", taskController); // Connect the API routes correctly

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
