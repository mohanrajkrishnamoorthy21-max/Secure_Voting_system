import { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Starfield & Data Packets Configuration
    const particleCount = 120;
    const particles = [];
    const focalLength = 400;
    const speed = 0.4;

    // Hexagonal Wireframe Drift
    const hexCount = 20;
    const hexagons = [];

    // Floating 3D geometric shapes
    const shapes = [];
    const shapeCount = 6;

    // Mouse coordinates tracking with inertia
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, rawX: 0, rawY: 0 };

    class Particle {
      constructor() {
        this.reset();
        // Give some particles a head start in depth
        this.z = Math.random() * focalLength * 2;
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 1.8;
        this.y = (Math.random() - 0.5) * height * 1.8;
        this.z = focalLength * 2;
        
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.vz = -Math.random() * speed - 0.35; // Continuous forward motion

        this.radius = Math.random() * 1.8 + 0.6;
        
        // Super-nodes represent cryptographic data packets
        this.isSuperNode = Math.random() > 0.88;
        if (this.isSuperNode) {
          this.radius = Math.random() * 3.5 + 3.0;
          this.pulsePhase = Math.random() * Math.PI * 2;
          this.pulseSpeed = Math.random() * 0.04 + 0.02;
        }

        // Cyan or Electric Blue/Purple
        this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(59, 130, 246,';
      }

      update(rotationY, rotationX) {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Apply mouse-based 3D rotations around Y axis
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        let rx = this.x * cosY - this.z * sinY;
        let rz = this.z * cosY + this.x * sinY;

        // Apply mouse-based 3D rotations around X axis
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        let ry = this.y * cosX - rz * sinX;
        rz = rz * cosX + this.y * sinX;

        // Pulse logic for super-nodes
        if (this.isSuperNode) {
          this.pulsePhase += this.pulseSpeed;
        }

        // Recycle if out of bounds or too close
        if (rz <= -focalLength) {
          this.reset();
          return { rx: this.x, ry: this.y, rz: this.z };
        }

        return { rx, ry, rz };
      }
    }

    class Hexagon {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -120;
        this.size = Math.random() * 55 + 25;
        this.speed = Math.random() * 0.15 + 0.06;
        this.alpha = Math.random() * 0.06 + 0.015;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.0015;
        this.parallax = Math.random() * 0.6 + 0.15; // parallax factor
        this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(79, 70, 229,';
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotSpeed;
        if (this.y > height + 120) {
          this.reset();
        }
      }

      draw(rotationX, rotationY) {
        ctx.save();
        ctx.strokeStyle = `${this.color}${this.alpha})`;
        ctx.lineWidth = 1.2;

        // Apply parallax offset based on depth
        const px = this.x + rotationX * 180 * this.parallax;
        const py = this.y + rotationY * 180 * this.parallax;

        ctx.beginPath();
        for (let side = 0; side < 6; side++) {
          const angle = this.rotation + (side * Math.PI) / 3;
          const hx = px + this.size * Math.cos(angle);
          const hy = py + this.size * Math.sin(angle);
          if (side === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Initialize hexagons
    for (let i = 0; i < hexCount; i++) {
      hexagons.push(new Hexagon());
    }

    // 3D Floating Geometric Shapes Class
    class FloatingShape {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -150;
        this.z = Math.random() * 300 - 150;
        this.size = Math.random() * 40 + 20;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.rotationSpeedX = (Math.random() - 0.5) * 0.008;
        this.rotationSpeedY = (Math.random() - 0.5) * 0.008;
        this.rotationSpeedZ = (Math.random() - 0.5) * 0.004;
        this.speed = Math.random() * 0.2 + 0.08;
        this.alpha = Math.random() * 0.08 + 0.02;
        this.type = Math.floor(Math.random() * 3); // 0: cube, 1: tetrahedron, 2: octahedron
        this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(139, 92, 246,';
      }

      update() {
        this.y += this.speed;
        this.rotationX += this.rotationSpeedX;
        this.rotationY += this.rotationSpeedY;
        this.rotationZ += this.rotationSpeedZ;
        if (this.y > height + 150) {
          this.reset();
        }
      }

      draw(parallaxX, parallaxY) {
        const scale = focalLength / (focalLength + this.z);
        const projX = this.x + parallaxX * 100 * scale;
        const projY = this.y + parallaxY * 100 * scale;
        const projSize = this.size * scale;
        const alpha = this.alpha * scale;

        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(this.rotationZ);
        
        ctx.strokeStyle = `${this.color}${alpha})`;
        ctx.lineWidth = 1.2 * scale;
        ctx.fillStyle = `${this.color}${alpha * 0.2})`;

        if (this.type === 0) {
          this.drawCube(projSize);
        } else if (this.type === 1) {
          this.drawTetrahedron(projSize);
        } else {
          this.drawOctahedron(projSize);
        }

        ctx.restore();
      }

      drawCube(size) {
        const half = size / 2;
        const offset = size * 0.25;
        ctx.beginPath();
        ctx.rect(-half, -half, size, size);
        ctx.rect(-half + offset, -half + offset, size, size);
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
        ctx.moveTo(-halfSize, height/2);
        ctx.lineTo(halfSize, height/2);
        ctx.lineTo(0, -height/2);
        ctx.closePath();
        ctx.moveTo(0, -height/2);
        ctx.lineTo(0, height/2 + size * 0.15);
        ctx.moveTo(-halfSize, height/2);
        ctx.lineTo(0, height/2 + size * 0.15);
        ctx.moveTo(halfSize, height/2);
        ctx.lineTo(0, height/2 + size * 0.15);
        ctx.stroke();
        ctx.fill();
      }

      drawOctahedron(size) {
        const half = size / 2;
        ctx.beginPath();
        ctx.moveTo(0, -half);
        ctx.lineTo(half, 0);
        ctx.lineTo(0, half);
        ctx.lineTo(-half, 0);
        ctx.closePath();
        ctx.moveTo(-half, 0);
        ctx.lineTo(0, half);
        ctx.lineTo(half, 0);
        ctx.lineTo(0, -half);
        ctx.stroke();
        ctx.fill();
      }
    }

    // Initialize floating shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new FloatingShape());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.rawX = e.clientX;
      mouse.rawY = e.clientY;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.15;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Draw the 3D grid plane in the lower third
    const drawPerspectiveGrid = (rx, ry) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.035)';
      ctx.lineWidth = 1;

      // vanishing point calculations
      const horizon = height * 0.55 + ry * 120;
      const vanishX = width * 0.5 + rx * 180;

      // Radial lines radiating from horizon
      const lineCount = 30;
      for (let i = 0; i <= lineCount; i++) {
        const ratio = i / lineCount;
        const targetX = width * 2.2 * (ratio - 0.5) + width * 0.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      // Horizontal depth lines
      const depthLines = 14;
      for (let i = 0; i < depthLines; i++) {
        const ratio = i / depthLines;
        const y = horizon + (height - horizon) * Math.pow(ratio, 2.5); // exponential spacing
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      ctx.fillStyle = '#070b19'; // deep space color
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates for inertia smoothness
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 1. Draw Perspective Grid Plane
      drawPerspectiveGrid(mouse.x, mouse.y);

      // 2. Update & Draw Hexagonal Mesh Drift
      for (let i = 0; i < hexagons.length; i++) {
        hexagons[i].update();
        hexagons[i].draw(mouse.x, mouse.y);
      }

      // 3. Update & Draw Floating 3D Geometric Shapes
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].update();
        shapes[i].draw(mouse.x, mouse.y);
      }

      // 4. Project and Draw tech particles starfield
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const { rx, ry, rz } = p.update(mouse.x, mouse.y);

        const scale = focalLength / (focalLength + rz);
        const projX = rx * scale + width / 2;
        const projY = ry * scale + height / 2;
        const opacity = Math.min(1, Math.max(0, 1 - rz / (focalLength * 2))) * 0.7;

        let radius = p.radius * scale;
        if (p.isSuperNode) {
          const pulseFactor = Math.sin(p.pulsePhase) * 0.2 + 1;
          radius *= pulseFactor;
        }

        projected.push({
          x: projX,
          y: projY,
          z: rz,
          opacity,
          color: p.color,
          radius,
          isSuperNode: p.isSuperNode
        });

        // Draw individual data nodes
        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          ctx.beginPath();
          ctx.arc(projX, projY, Math.max(0.6, radius), 0, Math.PI * 2);
          
          if (p.isSuperNode) {
            ctx.shadowBlur = 15 * scale;
            ctx.shadowColor = p.color.includes('212') ? '#06b6d4' : '#3b82f6';
            ctx.fillStyle = `${p.color}${opacity * 0.95})`;
            ctx.fill();
            
            // Concentric network ring
            ctx.beginPath();
            ctx.arc(projX, projY, radius * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = `${p.color}${opacity * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = `${p.color}${opacity * 0.75})`;
            ctx.fill();
          }
        }
      }

      // 5. Draw connection mesh lines between close nodes
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110 && Math.abs(p1.z - p2.z) < focalLength * 0.4) {
            let lineOpacity = (1 - dist / 110) * Math.min(p1.opacity, p2.opacity) * 0.35;
            
            // Brighten close to cursor focal light effect
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const cursorDx = midX - mouse.rawX;
            const cursorDy = midY - mouse.rawY;
            const cursorDist = Math.sqrt(cursorDx * cursorDx + cursorDy * cursorDy);
            
            if (cursorDist < 160) {
              lineOpacity *= (1 - cursorDist / 160) * 1.4 + 1.0;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `${p1.color}${lineOpacity})`);
            grad.addColorStop(1, `${p2.color}${lineOpacity})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = p1.isSuperNode || p2.isSuperNode ? 0.75 : 0.45;
            ctx.stroke();
          }
        }
      }

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
        display: 'block',
      }}
    />
  );
}
