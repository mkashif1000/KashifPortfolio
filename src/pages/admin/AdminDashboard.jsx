import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiLogOut,
    FiEye,
    FiCalendar,
    FiTag,
    FiFileText,
    FiSearch,
    FiCheckCircle, // Added
    FiLayers // Added
} from 'react-icons/fi';
import './Admin.css';

const AdminDashboard = () => {
    const [viewMode, setViewMode] = useState('posts'); // 'posts' or 'projects'
    const [posts, setPosts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (viewMode === 'posts') {
            fetchPosts();
        } else {
            fetchProjects();
        }
    }, [viewMode]);

    const fetchPosts = async () => {
        try {
            const postsQuery = query(
                collection(db, 'posts'),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(postsQuery);
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const projectsQuery = query(
                collection(db, 'projects'),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(projectsQuery);
            const projectsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const collectionName = viewMode === 'posts' ? 'posts' : 'projects';
            await deleteDoc(doc(db, collectionName, itemId));

            if (viewMode === 'posts') {
                setPosts(posts.filter(post => post.id !== itemId));
            } else {
                setProjects(projects.filter(project => project.id !== itemId));
            }
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin');
    };

    const filteredItems = viewMode === 'posts'
        ? posts.filter(post =>
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : projects.filter(project =>
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    const stats = {
        total: posts.length,
        featured: posts.filter(p => p.featured).length,
        categories: [...new Set(posts.map(p => p.category))].length
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-bg">
                <div className="admin-gradient-orb admin-orb-1"></div>
                <div className="admin-gradient-orb admin-orb-2"></div>
            </div>

            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-left">
                    <h1>Admin Dashboard</h1>
                    <div className="view-toggles">
                        <button
                            className={`view-toggle ${viewMode === 'posts' ? 'active' : ''}`}
                            onClick={() => setViewMode('posts')}
                        >
                            <FiFileText /> Blog Posts
                        </button>
                        <button
                            className={`view-toggle ${viewMode === 'projects' ? 'active' : ''}`}
                            onClick={() => setViewMode('projects')}
                        >
                            <FiLayers /> Projects
                        </button>
                    </div>
                </div>
                <div className="admin-header-right">
                    <Link to="/" className="admin-view-site-btn">
                        <FiEye /> View Site
                    </Link>
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <FiLogOut /> Logout
                    </button>
                </div>
            </header>

            {/* Stats */}
            {viewMode === 'posts' ? (
                /* Blog Stats */
                <div className="admin-stats">
                    <div className="stat-card">
                        <FiFileText className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.total}</span>
                            <span className="stat-label">Total Posts</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FiTag className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.categories}</span>
                            <span className="stat-label">Categories</span>
                        </div>
                    </div>
                    <div className="stat-card featured">
                        <span className="stat-value">{stats.featured}</span>
                        <span className="stat-label">Featured</span>
                    </div>
                </div>
            ) : (
                /* Project Stats */
                <div className="admin-stats">
                    <div className="stat-card">
                        <FiLayers className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{projects.length}</span>
                            <span className="stat-label">Total Projects</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FiCheckCircle className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{projects.filter(p => p.status === 'Completed').length}</span>
                            <span className="stat-label">Completed</span>
                        </div>
                    </div>
                    <div className="stat-card featured">
                        <div className="stat-info">
                            <span className="stat-value">{projects.filter(p => p.status === 'In Progress').length}</span>
                            <span className="stat-label">In Progress</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions Bar */}
            <div className="admin-actions-bar">
                <div className="admin-search-wrapper">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="admin-search-input"
                    />
                </div>
                <Link
                    to={viewMode === 'posts' ? "/admin/editor" : "/admin/project-editor"}
                    className="admin-create-btn"
                >
                    <FiPlus /> {viewMode === 'posts' ? 'New Post' : 'New Project'}
                </Link>
            </div>

            <div className="admin-posts-container">
                {loading ? (
                    <div className="admin-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading {viewMode}...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="admin-empty">
                        <FiFileText size={48} />
                        <h3>No {viewMode} yet</h3>
                        <p>Create your first {viewMode === 'posts' ? 'blog post' : 'project'} to get started</p>
                        <Link
                            to={viewMode === 'posts' ? "/admin/editor" : "/admin/project-editor"}
                            className="admin-create-btn"
                        >
                            <FiPlus /> Create {viewMode === 'posts' ? 'Post' : 'Project'}
                        </Link>
                    </div>
                ) : (
                    <div className="admin-posts-list">
                        <AnimatePresence>
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="admin-post-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="post-item-image">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} />
                                        ) : (
                                            <div className="post-item-placeholder">
                                                {viewMode === 'posts' ? <FiFileText /> : <FiLayers />}
                                            </div>
                                        )}
                                    </div>

                                    <div className="post-item-content">
                                        <div className="post-item-header">
                                            <h3>{item.title}</h3>
                                            {item.featured && <span className="featured-badge">Featured</span>}
                                        </div>
                                        <p className="post-item-excerpt">{item.excerpt}</p>
                                        <div className="post-item-meta">
                                            {viewMode === 'posts' ? (
                                                <>
                                                    <span>
                                                        <FiCalendar /> {item.date || 'No date'}
                                                    </span>
                                                    <span>
                                                        <FiTag /> {item.category || 'Uncategorized'}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>
                                                        <FiCheckCircle /> {item.status}
                                                    </span>
                                                    <span>
                                                        <FiTag /> {item.tags && item.tags.length > 0 ? `${item.tags.length} tags` : 'No tags'}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="post-item-actions">
                                        <Link
                                            to={viewMode === 'posts' ? `/admin/editor/${item.id}` : `/admin/project-editor/${item.id}`}
                                            className="action-btn edit"
                                            title="Edit"
                                        >
                                            <FiEdit2 />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteConfirm(item.id)}
                                            className="action-btn delete"
                                            title="Delete"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>

                                    {/* Delete Confirmation */}
                                    {deleteConfirm === item.id && (
                                        <motion.div
                                            className="delete-confirm-overlay"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="delete-confirm-content">
                                                <p>Delete this {viewMode === 'posts' ? 'post' : 'project'}?</p>
                                                <div className="delete-confirm-actions">
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="cancel-btn"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="confirm-delete-btn"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
