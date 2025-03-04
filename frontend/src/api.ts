import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Fetch tasks from the backend
export const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};

// Add a new task
export const addTask = async (description: string) => {
    const response = await axios.post(`${API_URL}/tasks`, { description });
    return response.data;
};

// Complete a task
export const completeTask = async (taskId: number) => {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/complete`);
    return response.data;
};
