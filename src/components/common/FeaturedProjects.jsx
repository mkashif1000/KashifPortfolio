
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight, FiShoppingCart, FiMessageSquare, FiBarChart2, FiCode, FiLayers, FiCpu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async () => {
        try {
            // Fetch projects where selectedWork == true
            // Removed orderBy to avoid missing index errors. We sort client-side.
            const q = query(
                collection(db, 'projects'),
                where('selectedWork', '==', true),
                limit(10)
            );

            const snapshot = await getDocs(q);
            const projects = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Client-side sort by createdAt desc
            projects.sort((a, b) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });

            setFeatured(projects.slice(0, 3));
        } catch (error) {
            console.error("Error fetching featured projects:", error);
            setFeatured([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper to get icon based on category or title (simplified fallback)
    const getProjectIcon = (project) => {
        const title = project.title?.toLowerCase() || "";
        const tags = Array.isArray(project.tags) ? project.tags.join(" ").toLowerCase() : "";

        if (title.includes("commerce") || tags.includes("shop")) return <FiShoppingCart />;
        if (title.includes("chat") || tags.includes("socket")) return <FiMessageSquare />;
        if (title.includes("dashboard") || tags.includes("analytics")) return <FiBarChart2 />;
        return <FiCode />;
    };

    if (loading) return (
        <section className="featured-projects section">
            <div className="container text-center py-20">
                <div className="loading-spinner mx-auto"></div>
            </div>
        </section>
    );

    // If no projects, show a placeholder so the user knows to add them
    if (featured.length === 0) {
        return (
            <section className="featured-projects section">
                <div className="featured-bg-watermark">FEATURED</div>
                <div className="container relative z-10">
                    <div className="section-header text-center mb-16">
                        <span className="section-subtitle">Portfolio</span>
                        <h2 className="section-heading">
                            SELECTED <span className="text-gradient">WORKS</span>
                        </h2>
                    </div>
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm mx-auto max-w-2xl">
                        <FiLayers className="text-4xl text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Selected Works Yet</h3>
                        <p className="text-gray-400 max-w-md mx-auto mb-6">
                            Go to the Admin Dashboard and toggle "Show on Home Page" on your projects to display them here.
                        </p>
                        <Link to="/admin/dashboard" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                            Go to Admin Panel
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

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
                            id={project.id}
                            title={project.title}
                            description={project.excerpt || project.content?.substring(0, 100) + "..."}
                            icon={getProjectIcon(project)}
                            tags={project.tags || []}
                            delay={index * 0.1}
                            links={{ github: project.githubUrl, demo: project.demoUrl }}
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



const ProjectCard = ({ id, title, description, icon, tags, delay, links }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ delay, duration: 0.5 }}
            onClick={() => navigate(`/projects/${id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="project-card-inner">
                <div className="project-header">
                    <div className="project-icon-wrapper">
                        {icon}
                    </div>
                    <div className="card-actions">
                        <a href={links?.github} target="_blank" rel="noopener noreferrer" className="action-btn" title="View Code" onClick={(e) => e.stopPropagation()}>
                            <FiGithub />
                        </a>
                        <a href={links?.demo} target="_blank" rel="noopener noreferrer" className="action-btn" title="Live Demo" onClick={(e) => e.stopPropagation()}>
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
};

export default FeaturedProjects;
