# SYM - Secure 3D Voting Portal

A cutting-edge, cryptographically secure voting platform with immersive 3D visual effects and real-time audit capabilities.

## 🌟 Features

### Core Functionality
- **Secure User Authentication**: Encrypted login/registration with multi-factor security indicators
- **Real-time Voting**: Cast ballots with cryptographic verification and blockchain-style audit trails
- **Live Results**: Instant transparent results with 3D holographic visualization
- **Audit Trail**: Immutable cryptographic ledger with SHA-256 hash verification
- **Profile Management**: Secure user settings with 3D interactive security shield

### 3D Visual Experience
- **Immersive Backgrounds**: Canvas-based 3D particle systems with mouse parallax
- **Interactive Elements**: 3D geometric shapes (cubes, tetrahedrons, octahedrons) that respond to cursor movement
- **Holographic Interfaces**: 3D voting columns with floating data particles
- **Dynamic Animations**: Smooth transitions, glowing effects, and cyberpunk aesthetic
- **Depth Perception**: Perspective transforms and translateZ effects throughout

### Security Features
- **End-to-End Encryption**: All voting data encrypted before transmission
- **Audit Logging**: Real-time verification feed with node consensus tracking
- **Identity Verification**: Duplicate voter detection and prevention
- **Secure Transmission**: Multi-party computation for vote validation

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - Modern UI framework
- **Vite 8.0.4** - Fast development server and build tool
- **React Router 7.14.0** - Client-side routing
- **Lucide React 1.7.0** - Icon library
- **Canvas API** - 3D graphics and particle systems

### Backend
- **Django 4.2.7** - Python web framework
- **Django REST Framework** - API endpoints
- **SQLite** - Database (development)

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd SYM
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/

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

### Background3D.jsx
- Canvas-based particle system with 120+ particles
- Floating 3D geometric shapes (cubes, tetrahedrons, octahedrons)
- Hexagonal wireframe drift patterns
- Mouse-responsive parallax effects
- Perspective grid plane with depth

### Auth3DScene.jsx
- Interactive 3D geometric shapes for authentication pages
- Connection lines between nearby shapes
- Central glowing orb with radial gradient
- Mouse parallax for depth perception

### BallotBox3D.jsx
- 3D voting modal with interactive ballot box
- Animated ballot drop with physics simulation
- Spark particle effects during voting
- Laser scanner animation
- Real-time console log display

### CryptoGlobe3D.jsx
- Interactive 3D blockchain globe
- Drag-to-rotate functionality
- Data transmission beams between nodes
- Pulsing network nodes
- HUD telemetry overlay

### Settings 3D Shield
- Interactive security shield with mouse rotation
- Floating orbital rings
- Orbiting data particles
- Pulsing glow effects

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

### API Endpoints

- `POST /api/auth/login/` - User authentication
- `POST /api/auth/register/` - User registration
- `GET /api/elections/` - List all elections
- `POST /api/votes/` - Cast a vote
- `GET /api/elections/{id}/results/` - Get election results

## 🎯 Usage

### Voting Process
1. Register a new account or login with existing credentials
2. Navigate to the Dashboard to view active elections
3. Select a candidate from the 3D candidate cards
4. Click "Cast Certified Ballot" to open the 3D voting modal
5. Watch the animated ballot drop into the cryptographic vault
6. Receive a transaction receipt with hash verification

### Viewing Results
1. Navigate to the Results page
2. Toggle between 2D Classic and 3D Hologram views
3. In 3D mode, move cursor over the grid to rotate the perspective
4. View the cryptographic audit trail for verification

## 🔒 Security Considerations

- All passwords are hashed before storage
- Voting data is encrypted end-to-end
- Duplicate voter detection prevents fraud
- Audit trail provides cryptographic proof of each vote
- Multi-party computation ensures vote integrity

## 🐛 Troubleshooting

### Frontend Issues
- **Port 5173 in use**: Vite will automatically try the next available port
- **Module not found**: Run `npm install` to install dependencies
- **Build errors**: Clear cache with `rm -rf node_modules && npm install`

### Backend Issues
- **Migration errors**: Run `python manage.py migrate` to update database schema
- **Port 8000 in use**: Change port with `python manage.py runserver 8001`
- **Import errors**: Ensure virtual environment is activated

## 📝 Development

### Adding New 3D Components
1. Create component in `frontend/src/components/`
2. Use Canvas API for particle systems or CSS transforms for DOM-based 3D
3. Import and use in appropriate pages
4. Add corresponding styles to `index.css`

### Modifying 3D Effects
- **Particle systems**: Edit `Background3D.jsx` or `Auth3DScene.jsx`
- **CSS transforms**: Modify `index.css` 3D effect sections
- **Interactive elements**: Update mouse event handlers in components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing fast build tool
- Django for the robust backend framework
- Lucide for the beautiful icon set

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, Django, and immersive 3D technologies**
