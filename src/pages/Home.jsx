import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import {
    FaInstagram,
    FaDiscord,
    FaGithub,
    FaWhatsapp,
    FaTelegram
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import OrbitAnimation from '../components/animations/OrbitAnimation';
import TechStackMarquee from '../components/common/TechStackMarquee';
import FeaturedProjects from '../components/common/FeaturedProjects';
import Testimonials from '../components/common/Testimonials';
import ContactForm from '../components/common/ContactForm';
import TimeDisplay from '../components/common/TimeDisplay';
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
                        {/* Available Badge Removed */}
                        <motion.div className="hero-top-row" variants={itemVariants}>
                            <TimeDisplay />
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
                            <a href="https://github.com/mkashif1000" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="https://discord.gg/mDHRVnUR" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaDiscord />
                            </a>
                            <a href="https://www.instagram.com/m_kashyf?igsh=MTBiZ3B6ZWtleWR6aw==" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/923159317678" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaWhatsapp />
                            </a>
                            <a href="https://t.me/Zkashif" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaTelegram />
                            </a>
                            <a href="mailto:mkashif.work@gmail.com" className="social-link">
                                <MdEmail />
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

            {/* Contact Form Section */}
            <section className="section-padding">
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-heading mb-4">
                            LET'S <span className="text-gradient">CONNECT</span>
                        </h2>
                        <p className="text-secondary">
                            Ready to start your next project? Send me a message!
                        </p>
                    </motion.div>
                    <ContactForm />
                </div>
            </section>
        </>
    );
};

export default Home;
