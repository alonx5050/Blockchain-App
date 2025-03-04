import dotenv from "dotenv";
import { BlockchainService } from "./blockchain/service";


dotenv.config();
// Function to test the blockchain service
async function testBlockchainService() {
    try {
        console.log("Initializing Blockchain Service...");
        await BlockchainService.init();

        console.log("Fetching tasks from the blockchain...");
        const tasks = await BlockchainService.getTasks();
        console.log("Tasks:", tasks);

    } catch (error) {
        console.error("Test failed:", error);
    }
}

// Run the test
testBlockchainService();
