import { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    const colors = useMemo(() => ({
        dark: {
            particles: ['rgba(139, 92, 246, 0.6)', 'rgba(6, 182, 212, 0.5)', 'rgba(244, 63, 94, 0.4)'],
            lines: 'rgba(139, 92, 246, 0.15)',
            glow: 'rgba(139, 92, 246, 0.3)'
        },
        light: {
            particles: ['rgba(139, 92, 246, 0.4)', 'rgba(6, 182, 212, 0.35)', 'rgba(244, 63, 94, 0.3)'],
            lines: 'rgba(139, 92, 246, 0.1)',
            glow: 'rgba(139, 92, 246, 0.2)'
        }
    }), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const particleCount = Math.min(Math.floor((width * height) / 15000), 100);
        particlesRef.current = [];

        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: colors[theme].particles[Math.floor(Math.random() * 3)],
                pulse: Math.random() * Math.PI * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw gradient orbs
            const gradient1 = ctx.createRadialGradient(
                width * 0.2, height * 0.3, 0,
                width * 0.2, height * 0.3, width * 0.4
            );
            gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
            gradient1.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, width, height);

            const gradient2 = ctx.createRadialGradient(
                width * 0.8, height * 0.7, 0,
                width * 0.8, height * 0.7, width * 0.5
            );
            gradient2.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
            gradient2.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, width, height);

            const gradient3 = ctx.createRadialGradient(
                width * 0.5, height * 0.1, 0,
                width * 0.5, height * 0.1, width * 0.3
            );
            gradient3.addColorStop(0, 'rgba(244, 63, 94, 0.08)');
            gradient3.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient3;
            ctx.fillRect(0, 0, width, height);

            // Update and draw particles
            particlesRef.current.forEach((particle, i) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.pulse += 0.02;

                // Wrap around edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                // Pulsing size
                const size = particle.size + Math.sin(particle.pulse) * 0.5;

                // Draw particle with glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Draw connections
                particlesRef.current.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme, colors]);

    return (
        <div className="animated-background">
            <canvas ref={canvasRef} className="particle-canvas" />
            <div className="gradient-overlay" />
            <div className="noise-overlay" />
        </div>
    );
};

export default AnimatedBackground;
