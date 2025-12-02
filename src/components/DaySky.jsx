import React, { useEffect, useRef, useState } from 'react';

// Export tooltip data and temperature via callbacks
export default function DaySky({ onTooltipChange, onTemperatureChange }) {
  const canvasRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredTime, setHoveredTime] = useState(null);
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);
  const [sunriseSunset, setSunriseSunset] = useState(null); // Will be set after fetching
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [sunImage, setSunImage] = useState(null);
  const [moonImage, setMoonImage] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    // Load sun image
    const sunImg = new Image();
    sunImg.src = '/sun.png';
    sunImg.onload = () => setSunImage(sunImg);
    
    // Load moon image
    const moonImg = new Image();
    moonImg.src = '/moon.png';
    moonImg.onload = () => setMoonImage(moonImg);
    
    // Get user location via IP (no permission needed)
    const fetchLocationAndSunrise = async () => {
      try {
        // Get approximate location from IP using ipapi.co (free, no key needed)
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        
        if (ipData.latitude && ipData.longitude) {
          const { latitude, longitude } = ipData;
          setLocation({ lat: latitude, lng: longitude });
          
          // Fetch sunrise/sunset for this location
          const sunResponse = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
          );
          const sunData = await sunResponse.json();
          
          if (sunData.status === 'OK') {
            // Parse the ISO times and convert to local hours
            const sunriseDate = new Date(sunData.results.sunrise);
            const sunsetDate = new Date(sunData.results.sunset);
            
            const sunriseHours = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
            const sunsetHours = sunsetDate.getHours() + sunsetDate.getMinutes() / 60;
            
            setSunriseSunset({ sunrise: sunriseHours, sunset: sunsetHours });
          }
          
          // Fetch temperature using open-meteo (free, no API key needed)
          try {
            const weatherResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
            );
            const weatherData = await weatherResponse.json();
            
            if (weatherData.current?.temperature_2m) {
              setTemperature(Math.round(weatherData.current.temperature_2m));
            }
          } catch (error) {
            console.error('Error fetching temperature:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching location/sunrise:', error);
        // Set default values on error
        setSunriseSunset({ sunrise: 6, sunset: 18 });
      }
    };
    
    fetchLocationAndSunrise();
    
    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  
  // Redraw when sun or moon image loads
  useEffect(() => {
    if ((sunImage || moonImage) && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      // Trigger redraw by updating canvas
      const event = new Event('resize');
      window.dispatchEvent(event);
    }
  }, [sunImage, moonImage]);
  
  // Notify parent of tooltip changes
  useEffect(() => {
    if (onTooltipChange) {
      onTooltipChange(tooltipData);
    }
  }, [tooltipData, onTooltipChange]);
  
  // Notify parent of temperature changes
  useEffect(() => {
    if (onTemperatureChange) {
      onTemperatureChange(temperature);
    }
  }, [temperature, onTemperatureChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawSky();
    };

    const drawSky = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      ctx.clearRect(0, 0, w, h);
      
      // Get current time info
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const timeInHours = hours + minutes / 60;
      
      // Only proceed if sunrise/sunset data is loaded
      if (!sunriseSunset) {
        // Draw clouds while waiting for data
        drawClouds(ctx, w, h);
        return;
      }
      
      // Sun position calculation (full 24-hour arc)
      const { sunrise, sunset } = sunriseSunset;
      
      // Calculate sun position along arc (0-24 hours)
      // Map time to arc position: 0h at left, 12h at peak, 24h at right
      const sunProgress = timeInHours / 24;
      
      // Sun is only visible during day (sunrise to sunset)
      const isDaytime = timeInHours >= sunrise && timeInHours <= sunset;
      
      // Draw sun arc path
      const arcStartX = w * 0.05;
      const arcEndX = w * 0.95;
      const arcBaseY = h * 0.95; // Near bottom of hero
      const arcHeight = h * 0.55;
      
ctx.strokeStyle = 'rgba(100, 100, 120, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let i = 0; i <= 100; i++) {
        const progress = i / 100;
        const x = arcStartX + (arcEndX - arcStartX) * progress;
        const angle = Math.PI * progress;
        const y = arcBaseY - Math.sin(angle) * arcHeight;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw sunrise/sunset dots ON the arc
      const drawDotOnArc = (time) => {
        const progress = time / 24;
        const x = arcStartX + (arcEndX - arcStartX) * progress;
        const angle = Math.PI * progress;
        const y = arcBaseY - Math.sin(angle) * arcHeight;
        
        // Outer circle
        ctx.fillStyle = 'rgba(150, 150, 150, 0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle
        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        return { x, y };
      };
      
      // Draw sunrise and sunset markers at actual times
      const sunrisePos = drawDotOnArc(sunrise);
      const sunsetPos = drawDotOnArc(sunset);
      
      // Draw horizontal lines from sunrise dot across screen
      ctx.strokeStyle = 'rgba(255, 180, 80, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      
      ctx.beginPath();
      ctx.moveTo(0, sunrisePos.y);
      ctx.lineTo(w, sunrisePos.y);
      ctx.stroke();
      
      // Draw horizontal line from sunset dot across screen
      ctx.strokeStyle = 'rgba(255, 140, 60, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, sunsetPos.y);
      ctx.lineTo(w, sunsetPos.y);
      ctx.stroke();
      
      ctx.setLineDash([]);
      
      // Draw sun during daytime or moon during nighttime
      if (isDaytime && sunImage) {
        const sunX = arcStartX + (arcEndX - arcStartX) * sunProgress;
        const sunAngle = Math.PI * sunProgress;
        const sunY = arcBaseY - Math.sin(sunAngle) * arcHeight;
        const sunSize = 40;
        
        ctx.drawImage(
          sunImage,
          sunX - sunSize / 2,
          sunY - sunSize / 2,
          sunSize,
          sunSize
        );
      } else if (!isDaytime && moonImage) {
        const moonX = arcStartX + (arcEndX - arcStartX) * sunProgress;
        const moonAngle = Math.PI * sunProgress;
        const moonY = arcBaseY - Math.sin(moonAngle) * arcHeight;
        const moonSize = 40;
        
        ctx.drawImage(
          moonImage,
          moonX - moonSize / 2,
          moonY - moonSize / 2,
          moonSize,
          moonSize
        );
      }
      
      // Draw clouds
      drawClouds(ctx, w, h);
      
      // Draw time markers
      drawTimeMarkers(ctx, w, h, arcStartX, arcEndX, arcBaseY);
      
      // Draw hover info if hovering on arc
      drawArcHoverInfo(ctx, w, h, arcStartX, arcEndX, arcBaseY, arcHeight, timeInHours);
    };
    
    const drawClouds = (ctx, w, h) => {
      const clouds = [
        { x: 0.2, y: 0.3, size: 60, speed: 0.0001 },
        { x: 0.5, y: 0.25, size: 80, speed: 0.00015 },
        { x: 0.75, y: 0.35, size: 70, speed: 0.00012 },
        { x: 0.1, y: 0.5, size: 50, speed: 0.00008 },
        { x: 0.85, y: 0.45, size: 65, speed: 0.0001 },
      ];
      
      const time = Date.now();
      
      clouds.forEach(cloud => {
        const offsetX = (Math.sin(time * cloud.speed + cloud.x * 10) * 30);
        const x = w * cloud.x + offsetX;
        const y = h * cloud.y;
        const size = cloud.size;
        
        // Cloud color varies based on position
        const opacity = 0.4;
        
        // Draw cloud puffs
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x - size * 0.4, y - size * 0.05, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y + size * 0.2, size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    const drawArcHoverInfo = (ctx, w, h, arcStartX, arcEndX, arcBaseY, arcHeight, currentHours) => {
      if (!isHoveringTimeline || hoveredTime === null || !sunriseSunset) {
        setTooltipData(null);
        return;
      }
      
      const { sunrise, sunset } = sunriseSunset;
      
      const progress = hoveredTime / 24;
      const x = arcStartX + (arcEndX - arcStartX) * progress;
      const angle = Math.PI * progress;
      const y = arcBaseY - Math.sin(angle) * arcHeight;
      
      // Draw hover indicator on arc
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(100, 150, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Check if hovering exactly on sunrise or sunset
      const isSunrise = Math.abs(hoveredTime - sunrise) < 0.01;
      const isSunset = Math.abs(hoveredTime - sunset) < 0.01;
      
      let phaseLabel;
      if (isSunrise) {
        phaseLabel = 'Sunrise';
      } else if (isSunset) {
        phaseLabel = 'Sunset';
      } else {
        // Define twilight phases based on actual sunrise/sunset
        const civilTwilightDuration = 0.5; // 30 minutes
        const nauticalTwilightDuration = 0.5; // 30 minutes  
        const astronomicalTwilightDuration = 0.5; // 30 minutes
        
        const phases = [
          { start: 0, end: sunrise - civilTwilightDuration - nauticalTwilightDuration - astronomicalTwilightDuration, label: 'Night' },
          { start: sunrise - civilTwilightDuration - nauticalTwilightDuration - astronomicalTwilightDuration, end: sunrise - civilTwilightDuration - nauticalTwilightDuration, label: 'Astronomical Twilight' },
          { start: sunrise - civilTwilightDuration - nauticalTwilightDuration, end: sunrise - civilTwilightDuration, label: 'Nautical Twilight' },
          { start: sunrise - civilTwilightDuration, end: sunrise, label: 'Civil Twilight' },
          { start: sunrise, end: sunset, label: 'Day' },
          { start: sunset, end: sunset + civilTwilightDuration, label: 'Civil Twilight' },
          { start: sunset + civilTwilightDuration, end: sunset + civilTwilightDuration + nauticalTwilightDuration, label: 'Nautical Twilight' },
          { start: sunset + civilTwilightDuration + nauticalTwilightDuration, end: sunset + civilTwilightDuration + nauticalTwilightDuration + astronomicalTwilightDuration, label: 'Astronomical Twilight' },
          { start: sunset + civilTwilightDuration + nauticalTwilightDuration + astronomicalTwilightDuration, end: 24, label: 'Night' },
        ];
        
        const currentPhase = phases.find(p => hoveredTime >= p.start && hoveredTime < p.end);
        phaseLabel = currentPhase?.label || 'Unknown';
      }
      
      // Calculate time until sunrise/sunset
      let timeUntil = '';
      let nextEvent = '';
      
      if (hoveredTime < sunrise) {
        const diff = sunrise - hoveredTime;
        const hours = Math.floor(diff);
        const mins = Math.floor((diff - hours) * 60);
        timeUntil = `${hours}h ${mins}m`;
        nextEvent = 'until sunrise';
      } else if (hoveredTime < sunset) {
        const diff = sunset - hoveredTime;
        const hours = Math.floor(diff);
        const mins = Math.floor((diff - hours) * 60);
        timeUntil = `${hours}h ${mins}m`;
        nextEvent = 'until sunset';
      } else {
        const diff = 24 + sunrise - hoveredTime;
        const hours = Math.floor(diff);
        const mins = Math.floor((diff - hours) * 60);
        timeUntil = `${hours}h ${mins}m`;
        nextEvent = 'until sunrise';
      }
      
      // Prepare tooltip data for DOM rendering
      const hoverHours = Math.floor(hoveredTime);
      const hoverMins = Math.floor((hoveredTime - hoverHours) * 60);
      
      setTooltipData({
        x,
        y,
        time: `${String(hoverHours).padStart(2, '0')}:${String(hoverMins).padStart(2, '0')}`,
        phase: phaseLabel,
        countdown: `${timeUntil} ${nextEvent}`
      });
    };
    
    const drawTimeMarkers = (ctx, w, h, arcStartX, arcEndX, arcBaseY) => {
      const times = [
        { label: '00', x: arcStartX },
        { label: '06', x: arcStartX + (arcEndX - arcStartX) * 0.25 },
        { label: '12', x: arcStartX + (arcEndX - arcStartX) * 0.5 },
        { label: '18', x: arcStartX + (arcEndX - arcStartX) * 0.75 },
        { label: '24', x: arcEndX },
      ];
      
      ctx.fillStyle = 'rgba(100, 100, 100, 0.6)';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      
      times.forEach((time, idx) => {
        const y = h - 10; // 10px from bottom
        
        // Align edges properly
        if (idx === 0) {
          ctx.textAlign = 'left';
        } else if (idx === times.length - 1) {
          ctx.textAlign = 'right';
        } else {
          ctx.textAlign = 'center';
        }
        
        ctx.fillText(time.label, time.x, y);
      });
    };

    drawSky();
    
    // Animate sun rays
    const animationInterval = setInterval(drawSky, 100);
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse events for arc interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const arcStartX = rect.width * 0.05;
      const arcEndX = rect.width * 0.95;
      const arcBaseY = rect.height * 0.95;
      const arcHeight = rect.height * 0.55;
      
      if (!sunriseSunset) return;
      
      const { sunrise, sunset } = sunriseSunset;
      
      // Check if hovering over sunrise/sunset dots first
      const sunriseProgress = sunrise / 24;
      const sunsetProgress = sunset / 24;
      
      const sunriseX = arcStartX + (arcEndX - arcStartX) * sunriseProgress;
      const sunriseAngle = Math.PI * sunriseProgress;
      const sunriseY = arcBaseY - Math.sin(sunriseAngle) * arcHeight;
      
      const sunsetX = arcStartX + (arcEndX - arcStartX) * sunsetProgress;
      const sunsetAngle = Math.PI * sunsetProgress;
      const sunsetY = arcBaseY - Math.sin(sunsetAngle) * arcHeight;
      
      const distToSunrise = Math.sqrt(Math.pow(x - sunriseX, 2) + Math.pow(y - sunriseY, 2));
      const distToSunset = Math.sqrt(Math.pow(x - sunsetX, 2) + Math.pow(y - sunsetY, 2));
      
      // Check if hovering over sunrise or sunset dot (within 15px)
      if (distToSunrise < 15) {
        setIsHoveringTimeline(true);
        setHoveredTime(sunrise);
        return;
      }
      
      if (distToSunset < 15) {
        setIsHoveringTimeline(true);
        setHoveredTime(sunset);
        return;
      }
      
      // Otherwise, check if hovering near the arc
      let nearestDist = Infinity;
      let nearestProgress = 0;
      
      for (let i = 0; i <= 100; i++) {
        const progress = i / 100;
        const arcX = arcStartX + (arcEndX - arcStartX) * progress;
        const angle = Math.PI * progress;
        const arcY = arcBaseY - Math.sin(angle) * arcHeight;
        
        const dist = Math.sqrt(Math.pow(x - arcX, 2) + Math.pow(y - arcY, 2));
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestProgress = progress;
        }
      }
      
      // If within 30px of arc, show hover
      if (nearestDist < 30) {
        setIsHoveringTimeline(true);
        setHoveredTime(nearestProgress * 24);
      } else {
        setIsHoveringTimeline(false);
        setHoveredTime(null);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHoveringTimeline(false);
      setHoveredTime(null);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(animationInterval);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [currentTime, isHoveringTimeline, hoveredTime, sunImage, moonImage, sunriseSunset]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
