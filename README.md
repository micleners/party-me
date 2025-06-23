# Party Me

A modern chat application built with Next.js and Mantine UI that allows you to connect, chat, and celebrate with yourself! This application demonstrates a multi-persona messaging system where you can switch between different personas to have conversations.

## About

This application was based on the following repository:
[Next.js Pages Template by Mantine](https://github.com/mantinedev/next-pages-template)

That was created by the Mantine UI maintainers. I chose this repository as a base because I came from a team that used Material UI. I wanted to try something new that would work better with NextJS and this was a great example to start with.

For the backend of my application, I utilized NextJS API routes and chose to use Firestore from Firebase as my database. It is a data store that I've used previously and fit for the solution for what I was needing.

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[Mantine UI 8](https://mantine.dev/)** - Modern React components library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[PostCSS](https://postcss.org/)** with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)

### Backend & Database
- **[Firebase Firestore](https://firebase.google.com/docs/firestore)** - NoSQL cloud database
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Server-side API endpoints

### Development Tools
- **[Storybook](https://storybook.js.org/)** - Component development and testing
- **[Jest](https://jestjs.io/)** with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - Testing framework
- **[ESLint](https://eslint.org/)** with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine) - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Stylelint](https://stylelint.io/)** - CSS linting

## Features

- **Multi-Persona Messaging**: Switch between different personas to have conversations
- **Real-time Chat Interface**: Modern chat UI with message bubbles and avatars
- **Color-coded Messages**: Each persona has a unique color for easy identification
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Firebase Integration**: Cloud-based data storage with Firestore

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn package manager
- Firebase project with Firestore enabled

### Environment Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd party-me
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development Scripts
- `yarn dev` - Start development server
- `yarn build` - Build application for production
- `yarn start` - Start production server
- `yarn analyze` - Analyze application bundle with @next/bundle-analyzer

### Testing Scripts
- `yarn typecheck` - Check TypeScript types
- `yarn lint` - Run ESLint and Stylelint
- `yarn eslint` - Run ESLint only
- `yarn stylelint` - Run Stylelint only
- `yarn jest` - Run Jest tests
- `yarn jest:watch` - Start Jest in watch mode
- `yarn test` - Run all tests (Jest, Prettier, ESLint, TypeScript)

### Code Quality Scripts
- `yarn prettier:check` - Check files with Prettier
- `yarn prettier:write` - Format all files with Prettier

### Storybook Scripts
- `yarn storybook` - Start Storybook development server
- `yarn storybook:build` - Build production Storybook bundle

## Application Navigation

### Main Pages

1. **Home Page** (`/`) - Welcome screen with introduction and navigation to messages
2. **Messages Page** (`/messages`) - Main chat interface where conversations are displayed

### API Endpoints

- `GET /api/messages` - Retrieve all messages
- `POST /api/messages/seed` - Seed the database with sample messages
- `DELETE /api/messages/drop` - Clear all messages from the database
- `GET /api/parts` - Retrieve all personas/parts
- `POST /api/parts/seed` - Seed the database with sample personas
- `DELETE /api/parts/drop` - Clear all personas from the database

### How to Use

1. **View Messages**: Navigate to the Messages page to see all conversations
2. **Switch Personas**: Use the `persona_id` query parameter to switch between different personas
   - Example: `/messages?persona_id=1` to view messages as persona 1
3. **Seed Data**: Use the API endpoints to populate the database with sample data
4. **Clear Data**: Use the drop endpoints to clear the database when needed

## Project Structure

```
party-me/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   ├── db/                # Database configuration and repositories
│   ├── messages/          # Messages page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ColorSchemeToggle/ # Theme toggle component
│   ├── Messages/          # Messages display component
│   ├── Navbar/            # Navigation component
│   └── Welcome/           # Welcome component
├── types/                 # TypeScript type definitions
├── test-utils/            # Testing utilities
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `yarn test`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.
