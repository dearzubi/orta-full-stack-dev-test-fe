# ORTA Shift Manager Frontend

This repository contains the frontend code for the ORTA Shift Manager application, which is designed to help manage and organize shifts for workers.

## Features
- User authentication and authorization
- Shift scheduling and management
- Responsive design for mobile and desktop
- Integration with backend APIs
- Table and calendar views for shifts

## Technologies Used
- React 19
- Zustand for state management
- TanStack Query for data fetching
- TanStack Router for routing
- Tailwind CSS for styling
- HeroUI for UI components
- React Tostify for notifications
- ZOD for schema validation
- AXIOS for HTTP requests
- Day.js for date manipulation
- ESLint and Prettier for code quality and formatting

## Architecture
The application follows a component-based architecture, with a clear separation of concerns. The main components include:
- **Pages**: Represent different views in the application (e.g., Login, Shift Management, Views).
- **Components**: Reusable UI components (e.g., Buttons, Forms, Modals).
- **APIs**: Handle API interactions with backend.
- **State Management**: Managed using Zustand for global state and TanStack Query for server state.
- **Routing**: Managed using TanStack Router for navigation between pages.
- **Styling**: Tailwind CSS is used for styling components, ensuring a consistent look and feel.
- **Utilities**: Helper functions and utilities for common tasks (e.g., errors, clients, date formatting, validation).
- **Configuration**: Environment variables and configuration settings.
- **Assets**: Static assets like images and icons.
- **Hooks**: Custom React hooks for reusable logic.

### Actions:

1. **Shift Creation**: Only admins can create shifts by specifying details such as date, time, and assigned workers. They can also bulk create shifts for a workers.
2. **Shift Management**: Only admins can edit, delete, cancel shifts as needed. Shifts already completed, in progress, or cancelled cannot be edited.
3. **Shift Viewing**: Workers can log in to view their assigned shifts in both table and calendar formats. They can also manage shift attendance like clock in and clock out.
4. **User Authentication**: Secure login and logout functionality for both admins and workers with password forget option.

### Assumptions:

1. **User Roles**: The application assumes two primary user roles: Admin and Worker. Admins have full access to shift management features, while workers have limited access to view and manage their shifts.
2. **Shift Status**: Shifts can have various statuses such as Scheduled, In Progress, Completed, and Cancelled. The application assumes that only certain actions can be performed based on the shift status.
3. **Shift Assignment**: The application assumes that a shift can only be assigned to a single worker and that at least one worker must be registered.
4. **Time Zones**: The application assumes that all users are in the same time zone for simplicity.
5. **Data Validation**: The application assumes that all input data is validated on the server sides to ensure data integrity.
6. **Error Handling**: The application assumes that any errors encountered during API calls or user actions are handled gracefully with appropriate user feedback.
7. **Admin User**: The application assumes that there is at least one admin user in the system to manage shifts and users as normal registration only allows worker role.

## Getting Started

### Prerequisites
- Node.js (v22 or higher)
- npm
- Git
- Orta Backend Server

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dearzubi/orta-full-stack-dev-test-fe
    cd orta-full-stack-dev-test-fe
    ```
2. Install dependencies:
    ```bash
    npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   Adjust the URL according to your backend server configuration.
4. 
5. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` to access the application.
