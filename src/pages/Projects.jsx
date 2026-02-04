import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FiGithub, FiExternalLink, FiCode, FiLayers, FiCpu, FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const containerRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const projectsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const featuredProjects = projects.filter(p => p.status === 'In Progress' || p.featured === true);
    const catalogProjects = projects.filter(p => p.status !== 'In Progress' && !p.featured);

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

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : featuredProjects.length > 0 ? (
                        featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="featured-project-showcase mb-20"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                onClick={() => navigate(`/projects/${project.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="featured-content">
                                    <div className="featured-badge">{project.status}</div>
                                    <h3 className="featured-title">{project.title}</h3>
                                    <p className="featured-description">
                                        {project.excerpt || project.content?.substring(0, 150) + '...'}
                                    </p>
                                    <div className="tech-stack">
                                        {project.tags && project.tags.slice(0, 4).map((tag, i) => (
                                            <TechBadge key={i} label={tag} />
                                        ))}
                                    </div>
                                    <div className="mt-8 flex gap-4">
                                        <Link to={`/projects/${project.id}`} className="view-details-btn">
                                            View Details <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                                {project.image && (
                                    <div className="featured-image-wrapper">
                                        <img src={project.image} alt={project.title} className="featured-image" />
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            <p>No featured projects at the moment.</p>
                        </div>
                    )}
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
                        {loading ? (
                            <p>Loading projects...</p>
                        ) : catalogProjects.length > 0 ? (
                            catalogProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    description={project.excerpt}
                                    image={project.image}
                                    tags={project.tags || []}
                                    githubUrl={project.githubUrl}
                                    demoUrl={project.demoUrl}
                                    delay={index * 0.1}
                                />
                            ))
                        ) : (
                            <ProjectCard
                                title="More Coming Soon"
                                description="I'm constantly building new things. Check back soon for more projects!"
                                icon="?"
                                tags={["Future", "Code", "Art"]}
                                delay={0.1}
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectCard = ({ id, title, description, image, icon, tags, githubUrl, demoUrl, delay }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ delay, duration: 0.5 }}
            onClick={() => id && navigate(`/projects/${id}`)}
            style={{ cursor: id ? 'pointer' : 'default' }}
        >
            <div className="project-card-inner">
                {image ? (
                    <div className="project-card-image">
                        <img src={image} alt={title} />
                    </div>
                ) : (
                    <div className="project-header">
                        <div className="project-icon-wrapper">
                            {icon || <FiCode />}
                        </div>
                    </div>
                )}

                <div className="project-content">
                    <h3 className="project-title">{title}</h3>
                    <p className="project-description text-sm">{description}</p>
                </div>

                <div className="project-footer">
                    <div className="project-tags">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="project-tag">#{tag}</span>
                        ))}
                    </div>

                    <div className="card-actions-row">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="icon-link">
                                <FiGithub />
                            </a>
                        )}
                        {demoUrl && (
                            <a href={demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="icon-link">
                                <FiExternalLink />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TechBadge = ({ label }) => (
    <div className="tech-badge">
        <span className="tech-label">{label}</span>
    </div>
);

export default Projects;
