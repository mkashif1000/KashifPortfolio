import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import { testimonialsData } from '../../data/testimonials';
import './Testimonials.css';

const Testimonials = () => {
    return (
        <section className="testimonials-section section">
            {/* Ambient background elements */}
            <div className="testimonials-bg">
                <div className="bg-blur bg-blur-1" />
                <div className="bg-blur bg-blur-2" />
            </div>

            <div className="container relative z-10">
                <div className="section-title">
                    <span className="section-subtitle">Testimonials</span>
                    <h2 className="section-heading">What <span className="text-gradient">People Say</span></h2>
                    <p className="section-description">
                        Feedback from clients and collaborators I've had the pleasure of working with.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="testimonial-glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="testimonial-header">
                                <div className="author-avatar-wrapper">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="author-avatar"
                                    />
                                    <div className="quote-icon-badge">
                                        <FaQuoteRight />
                                    </div>
                                </div>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="star-icon" />
                                    ))}
                                </div>
                            </div>

                            <p className="testimonial-content">
                                "{testimonial.content}"
                            </p>

                            <div className="testimonial-footer">
                                <h4 className="author-name">{testimonial.name}</h4>
                                <span className="author-role">{testimonial.role}, {testimonial.company}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
