# Luma AI Companion

This project is a Next.js application designed to be the Luma AI companion. It leverages Genkit for AI functionalities such as sentiment analysis and generating responses using the Grok model.

## Project Structure

-   `.env`: This file contains environment variables required for the application.
-   `.vscode/settings.json`: VS Code settings for the project.
-   `README.md`: This file (the one you are currently reading) provides an overview of the project.
-   `components.json`: Configuration file for Shadcn UI components.
-   `next.config.ts`: Next.js configuration file.
-   `package.json`: Lists project dependencies and scripts.
-   `src/`: Contains the main application code.
    -   `ai/`: Contains AI-related code, including Genkit flows and prompts.
        -   `ai-instance.ts`: Initializes and configures the Genkit AI instance.
        -   `dev.ts`: Imports and initializes all Genkit flows for development.
        -   `flows/`: Contains the Genkit flows for different AI functionalities.
            -   `analyze-sentiment.ts`: Flow for analyzing the sentiment of a text.
            -   `generate-initial-prompt.ts`: Flow for generating an initial prompt based on a topic.
            -   `grok-response.ts`: Flow for generating a response using the Grok LLM.
            -   `summarize-chat-history.ts`: Flow for summarizing chat history.
            -   `text-to-speech.ts`: Flow for converting text to speech using ElevenLabs.
    -   `app/`: Contains Next.js route handlers and page components.
        -   `globals.css`: Global CSS file, including Tailwind CSS configurations and custom styles.
        -   `layout.tsx`: Root layout component for the application.
        -   `page.tsx`: Main page component, including the chat interface.
    -   `components/`: Contains reusable React components.
        -   `icons.ts`: Defines and exports icons used throughout the application.
        -   `ui/`: Contains UI components built with Shadcn UI.
            -   Includes components such as `Accordion`, `Alert`, `Avatar`, `Button`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`, `Form`, `Input`, `Label`, etc.
    -   `hooks/`: Contains custom React hooks.
        -   `use-mobile.tsx`: Hook to detect if the application is running on a mobile device.
        -   `use-toast.ts`: Hook for managing toast notifications.
    -   `lib/`: Contains utility functions.
        -   `utils.ts`: Utility functions for the application.
    -   `services/`: Contains external service integrations.
        -   `eleven-labs.ts`: Service for converting text to speech using the ElevenLabs API.
-   `tailwind.config.ts`: Tailwind CSS configuration file.
-   `tsconfig.json`: TypeScript configuration file.

## AI Functionalities (Genkit Flows)

### 1. Analyze Sentiment

-   **Purpose:** Analyzes the sentiment of a given text.
-   **Input:** Text to analyze.
-   **Output:** Sentiment (positive, negative, or neutral) and a numerical score.

### 2. Generate Grok Response

-   **Purpose:** Generates a response using the Grok LLM based on user input.
-   **Input:** User input text.
-   **Output:** Grok LLM's response.

### 3. Text-to-Speech

-   **Purpose:** Converts AI responses to voice output using ElevenLabs.
-   **Input:** Text, voice ID, and model ID.
-   **Output:** URL of the generated audio.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file in the root directory.
    -   Add the necessary environment variables (e.g., ElevenLabs API key).

        ```
        # Example .env file
        ELEVEN_LABS_API_KEY=your_eleven_labs_api_key
        GOOGLE_GENAI_API_KEY=your_google_genai_api_key
        ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the Next.js development server. Open your browser and navigate to `http://localhost:9002` to see the application running.

## Interacting with the AI

1.  **Chat Interface:**
    -   The main page (`src/app/page.tsx`) provides a chat interface where you can send messages and receive responses from the AI.
    -   Type your message in the textarea and press `Enter` or click the `Send` button.

## Technologies Used

-   **Next.js:** React framework for building server-rendered web applications.
-   **Genkit:** AI framework for building AI-powered features.
-   **Shadcn UI:** A set of reusable UI components built with Radix UI and Tailwind CSS.
-   **Tailwind CSS:** CSS framework for styling the application.
-   **ElevenLabs:** Service for converting text to speech.
-   **Lucide React:** Icon library.
-   **Zod:** Schema declaration and validation library

## Additional Information

-   For more details on specific AI flows, refer to the comments and documentation within the corresponding files in the `src/ai/flows/` directory.
-   Styling can be adjusted in the `src/app/globals.css` file, where Tailwind CSS configurations and custom styles are defined.
-   UI components are located in the `src/components/ui/` directory and can be customized as needed.

