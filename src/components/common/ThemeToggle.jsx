import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                className="toggle-icon"
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 180
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {theme === 'dark' ? <FiMoon /> : <FiSun />}
            </motion.div>

            <div className="toggle-glow" />
        </motion.button>
    );
};

export default ThemeToggle;
