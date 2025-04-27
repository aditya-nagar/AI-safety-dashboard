# AI Safety Incident Dashboard

This project is a frontend interface for viewing and logging hypothetical AI safety incidents. It was built as part of a take-home assignment for HumanChain.

## Features

- Display a list of AI safety incidents with title, severity, and reported date
- Filter incidents by severity (All, Low, Medium, High)
- Sort incidents by reported date (Newest First, Oldest First)
- Expand/collapse incident details
- Form to report new incidents with validation

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Design Decisions

- **State Management**: Used React's useState for managing application state as it's sufficient for this scale of application.
- **Component Structure**: Created a single-page application with all functionality in one component for simplicity, though in a real-world application, I would split this into multiple components.
- **Styling**: Used Tailwind CSS for rapid development and consistent styling.
- **Accessibility**: Ensured proper labeling and semantic HTML for better accessibility.
- **Responsive Design**: The dashboard is fully responsive and works well on mobile, tablet, and desktop screens.

## Future Improvements

- Add pagination for large numbers of incidents
- Implement search functionality
- Add more detailed filtering options
- Add unit and integration tests
- Split into more modular components
- Add authentication for user-specific views
