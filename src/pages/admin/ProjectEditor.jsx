import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { motion } from 'framer-motion';
import {
    FiSave,
    FiArrowLeft,
    FiImage,
    FiGithub,
    FiExternalLink,
    FiTag,
    FiLayers,
    FiCheckCircle,
    FiLoader
} from 'react-icons/fi';
import './Admin.css';

const STATUS_OPTIONS = ['In Progress', 'Completed', 'Maintenance'];

const ProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        githubUrl: '',
        demoUrl: '',
        tags: '',
        status: 'In Progress',
        featured: false
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'projects', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    ...data,
                    tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || ''
                });
            } else {
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Auto-generate slug from title
        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Process tags into array
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '');

            const projectData = {
                ...formData,
                tags: tagsArray,
                updatedAt: serverTimestamp()
            };

            if (isEditing) {
                const docRef = doc(db, 'projects', id);
                await updateDoc(docRef, projectData);
            } else {
                projectData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'projects'), projectData);
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading-page">
                <div className="loading-spinner"></div>
                <p>Loading project...</p>
            </div>
        );
    }

    return (
        <div className="admin-editor">
            <div className="admin-bg">
                <div className="admin-gradient-orb admin-orb-1"></div>
                <div className="admin-gradient-orb admin-orb-2"></div>
            </div>

            {/* Header */}
            <header className="editor-header">
                <div className="editor-header-left">
                    <Link to="/admin/dashboard" className="back-btn">
                        <FiArrowLeft /> Back
                    </Link>
                    <h1>{isEditing ? 'Edit Project' : 'Create New Project'}</h1>
                </div>
                <div className="editor-header-right">
                    <button
                        onClick={handleSubmit}
                        className="save-btn"
                        disabled={saving || !formData.title}
                    >
                        {saving ? (
                            <span className="btn-loading">
                                <span className="loading-dot"></span>
                                <span className="loading-dot"></span>
                                <span className="loading-dot"></span>
                            </span>
                        ) : (
                            <>
                                <FiSave /> {isEditing ? 'Update' : 'Publish'}
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Editor Content */}
            <div className="editor-content">
                <form className="editor-form" onSubmit={handleSubmit}>
                    <div className="form-main">
                        {/* Title */}
                        <div className="form-group">
                            <label htmlFor="title">Project Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter project title..."
                                className="title-input"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div className="form-group">
                            <label htmlFor="slug">Slug</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="project-url-slug"
                                className="slug-input"
                            />
                        </div>

                        {/* Excerpt */}
                        <div className="form-group">
                            <label htmlFor="excerpt">Short Description</label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Brief summary for cards..."
                                rows={3}
                                className="excerpt-input"
                            />
                        </div>

                        {/* Content */}
                        <div className="form-group content-group">
                            <label htmlFor="content">Detailed Description</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Full project details, challenges, solutions..."
                                className="content-input"
                                style={{ minHeight: '300px' }}
                            />
                        </div>
                    </div>

                    <div className="form-sidebar">
                        {/* Status */}
                        <div className="sidebar-card">
                            <h3><FiCheckCircle /> Status</h3>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="category-select"
                            >
                                {STATUS_OPTIONS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* Featured Toggle */}
                        <div className="sidebar-card featured-card">
                            <label className="featured-toggle">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                />
                                <span className="toggle-slider"></span>
                                <span className="toggle-label">
                                    <FiCheckCircle /> Pin to "In the Lab" / Featured
                                </span>
                            </label>
                        </div>

                        {/* Image URL */}
                        <div className="sidebar-card">
                            <h3><FiImage /> Project Image</h3>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="image-input"
                            />
                            {formData.image && (
                                <div className="image-preview">
                                    <img src={formData.image} alt="Preview" />
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="sidebar-card">
                            <h3><FiGithub /> Repository</h3>
                            <input
                                type="url"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                placeholder="GitHub URL..."
                                className="image-input"
                            />
                        </div>

                        <div className="sidebar-card">
                            <h3><FiExternalLink /> Live Demo</h3>
                            <input
                                type="url"
                                name="demoUrl"
                                value={formData.demoUrl}
                                onChange={handleChange}
                                placeholder="Live link..."
                                className="image-input"
                            />
                        </div>

                        {/* Tags */}
                        <div className="sidebar-card">
                            <h3><FiTag /> Tech Stack</h3>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="React, Node.js, Firebase..."
                                className="image-input"
                            />
                            <p className="help-text">Comma separated values</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectEditor;
