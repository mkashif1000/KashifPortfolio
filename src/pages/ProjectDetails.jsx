import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiLayers, FiCheckCircle, FiTag } from 'react-icons/fi';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'projects', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProject({ id: docSnap.id, ...docSnap.data() });
            } else {
                navigate('/projects');
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="project-details-loading">
                <div className="loading-spinner"></div>
                <p>Loading project details...</p>
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="project-details-page">
            <div className="project-details-bg">
                <div className="hero-glow"></div>
            </div>

            <div className="container">
                <Link to="/projects" className="back-link">
                    <FiArrowLeft /> Back to Projects
                </Link>

                <motion.div
                    className="project-details-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="project-meta-badges">
                        <span className={`status-badge ${project.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                            {project.status === 'Completed' ? <FiCheckCircle /> : <FiLayers />}
                            {project.status}
                        </span>
                        {project.featured && <span className="featured-badge">Featured</span>}
                    </div>

                    <h1 className="project-details-title">{project.title}</h1>
                    <p className="project-details-excerpt">{project.excerpt}</p>

                    <div className="project-links">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link-btn"
                            >
                                <FiGithub /> View Code
                            </a>
                        )}
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link-btn primary"
                            >
                                <FiExternalLink /> Live Demo
                            </a>
                        )}
                    </div>
                </motion.div>

                {project.image && (
                    <motion.div
                        className="project-hero-image-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <img src={project.image} alt={project.title} className="project-hero-image" />
                    </motion.div>
                )}

                <div className="project-details-content-grid">
                    <motion.div
                        className="project-main-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2>About the Project</h2>
                        <div className="project-markdown">
                            {project.content ? (
                                project.content.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (
                                <p>No detailed description provided.</p>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        className="project-sidebar"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="sidebar-section">
                            <h3>Tech Stack</h3>
                            <div className="tech-tags-cloud">
                                {project.tags && project.tags.length > 0 ? (
                                    project.tags.map((tag, index) => (
                                        <span key={index} className="tech-tag">
                                            <FiTag className="tag-icon" /> {tag}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray">No tags defined</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
