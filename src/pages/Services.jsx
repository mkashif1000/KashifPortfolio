import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiArrowDown, FiCheck, FiBriefcase, FiGlobe, FiServer, FiShoppingCart, FiLink } from 'react-icons/fi';
import { FaReact, FaPalette } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import './Services.css';

const Services = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const getIcon = (iconType) => {
        const iconMap = {
            globe: <FiGlobe />,
            react: <FaReact />,
            server: <FiServer />,
            shopping: <FiShoppingCart />,
            link: <FiLink />,
            palette: <FaPalette />
        };
        return iconMap[iconType] || <FiGlobe />;
    };

    return (
        <div className="services-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="services-hero">
                <div className="container services-hero-container">
                    <motion.div
                        className="services-hero-content text-center"
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
                                <FiBriefcase className="badge-icon" />
                                WHAT I OFFER
                            </span>
                        </motion.div>

                        <h1 className="services-title-massive">
                            <span className="block-text">DIGITAL</span>
                            <span className="block-text text-gradient-purple">SERVICES</span>
                        </h1>

                        <motion.p
                            className="services-description mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            From concept to deployment, I deliver comprehensive web solutions 
                            that drive results and exceed expectations.
                        </motion.p>
                    </motion.div>

                    {/* Scroll Down Arrow */}
                    <motion.div
                        className="scroll-down-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 1, duration: 1 },
                            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        <FiArrowDown className="scroll-icon" />
                    </motion.div>
                </div>

                {/* Background ambient glow */}
                <div className="hero-glow"></div>
            </section>

            {/* Services Grid Section */}
            <section className="services-grid-section">
                <div className="services-bg-watermark">SERVICES</div>
                <div className="container">
                    <motion.div
                        className="section-header text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-heading">
                            MY <span className="text-gradient">EXPERTISE</span>
                        </h2>
                        <p className="section-description mx-auto">
                            Comprehensive web development services designed to bring your vision to life
                        </p>
                    </motion.div>

                    <div className="services-grid">
                        {servicesData.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                getIcon={getIcon}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-contact">
                <div className="contact-bg-watermark">CONTACT</div>
                <div className="contact-glow"></div>
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-heading mb-8">
                            READY TO <span className="text-gradient">START?</span>
                        </h2>
                        <p className="contact-text mx-auto">
                            Let's discuss your project and create something amazing together.
                            I'm here to turn your ideas into reality.
                        </p>
                        <motion.a
                            href="/contact"
                            className="btn-large"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="btn-text">Start Your Project</span>
                            <FiArrowRight className="btn-icon" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ service, index, getIcon }) => (
    <motion.div
        className="service-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
    >
        <div className="service-icon">{getIcon(service.iconType)}</div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-content">{service.description}</p>
        
        <ul className="service-features">
            {service.features.map((feature, idx) => (
                <li key={idx} className="feature-item">
                    <FiCheck className="feature-check" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <Link to="/contact" className="service-link">
            <span>Get Started</span>
            <FiArrowRight />
        </Link>
    </motion.div>
);

export default Services;
