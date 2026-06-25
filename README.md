# 🗳️ SYM - Secure 3D Voting Portal

[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![Django](https://img.shields.io/badge/Django-4.2.7-green?logo=django)](https://www.djangoproject.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0.4-purple?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A cutting-edge, cryptographically secure voting platform with immersive 3D visual effects and real-time audit capabilities. SYM combines blockchain-inspired security with stunning cyberpunk aesthetics to create a next-generation democratic experience.

## ✨ Key Highlights

- 🔐 **Military-Grade Security**: End-to-end encryption with SHA-256 hash verification
- 🎮 **Immersive 3D Experience**: Canvas-based particle systems and interactive 3D elements
- ⚡ **Real-Time Audit**: Live cryptographic ledger with node consensus tracking
- 🎨 **Cyberpunk Aesthetic**: Stunning visual design with glowing effects and smooth animations
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 🚀 **High Performance**: Optimized rendering with Vite's blazing-fast build system

## 🌟 Features

### 🏛️ Core Functionality
- **Secure User Authentication**: Multi-layered authentication with encrypted credentials and session management
- **Real-Time Voting**: Cast ballots with cryptographic verification and blockchain-style audit trails
- **Live Results Dashboard**: Instant transparent results with 3D holographic visualization and real-time updates
- **Immutable Audit Trail**: SHA-256 hash verification for every vote with complete transaction history
- **Profile Management**: Secure user settings with interactive 3D security shield visualization
- **Election Management**: Create, manage, and monitor elections with timeline tracking

### 🎮 3D Visual Experience
- **Immersive Backgrounds**: Canvas-based 3D particle systems with 120+ interactive particles
- **Geometric Shapes**: Floating 3D cubes, tetrahedrons, and octahedrons with real-time rotation
- **Mouse Parallax**: Depth-aware cursor tracking for enhanced spatial perception
- **Holographic Interfaces**: 3D voting columns with floating data particles and neon glow effects
- **Dynamic Animations**: Smooth transitions, pulsing elements, and cyberpunk aesthetic throughout
- **Perspective Transforms**: CSS translateZ effects for true 3D depth perception
- **Interactive Elements**: Draggable 3D globe, rotatable security shield, and tilt-enabled cards

### 🔒 Security Features
- **End-to-End Encryption**: All voting data encrypted before transmission using industry-standard protocols
- **Audit Logging**: Real-time verification feed with distributed node consensus tracking
- **Identity Verification**: Multi-factor duplicate voter detection and fraud prevention
- **Secure Transmission**: Multi-party computation for vote validation and integrity
- **Hash Verification**: SHA-256 cryptographic signatures for all transactions
- **Session Management**: Secure token-based authentication with automatic expiration

## 🛠️ Tech Stack

### 🎨 Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.4 | Modern UI framework with hooks and concurrent features |
| **Vite** | 8.0.4 | Lightning-fast build tool and dev server |
| **React Router** | 7.14.0 | Client-side routing with nested routes |
| **Lucide React** | 1.7.0 | Beautiful, consistent icon library |
| **Canvas API** | Native | High-performance 2D/3D graphics rendering |
| **CSS3 Transforms** | Native | Hardware-accelerated 3D effects |

### 🔧 Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Django** | 4.2.7 | Robust Python web framework |
| **Django REST Framework** | Latest | Powerful REST API toolkit |
| **SQLite** | 3.x | Lightweight database for development |
| **Python** | 3.8+ | Backend runtime environment |

### 🎯 Key Libraries & Tools
- **Canvas API**: For particle systems and 3D rendering
- **CSS3 Transforms**: For perspective and depth effects
- **React Hooks**: For state management and side effects
- **Django ORM**: For database operations
- **REST Framework**: For API serialization and validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/downloads/))
- **Git** ([Download](https://git-scm.com/downloads))
- **Code Editor** (VS Code recommended)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/SYM.git
cd SYM
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install django djangorestframework

# Run migrations
python manage.py migrate

# Seed the database with sample data
python manage.py seed

# Start the development server
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

- **🎨 Frontend**: http://localhost:5173 (or next available port)
- **🔧 Backend API**: http://localhost:8000
- **📚 API Endpoints**: http://localhost:8000/api/

> **💡 Tip**: The frontend will automatically try the next available port if 5173 is in use.

## 📁 Project Structure

```
SYM/
├── backend/
│   ├── backend_project/    # Django settings and configuration
│   ├── voting/             # Django app for voting logic
│   ├── manage.py           # Django management script
│   ├── db.sqlite3          # SQLite database
│   └── venv/               # Python virtual environment
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Background3D.jsx      # 3D particle background
│   │   │   ├── Auth3DScene.jsx       # 3D auth page effects
│   │   │   ├── BallotBox3D.jsx       # 3D voting modal
│   │   │   ├── CryptoGlobe3D.jsx     # Interactive 3D globe
│   │   │   ├── Sidebar.jsx           # Navigation sidebar
│   │   │   └── Navbar.jsx            # Navigation bar
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx         # Main voting dashboard
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   ├── Results.jsx           # Results with 3D visualization
│   │   │   └── Settings.jsx          # User settings with 3D shield
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css       # Global styles with 3D effects
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 3D Components Overview

### Background3D.jsx - Main Particle System
- **120+ Interactive Particles**: Dynamic starfield with depth perception
- **Floating 3D Shapes**: Cubes, tetrahedrons, and octahedrons with real-time rotation
- **Hexagonal Wireframes**: Drifting geometric patterns with parallax effects
- **Mouse-Responsive**: Cursor tracking for enhanced depth and immersion
- **Perspective Grid**: 3D plane with exponential depth spacing
- **Connection Mesh**: Dynamic lines between nearby particles

### Auth3DScene.jsx - Authentication Effects
- **Geometric Shapes**: Interactive 3D forms that respond to mouse movement
- **Connection Lines**: Dynamic mesh between nearby shapes
- **Central Orb**: Glowing radial gradient with depth
- **Parallax Effects**: Mouse-aware depth perception
- **Subtle Grid Background**: Technical aesthetic overlay

### BallotBox3D.jsx - Voting Experience
- **3D Ballot Box**: Interactive vault with glass morphism
- **Physics Animation**: Realistic ballot drop with folding simulation
- **Spark Effects**: Particle explosion on vote submission
- **Laser Scanner**: Animated verification beam
- **Console Logs**: Real-time cryptographic operation display
- **Transaction Receipt**: Hash verification output

### CryptoGlobe3D.jsx - Interactive Globe
- **Drag-to-Rotate**: Full 3D globe manipulation
- **Data Beams**: Animated transmission between network nodes
- **Pulsing Nodes**: Dynamic network visualization
- **HUD Overlay**: Real-time telemetry display
- **Touch Support**: Mobile-friendly interaction

### Settings 3D Shield - Security Visualization
- **Interactive Rotation**: Mouse-controlled shield tilt
- **Orbital Rings**: Floating 3D rings with animation
- **Data Particles**: Orbiting security indicators
- **Pulse Effects**: Dynamic glow and shadow
- **Perspective Depth**: True 3D transform effects

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/api/auth/login/` | User authentication | Public |
| `POST` | `/api/auth/register/` | User registration | Public |
| `GET` | `/api/elections/` | List all elections | Public |
| `POST` | `/api/votes/` | Cast a vote | Required |
| `GET` | `/api/votes/` | Get user's votes | Required |
| `GET` | `/api/elections/{id}/results/` | Get election results | Public |

### Database Schema

**User Model**
- `id`: Primary key
- `username`: Unique identifier
- `email`: Email address
- `password_hash`: Encrypted password

**VoterProfile Model**
- `user`: One-to-one relation with User
- `city`: User's city
- `state`: User's state/region
- `timezone`: User's timezone

**Election Model**
- `id`: Primary key
- `name`: Election name
- `description`: Election description
- `start_time`: Election start datetime
- `end_time`: Election end datetime

**Candidate Model**
- `id`: Primary key
- `name`: Candidate name
- `description`: Candidate description
- `election`: Foreign key to Election

**Vote Model**
- `id`: Primary key
- `voter`: Foreign key to User
- `election`: Foreign key to Election
- `candidate`: Foreign key to Candidate
- `timestamp`: Vote timestamp

## 🎯 Usage Guide

### 🗳️ Voting Process
1. **Register/Login**: Create a secure account or authenticate with existing credentials
2. **Dashboard**: Navigate to the Dashboard to view active elections
3. **Select Candidate**: Choose from 3D candidate cards with tilt effects
4. **Cast Ballot**: Click "Cast Certified Ballot" to open the 3D voting modal
5. **Watch Animation**: Experience the animated ballot drop into the cryptographic vault
6. **Verify Receipt**: Receive a transaction hash for verification

### 📊 Viewing Results
1. **Results Page**: Navigate to the Results section
2. **Toggle Views**: Switch between 2D Classic and 3D Hologram modes
3. **Interact**: Move cursor over the 3D grid to rotate the perspective
4. **Audit Trail**: Review the cryptographic audit trail for verification

### ⚙️ Managing Settings
1. **Profile**: View and manage your digital identity
2. **Security**: Rotate your master key for enhanced protection
3. **Notifications**: Toggle network alerts for new elections
4. **3D Shield**: Interact with the security shield for visual feedback

## 📸 Screenshots

### Authentication Pages
- **Login**: 3D geometric shapes with mouse parallax effects
- **Register**: Enhanced visual feedback during registration

### Dashboard
- **Hero Section**: Interactive 3D globe with drag-to-rotate
- **Election Cards**: 3D tilt effects with glowing borders
- **Live Feed**: Real-time cryptographic audit logs

### Voting Experience
- **3D Ballot Modal**: Animated vault with physics simulation
- **Spark Effects**: Particle explosion on vote submission
- **Transaction Receipt**: Hash verification display

### Results Visualization
- **3D Hologram Mode**: Interactive columns with floating particles
- **2D Classic Mode**: Traditional bar chart view
- **Audit Timeline**: Immutable blockchain verification

## 🔒 Security Considerations

### Data Protection
- **Password Hashing**: All passwords are hashed using industry-standard algorithms before storage
- **End-to-End Encryption**: Voting data encrypted before transmission using secure protocols
- **Session Management**: Secure token-based authentication with automatic expiration
- **CORS Protection**: Configured cross-origin resource sharing for API security

### Fraud Prevention
- **Duplicate Detection**: Multi-factor duplicate voter detection and prevention
- **Identity Verification**: Comprehensive user profile validation
- **Audit Trail**: Immutable cryptographic ledger with SHA-256 hash verification
- **Consensus Mechanism**: Multi-party computation ensures vote integrity

### Best Practices
- Never commit sensitive data to version control
- Use environment variables for configuration
- Keep dependencies updated regularly
- Implement rate limiting in production
- Use HTTPS in production environments

## 🐛 Troubleshooting

### Frontend Issues

| Problem | Solution |
|---------|----------|
| Port 5173 in use | Vite automatically tries the next available port (5174, 5175, etc.) |
| Module not found | Run `npm install` to install dependencies |
| Build errors | Clear cache: `rm -rf node_modules && npm install` |
| Hot reload not working | Check if file watchers are limited (increase limit on macOS/Linux) |
| 3D effects not rendering | Ensure browser supports Canvas API and CSS transforms |

### Backend Issues

| Problem | Solution |
|---------|----------|
| Migration errors | Run `python manage.py migrate` to update database schema |
| Port 8000 in use | Change port: `python manage.py runserver 8001` |
| Import errors | Ensure virtual environment is activated |
| Database locked | Close any database connections and restart server |
| CORS errors | Add frontend URL to `CORS_ALLOWED_ORIGINS` in settings |

### Common Issues

**Problem**: "Module not found: Can't resolve 'react'"
**Solution**: Run `npm install` in the frontend directory

**Problem**: "django.core.exceptions.ImproperlyConfigured"
**Solution**: Ensure all environment variables are set in `.env` file

**Problem**: 3D effects causing performance issues
**Solution**: Reduce particle count in `Background3D.jsx` or disable animations in settings

## 📝 Development Guide

### Adding New 3D Components

1. **Create Component**: 
   ```bash
   touch frontend/src/components/Your3DComponent.jsx
   ```

2. **Implement 3D Logic**:
   ```jsx
   import { useEffect, useRef } from 'react';
   
   export default function Your3DComponent() {
     const canvasRef = useRef(null);
     
     useEffect(() => {
       const canvas = canvasRef.current;
       const ctx = canvas.getContext('2d');
       // Your 3D rendering logic here
     }, []);
     
     return <canvas ref={canvasRef} />;
   }
   ```

3. **Add Styles**: Include corresponding CSS in `index.css`

4. **Integrate**: Import and use in appropriate pages

### Modifying 3D Effects

| Component | File | What to Modify |
|-----------|------|----------------|
| Particle Systems | `Background3D.jsx` | Particle count, speed, colors |
| Auth Effects | `Auth3DScene.jsx` | Shape types, connection logic |
| Voting Animation | `BallotBox3D.jsx` | Animation timing, spark effects |
| Globe Visualization | `CryptoGlobe3D.jsx` | Node count, beam speed |
| CSS Transforms | `index.css` | Perspective values, animation curves |

### Performance Optimization

- **Reduce Particles**: Lower particle count for better performance
- **Debounce Events**: Add debouncing to mouse move handlers
- **Use requestAnimationFrame**: Ensure smooth animations
- **Optimize Renders**: Use React.memo for expensive components
- **Lazy Load**: Consider lazy loading 3D components

### Code Style

- Follow React best practices and hooks rules
- Use functional components with hooks
- Implement proper error boundaries
- Add comments for complex 3D math operations
- Use descriptive variable names for 3D coordinates

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Contribution Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SYM.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly
   - Update documentation as needed

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference related issues
   - Include screenshots for UI changes

### Areas for Contribution

- 🎨 **New 3D Effects**: Additional particle systems or animations
- 🔧 **Performance**: Optimization of existing 3D components
- � **Mobile**: Enhanced responsive design for mobile devices
- 🌍 **Internationalization**: Multi-language support
- ♿ **Accessibility**: Improved screen reader support
- 🧪 **Testing**: Unit tests for components and API endpoints

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] User authentication
- [x] Election management
- [x] Voting system
- [x] Results visualization
- [x] 3D visual effects

### Phase 2: Enhancements 🚧
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Admin panel

### Phase 3: Advanced Features 📋
- [ ] Blockchain integration
- [ ] Biometric authentication
- [ ] Real-time collaboration
- [ ] Advanced audit tools
- [ ] API rate limiting

## ❓ FAQ

### General Questions

**Q: Is this production-ready?**
A: The application is functional but requires additional security hardening, testing, and infrastructure setup for production use.

**Q: Can I use this for real elections?**
A: This is a demonstration project. For real elections, you would need additional security measures, legal compliance, and infrastructure.

**Q: What browsers are supported?**
A: Modern browsers that support Canvas API and CSS3 transforms (Chrome, Firefox, Safari, Edge).

### Technical Questions

**Q: How do I customize the 3D effects?**
A: Modify the particle count, colors, and animation speeds in the respective component files.

**Q: Can I disable 3D effects for performance?**
A: Yes, you can reduce particle counts or add a toggle in settings to disable animations.

**Q: How do I change the color scheme?**
A: Update CSS variables in `index.css` under the `:root` selector.

## �📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework and continuous improvements
- **Vite** - For the blazing-fast build tool and excellent DX
- **Django** - For the robust and secure backend framework
- **Lucide** - For the beautiful and consistent icon set
- **Open Source Community** - For the countless libraries and tools used

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/SYM/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/SYM/discussions)
- **Email**: support@example.com

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ using React, Django, and immersive 3D technologies**

[⬆ Back to Top](#-sym---secure-3d-voting-portal)

</div>
