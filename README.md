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
| **CSS3 Transforms** | Native | Hardware-accelerated 3D effects |

### 🔧 Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Django** | 4.2.7 | Robust Python web framework |
| **Django REST Framework** | Latest | Powerful REST API toolkit |
| **SQLite** | 3.x | Lightweight database for development |
| **Python** | 3.8+ | Backend runtime environment |

### 🎯 Key Libraries & Tools
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

<div align="center">

**Built with ❤️ using React, Django, and immersive 3D technologies**

[⬆ Back to Top](#-sym---secure-3d-voting-portal)

</div>
