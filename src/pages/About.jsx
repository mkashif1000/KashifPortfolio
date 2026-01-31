
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMapPin, FiAward, FiCode, FiCoffee, FiArrowRight, FiDownload, FiArrowDown } from 'react-icons/fi';
import { FaLaptopCode, FaServer, FaMobileAlt, FaRocket } from 'react-icons/fa';
import './About.css';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="about-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container about-hero-container">
                    <motion.div
                        className="about-hero-content text-center"
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
                                <span className="badge-icon">👤</span>
                                THE PERSON BEHIND THE CODE
                            </span>
                        </motion.div>

                        <h1 className="about-title-massive">
                            <span className="block-text">MORE THAN</span>
                            <span className="block-text text-gradient-purple">JUST CODE</span>
                        </h1>

                        <motion.p
                            className="about-description mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            I'm Kashif, a creative developer who believes that great software is
                            born where engineering meets art.
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

            {/* Who Am I Section */}
            <section className="about-bio-section">
                <div className="bio-bg-watermark">ABOUT</div>
                <div className="container">
                    <motion.div
                        className="bio-content mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-heading mb-6">
                            WHO <span className="text-gradient">AM I?</span>
                        </h2>
                        <p className="bio-text">
                            I'm a <strong className="text-white">Full Stack Developer</strong> based in Pakistan with a passion for building
                            digital solutions that make a difference. With a deep understanding of the <strong className="text-white">MERN stack</strong>,
                            I bridge the gap between <strong className="text-white">complex back-end logic</strong> and <strong className="text-white">intuitive front-end design</strong>.
                            My journey is driven by a relentless curiosity and a desire to create software that matters.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="stats-banner">
                <div className="container">
                    <div className="stats-grid">
                        <StatItem number="1+" label="Years Experience" delay={0} />
                        <StatItem number="50k+" label="Lines of Code Written" delay={0.2} />
                    </div>
                </div>
            </section>

            {/* My Story Section */}
            <section id="story" className="section story-section">
                <div className="story-bg-watermark">JOURNEY</div>
                <div className="container">
                    <motion.div
                        className="section-header text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-heading">
                            MY <span className="text-gradient">STORY</span>
                        </h2>
                        <p className="section-description mx-auto">
                            The journey of a thousand lines of code began with a single <span className="text-white font-mono">Hello World</span>.
                        </p>
                    </motion.div>

                    <div className="story-grid">
                        <StoryCard
                            title="The Beginning"
                            icon={<FaRocket />}
                            content="My journey into the world of tech started with a simple curiosity about how the web works. That curiosity quickly turned into a passion for building things that live on the internet."
                            delay={0.1}
                        />
                        <StoryCard
                            title="The Vision"
                            icon={<FiCode />}
                            content="I believe in writing clean, maintainable code that solves real-world problems. My goal is to create digital products that not only function perfectly but also delight users."
                            delay={0.2}
                        />
                        <StoryCard
                            title="The Tech"
                            icon={<FaLaptopCode />}
                            content="Specializing in the MERN stack (MongoDB, Express, React, Node.js), I build full-stack applications that are scalable, secure, and responsive across all devices."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Get in Touch CTA */}
            <section className="about-contact">
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
                            READY TO <span className="text-gradient">CREATE?</span>
                        </h2>
                        <p className="contact-text mx-auto">
                            Whether you have a project in mind or just want to say hi, I'm always open to new ideas and opportunities.
                        </p>
                        <motion.a
                            href="mailto:kashif@example.com"
                            className="btn-large"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="btn-text">Let's Talk</span>
                            <FiArrowRight className="btn-icon" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const StatItem = ({ number, label, delay }) => (
    <motion.div
        className="stat-item"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <span className="stat-number text-gradient">{number}</span>
        <span className="stat-label">{label}</span>
        <div className="stat-glow" />
    </motion.div>
);

const StoryCard = ({ title, icon, content, delay }) => (
    <motion.div
        className="story-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="story-icon">{icon}</div>
        <h3 className="story-title">{title}</h3>
        <p className="story-content">{content}</p>
    </motion.div>
);

export default About;
