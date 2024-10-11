# Organization Messages Chrome Extension

This Chrome extension displays organization-wide messages from an admin to users.

## Features

- Shows a badge icon for unread messages
- Displays messages in a popup
- Allows marking messages as read
- Stores message history locally

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension in Chrome:
   - Open chrome://extensions/
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Development

- Run `npm start` for development mode with hot reloading
