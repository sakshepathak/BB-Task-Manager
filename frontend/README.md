# Bread and Butter

A full-stack Task Management System built with a secure Node.js backend and a modern, responsive Next.js frontend. This application allows users to register, log in, and efficiently manage their personal tasks with a clean, production-grade user experience.

## Tech Stack

### Backend
* Node.js
* TypeScript
* Express.js
* Prisma ORM
* SQLite (development) / PostgreSQL (production-ready)
* JWT Authentication (Access + Refresh Tokens)
* bcrypt (password hashing)

### Frontend
* Next.js (App Router)
* TypeScript
* Tailwind CSS

## Features

### 1. Authentication
* User Registration & Login
* Secure password hashing using bcrypt
* JWT-based authentication:
  * Short-lived Access Token
  * Long-lived Refresh Token
* Persistent login with token refresh
* Logout functionality

### 2. Task Management
* Create, Read, Update, Delete (CRUD) tasks
* Each task belongs to a specific authenticated user
* Toggle task status
* Pagination support
* Filtering by task status
* Search tasks by title

## UI/UX Design Philosophy

The frontend is designed to feel like a **modern SaaS product**, inspired by tools like Notion, focusing on clarity, structure, and usability rather than visual clutter.

### Design Principles
* Minimal and distraction-free interface
* Strong visual hierarchy using typography
* Consistent spacing and alignment (grid-based layout)
* Generous whitespace for readability
* Subtle shadows and borders for separation
* Smooth, fast, and non-distracting transitions

## UI Structure

### Authentication Pages
* Clean, centered layout
* Simple input fields with clear focus states
* Minimal design with no unnecessary elements

### Dashboard Layout

#### Sidebar
* Fixed vertical navigation
* Sections:
  * Active Tasks
  * Completed Tasks
* Clean and minimal with clear selection state

#### Top Bar
* Search input (debounced)
* “Add Task” button

## Task Management UI (Core Feature)

### Kanban-Style Board
* Tasks are displayed in columns:
  * Pending
  * In Progress

* Completed tasks are **not shown here**
  * They automatically move to a separate Completed view

### Task Cards (Not Table Rows)

Each task is displayed as a **card container** with:

* Title (inline editable)
* Priority indicator (Low / Medium / High)
* Deadline display
* Status selector
* Quick delete option

### Task Details View
* Opens on click (modal or side panel)
* Includes:
  * Full description
  * Editable fields (title, priority, deadline, status)
  * Clean and structured layout

### Completed Tasks View
* Accessible via sidebar
* Displays completed tasks separately
* Each task includes:
  * Option to delete permanently
  * Option to mark as incomplete (moves back to board)

## Functionality

* Create tasks via modal or inline form
* Edit tasks directly or via detail view
* Delete tasks from both active and completed sections
* Toggle task status (auto-moves between sections)
* Search tasks by title
* Filter tasks by status
* Responsive design (desktop + mobile)

## Architecture

### Backend
* Modular structure:
  * Routes
  * Controllers
  * Services
  * Middleware
* Centralized error handling
* Request validation (Zod or similar)

### Frontend
* Component-based architecture:
  * TaskCard
  * TaskModal
  * Sidebar
  * Navbar
* API service layer for all backend communication
* Clean state management (React state / Zustand)

## Testing & Verification

### Manual Testing
* Register and login user
* Verify token persistence and refresh
* Perform full CRUD on tasks
* Test search, filter, and pagination
* Validate task status transitions
* Check responsiveness across devices

## Additional Enhancements

* Optimistic UI updates
* Loading states and skeletons
* Empty state placeholders
* Smooth UI transitions

## Setup Instructions

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```