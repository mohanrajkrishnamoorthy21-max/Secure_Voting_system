import { useEffect, useRef } from 'react';

export default function Auth3DScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Geometric Shapes Configuration
    const shapes = [];
    const shapeCount = 8;
    
    // Mouse tracking for parallax
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    class GeometricShape {
      constructor() {
        this.reset();
        // Random starting position
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 400 - 200;
        this.size = Math.random() * 60 + 30;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.rotationSpeedX = (Math.random() - 0.5) * 0.01;
        this.rotationSpeedY = (Math.random() - 0.5) * 0.01;
        this.rotationSpeedZ = (Math.random() - 0.5) * 0.005;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.2;
        
        // Shape type: 0 = cube, 1 = tetrahedron, 2 = octahedron
        this.type = Math.floor(Math.random() * 3);
        
        // Color palette
        const colors = [
          'rgba(6, 182, 212, ',   // cyan
          'rgba(139, 92, 246, ',  // purple
          'rgba(59, 130, 246, ',  // blue
          'rgba(16, 185, 129, '   // emerald
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        
        this.rotationX += this.rotationSpeedX;
        this.rotationY += this.rotationSpeedY;
        this.rotationSpeedZ += this.rotationSpeedZ;

        // Boundary check with wrap-around
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
        if (this.z < -300) this.z = 200;
        if (this.z > 300) this.z = -200;
      }

      draw(parallaxX, parallaxY) {
        const focalLength = 400;
        const scale = focalLength / (focalLength + this.z);
        const projX = this.x + parallaxX * 50 * scale;
        const projY = this.y + parallaxY * 50 * scale;
        const projSize = this.size * scale;
        const alpha = this.opacity * scale;

        ctx.save();
        ctx.translate(projX, projY);
        
        // Apply rotation
        ctx.rotate(this.rotationZ);
        
        ctx.strokeStyle = `${this.color}${alpha})`;
        ctx.lineWidth = 1.5 * scale;
        ctx.fillStyle = `${this.color}${alpha * 0.3})`;

        if (this.type === 0) {
          // Cube
          this.drawCube(projSize);
        } else if (this.type === 1) {
          // Tetrahedron
          this.drawTetrahedron(projSize);
        } else {
          // Octahedron
          this.drawOctahedron(projSize);
        }

        ctx.restore();
      }

      drawCube(size) {
        const half = size / 2;
        // Draw cube as wireframe
        ctx.beginPath();
        // Front face
        ctx.rect(-half, -half, size, size);
        // Back face (offset)
        const offset = size * 0.3;
        ctx.rect(-half + offset, -half + offset, size, size);
        // Connecting lines
        ctx.moveTo(-half, -half);
        ctx.lineTo(-half + offset, -half + offset);
        ctx.moveTo(half, -half);
        ctx.lineTo(half + offset, -half + offset);
        ctx.moveTo(half, half);
        ctx.lineTo(half + offset, half + offset);
        ctx.moveTo(-half, half);
        ctx.lineTo(-half + offset, half + offset);
        ctx.stroke();
        ctx.fill();
      }

      drawTetrahedron(size) {
        const height = size * Math.sqrt(2/3);
        const halfSize = size / 2;
        
        ctx.beginPath();
        // Base triangle
        ctx.moveTo(-halfSize, height/2);
        ctx.lineTo(halfSize, height/2);
        ctx.lineTo(0, -height/2);
        ctx.closePath();
        // Apex connection
        ctx.moveTo(0, -height/2);
        ctx.lineTo(0, height/2 + size * 0.2);
        ctx.moveTo(-halfSize, height/2);
        ctx.lineTo(0, height/2 + size * 0.2);
        ctx.moveTo(halfSize, height/2);
        ctx.lineTo(0, height/2 + size * 0.2);
        ctx.stroke();
        ctx.fill();
      }

      drawOctahedron(size) {
        const half = size / 2;
        
        ctx.beginPath();
        // Top pyramid
        ctx.moveTo(0, -half);
        ctx.lineTo(half, 0);
        ctx.lineTo(0, half);
        ctx.lineTo(-half, 0);
        ctx.closePath();
        // Bottom pyramid
        ctx.moveTo(-half, 0);
        ctx.lineTo(0, half);
        ctx.lineTo(half, 0);
        ctx.lineTo(0, -half);
        ctx.stroke();
        ctx.fill();
      }
    }

    // Initialize shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new GeometricShape());
    }

    // Connection lines between nearby shapes
    const drawConnections = () => {
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const s1 = shapes[i];
          const s2 = shapes[j];
          
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dz = s1.z - s2.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

          if (dist < 250) {
            const focalLength = 400;
            const scale1 = focalLength / (focalLength + s1.z);
            const scale2 = focalLength / (focalLength + s2.z);
            
            const x1 = s1.x + mouse.x * 50 * scale1;
            const y1 = s1.y + mouse.y * 50 * scale1;
            const x2 = s2.x + mouse.x * 50 * scale2;
            const y2 = s2.y + mouse.y * 50 * scale2;
            
            const opacity = (1 - dist / 250) * 0.1 * Math.min(scale1, scale2);
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = '#070b19';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw shapes
      shapes.forEach(shape => {
        shape.update();
        shape.draw(mouse.x, mouse.y);
      });

      // Draw connections
      drawConnections();

      // Central glowing orb
      const centerX = width / 2 + mouse.x * 100;
      const centerY = height / 2 + mouse.y * 100;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
