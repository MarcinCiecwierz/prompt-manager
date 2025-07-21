# Prompt Vault - AI Prompt Manager

A modern full-stack application for storing, versioning and sharing prompts for AI chats. Application is build with **Spring Boot** on the backend and **React + Chakra UI** on frontend.

## Features

### Authentication

- Auth0-based OAuth login (Email + Password, Google, Github)
- Secure user-based prompt access

### Prompt Managment

- Create, update, delete prompts,
- View all your prompts in a clean way
- Share prompts publicly or keep them private

### Prompt Versioning

- Eveery edit to a prompt is saved as a new versions
- Restore or compare historical prompt versions

### Public Prompt Sharing

- Discover and reuse others' prompt ideas

## Tech Stack

| Laher    | Tech                                  |
| -------- | ------------------------------------- |
| Backend  | Java 17, Spring Boot, Spring Security |
| Auth     | Auth0 (OAuth2 + JWT)                  |
| Frontend | React, Vite, Chakra UI                |
| Database | PostgreSQL                            |
| Tools    | Docker, Postman                       |

## Getting Started

#### Backend

```bash
cd backend
./mvnw spring-boot:run
```

App runs at http://localhost:8080

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173
