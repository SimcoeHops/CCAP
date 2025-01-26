# Commissioners Court Agenda Picker (CCAP)

## Overview
The Commissioners Court Agenda Picker (CCAP) is a modern web application designed to streamline the process of managing and customizing Commissioners Court agenda items. It enables key leadership stakeholders to efficiently select and compile relevant agenda items for their organizations, transforming the way organizations interact with court proceedings.

## 🌟 Key Features
- **Interactive Agenda Table**: Browse and select agenda items through a user-friendly interface powered by TanStack Table
- **Smart Filtering**: 
  - Global search across all columns
  - Special filter for items with differing votes
  - Checkbox-based item selection
- **Custom PDF Generation**: Generate professional PDFs with selected agenda items using @react-pdf/renderer
- **Modern UI/UX**: Clean, responsive design built with React and Tailwind CSS
- **Real-time Data Management**: Efficient data fetching and caching with TanStack Query

## 🏗️ Architecture

### Frontend
- Single Page Application (SPA) built with React and TypeScript
- Component Structure:
  - `AgendaTable`: Main interactive table component
  - `PDFGenerator`: Handles PDF generation and download
- State Management:
  - TanStack Query for server state
  - React hooks for local state
- Styling:
  - Tailwind CSS for utility-first styling
  - Custom responsive design

### Backend
- Express.js server serving:
  - Static React build
  - JSON data endpoint
  - CORS enabled for development
- Python script for data processing and extraction

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Python 3.8+ (for data processing)

### Setup Steps
1. Clone the repository:
```bash
git clone [repository-url]
cd commissioners-court
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
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

## 💻 Usage
1. Access the application through your web browser at `http://localhost:5173` (development) or `http://localhost:3003` (production)
2. Use the global search bar to filter agenda items
3. Toggle "Show Only Differing Votes" to focus on split decisions
4. Select items using checkboxes
5. Click "Generate PDF" to create and download a custom PDF with selected items

## ⚙️ Configuration
The application can be customized through various configuration files:
- `vite.config.ts` - Build and development settings
- `tailwind.config.js` - UI styling customization
- `server.js` - Backend server configuration
- `.env` - Environment variables and API endpoints

## 🛠️ Technologies Used
- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - TanStack Table v8
  - TanStack Query v5
  - @react-pdf/renderer
  - Tailwind CSS
  - Framer Motion
- **Backend**:
  - Express.js
  - Python (for data processing)
- **Development Tools**:
  - ESLint
  - TypeScript ESLint
  - PostCSS

## 🤝 Contributing
We welcome contributions to improve CCAP! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Built with modern web technologies and open-source tools
- Powered by TanStack's excellent React libraries
- Inspired by the need for efficient government proceedings management

## 📞 Contact & Support
For questions, issues, or feature requests, please:
- Open an issue in the GitHub repository
- Contact the development team at [contact email]
- Join our community discussions

---
Made with ❤️ for improving government transparency and efficiency
