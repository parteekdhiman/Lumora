# Job Portal Project

## Project info

**URL**: http://localhost:5173

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

You can clone this repo and push changes. Pushed changes will be reflected in your deployed application.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/parteekdhiman/Lumora.gi

# Step 2: Navigate to the project directory.
cd client

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


# Redux Implementation Guide

## Overview
This document explains how Redux has been implemented in the Job Portal application using Redux Toolkit.

## Architecture

### Store Structure
The Redux store contains two main slices:
1. **Auth Slice** - Manages authentication state (user, login status, loading, errors)
2. **Messages Slice** - Manages messaging state (conversations, unread count, loading, errors)

### Directory Structure
```
src/
├── store/
│   ├── index.ts          # Store configuration
│   ├── authSlice.ts      # Auth state slice
│   ├── messageSlice.ts   # Messages state slice
│   ├── authThunks.ts     # Async auth operations
│   └── messageThunks.ts  # Async message operations
├── hooks/
│   └── redux.ts          # Custom Redux hooks
└── context/
    ├── AuthContext.tsx   # Updated to use Redux
    └── MessageContext.tsx # Updated to use Redux
```


## How can I deploy this project?

You can deploy this project to any static hosting service like Vercel, Netlify, or GitHub Pages.

For Vercel:
1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Deploy!

For Netlify:
1. Push your code to GitHub
2. Create a new site on Netlify
3. Connect your GitHub repository
4. Set the build command to `npm run build` and publish directory to `dist`
5. Deploy!