# Blockchain To-Do List Application

**The simplest and most secure way to work with digital assets.**

![Client Website Screenshot](https://github.com/user-attachments/assets/11f0e7c7-b21f-422a-affa-345f94c964d2)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo Video](#demo-video)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Maintenance](#maintenance)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Blockchain To-Do List Application provides a seamless and secure way to manage tasks using blockchain technology. It ensures data integrity and transparency, making it ideal for environments where trust and security are paramount.

## Features

- **Task Management**: Add, view, and complete tasks with ease.
- **Blockchain Integration**: Each task is securely stored and managed on the blockchain.
- **Responsive UI**: Modern and intuitive interface inspired by leading design practices.
- **Transaction Feedback**: Real-time feedback on blockchain transactions with loading indicators and success messages.

## Demo Video

[![Watch the video](path_to_video_thumbnail.png)](path_to_demo_video.mp4)

*Click the image above to watch a demo of the application in action.*

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **npm**: Node.js package manager, included with Node.js.
- **Git**: For cloning the repository. [Download Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your_username/blockchain-todo-app.git
   cd blockchain-todo-app
   ```

## Backend Setup

```bash
cd backend
npm install
```

## Frontend Setup

```bash
cd ../frontend
npm install
```

## Configuration

### Backend Configuration:

1. Rename `.env.example` to `.env` in the **backend** directory.
2. Update the environment variables as needed.

### Frontend Configuration:

1. Rename `.env.example` to `.env` in the **frontend** directory.
2. Ensure the API endpoint URL matches your backend configuration.

## Usage

### Start the Backend

```bash
cd backend
npm start
```

The backend server will run on [http://localhost:3000](http://localhost:3000).

### Start the Frontend

```bash
cd frontend
npm start
```

Access the application at [http://localhost:3001](http://localhost:3001).

## Project Structure

```plaintext
blockchain-todo-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── ...
│   ├── .env.example
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   └── ...
│   ├── .env.example
│   └── ...
└── README.md
```

## Maintenance

- **Dependencies**: Regularly update npm packages to their latest versions.
- **Logs**: Monitor backend logs for any errors or warnings.
- **Security**: Ensure environment variables and sensitive data are secured.

---

## Flow of the Blockchain To-Do List Application

### 1️⃣ Initialization
- The application initializes with backend and frontend components.
- The Node.js backend sets up an Express server and loads configuration settings from environment variables (.env).
- The React frontend connects to the backend for real-time interaction with the blockchain.

### 2️⃣ Blockchain Smart Contract Interaction
- The backend interacts with a pre-deployed Ethereum smart contract on the Sepolia Testnet.
- The smart contract manages task creation, retrieval, and completion, ensuring transparency and security.
- The ABI (Application Binary Interface) is fetched dynamically from GitHub for seamless interaction with the contract.

### 3️⃣ Task Management & Storage
- Users can add, view, and complete tasks through the UI.
- Task data is stored on the blockchain, making it immutable and publicly verifiable.
- Each task has a unique ID, description, and completion status.

### 4️⃣ Transaction Processing & Confirmation
- When a task is added or completed, a blockchain transaction is triggered.
- The transaction is signed using the user's private key and sent to the Ethereum network.
- The frontend provides real-time transaction feedback, including:
  - "Transaction Pending" status while awaiting confirmation.
  - Success messages when transactions are finalized.

### 5️⃣ API Layer & Communication
- The backend exposes REST API endpoints (`GET /tasks`, `POST /tasks`, `POST /tasks/:id/complete`) for frontend interaction.
- Rate-limiting and input validation ensure security and prevent spam transactions.
- The frontend fetches blockchain-stored tasks dynamically and updates in real-time.

### 6️⃣ User Experience & UI Feedback
- A modern, Wix-inspired UI provides a clean and intuitive task management experience.
- The application uses loading indicators, animations, and success toasts for smooth UX.
- Task actions (adding/completing) instantly reflect blockchain changes for real-time updates.

### 7️⃣ Security & Best Practices
- All sensitive credentials (RPC URL, private key) are stored securely in environment variables.
- Pino logging captures important backend events and errors.
- Smart contract transactions cannot be altered, ensuring trustless operation.
