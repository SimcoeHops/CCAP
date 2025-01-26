# Development Workflow Instructions

## Initial Setup on a New Machine

1. Clone the repository:
```bash
git clone [your-repository-url]
cd commissioners-court
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
   - Create a new file called `.env` in the root directory
   - Add the following content:
   ```
   VITE_API_URL=http://localhost:3003/api
   ```

4. Start the development servers:
```bash
# Start both client and server in development mode
npm run dev
```

## Daily Development Workflow

### 1. Starting Your Work Day
Always start by getting the latest changes:
```bash
git pull origin main
```

### 2. Creating a New Feature
Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

### 3. During Development
- Make small, focused commits:
```bash
git add .
git commit -m "descriptive message about your changes"
```

- Push your changes regularly:
```bash
git push origin feature/your-feature-name
```

### 4. Completing a Feature
When your feature is ready:
1. Push final changes:
```bash
git push origin feature/your-feature-name
```

2. Create a Pull Request from your feature branch to main
3. Wait for review and merge

### 5. After Merge
1. Switch back to main:
```bash
git checkout main
```

2. Get the latest changes:
```bash
git pull origin main
```

3. Delete your local feature branch:
```bash
git branch -d feature/your-feature-name
```

## Important Notes

### Environment Setup
- Always ensure your `.env` file is properly configured
- Never commit the `.env` file (it's in .gitignore)
- Keep your dependencies up to date with `npm update`

### Best Practices
1. **Commit Messages**: Write clear, descriptive commit messages
2. **Branch Names**: Use descriptive branch names with the format: `feature/`, `bugfix/`, or `hotfix/`
3. **Code Quality**: Run linting before commits: `npm run lint`
4. **Testing**: Test your changes thoroughly before pushing

### Troubleshooting
If you encounter issues:
1. Check your Node.js version (v18 or higher required)
2. Ensure all dependencies are installed
3. Verify your `.env` file configuration
4. Check the console for error messages
5. Ensure both development servers are running

## Project Structure
```
commissioners-court/
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── api/         # API integration
│   │   ├── types/       # TypeScript types
│   │   └── assets/      # Static assets
│   ├── public/          # Public assets
│   └── index.html       # Entry HTML file
├── server/               # Backend application
│   ├── src/            # Server source code
│   └── data/           # JSON data files
├── dist/                # Production build output
└── config files         # Various configuration files
```

## Available Scripts
- `npm run dev` - Start both client and server in development mode
- `npm run dev:client` - Start only the client development server
- `npm run dev:server` - Start only the API server
- `npm run build` - Build the production version
- `npm run build:server` - Build the server for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality 