# Aura

Aura is a modern, visually stunning music player web application designed for discovering and listening to new sounds. It features a sleek UI with dynamic design elements, lazy-loaded components for optimal performance, and seamless navigation powered by TanStack Router.

## Setup Instructions

This project uses the Jamendo API for its music catalog. To run the app locally, you need to provide a Jamendo Client ID.

1. **Get an API Key:**
   - Go to the [Jamendo Developer Portal](https://developer.jamendo.com/v3.0).
   - Sign up or log in.
   - Register a newly created application to receive your `Client ID`.

2. **Environment Configuration:**
   - Clone the repository and navigate into the project directory:
     ```bash
     git clone <repository-url>
     cd Aura
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Copy the example environment file to create your own configuration:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and replace the placeholder with your actual Jamendo Client ID:
     ```env
     VITE_JAMENDO_CLIENT_ID=your_client_id_here
     ```

3. **Run the Application:**
   Start the development server:
   ```bash
   bun run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.
