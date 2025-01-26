# Development Workflow Instructions

## Initial Setup on a New Machine

1. Clone the repository:
```bash
git clone https://github.com/SimcoeHops/CCAP.git
cd CCAP
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
   - Create a new file called `.env` in the root directory
   - Add the following content:
   ```
   VITE_API_URL=http://localhost:3003
   ```

4. Start the development servers:
```bash
# Terminal 1: Start the Express server
node server.js

# Terminal 2: Start the Vite dev server
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

2. Go to [GitHub](https://github.com/SimcoeHops/CCAP)
3. Create a Pull Request from your feature branch to main
4. Wait for review and merge

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

### GitHub Authentication
- Ensure you're logged into GitHub on your machine
- Set up SSH keys or use GitHub CLI for easier authentication
- Request access to the repository if needed

## Project Structure
```
CCAP/
├── src/               # React source files
│   ├── components/    # React components
│   ├── api/          # API integration
│   └── types/        # TypeScript types
├── public/           # Static files
├── server.js         # Express server
└── .env             # Environment variables
```

## Need Help?
- Check the [README.md](README.md) for project details
- Open an issue on GitHub for bugs or feature requests
- Contact the development team for access issues 