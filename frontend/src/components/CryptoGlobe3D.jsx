import { useEffect, useRef } from 'react';

export default function CryptoGlobe3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const radius = 95;
    const points = [];
    const latCount = 9;
    const lonCount = 13;

    // Generate points on a sphere
    for (let i = 0; i <= latCount; i++) {
      const lat = (i * Math.PI) / latCount - Math.PI / 2;
      for (let j = 0; j < lonCount; j++) {
        const lon = (j * 2 * Math.PI) / lonCount;
        
        // 3D Spherical coordinates
        const x = radius * Math.cos(lat) * Math.cos(lon);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(lon);
        
        points.push({ x, y, z });
      }
    }

    // Active data transmission beams
    const activeBeams = [];
    const maxBeams = 7;

    // Rotation state
    let angleX = 0.35;
    let angleY = 0.6;
    let autoSpinY = 0.007;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const rotatePoint = (p, sinX, cosX, sinY, cosY) => {
      // Rotate around Y axis
      let x1 = p.x * cosY - p.z * sinY;
      let z1 = p.z * cosY + p.x * sinY;

      // Rotate around X axis
      let y2 = p.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + p.y * sinX;

      return { x: x1, y: y2, z: z2 };
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      previousMousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      autoSpinY = 0;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const deltaX = currentX - previousMousePosition.x;
      const deltaY = currentY - previousMousePosition.y;

      dragVelocity = {
        x: deltaX * 0.006,
        y: deltaY * 0.006
      };

      angleY += dragVelocity.x;
      angleX += dragVelocity.y;

      previousMousePosition = { x: currentX, y: currentY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support
    const handleTouchStart = (e) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      previousMousePosition = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
      autoSpinY = 0;
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.touches[0].clientX - rect.left;
      const currentY = e.touches[0].clientY - rect.top;

      const deltaX = currentX - previousMousePosition.x;
      const deltaY = currentY - previousMousePosition.y;

      dragVelocity = {
        x: deltaX * 0.006,
        y: deltaY * 0.006
      };

      angleY += dragVelocity.x;
      angleX += dragVelocity.y;

      previousMousePosition = { x: currentX, y: currentY };
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Decelerate drag velocity
      if (!isDragging) {
        angleY += autoSpinY;
        angleY += dragVelocity.x;
        angleX += dragVelocity.y;

        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;

        if (Math.abs(dragVelocity.x) < 0.001) {
          autoSpinY = 0.006;
        }
      }

      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      const center = size / 2;
      const focalLength = 320;

      // Project spherical nodes
      const projected = points.map((p) => {
        const rotated = rotatePoint(p, sinX, cosX, sinY, cosY);
        const scale = focalLength / (focalLength + rotated.z);
        const projX = rotated.x * scale + center;
        const projY = rotated.y * scale + center;
        
        // Depth opacity mapping
        const opacity = (rotated.z + radius) / (2 * radius);

        return {
          x: projX,
          y: projY,
          z: rotated.z,
          opacity: opacity * 0.6 + 0.15,
          scale
        };
      });

      // Pulse value for connections
      const pulseTime = Date.now() * 0.002;
      const gridOpacityMult = Math.sin(pulseTime) * 0.2 + 0.8; // pulsing line intensity

      // Draw latitude connection lines
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.09 * gridOpacityMult})`;
      ctx.lineWidth = 0.55;
      for (let i = 0; i <= latCount; i++) {
        ctx.beginPath();
        for (let j = 0; j < lonCount; j++) {
          const idx = i * lonCount + j;
          const nextIdx = i * lonCount + ((j + 1) % lonCount);
          ctx.lineTo(projected[idx].x, projected[idx].y);
          ctx.lineTo(projected[nextIdx].x, projected[nextIdx].y);
        }
        ctx.stroke();
      }

      // Draw longitude connection lines
      ctx.strokeStyle = `rgba(79, 70, 229, ${0.07 * gridOpacityMult})`;
      for (let j = 0; j < lonCount; j++) {
        ctx.beginPath();
        for (let i = 0; i < latCount; i++) {
          const idx = i * lonCount + j;
          const nextIdx = (i + 1) * lonCount + j;
          ctx.lineTo(projected[idx].x, projected[idx].y);
          ctx.lineTo(projected[nextIdx].x, projected[nextIdx].y);
        }
        ctx.stroke();
      }

      // Spawn periodic data transmission beams along random nodes
      if (activeBeams.length < maxBeams && Math.random() < 0.04) {
        const startIdx = Math.floor(Math.random() * projected.length);
        const endIdx = Math.floor(Math.random() * projected.length);
        if (startIdx !== endIdx) {
          activeBeams.push({
            start: startIdx,
            end: endIdx,
            progress: 0,
            speed: Math.random() * 0.015 + 0.01,
            color: Math.random() > 0.4 ? 'rgba(6, 182, 212,' : 'rgba(110, 231, 183,'
          });
        }
      }

      // Draw active data beams
      for (let i = activeBeams.length - 1; i >= 0; i--) {
        const b = activeBeams[i];
        b.progress += b.speed;
        if (b.progress >= 1) {
          activeBeams.splice(i, 1);
          continue;
        }

        const p1 = projected[b.start];
        const p2 = projected[b.end];
        
        // Linear Interpolate coordinates
        const bx = p1.x + (p2.x - p1.x) * b.progress;
        const by = p1.y + (p2.y - p1.y) * b.progress;
        const bOpacity = Math.sin(b.progress * Math.PI) * Math.min(p1.opacity, p2.opacity);

        // Beam glow core
        ctx.beginPath();
        ctx.arc(bx, by, 2.5 * p1.scale, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}${bOpacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color.includes('212') ? '#06b6d4' : '#10b981';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Tail
        ctx.beginPath();
        ctx.moveTo(p1.x + (p2.x - p1.x) * Math.max(0, b.progress - 0.18), p1.y + (p2.y - p1.y) * Math.max(0, b.progress - 0.18));
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `${b.color}${bOpacity * 0.65})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // Draw connection points (network nodes)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        ctx.beginPath();
        
        // Node pulses in size dynamically
        const nodePulse = Math.sin(pulseTime + i) * 0.3 + 1;
        ctx.arc(p.x, p.y, Math.max(0.6, 2.2 * p.scale * nodePulse), 0, Math.PI * 2);
        
        if (p.z < 0) {
          ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity * (Math.sin(pulseTime * 2 + i) * 0.15 + 0.85)})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(79, 70, 229, ${p.opacity * 0.5})`;
          ctx.fill();
        }
      }

      // Telemetry HUD overlay: Outer rings
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center, center, radius + 15, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed outer circular indicators rotating
      const tickerAngle = Date.now() * 0.0008;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(tickerAngle);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, radius + 22, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.rotate(-tickerAngle * 2.2);
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 40]);
      ctx.beginPath();
      ctx.arc(0, 0, radius + 28, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Mono HUD Text Telemetry in corners
      ctx.fillStyle = 'rgba(6, 182, 212, 0.65)';
      ctx.font = '8px "Orbitron", monospace';
      ctx.letterSpacing = '0.04em';
      ctx.fillText("SYS_LNK: ACTIVE", 14, 25);
      ctx.fillText("LDG_SYNC: 100%", 14, 37);

      ctx.fillStyle = 'rgba(110, 231, 183, 0.65)';
      ctx.fillText("NODE: SECURE", size - 90, size - 25);
      ctx.fillText("VAL_CONN", size - 90, size - 13);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-globe-canvas"
      title="Drag to spin blockchain globe"
      style={{ filter: 'drop-shadow(0 0 35px rgba(6, 182, 212, 0.55))' }}
    />
  );
}
