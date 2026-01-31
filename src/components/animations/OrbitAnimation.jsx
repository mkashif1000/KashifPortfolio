import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const OrbitAnimation = () => {
    const { theme } = useTheme();
    
    // Theme-aware colors for orbit rings
    const ringColors = {
        dark: {
            center: 'rgba(255, 255, 255, 0.3)',
            middle: 'rgba(255, 255, 255, 0.2)',
            outer: 'rgba(255, 255, 255, 0.1)'
        },
        light: {
            center: 'rgba(0, 0, 0, 0.3)',
            middle: 'rgba(0, 0, 0, 0.2)',
            outer: 'rgba(0, 0, 0, 0.1)'
        }
    };

    const currentColors = ringColors[theme];

    return (
        <div className="orbit-container">
            {/* Center Circle */}
            <div 
                className="orbit-ring center-ring" 
                style={{ border: `1px solid ${currentColors.center}` }}
            />

            {/* Middle Circle */}
            <div 
                className="orbit-ring middle-ring" 
                style={{ border: `1px solid ${currentColors.middle}` }}
            />

            {/* Outer Circle with Items */}
            <motion.div
                className="orbit-ring outer-ring"
                style={{ border: `1px solid ${currentColors.outer}` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <div className="orbit-item item-react">
                    <span className="item-text">REACT</span>
                </div>
                <div className="orbit-item item-node">
                    <span className="item-text">NODE</span>
                </div>
            </motion.div>

            <style jsx>{`
                .orbit-container {
                    position: relative;
                    width: 400px;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .orbit-ring {
                    position: absolute;
                    border-radius: 50%;
                    box-sizing: border-box;
                }

                .center-ring {
                    width: 140px;
                    height: 140px;
                }

                .middle-ring {
                    width: 260px;
                    height: 260px;
                }

                .outer-ring {
                    width: 380px;
                    height: 380px;
                }

                .orbit-item {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    padding: 4px 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform-origin: center center;
                }

                .item-text {
                    font-family: var(--font-heading);
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                    letter-spacing: 0.05em;
                }

                /* Positioning items on the ring */
                /* React: Bottom Left (~235deg) */
                .item-react {
                    transform: translate(-50%, -50%) rotate(235deg) translate(190px) rotate(90deg);
                }
                
                /* Node: Top Right (~55deg) */
                .item-node {
                    transform: translate(-50%, -50%) rotate(55deg) translate(190px) rotate(90deg);
                }
            `}</style>
        </div>
    );
};

export default OrbitAnimation;
