# FLocky - Realtime Chat Web App

This project is a realtime chat application built with React, Vite and Firebase.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your Firebase configuration:
```bash
cp env.example .env
```

3. Update the `.env` file with your Firebase project credentials.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Locally preview the production build.

### `npm run lint`

Runs ESLint to check for code quality issues.

## Features

- Real-time messaging with Firebase Realtime Database
- User authentication with Firebase Auth
- Chat creation and management
- Fuzzy search for chats
- Responsive web interface
- Message deletion with context menu

## Tech Stack

- **Frontend**: React 18.2.0, React Router DOM 7.6.0
- **Build Tool**: Vite 5.2.0
- **State Management**: Redux Toolkit 2.8.2, React Redux 9.2.0
- **Backend**: Firebase 11.8.1 (Auth + Realtime Database)
- **UI Library**: RSuite 5.81.0 for notifications

## Environment Variables

This project uses Vite environment variables. All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

Required Firebase environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Learn More

To learn more about Vite, check out the [Vite documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).
