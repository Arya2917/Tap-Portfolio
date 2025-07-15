import { useEffect, useRef } from 'react';

const NeuralCanvasBackground = ({ 
  className = '',
  nodeCount = 50,
  primaryColor = 'rgba(56, 189, 248, 0.6)',
  secondaryColor = 'rgba(139, 92, 246, 0.4)',
  connectionColor = 'rgba(56, 189, 248, 0.2)'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network nodes
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 4 + 2,
        connections: [],
        energy: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2,
        active: false
      });
    }

    // Find connections between nodes
    const updateConnections = () => {
      nodes.forEach(node => {
        node.connections = [];
        nodes.forEach(other => {
          if (node !== other) {
            const distance = Math.sqrt(
              Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
            );
            if (distance < 120) {
              node.connections.push({
                node: other,
                distance: distance,
                strength: 1 - (distance / 120)
              });
            }
          }
        });
      });
    };

    // Matrix rain effect
    const matrixDrops = [];
    const matrixChars = '01';
    for (let i = 0; i < 50; i++) {
      matrixDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 2 + 1,
        chars: [],
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    // Initialize matrix characters
    matrixDrops.forEach(drop => {
      const charCount = Math.floor(Math.random() * 20) + 5;
      for (let i = 0; i < charCount; i++) {
        drop.chars.push({
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          opacity: Math.max(0, 1 - (i / charCount))
        });
      }
    });

    // Draw matrix rain
    const drawMatrixRain = () => {
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      
      matrixDrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > height + 100) {
          drop.y = -100;
          drop.x = Math.random() * width;
        }

        drop.chars.forEach((charObj, i) => {
          const y = drop.y + (i * 15);
          if (y > -20 && y < height + 20) {
            ctx.globalAlpha = charObj.opacity * drop.opacity;
            ctx.fillText(charObj.char, drop.x, y);
          }
        });
      });
      ctx.globalAlpha = 1;
    };

    // Draw neural network
    const drawNeuralNetwork = () => {
      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep nodes within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - node.x, 2) + 
          Math.pow(mouseRef.current.y - node.y, 2)
        );
        
        node.active = mouseDistance < 150;
        
        if (node.active) {
          const force = (150 - mouseDistance) / 150;
          node.energy = Math.min(1, node.energy + force * 0.02);
        } else {
          node.energy *= 0.95;
        }

        // Update pulse phase
        node.pulsePhase += 0.05;
      });

      // Update connections
      updateConnections();

      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(connection => {
          const opacity = connection.strength * 0.3 * (node.energy + connection.node.energy);
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = connectionColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connection.node.x, connection.node.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const pulseSize = node.radius + Math.sin(node.pulsePhase) * 2;
        const glowSize = pulseSize + node.energy * 10;
        
        // Outer glow
        if (node.energy > 0.1) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowSize
          );
          gradient.addColorStop(0, node.active ? primaryColor : secondaryColor);
          gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
          
          ctx.globalAlpha = node.energy * 0.5;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core node
        ctx.globalAlpha = 0.8 + node.energy * 0.2;
        ctx.fillStyle = node.active ? primaryColor : secondaryColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      });
    };

    // Draw geometric grid
    const drawGeometricGrid = () => {
      const gridSize = 100;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.globalAlpha = 0.1 + Math.sin(timeRef.current * 0.01 + x * 0.01) * 0.05;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.globalAlpha = 0.1 + Math.sin(timeRef.current * 0.01 + y * 0.01) * 0.05;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 1;
      
      ctx.clearRect(0, 0, width, height);

      // Draw all effects
      drawGeometricGrid();
      drawMatrixRain();
      drawNeuralNetwork();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [className, nodeCount, primaryColor, secondaryColor, connectionColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(17, 24, 39, 0.8) 100%)',
        pointerEvents: 'none'
      }}
    />
  );
};

export default NeuralCanvasBackground;