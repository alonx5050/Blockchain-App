import express, { Request, Response, Router } from "express";
import { BlockchainService } from "../blockchain/service";
import pino from "pino";

const logger = pino({ level: "info" });
const router: Router = express.Router();

// ✅ Utility function to handle async errors properly
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * GET /tasks - Fetch all tasks from the blockchain
 */
router.get("/tasks", asyncHandler(async (req: Request, res: Response) => {
    logger.info("API Request: Fetching tasks...");
    const tasks = await BlockchainService.getTasks();
    res.json(tasks);
}));

/**
 * POST /tasks - Add a new task
 */
router.post("/tasks", asyncHandler(async (req: Request, res: Response) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: "Task description is required" });
    }
    logger.info(`API Request: Adding task - ${description}`);
    const txHash = await BlockchainService.addTask(description);
    res.json({ message: "Task added successfully", transactionHash: txHash });
}));

/**
 * POST /tasks/:id/complete - Mark a task as completed
 */
router.post("/tasks/:id/complete", asyncHandler(async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    logger.info(`API Request: Completing task with ID ${taskId}`);
    const txHash = await BlockchainService.completeTask(taskId);
    res.json({ message: "Task completed successfully", transactionHash: txHash });
}));

export default router;
