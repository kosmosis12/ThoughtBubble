# ThoughtBubble

ThoughtBubble is a sleek and intuitive note-taking application designed to help you capture, organize, and manage your thoughts instantly. Built with a modern tech stack, it provides a seamless user experience for creating to-do lists, jotting down project ideas, and saving meeting notes.

---

## Features

- **Create Notes**: Quickly add new notes with categorized types (To-Do, Project Idea, Meeting Note).
- **Edit & Delete**: Seamlessly edit note content inline or delete notes with a single click.
- **Mark as Complete**: Toggle the completion status of any note.
- **Set Reminders**: Add time-based reminders to your notes with preset intervals or custom durations.
- **Dynamic Filtering**: Filter notes by category or use the search bar to find specific thoughts instantly.
- **Responsive UI**: A clean, modern, and fully responsive user interface built with Tailwind CSS.
- **Local Backend**: Powered by a lightweight Node.js and SQLite backend to persist data locally.

---

## Tech Stack

- **Front-End**:
  - **Language**: JavaScript
  - **Library**: React
  - **Build Tool**: Vite
  - **Styling**: Tailwind CSS
  - **Icons**: Lucide React

- **Back-End**:
  - **Runtime**: Node.js
  - **Framework**: Express
  - **Database**: SQLite

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (which includes npm) installed on your machine.
- [Git](https://git-scm.com/) for version control.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_USERNAME]/[YOUR_REPOSITORY_NAME].git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd [YOUR_REPOSITORY_NAME]
    ```

3.  **Set up the Front-End:**
    - Install NPM packages for the React app:
      ```sh
      npm install
      ```

4.  **Set up the Back-End:**
    - Navigate into the backend directory:
      ```sh
      cd backend
      ```
    - Install NPM packages for the server:
      ```sh
      npm install
      ```
    - Navigate back to the root directory:
      ```sh
      cd ..
      ```

### Running the Application

You will need two separate terminals to run both the backend server and the frontend client simultaneously.

1.  **Start the Back-End Server:**
    - In your first terminal (at the project root), run:
      ```sh
      npm run dev --prefix backend
      ```
    - Your server should now be running on `http://localhost:3001`.

2.  **Start the Front-End Client:**
    - In your second terminal (at the project root), run:
      ```sh
      npm run dev
      ```
    - Your React application will open and run on `http://localhost:5173`.

---

## Project Structure

The project is organized into two main parts:

-   `backend/`: Contains the Node.js, Express, and SQLite server code. This folder handles all API logic and database interactions.
-   `src/`: Contains all the front-end React application source code, including components, configuration, and styling.

---

## Next Steps

-   Connect the front-end to the running backend to persist all note data.
-   Implement real-time notifications for reminders.
-   Explore cloud deployment options (e.g., Vercel for front-end, Render for back-end).
