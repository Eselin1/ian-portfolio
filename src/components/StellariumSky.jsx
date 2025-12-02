import React, { useEffect, useRef, useState } from 'react';

export default function StellariumSky() {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredConstellation, setHoveredConstellation] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [currentMousePos, setCurrentMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate star field based on current date/time
    const generateStars = () => {
      const starCount = 500;
      const now = new Date();
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      
      // Generate stars across a much larger area for dragging
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        const seed = i + dayOfYear;
        stars.push({
          x: (Math.sin(seed * 0.123) * 0.5 + 0.5) * 300 - 100, // -100% to 200% for expansive sky
          y: (Math.cos(seed * 0.456) * 0.5 + 0.5) * 300 - 100,
          size: Math.abs(Math.sin(seed * 0.789)) * 2.5 + 0.5,
          brightness: Math.abs(Math.cos(seed * 0.234)) * 0.7 + 0.3,
        });
      }
      return stars;
    };

    const generatedStars = generateStars();
    setStars(generatedStars);
    
    // Generate constellations with proper spacing
    const generateConstellations = (stars) => {
      const constellationNames = [
        'Orion', 'Ursa Major', 'Cassiopeia', 'Draco', 'Lyra',
        'Cygnus', 'Aquila', 'Pegasus', 'Andromeda', 'Perseus',
        'Scorpius', 'Taurus'
      ];
      
      const now = new Date();
      const hours = now.getHours();
      
      const constellations = [];
      const usedStars = new Set();
      
      // Define constellation positions in a grid to avoid overlap
      const positions = [
        { x: -50, y: -50 },  // Top-left
        { x: 50, y: -50 },   // Top-right
        { x: 150, y: -50 },  // Far top-right
        { x: -50, y: 50 },   // Center-left
        { x: 50, y: 50 },    // Center (visible)
        { x: 150, y: 50 },   // Center-right
        { x: -50, y: 150 },  // Bottom-left
        { x: 50, y: 150 },   // Bottom-center
        { x: 150, y: 150 },  // Bottom-right
        { x: -50, y: -150 }, // Far top-left
        { x: 150, y: -150 }, // Far top-right
        { x: -150, y: 50 },  // Far left
      ];
      
      for (let i = 0; i < Math.min(constellationNames.length, positions.length); i++) {
        const pos = positions[i];
        const rotation = (hours + i) * 0.1; // Slight daily rotation
        
        // Find stars near this position
        const nearbyStars = stars
          .map((star, idx) => ({
            idx,
            dist: Math.sqrt(
              Math.pow(star.x - pos.x, 2) + 
              Math.pow(star.y - pos.y, 2)
            )
          }))
          .filter(s => !usedStars.has(s.idx) && s.dist < 40) // Within 40% radius
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 8); // Take up to 8 closest stars
        
        if (nearbyStars.length < 4) continue; // Need at least 4 stars
        
        // Create constellation pattern
        const connections = [];
        const numStars = Math.min(nearbyStars.length, 5 + Math.floor(Math.random() * 2));
        
        for (let j = 0; j < numStars - 1; j++) {
          connections.push({
            from: nearbyStars[j].idx,
            to: nearbyStars[j + 1].idx
          });
          usedStars.add(nearbyStars[j].idx);
        }
        usedStars.add(nearbyStars[numStars - 1].idx);
        
        // Add a couple of branch connections for more interesting shapes
        if (numStars > 3) {
          connections.push({
            from: nearbyStars[1].idx,
            to: nearbyStars[numStars - 1].idx
          });
        }
        
        // Calculate center for hover detection
        const centerX = nearbyStars.reduce((sum, s) => sum + stars[s.idx].x, 0) / nearbyStars.length;
        const centerY = nearbyStars.reduce((sum, s) => sum + stars[s.idx].y, 0) / nearbyStars.length;
        
        constellations.push({
          name: constellationNames[i],
          connections,
          center: { x: centerX, y: centerY },
          radius: 15 // Hover detection radius
        });
      }
      
      return constellations;
    };
    
    setConstellations(generateConstellations(generatedStars));
  }, []);

  // Drag handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setCurrentMousePos({ x: e.clientX, y: e.clientY });
      setTooltipPos({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        const deltaX = (e.clientX - dragStart.x) / rect.width * 100;
        const deltaY = (e.clientY - dragStart.y) / rect.height * 100;
        
        // Apply pan limits to create boundaries
        setPanOffset(prev => {
          const newX = prev.x + deltaX;
          const newY = prev.y + deltaY;
          
          // Limit panning to reasonable bounds (middle ground)
          // X: -100 (left edge) to 100 (right edge)
          // Y: -100 (top edge) to 100 (bottom edge)
          return {
            x: Math.max(-100, Math.min(100, newX)),
            y: Math.max(-100, Math.min(100, newY))
          };
        });
        
        setDragStart({ x: e.clientX, y: e.clientY });
        setHoveredConstellation(null); // Clear hover while dragging
      } else {
        // Check if hovering over any constellation
        let foundConstellation = null;
        for (const constellation of constellations) {
          const centerX = constellation.center.x + panOffset.x;
          const centerY = constellation.center.y + panOffset.y;
          
          const dist = Math.sqrt(
            Math.pow((x * 100) - centerX, 2) + 
            Math.pow((y * 100) - centerY, 2)
          );
          
          if (dist < constellation.radius) {
            foundConstellation = constellation.name;
            break;
          }
        }
        
        setHoveredConstellation(foundConstellation);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      setHoveredConstellation(null);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [constellations, isDragging, dragStart, panOffset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length === 0) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawStars();
    };

    // Draw stars with pan offset
    const drawStars = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      ctx.clearRect(0, 0, w, h);
      
      // Draw stars with pan offset
      stars.forEach(star => {
        const x = ((star.x + panOffset.x) / 100) * w;
        const y = ((star.y + panOffset.y) / 100) * h;
        
        // Skip stars outside visible area
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) return;
        
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
        
        // Add glow effect for brighter stars
        if (star.brightness > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.2})`;
          ctx.fill();
        }
      });

      // Draw constellation lines
      drawConstellations(ctx, w, h);
      
      // Draw atmospheric clouds at borders
      drawAtmosphericBorder(ctx, w, h);
    };

    const drawConstellations = (ctx, w, h) => {
      if (stars.length < 10) return;
      
      constellations.forEach(constellation => {
        const isHovered = hoveredConstellation === constellation.name;
        
        ctx.strokeStyle = isHovered 
          ? 'rgba(147, 51, 234, 0.8)' 
          : 'rgba(147, 51, 234, 0.3)';
        ctx.lineWidth = isHovered ? 2 : 1;
        
        constellation.connections.forEach(conn => {
          const star1 = stars[conn.from];
          const star2 = stars[conn.to];
          
          if (!star1 || !star2) return;
          
          const x1 = ((star1.x + panOffset.x) / 100) * w;
          const y1 = ((star1.y + panOffset.y) / 100) * h;
          const x2 = ((star2.x + panOffset.x) / 100) * w;
          const y2 = ((star2.y + panOffset.y) / 100) * h;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      });
    };
    
    const drawAtmosphericBorder = (ctx, w, h) => {
      // Create cloud-like atmospheric effect at edges
      const edgeFadeDistance = 150; // pixels
      
      // Calculate how close we are to boundaries
      // Only show clouds when within 10 units of the limits
      const threshold = 10;
      
      // Right edge clouds: appear when panOffset.x is close to -100 (panned left = right edge of sky)
      const rightEdge = Math.max(0, Math.min(1, (-100 - panOffset.x + threshold) / threshold));
      // Left edge clouds: appear when panOffset.x is close to 100 (panned right = left edge of sky)
      const leftEdge = Math.max(0, Math.min(1, (panOffset.x - 100 + threshold) / threshold));
      // Bottom edge clouds: appear when panOffset.y is close to -100 (panned up = bottom edge of sky)
      const bottomEdge = Math.max(0, Math.min(1, (-100 - panOffset.y + threshold) / threshold));
      // Top edge clouds: appear when panOffset.y is close to 100 (panned down = top edge of sky)
      const topEdge = Math.max(0, Math.min(1, (panOffset.y - 100 + threshold) / threshold));
      
      // Draw gradient overlays for each edge
      if (leftEdge > 0 || rightEdge > 0) {
        // Left edge clouds
        if (leftEdge > 0) {
          const gradient = ctx.createLinearGradient(0, 0, edgeFadeDistance, 0);
          gradient.addColorStop(0, `rgba(40, 40, 60, ${leftEdge * 0.9})`);
          gradient.addColorStop(0.5, `rgba(40, 40, 60, ${leftEdge * 0.5})`);
          gradient.addColorStop(1, 'rgba(40, 40, 60, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, edgeFadeDistance, h);
          
          // Add cloud texture
          drawClouds(ctx, 0, 0, edgeFadeDistance, h, leftEdge);
        }
        
        // Right edge clouds
        if (rightEdge > 0) {
          const gradient = ctx.createLinearGradient(w - edgeFadeDistance, 0, w, 0);
          gradient.addColorStop(0, 'rgba(40, 40, 60, 0)');
          gradient.addColorStop(0.5, `rgba(40, 40, 60, ${rightEdge * 0.5})`);
          gradient.addColorStop(1, `rgba(40, 40, 60, ${rightEdge * 0.9})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(w - edgeFadeDistance, 0, edgeFadeDistance, h);
          
          drawClouds(ctx, w - edgeFadeDistance, 0, edgeFadeDistance, h, rightEdge);
        }
      }
      
      if (topEdge > 0 || bottomEdge > 0) {
        // Top edge clouds
        if (topEdge > 0) {
          const gradient = ctx.createLinearGradient(0, 0, 0, edgeFadeDistance);
          gradient.addColorStop(0, `rgba(40, 40, 60, ${topEdge * 0.9})`);
          gradient.addColorStop(0.5, `rgba(40, 40, 60, ${topEdge * 0.5})`);
          gradient.addColorStop(1, 'rgba(40, 40, 60, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, w, edgeFadeDistance);
          
          drawClouds(ctx, 0, 0, w, edgeFadeDistance, topEdge);
        }
        
        // Bottom edge clouds
        if (bottomEdge > 0) {
          const gradient = ctx.createLinearGradient(0, h - edgeFadeDistance, 0, h);
          gradient.addColorStop(0, 'rgba(40, 40, 60, 0)');
          gradient.addColorStop(0.5, `rgba(40, 40, 60, ${bottomEdge * 0.5})`);
          gradient.addColorStop(1, `rgba(40, 40, 60, ${bottomEdge * 0.9})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, h - edgeFadeDistance, w, edgeFadeDistance);
          
          drawClouds(ctx, 0, h - edgeFadeDistance, w, edgeFadeDistance, bottomEdge);
        }
      }
    };
    
    const drawClouds = (ctx, x, y, width, height, opacity) => {
      // Draw wispy cloud-like shapes
      const numClouds = 8;
      
      for (let i = 0; i < numClouds; i++) {
        const cloudX = x + (i / numClouds) * width + Math.sin(i * 1.5) * 30;
        const cloudY = y + (Math.cos(i * 2.3) * 0.5 + 0.5) * height;
        const cloudSize = 40 + Math.sin(i * 3.7) * 20;
        
        ctx.fillStyle = `rgba(60, 60, 80, ${opacity * 0.15})`;
        ctx.beginPath();
        ctx.arc(cloudX, cloudY, cloudSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add some smaller cloud puffs
        ctx.fillStyle = `rgba(70, 70, 90, ${opacity * 0.1})`;
        ctx.beginPath();
        ctx.arc(cloudX + cloudSize * 0.6, cloudY - cloudSize * 0.3, cloudSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stars, constellations, panOffset, hoveredConstellation]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          cursor: isDragging ? 'grabbing' : (hoveredConstellation ? 'pointer' : 'grab')
        }}
      />
      {hoveredConstellation && (
        <div
          className="fixed pointer-events-none z-50 bg-zinc-900/90 text-white px-3 py-2 rounded-lg text-sm font-medium border border-purple-500/50 shadow-lg"
          style={{
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`,
            transform: 'translate(0, -50%)'
          }}
        >
          {hoveredConstellation}
        </div>
      )}
    </>
  );
}
