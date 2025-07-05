# manamasters - Gamified Learning Platform

A comprehensive gamified learning platform targeting Indian learners, especially those not fluent in English, focusing on Operating Systems and Computer Networks courses.

## 🌟 Features

### 🎮 Gamification
- **Interactive Courses**: Engaging course content with progress tracking
- **Quiz System**: Timed quizzes with scoring, streaks, and detailed feedback
- **Achievement System**: Badges, certificates, and learning milestones
- **Progress Tracking**: Visual progress indicators and completion statistics

### 🌐 Multilingual Support
- **7 Languages**: English, Hindi, Kannada, Tamil, Telugu, Marathi, Bengali
- **Dynamic Language Switching**: Real-time language changes without page reload
- **Localized Content**: All UI elements and content translated
- **Language Detection**: Automatic language detection based on browser settings

### 🤖 AI-Powered Features
- **AI Chat Assistant**: Multilingual AI tutor for instant help
- **Voice Input/Output**: Speech-to-text and text-to-speech capabilities
- **Content Generation**: AI-powered question generation and content summarization
- **Personalized Learning Paths**: AI-generated learning recommendations

### 📚 Course Management
- **Operating Systems**: Fundamentals to advanced concepts
- **Computer Networks**: From basics to network security
- **Modular Learning**: Structured modules with lessons and quizzes
- **Difficulty Levels**: Beginner, intermediate, and advanced courses

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **i18next**: Internationalization framework
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **OpenAI API**: AI-powered features
- **Google Translate API**: Multilingual support
- **JWT**: Authentication and authorization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- OpenAI API key
- Google Translate API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd manamasters
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/manamasters
   CORS_ORIGIN=http://localhost:5173
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRY=7d
   
   # Google Translate API
   GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
   ```

4. **Start the development servers**
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server (in a new terminal)
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📁 Project Structure

```
manamasters/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── i18n/          # Internationalization setup
│   │   ├── services/      # API services
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Express middlewares
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## 🎯 Key Components

### Frontend Components
- **Navbar**: Navigation with language switcher
- **LanguageSwitcher**: Multilingual support component
- **CourseCard**: Course display with enrollment
- **Quiz**: Interactive quiz system
- **AIChat**: AI-powered chat assistant
- **AboutTeamCard**: Team information display

### Backend Controllers
- **AI Controller**: AI chat, speech-to-text, content generation
- **User Controller**: Authentication and user management
- **Admin Controller**: Course and content management

### Database Models
- **User**: User authentication and profiles
- **Course**: Course structure and metadata
- **Module**: Course modules and lessons
- **UserCourses**: User enrollment and progress tracking

## 🌐 API Endpoints

### AI Endpoints
- `POST /api/ai/chat` - AI chat conversation
- `POST /api/ai/speech-to-text` - Convert speech to text
- `POST /api/ai/text-to-speech` - Convert text to speech
- `POST /api/ai/generate-questions` - Generate quiz questions
- `POST /api/ai/summarize` - Summarize content
- `POST /api/ai/learning-path` - Generate personalized learning path

### User Endpoints
- `POST /api/users/signin` - User authentication
- `POST /api/users/signup` - User registration
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/progress` - Get course progress

## 🎨 UI/UX Features

### Design System
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, intuitive interface
- **Accessibility**: WCAG compliant components
- **Dark/Light Mode**: Theme support (planned)

### User Experience
- **Progressive Web App**: Offline capabilities
- **Real-time Updates**: Live progress tracking
- **Gamification Elements**: Points, badges, leaderboards
- **Personalization**: Customized learning paths

## 🔧 Development

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type safety (planned)

### Testing
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing (planned)

### Deployment
- **Docker**: Containerization
- **CI/CD**: Automated deployment pipeline
- **Cloud Hosting**: Scalable cloud infrastructure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Google Translate for multilingual support
- Unsplash for beautiful images
- Lucide for amazing icons
- Tailwind CSS for the design system

## 📞 Support

For support and questions:
- Email: support@manamasters.com
- Documentation: [docs.manamasters.com](https://docs.manamasters.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**Made with ❤️ for Indian learners**
