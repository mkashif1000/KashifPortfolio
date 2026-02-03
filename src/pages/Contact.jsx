import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    FiMail,
    FiUser,
    FiMessageSquare,
    FiSend,
    FiMapPin,
    FiCheck,
    FiArrowDown,
    FiGlobe,
    FiSmartphone,
    FiAlertCircle
} from 'react-icons/fi';
import {
    FaInstagram,
    FaXTwitter,
    FaGithub,
    FaWhatsapp,
    FaTelegram,
    FaLinkedinIn
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import './Contact.css';

const socialLinks = [
    {
        id: 'github',
        name: 'GitHub',
        icon: FaGithub,
        url: 'https://github.com/your-username',
        color: '#2b3137',
        handle: 'your-username'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: FaLinkedinIn,
        url: 'https://linkedin.com/in/your-username',
        color: '#0077b5',
        handle: 'your-username'
    },
    {
        id: 'twitter',
        name: 'Twitter / X',
        icon: FaXTwitter,
        url: 'https://twitter.com/your-username',
        color: '#1DA1F2',
        handle: '@your-username'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: FaInstagram,
        url: 'https://instagram.com/your-username',
        color: '#E4405F',
        handle: '@your-username'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: FaWhatsapp,
        url: 'https://wa.me/923001234567',
        color: '#25D366',
        handle: '+92 300 1234567'
    },
    {
        id: 'email',
        name: 'Email',
        icon: MdEmail,
        url: 'mailto:your-email@example.com',
        color: '#EA4335',
        handle: 'your-email@example.com'
    }
];

const Contact = () => {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // EmailJS configuration from environment variables
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // Check if EmailJS is configured
        if (!serviceId || !templateId || !publicKey) {
            setError('Email service is not configured. Please contact via social links.');
            setIsSubmitting(false);
            return;
        }

        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset after showing success
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 3000);
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Failed to send message. Please try again or contact via social links.');
            setIsSubmitting(false);
        }
    };

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
                            <motion.div
                                className="glass-form-container"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <div className="form-header">
                                    <h3>Send a Message</h3>
                                    <p>I usually respond within 24 hours.</p>
                                </div>

                                {isSubmitted ? (
                                    <motion.div
                                        className="success-message-container"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="success-icon-large">
                                            <FiCheck />
                                        </div>
                                        <h4>Message Sent!</h4>
                                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                                        <button
                                            className="btn-reset"
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form-modern">
                                        {error && (
                                            <motion.div
                                                className="form-error-message"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <FiAlertCircle />
                                                <span>{error}</span>
                                            </motion.div>
                                        )}
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <div className="input-group-modern">
                                                    <FiUser className="input-icon-modern" />
                                                    <input
                                                        type="text"
                                                        name="from_name"
                                                        placeholder="Your name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <div className="input-group-modern">
                                                    <FiMail className="input-icon-modern" />
                                                    <input
                                                        type="email"
                                                        name="from_email"
                                                        placeholder="your@email.com"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Subject</label>
                                            <div className="input-group-modern">
                                                <FiMessageSquare className="input-icon-modern" />
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Project inquiry..."
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Message</label>
                                            <div className="input-group-modern textarea-group">
                                                <textarea
                                                    name="message"
                                                    placeholder="Tell me about your project..."
                                                    rows="5"
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            className="btn-submit-modern"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isSubmitting ? (
                                                <span className="loading-spinner"></span>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <FiSend />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
