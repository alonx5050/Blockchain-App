import React, { useEffect, useState } from "react";
import { fetchTasks, addTask, completeTask } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #e1e9f0, #c7d8f0);
  font-family: "Arial", sans-serif;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  gap: 50px;
`;

const LeftContainer = styled.div`
  width: 45%;
`;

const RightContainer = styled.div`
  width: 45%;
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.25); /* Slightly increased transparency */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease-in-out;

  &:hover {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;



const Title = styled.h1`
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
`;

const TextBlock = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #3a539b;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-color: #6200ea;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 0 3px 15px rgba(106, 17, 203, 0.3);

  &:hover {
    box-shadow: 0 5px 20px rgba(106, 17, 203, 0.5);
    transform: scale(1.05);
  }
`;



const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background: #ececec;
  }
`;

const CompleteButton = styled(Button)`
  background: #00b74a;
  &:hover {
    background: #008c3a;
  }
`;

const TaskText = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed }) => (completed ? "#888" : "#222")};
  font-size: 16px;
  transition: 0.3s;

  ${({ completed }) =>
    completed &&
    `text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15); /* Improves readability */
    opacity: 0.8;`}
`;


const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const TaskAddedMessage = styled(motion.div)`
  background: #dff0d8;
  color: #3c763d;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const TaskLoading = styled(motion.div)`
  background: #fff3cd;
  color: #856404;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

// Main App Component
const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: string; description: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      toast.warning("Task description cannot be empty");
      return;
    }

    setAddingTask(true);
    try {
      await addTask(newTask);
      setNewTask("");
      toast.success("Task added!");
      setTasks(await fetchTasks());
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setAddingTask(false);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    setPendingTaskId(taskId.toString());
    try {
      await completeTask(taskId);
      toast.success("Task completed!");
      setTasks(await fetchTasks());
    } catch (error) {
      toast.error("Failed to complete task");
    } finally {
      setPendingTaskId(null);
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        {/* Left Text Block */}
        <LeftContainer>
          <TextBlock>The simplest and most secure way to work with digital assets.</TextBlock>
        </LeftContainer>

        {/* Right Todo List */}
        <RightContainer>
          <Title>My Account</Title>

          {/* Add Task Feedback */}
          {addingTask && <TaskLoading initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Adding Task...</TaskLoading>}

          {/* Input for Adding Task */}
          <InputContainer>
            <Input
              type="text"
              placeholder="Enter task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={handleAddTask} disabled={addingTask}>
              {addingTask ? <CircularProgress size={20} color="inherit" /> : "Add Task"}
            </Button>
          </InputContainer>

          {/* Loading Indicator */}
          {loading && (
            <LoaderContainer>
              <CircularProgress />
            </LoaderContainer>
          )}

          {/* Task List */}
          <TaskList>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TaskText completed={task.completed}>{task.description}</TaskText>
                {!task.completed && (
                  <CompleteButton onClick={() => handleCompleteTask(Number(task.id))} disabled={pendingTaskId === task.id}>
                    {pendingTaskId === task.id ? <CircularProgress size={20} color="inherit" /> : "Complete"}
                  </CompleteButton>
                )}
              </TaskItem>
            ))}
          </TaskList>

          <ToastContainer />
        </RightContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default App;
