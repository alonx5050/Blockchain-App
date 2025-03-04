import express, { Request, Response, Router } from "express";
import { BlockchainService } from "../blockchain/service";
import { body, param, validationResult } from "express-validator";
import pino from "pino";

const logger = pino({ level: "info" });
const router: Router = express.Router();

//  Utility function to handle async errors properly
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 *  GET /tasks - Fetch all tasks from the blockchain
 */
router.get(
    "/tasks",
    asyncHandler(async (req: Request, res: Response) => {
        logger.info("API Request: Fetching tasks...");
        const tasks = await BlockchainService.getTasks();
        res.json(tasks);
    })
);

/**
 *  POST /tasks - Add a new task with input validation
 */
router.post(
    "/tasks",
    [
        body("description") // input validator
            .isString()
            .withMessage("Description must be a string")
            .notEmpty()
            .withMessage("Description cannot be empty"),
    ],
    asyncHandler(async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { description } = req.body;
        logger.info(`API Request: Adding task - ${description}`);
        const txHash = await BlockchainService.addTask(description);
        res.json({ message: "Task added successfully", transactionHash: txHash });
    })
);

/**
 *  POST /tasks/:id/complete - Complete a task with validation
 */
router.post(
    "/tasks/:id/complete",
    [
        param("id")
            .isInt()
            .withMessage("Task ID must be an integer"),
    ],
    asyncHandler(async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const taskId = parseInt(req.params.id);
        logger.info(`API Request: Completing task with ID ${taskId}`);
        const txHash = await BlockchainService.completeTask(taskId);
        res.json({ message: "Task completed successfully", transactionHash: txHash });
    })
);

export default router;
