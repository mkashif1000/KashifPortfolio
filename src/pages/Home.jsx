import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiInstagram, FiMessageSquare, FiSend, FiMail, FiArrowRight } from 'react-icons/fi';
import OrbitAnimation from '../components/animations/OrbitAnimation';
import TechStackMarquee from '../components/common/TechStackMarquee';
import FeaturedProjects from '../components/common/FeaturedProjects';
import Testimonials from '../components/common/Testimonials';
import './Home.css';

const Typewriter = ({ text, delay = 100 }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
};

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <>
            <section className="hero">
                <div className="hero-container container">
                    {/* Left Content */}
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Available Badge */}
                        <motion.div className="hero-badge" variants={itemVariants}>
                            <span className="badge-dot"></span>
                            <span>AVAILABLE FOR HIRE</span>
                        </motion.div>

                        {/* Huge Title */}
                        <div className="hero-title-container">
                            <motion.h1 className="hero-title" variants={itemVariants}>
                                <span className="block">MERN</span>
                                <span className="block text-gradient-purple">STACK</span>
                                <span className="block flex items-center gap-2">
                                    <Typewriter text="DEV." delay={150} />
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="text-accent inline-block ml-1"
                                    >|</motion.span>
                                </span>
                            </motion.h1>
                        </div>

                        {/* Description */}
                        <motion.p className="hero-description" variants={itemVariants}>
                            I am <span className="text-white font-bold">Kashif</span>. I build accessible, pixel-perfect, performant web
                            experiences using modern architecture.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div className="hero-buttons flex gap-4 mb-10" variants={itemVariants}>
                            <Link to="/projects" className="btn btn-primary">
                                View Projects
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                Contact Me <FiArrowRight />
                            </Link>
                        </motion.div>

                        {/* Social Icons (Minimalist) */}
                        <motion.div className="hero-socials" variants={itemVariants}>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiGithub />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiInstagram />
                            </a>
                            <a href="/contact" className="social-link">
                                <FiMessageSquare />
                            </a>
                            <a href="mailto:contact@example.com" className="social-link">
                                <FiSend />
                            </a>
                            <a href="mailto:contact@example.com" className="social-link">
                                <FiMail />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual (Orbit Animation) */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <OrbitAnimation />
                    </motion.div>
                </div>
            </section>

            <TechStackMarquee />
            <FeaturedProjects />
            <Testimonials />
        </>
    );
};

export default Home;
