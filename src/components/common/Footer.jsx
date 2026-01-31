import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaInstagram,
    FaXTwitter,
    FaGithub,
    FaWhatsapp,
    FaTelegram
} from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FiHeart } from 'react-icons/fi';
import { navLinks } from '../../data/socialLinks';
import './Footer.css';

const socialIcons = {
    instagram: FaInstagram,
    twitter: FaXTwitter,
    github: FaGithub,
    whatsapp: FaWhatsapp,
    telegram: FaTelegram,
    email: MdEmail
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { id: 'instagram', url: 'https://instagram.com/your-username', color: '#E4405F' },
        { id: 'twitter', url: 'https://twitter.com/your-username', color: '#1DA1F2' },
        { id: 'github', url: 'https://github.com/your-username', color: '#6e5494' },
        { id: 'whatsapp', url: 'https://wa.me/923001234567', color: '#25D366' },
        { id: 'telegram', url: 'https://t.me/your-username', color: '#0088CC' },
        { id: 'email', url: 'mailto:your-email@example.com', color: '#EA4335' }
    ];

    return (
        <footer className="footer">
            <div className="footer-content container">
                {/* Top Section */}
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-name">KASHIF<span className="logo-dot">.</span></span>
                        </Link>
                        <p className="footer-tagline">
                            MERN Stack Developer crafting digital experiences with passion and precision.
                        </p>
                        <div className="footer-location">
                            <MdLocationOn />
                            <span>Pakistan</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            {navLinks.slice(0, 4).map(link => (
                                <li key={link.path}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Explore</h4>
                        <ul className="footer-links">
                            {navLinks.slice(4).map(link => (
                                <li key={link.path}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Let's Connect</h4>
                        <div className="footer-socials">
                            {socialLinks.map((social, index) => {
                                const Icon = socialIcons[social.id];
                                return (
                                    <motion.a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-link"
                                        style={{ '--social-color': social.color }}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Icon />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider" />

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Kashif. All rights reserved.
                    </p>
                    <p className="footer-made-with">
                        Made with <FiHeart className="heart-icon" /> using React
                    </p>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="footer-decoration">
                <div className="footer-gradient" />
            </div>
        </footer>
    );
};

export default Footer;
