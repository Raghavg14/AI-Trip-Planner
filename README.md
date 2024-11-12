````markdown
# AI Travel Planner

## Overview

Travel Planner is a web application designed to help users create customized travel itineraries. It utilizes **Google's Generative AI** (Gemini) for generating trip details, including **hotel recommendations** and **daily itineraries**. This project is built with **React**, **Firebase**, **Google Places API**, **ShadCN UI**, and **TailwindCSS** for seamless styling and UI consistency.

## Features

- **Login**: Secure sign-in with Google OAuth2.
- **Create Trip**: User-friendly interface for creating customized trip itineraries.
- **View Trip**: Detailed trip view, including itinerary breakdown by day and list of recommended hotels.
- **My Trips**: Dashboard for users to view and manage their saved trips.
- **Generative AI Integration**: AI-generated travel plans using Google’s Gemini AI for detailed trip planning.
- **Image Fetching**: Utilizes Google Places API for retrieving images of destinations.

## Project Structure

- **Reusable Components**: Built with reusable components from ShadCN UI.
- **State Management**: Local state management using React Context and localStorage for persisting user data.
- **CSS**: Styled with TailwindCSS for a responsive and modern UI.
- **Routing**: React Router is used for navigating between different pages in the application.

## Technologies Used

- **React** (v18.3.1)
- **React Router** (v6.28.0)
- **Google Generative AI (Gemini)** for AI-powered travel planning
- **Google Places API** for destination data and images
- **Firebase** for authentication and data storage
- **TailwindCSS** for styling
- **ShadCN UI** for reusable UI components
- **Axios** for API requests

## Environment Variables Configuration

To set up the project, you'll need to create a `.env` file in the root directory of your project. This file will contain sensitive information, such as API keys and project identifiers, required for the application to work. Below is a list of environment variables you need to define, along with instructions on where to obtain each value.

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Google API Key for Google Places and other services
GOOGLE_API_KEY=your_google_api_key
```
````

### How to Obtain Environment Variable Values

#### Firebase Configuration:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and select your project.
2. Navigate to **Project Settings**.
3. Under **General**, you’ll find the **Firebase SDK configuration** section. Copy each value to the respective variable in your `.env` file.

#### Google API Key:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project or select your existing project.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials** and select **API Key**.
5. Enable **Google Places API** and any other required APIs (like **Google Maps** or **Google Authentication**) under **APIs & Services > Library**.
6. Copy the generated API key to `GOOGLE_API_KEY` in your `.env` file.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Raghavg14/AI-Trip-Planner.git
   cd travel-planner
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the variables provided above.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Build the application**:
   ```bash
   npm run build
   ```

## Components

- **AI Model**: Provides travel plans using Google’s Gemini AI. It outputs a structured JSON object with a list of hotels and a daily itinerary for selected destinations.
- **GlobalPhotoAPI**: Utilizes Google Places API to fetch photos of selected destinations, enhancing the visual experience for users.
- **Firebase Config**: Manages authentication and data storage for user trips and preferences.

## Dependencies

This project uses a range of packages for UI, API handling, and Firebase integration. Key dependencies include:

- `@google/generative-ai`
- `@react-oauth/google`
- `firebase`
- `react-router-dom`
- `tailwindcss`
- `axios`
- `shadcn-ui`

---

> **Note:** Make sure to keep your API keys secure and avoid exposing them in the public repository.

```

This version includes the section for setting up environment variables and guides users on how to obtain them, along with the rest of your project details. Let me know if you need further adjustments!
Thanks for stopping by!
```
