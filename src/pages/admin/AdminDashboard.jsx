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
    FiSearch
} from 'react-icons/fi';
import './Admin.css';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

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

    const handleDelete = async (postId) => {
        try {
            await deleteDoc(doc(db, 'posts', postId));
            setPosts(posts.filter(post => post.id !== postId));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin');
    };

    const filteredPosts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1>Blog Dashboard</h1>
                    <p>Manage your blog posts</p>
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
                <Link to="/admin/editor" className="admin-create-btn">
                    <FiPlus /> New Post
                </Link>
            </div>

            {/* Posts List */}
            <div className="admin-posts-container">
                {loading ? (
                    <div className="admin-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading posts...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="admin-empty">
                        <FiFileText size={48} />
                        <h3>No posts yet</h3>
                        <p>Create your first blog post to get started</p>
                        <Link to="/admin/editor" className="admin-create-btn">
                            <FiPlus /> Create Post
                        </Link>
                    </div>
                ) : (
                    <div className="admin-posts-list">
                        <AnimatePresence>
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    className="admin-post-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="post-item-image">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} />
                                        ) : (
                                            <div className="post-item-placeholder">
                                                <FiFileText />
                                            </div>
                                        )}
                                    </div>

                                    <div className="post-item-content">
                                        <div className="post-item-header">
                                            <h3>{post.title}</h3>
                                            {post.featured && <span className="featured-badge">Featured</span>}
                                        </div>
                                        <p className="post-item-excerpt">{post.excerpt}</p>
                                        <div className="post-item-meta">
                                            <span>
                                                <FiCalendar /> {post.date || 'No date'}
                                            </span>
                                            <span>
                                                <FiTag /> {post.category || 'Uncategorized'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="post-item-actions">
                                        <Link
                                            to={`/admin/editor/${post.id}`}
                                            className="action-btn edit"
                                            title="Edit"
                                        >
                                            <FiEdit2 />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteConfirm(post.id)}
                                            className="action-btn delete"
                                            title="Delete"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>

                                    {/* Delete Confirmation */}
                                    {deleteConfirm === post.id && (
                                        <motion.div
                                            className="delete-confirm-overlay"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="delete-confirm-content">
                                                <p>Delete this post?</p>
                                                <div className="delete-confirm-actions">
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="cancel-btn"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
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
