## Inspiration

Our project, EcoSnap, started from a simple but powerful idea: even though everyone wants a clean environment, not everyone knows how to help achieve it. Many places, especially remote or forgotten areas, don’t get enough attention from existing waste management systems. This can lead to harmful effects on the environment. We created EcoSnap to change this situation by using artificial intelligence, or AI, to make everyone an active part of solving the problem. With EcoSnap, anyone with a smartphone can easily report trash and pollution. This turns every phone user into a vital player in keeping their surroundings clean. Our app is designed to be easy to use, making taking care of the environment a rewarding experience for everyone. This way, EcoSnap doesn’t just help clean up—it builds a community of people who care about and actively contribute to a cleaner, healthier planet.

## What it does

EcoSnap revolutionizes the way we manage waste by making it easy for anyone with a smartphone to get involved. Here’s how it works: users take a photo of waste they come across and upload it through our app. Our advanced AI technology analyzes these images to figure out what kind of waste it is, how urgently it needs to be cleaned up, and the impact it could have on the environment. The app then offers step-by-step guidance on how the user can safely clean it up themselves, if they choose to. If the waste needs professional attention, EcoSnap automatically informs local authorities with all the details they need to handle it. Additionally, to make taking action even more appealing, users earn points for every report and cleanup they contribute to. These points can lead to rewards, encouraging a community spirit and a friendly competition to keep our environment clean. This system not only improves waste management but also involves the community in a meaningful way, making our surroundings cleaner and safer for everyone.

## How we built it

To build EcoSnap, we combined cutting-edge technology with user-friendly design. We started with React to develop a dynamic and responsive front end, ensuring that our app is easy to navigate whether on a desktop or a mobile device. For our backend, we chose FastAPI because of its high performance and ability to handle large volumes of requests efficiently—crucial for a scalable solution. To analyze the waste images uploaded by users, we integrated the Gemini Pro API, which allows our app to quickly assess waste type and urgency. User authentication is managed through Propel Auth, providing secure and seamless access either through passwordless entry or Google login options. This robust combination of technologies ensures that EcoSnap is not only effective in engaging users but also reliable and secure, making environmental action accessible to everyone, everywhere.

## Challenges we ran into

Our journey was filled with challenges, including difficulties in integrating Gemini API, issues with Propel Auth during user authentication, and hurdles in fine-tuning the AI for accurate waste recognition classification. 

## Accomplishments that we're proud of

We are proud of our AI integration that accurately classifies types of waste, our seamless user interface that encourages user engagement, and our effective collaboration with local authorities to enhance cleanup efforts. Developing a reward system that motivates continuous user participation and achieving a scalable solution for backend management are among our key successes.

## What we learned

This project taught us about the complexities of integrating various technologies for a unified purpose, the importance of user-centered design, and the challenges of handling real-time data and privacy concerns responsibly. We gained insights into effective project management and the agile adaptation of plans to overcome unforeseen difficulties.

## What's next for EcoSnap

Looking ahead, we plan to expand the AI's capabilities, increase our geographic coverage, and integrate with smart city projects. We aim to enhance our app's features to support community clean-up events and develop partnerships with local businesses for a more impactful reward system. EcoSnap will continue to evolve to meet the challenges of sustainability and environmental responsibility.

## Installation
## 1. Frontend (React)

Follow these steps to set up and start the frontend:

1. **Navigate to the Frontend Directory**:
    ```bash
    cd frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Application**:
    ```bash
    npm start
    ```

    This will run the React application on [http://localhost:3000](http://localhost:3000).

## Backend (Python with FastAPI)

Follow these steps to set up and run the backend:

1. **Create a Virtual Environment**:
    ```bash
    virtualenv .venv
    ```

2. **Activate the Virtual Environment**:
    - For macOS/Linux:
        ```bash
        source .venv/bin/activate
        ```
    - For Windows:
        ```cmd
        .venv\Scripts\activate
        ```

3. **Install Required Packages**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Start the FastAPI Server**:
    ```bash
    uvicorn main:app --reload
    ```

The `--reload` flag enables auto-reload so the server will restart after code changes. The server runs on [http://localhost:5001](http://localhost:5001).
