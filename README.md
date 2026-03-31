[![Actions Status](https://github.com/thedoorbell/fullstack-javascript-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/thedoorbell/fullstack-javascript-project-12/actions)

## Messenger

A real-time messaging web application, a simplified version of Slack or Mattermost. Users can create channels, send messages, and manage channels (create, rename, delete). The application uses WebSocket for instant message delivery and Redux for state management. The interface is built with Bootstrap 5, and localization is implemented using i18next (Russian is the default language).

### Demo

[Messenger](https://messenger-slack-a-like.onrender.com/)

## Features

- **Authentication**: registration and login with form validation
- **Channel management**:
  - creating new channels
  - renaming existing channels
  - deleting channels
- **Real-time messaging** via WebSocket:
  - sending messages to the selected channel
  - automatically receiving new messages without page reload
  - displaying usernames
- **Profanity filtering** in messages and channel names
- **UI state management**: modals, notifications, loading states
- **Localization**: Russian and English languages
- **Error handling**: notifications for network errors, validation issues, and other problems

## Technologies

- Vite (dev/build/preview)
- React 19
- Redux Toolkit + RTK Query (state management)
- React Router (routing)
- Socket.io-client (WebSocket)
- Bootstrap 5 (styles and modal windows)
- React Toastify (notifications)
- i18next (localization)
- Formik + Yup (forms & validation)
- Leo Profanity (profanity filter)
- Rollbar (error monitoring)

## Installation

```bash
git clone https://github.com/thedoorbell/Messenger
cd Messenger/frontend
npm ci
```

## Quick Start

```bash
# Install dependencies
make install

# Development mode
make start && cd frontend && npm run dev

# Build
make build
```
