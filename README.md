# Book Club Poll

A modern web application for book clubs to create polls, vote on books, and manage reading selections.

## Features

- **Search Books**: Search for books using the Open Library API
- **Create Polls**: Create polls with selected books, titles, and customizable settings
- **Vote for Books**: Registered users can vote for their favorite books in polls
- **Real-Time Updates**: See vote counts update in real-time
- **Poll Management**: Edit or delete polls you've created
- **Results Visibility**: Control whether poll results are visible to voters
- **Past Polls Archive**: View completed polls and their results

## Technologies Used

- React 18
- TypeScript
- Firebase (Authentication & Firestore)
- React Router
- Styled Components
- Open Library API

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A Firebase account and project

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/book-club-poll.git
   cd book-club-poll
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Create a Firestore database
   - Update the Firebase configuration in `src/services/firebase.ts` with your project details

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Deployment

To deploy to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Run:
   ```
   npm run deploy
   ```

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Page components for different routes
- `/src/services`: API and Firebase services
- `/src/context`: React context providers
- `/src/hooks`: Custom React hooks

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Open Library API](https://openlibrary.org/developers/api) for book data
- [Firebase](https://firebase.google.com/) for authentication and database services 