import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { navLinks } from '../../data/socialLinks';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: 20 },
        open: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3
            }
        })
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <NavLink to="/" className="navbar-logo">
                    <motion.span
                        className="logo-text"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="logo-name">KASHIF<span className="logo-dot">.</span></span>
                    </motion.span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="navbar-links hide-mobile">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 + 0.2 }}
                            >
                                {link.name}
                            </motion.span>
                        </NavLink>
                    ))}
                </div>

                {/* Right Section */}
                <div className="navbar-right">
                    <ThemeToggle />

                    <motion.a
                        href="/cv/Kashif_CV.pdf"
                        download
                        className="btn btn-cv hide-mobile"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiDownload />
                        <span>Download CV</span>
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn show-mobile-only"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="mobile-menu"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                        >
                            <div className="mobile-menu-content">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        custom={index}
                                        variants={linkVariants}
                                    >
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                                        >
                                            {link.name}
                                        </NavLink>
                                    </motion.div>
                                ))}

                                <motion.a
                                    href="/cv/Kashif_CV.pdf"
                                    download
                                    className="btn btn-primary cv-btn-mobile"
                                    custom={navLinks.length}
                                    variants={linkVariants}
                                >
                                    <FiDownload />
                                    <span>Download CV</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
