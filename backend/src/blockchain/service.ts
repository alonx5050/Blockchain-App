import { ethers } from "ethers";
import axios from "axios";
import pino from "pino";
import dotenv from "dotenv";

dotenv.config();

const logger = pino({ level: "info" });

const RPC_URL = process.env.RPC_URL as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const CONTRACT_ADDRESS = "0xC282597ff29ca5b8c8dC8783E27503a79cb42a5D";
const ABI_URL = "https://raw.githubusercontent.com/SlavaSereb/todo-contract-abi/main/abi.json";

if (!RPC_URL || !PRIVATE_KEY) {
    throw new Error("Missing RPC_URL or PRIVATE_KEY in environment variables");
}

async function fetchABI(): Promise<any> {
    try {
        logger.info("Fetching ABI from GitHub...");
        const response = await axios.get(ABI_URL);
        return response.data;
    } catch (error) {
        logger.error("Error fetching ABI: " + error);
        throw new Error("Failed to fetch ABI");
    }
}

export class BlockchainService {
    private static contract: ethers.Contract | null = null;

    static async init() { // ensures the contract is only initialized when needed.
        try {
            const abi = await fetchABI();
            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            BlockchainService.contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
            logger.info("Blockchain service initialized successfully.");
        } catch (error) {
            logger.error("Error initializing blockchain service: " + error);
            throw new Error("Failed to initialize blockchain service");
        }
    }

    static async getTasks() {
        if (!BlockchainService.contract) await BlockchainService.init();
        try {
            logger.info("Fetching tasks from blockchain...");
            const tasks = await BlockchainService.contract!.getTasks();
            return tasks.map((task: any) => ({
                id: task.id.toString(),
                description: task.description,
                completed: task.completed,
            }));
        } catch (error) {
            logger.error("Error fetching tasks: " + error);
            throw new Error("Failed to fetch tasks");
        }
    }

    static async addTask(description: string) {
        if (!BlockchainService.contract) await BlockchainService.init();
        try {
            logger.info(`Adding task: ${description}`);
            const tx = await BlockchainService.contract!.addTask(description);
            await tx.wait();
            logger.info(`Task added successfully: ${tx.hash}`);
            return tx.hash;
        } catch (error) {
            logger.error("Error adding task: " + error);
            throw new Error("Failed to add task");
        }
    }

    static async completeTask(taskId: number) {
        if (!BlockchainService.contract) await BlockchainService.init();
        try {
            logger.info(`Completing task with ID: ${taskId}`);
            const tx = await BlockchainService.contract!.completeTask(taskId);
            await tx.wait();
            logger.info(`Task completed successfully: ${tx.hash}`);
            return tx.hash;
        } catch (error) {
            logger.error("Error completing task: " + error);
            throw new Error("Failed to complete task");
        }
    }
}
