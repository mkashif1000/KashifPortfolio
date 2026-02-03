import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { motion } from 'framer-motion';
import {
    FiSave,
    FiArrowLeft,
    FiImage,
    FiEye,
    FiEyeOff,
    FiStar,
    FiClock
} from 'react-icons/fi';
import './Admin.css';

const CATEGORIES = ['Development', 'Design', 'Career', 'Tutorials'];

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Development',
        image: '',
        readTime: '5 min read',
        featured: false
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFormData({ ...docSnap.data() });
            } else {
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
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

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    const handleContentChange = (e) => {
        const content = e.target.value;
        setFormData(prev => ({
            ...prev,
            content,
            readTime: calculateReadTime(content)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const postData = {
                ...formData,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                updatedAt: serverTimestamp()
            };

            if (isEditing) {
                const docRef = doc(db, 'posts', id);
                await updateDoc(docRef, postData);
            } else {
                postData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'posts'), postData);
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error saving post:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading-page">
                <div className="loading-spinner"></div>
                <p>Loading post...</p>
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
                    <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
                </div>
                <div className="editor-header-right">
                    <button
                        type="button"
                        onClick={() => setPreview(!preview)}
                        className="preview-toggle-btn"
                    >
                        {preview ? <FiEyeOff /> : <FiEye />}
                        {preview ? 'Edit' : 'Preview'}
                    </button>
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
                {preview ? (
                    <motion.div
                        className="preview-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="preview-card">
                            {formData.image && (
                                <img src={formData.image} alt={formData.title} className="preview-image" />
                            )}
                            <div className="preview-meta">
                                <span className="preview-category">{formData.category}</span>
                                <span className="preview-date">{formData.readTime}</span>
                            </div>
                            <h1 className="preview-title">{formData.title || 'Untitled Post'}</h1>
                            <p className="preview-excerpt">{formData.excerpt}</p>
                            <div className="preview-content">
                                {formData.content.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <form className="editor-form" onSubmit={handleSubmit}>
                        <div className="form-main">
                            {/* Title */}
                            <div className="form-group">
                                <label htmlFor="title">Title *</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter post title..."
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
                                    placeholder="post-url-slug"
                                    className="slug-input"
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="form-group">
                                <label htmlFor="excerpt">Excerpt</label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    placeholder="Brief description of your post..."
                                    rows={3}
                                    className="excerpt-input"
                                />
                            </div>

                            {/* Content */}
                            <div className="form-group content-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    placeholder="Write your blog post content here..."
                                    className="content-input"
                                />
                            </div>
                        </div>

                        <div className="form-sidebar">
                            {/* Image URL */}
                            <div className="sidebar-card">
                                <h3><FiImage /> Cover Image</h3>
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

                            {/* Category */}
                            <div className="sidebar-card">
                                <h3>Category</h3>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="category-select"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Read Time */}
                            <div className="sidebar-card">
                                <h3><FiClock /> Read Time</h3>
                                <input
                                    type="text"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    placeholder="5 min read"
                                    className="readtime-input"
                                />
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
                                        <FiStar /> Featured Post
                                    </span>
                                </label>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BlogEditor;
