import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
    FiMessageSquare,
    FiMapPin,
    FiGlobe
} from 'react-icons/fi';
import {
    FaInstagram,
    FaDiscord,
    FaGithub,
    FaWhatsapp,
    FaTelegram
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import ContactForm from '../components/common/ContactForm';
import './Contact.css';

const socialLinks = [
    {
        id: 'github',
        name: 'GitHub',
        icon: FaGithub,
        url: 'https://github.com/mkashif1000',
        color: '#2b3137',
        handle: 'mkashif1000'
    },
    {
        id: 'discord',
        name: 'Discord',
        icon: FaDiscord,
        url: 'https://discord.gg/mDHRVnUR',
        color: '#5865F2',
        handle: 'Join Server'
    },
    {
        id: 'telegram',
        name: 'Telegram',
        icon: FaTelegram,
        url: 'https://t.me/Zkashif',
        color: '#0088CC',
        handle: '@Zkashif'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: FaInstagram,
        url: 'https://www.instagram.com/m_kashyf?igsh=MTBiZ3B6ZWtleWR6aw==',
        color: '#E4405F',
        handle: '@m_kashyf'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: FaWhatsapp,
        url: 'https://wa.me/923159317678',
        color: '#25D366',
        handle: '+92 315 9317678'
    },
    {
        id: 'email',
        name: 'Email',
        icon: MdEmail,
        url: 'mailto:mkashif.work@gmail.com',
        color: '#EA4335',
        handle: 'mkashif.work@gmail.com'
    }
];

const Contact = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div className="contact-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container contact-hero-container">
                    <motion.div
                        className="contact-hero-content text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="hero-badge-wrapper"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="hero-pill-badge">
                                <span className="badge-icon"><FiMessageSquare /></span>
                                SAY HELLO
                            </span>
                        </motion.div>

                        <h1 className="contact-title-massive">
                            <span className="block-text">LET'S WORK</span>
                            <span className="block-text text-gradient-purple">TOGETHER</span>
                        </h1>

                        <motion.p
                            className="contact-description mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Have a project in mind? Want to collaborate or just say hi?
                            Drop me a message and let's create something amazing.
                        </motion.p>
                    </motion.div>

                    {/* Scroll Down Arrow Removed */}
                </div>

                {/* Background ambient glow */}
                <div className="hero-glow"></div>
            </section>

            {/* Main Content Section */}
            <section className="contact-content-section">
                <div className="contact-bg-watermark">CONTACT</div>
                <div className="container">
                    <div className="contact-grid">

                        {/* Left Column: Contact Info & Socials */}
                        <div className="contact-info-column">
                            <motion.div
                                className="info-cards-stack"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {/* Location Card */}
                                <div className="glass-info-card">
                                    <div className="info-icon-wrapper">
                                        <FiMapPin />
                                    </div>
                                    <div className="info-text">
                                        <h3>Location</h3>
                                        <p>Pakistan</p>
                                    </div>
                                </div>

                                {/* Availability Card */}
                                <div className="glass-info-card">
                                    <div className="info-icon-wrapper availability-icon">
                                        <FiGlobe />
                                    </div>
                                    <div className="info-text">
                                        <h3>Availability</h3>
                                        <p>Open for freelance projects</p>
                                    </div>
                                </div>

                                {/* Social Links Grid */}
                                <div className="social-links-grid">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon;
                                        return (
                                            <motion.a
                                                key={social.id}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-btn-glass"
                                                style={{ '--hover-color': social.color }}
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * index }}
                                                title={social.name}
                                            >
                                                <Icon />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="contact-form-column">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
