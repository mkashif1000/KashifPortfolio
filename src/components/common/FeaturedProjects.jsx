import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight, FiShoppingCart, FiMessageSquare, FiBarChart2, FiCode, FiLayers, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
    // Get only marked featured projects or first 3
    const featured = projectsData.filter(p => p.featured).slice(0, 3);

    // Helper to get icon based on category or title
    const getProjectIcon = (project) => {
        const category = project.category?.toLowerCase() || "";
        const title = project.title?.toLowerCase() || "";

        if (category.includes("ecommerce") || title.includes("shop") || title.includes("commerce")) return <FiShoppingCart />;
        if (category.includes("chat") || title.includes("chat") || title.includes("message")) return <FiMessageSquare />;
        if (category.includes("analytics") || title.includes("dashboard") || title.includes("data")) return <FiBarChart2 />;
        if (category.includes("full stack")) return <FiLayers />;
        if (category.includes("realtime")) return <FiCpu />;

        return <FiCode />; // Default
    };

    return (
        <section className="featured-projects section">
            {/* Watermark Background */}
            <div className="featured-bg-watermark">FEATURED</div>

            <div className="container relative z-10">
                {/* Centered Header */}
                <div className="section-header text-center mb-16">
                    <span className="section-subtitle">Portfolio</span>
                    <h2 className="section-heading">
                        SELECTED <span className="text-gradient">WORKS</span>
                    </h2>
                </div>

                <div className="featured-grid mb-12">
                    {featured.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            icon={getProjectIcon(project)}
                            tags={project.tags}
                            delay={index * 0.1}
                            links={project.links}
                        />
                    ))}
                </div>

                {/* Centered Button at Bottom */}
                <div className="text-center">
                    <Link to="/projects" className="btn btn-secondary btn-lg group">
                        <span>View All Projects</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ title, description, icon, tags, delay, links }) => (
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
                    {icon}
                </div>
                <div className="card-actions">
                    <a href={links?.github} target="_blank" rel="noopener noreferrer" className="action-btn" title="View Code">
                        <FiGithub />
                    </a>
                    <a href={links?.demo} target="_blank" rel="noopener noreferrer" className="action-btn" title="Live Demo">
                        <FiExternalLink />
                    </a>
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

export default FeaturedProjects;
