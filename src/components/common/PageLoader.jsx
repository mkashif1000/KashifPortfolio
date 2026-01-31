import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

const PageLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 300);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="page-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <div className="loader-content">
                        <motion.div
                            className="loader-logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-name">Kashif</span>
                            <span className="logo-slash">/</span>
                            <span className="logo-bracket">&gt;</span>
                        </motion.div>

                        <div className="loader-progress">
                            <motion.div
                                className="progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        <motion.p
                            className="loader-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Loading experience...
                        </motion.p>
                    </div>

                    {/* Animated Background Circles */}
                    <div className="loader-circles">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="loader-circle"
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{
                                    scale: [0, 2, 0],
                                    opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.8,
                                    ease: 'easeOut'
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
