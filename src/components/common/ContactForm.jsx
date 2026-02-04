import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMail,
    FiUser,
    FiMessageSquare,
    FiSend,
    FiCheck,
    FiAlertCircle
} from 'react-icons/fi';
import '../../pages/Contact.css';

const ContactForm = () => {
    const formRef = useRef(null);
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
    );
};

export default ContactForm;
