import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiLayers, FiCpu, FiArrowDown } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="projects-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="projects-hero">
                <div className="container projects-hero-container">
                    <motion.div
                        className="projects-hero-content text-center"
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
                                <span className="badge-icon">🚀</span>
                                SELECTED WORKS
                            </span>
                        </motion.div>

                        <h1 className="projects-title-massive">
                            <span className="block-text">DIGITAL</span>
                            <span className="block-text text-gradient-purple">CREATIONS</span>
                        </h1>

                        <motion.p
                            className="projects-description mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            A showcase of technical challenges turned into elegant solutions.
                            From concept to deployment, every line of code tells a story.
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

            {/* Featured / Work in Progress Section */}
            <section className="featured-section">
                <div className="featured-bg-watermark">WORK</div>
                <div className="container">
                    <motion.div
                        className="section-header text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-heading">
                            IN THE <span className="text-gradient">LAB</span>
                        </h2>
                        <p className="section-description mx-auto">
                            Currently brewing something exciting. Here's a sneak peek at what's coming next.
                        </p>
                    </motion.div>

                    <motion.div
                        className="featured-project-showcase"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="featured-content">
                            <div className="featured-badge">IN PROGRESS</div>
                            <h3 className="featured-title">E-Commerce Ecosystem</h3>
                            <p className="featured-description">
                                A full-stack shopping platform built for scalability. 
                                Features include real-time inventory management, 
                                secure payment processing with Stripe, and an admin 
                                dashboard for analytics.
                            </p>
                            <div className="tech-stack">
                                <TechBadge icon={<FaReact />} label="React" />
                                <TechBadge icon={<FaNodeJs />} label="Node.js" />
                                <TechBadge icon={<FaDatabase />} label="MongoDB" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Catalog Section */}
            <section className="catalog-section">
                <div className="container">
                    <motion.div
                        className="section-header text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-heading">
                            MORE <span className="text-gradient">PROJECTS</span>
                        </h2>
                        <p className="section-description mx-auto">
                            A collection of projects showcasing different technologies and approaches.
                        </p>
                    </motion.div>

                    <div className="catalog-grid">
                        <ProjectCard
                            title="Coming Soon"
                            description="This project is currently in development. Stay tuned for updates on this exciting new addition to my portfolio."
                            icon="?"
                            tags={["TBD", "TBD", "TBD"]}
                            delay={0.1}
                        />
                        <ProjectCard
                            title="Coming Soon"
                            description="This project is currently in development. Stay tuned for updates on this exciting new addition to my portfolio."
                            icon="?"
                            tags={["TBD", "TBD", "TBD"]}
                            delay={0.2}
                        />
                        <ProjectCard
                            title="Coming Soon"
                            description="This project is currently in development. Stay tuned for updates on this exciting new addition to my portfolio."
                            icon="?"
                            tags={["TBD", "TBD", "TBD"]}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectCard = ({ title, description, icon, tags, delay }) => (
    <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="project-card-inner">
            <div className="project-header">
                <div className="project-icon-wrapper">
                    {typeof icon === 'string' ? (
                        <span className="placeholder-icon">{icon}</span>
                    ) : (
                        icon
                    )}
                </div>
                <div className="card-actions">
                    <button className="action-btn" title="View Code" disabled>
                        <FiGithub />
                    </button>
                    <button className="action-btn" title="Live Demo" disabled>
                        <FiExternalLink />
                    </button>
                </div>
            </div>
            
            <div className="project-content">
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>
            </div>
            
            <div className="project-footer">
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="project-tag">#{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

const TechBadge = ({ icon, label }) => (
    <div className="tech-badge">
        <span className="project-tech-icon">{icon}</span>
        <span className="tech-label">{label}</span>
    </div>
);

export default Projects;
