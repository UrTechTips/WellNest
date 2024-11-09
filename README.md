# WellNest - Personal Wellness Dashboard

WellNest is a personalized wellness dashboard designed to help users track their mood, activities, and receive wellness tips based on the weather and personal activities. By logging daily moods and activities, WellNest provides AI-generated wellness tips on hydration, clothing, and other helpful lifestyle suggestions.

---

## 🌟 Project Overview

The main goal of WellNest is to provide users with wellness insights based on their mood, activities, and local weather conditions. Users can:

-   **Log Daily Mood**: Record how they’re feeling with a selection of mood icons.
-   **Track Activities**: List daily activities and time spent on each.
-   **Receive Wellness Tips**: Get personalized wellness advice based on the weather, such as hydration reminders or clothing recommendations.

## 🛠️ Technology Stack

-   **Next.js** - Framework for building the user interface.
-   **Tailwind CSS** - Utility-first CSS framework for styling.
-   **Axios** - Used to fetch data from external APIs.
-   **OpenWeatherMap API** - Provides real-time weather data.

---

## 📋 Features

-   **Dark Mode**: User-friendly dark theme throughout.
-   **Mood Tracker**: Allows users to record and reflect on their daily mood.
-   **Activity Log**: Users can log daily activities for an overview of their day.
-   **Real-Time Weather**: Displays current weather data based on location.
-   **Personalized Wellness Tips**: AI-generated suggestions based on weather and mood.

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your machine:

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/wellnest-dashboard.git
    cd wellnest-dashboard

    ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Add Environment Variables:

    - Create a `.env.local` file at the root of your project.
    - Add your **OpenWeatherMap** API Key:

    ```plaintext
    NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
    ```

4. Running the Application:
   To run the project locally:

    ```bash
    npm run dev
    ```

    Your application will be running on http://localhost:3000.

## 🌤️ API Configuration

This project uses the **OpenWeatherMap API** to display real-time weather information, enhancing the context for wellness tips.

1. Sign up at [OpenWeatherMap](https://openweathermap.org/) to get your API key.
2. Add it to the `.env.local` file as shown above.

## 🤖 AI Integration with Gemini API

WellNest utilizes the Gemini API to generate AI-powered wellness tips based on:

-   User mood
-   Logged activities
-   Weather data

To use the Gemini API:

1. Obtain an API key from the [Gemini API](https://aistudio.google.com/app/apikey).
2. Add the key to `.env.local`:
3. The AI model will analyze the data and generate personalized wellness suggestions.

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or suggestions, feel free to reach out:

-   **Email**: saisrinadhch@gmail.com
-   **Github**: [UrTechTips](https://github.com/UrTechTips)

Enjoy your wellness journey with WellNest!
