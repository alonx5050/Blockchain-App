import { BlockchainService } from "./blockchain/service";
import dotenv from "dotenv";

dotenv.config();

async function testBlockchainService() {
    try {
        console.log("Initializing Blockchain Service...");
        await BlockchainService.init();

        console.log("Adding a test task...");
        const txHash = await BlockchainService.addTask("Buy groceries");
        console.log("Transaction Hash:", txHash);

        console.log("Fetching tasks from the blockchain...");
        const tasks = await BlockchainService.getTasks();
        console.log("Tasks:", tasks);

    } catch (error) {
        console.error("Test failed:", error);
    }
}

testBlockchainService();
