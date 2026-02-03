import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from 'react-icons/fi';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const postData = { id: docSnap.id, ...docSnap.data() };
                setPost(postData);
                fetchRelatedPosts(postData.category, docSnap.id);
            } else {
                navigate('/blog');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedPosts = async (category, currentId) => {
        try {
            const q = query(
                collection(db, 'posts'),
                where('category', '==', category),
                limit(3)
            );
            const snapshot = await getDocs(q);
            const posts = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(p => p.id !== currentId)
                .slice(0, 2);
            setRelatedPosts(posts);
        } catch (error) {
            console.error('Error fetching related posts:', error);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="blog-post-loading">
                <div className="loading-spinner"></div>
                <p>Loading article...</p>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div className="blog-post-page">
            <div className="blog-post-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>

            {/* Hero Section */}
            <motion.section
                className="blog-post-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container">
                    <Link to="/blog" className="back-to-blog">
                        <FiArrowLeft /> Back to Blog
                    </Link>

                    <motion.div
                        className="post-hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="post-meta-top">
                            <span className="post-category-badge">{post.category}</span>
                            <span className="post-date">
                                <FiCalendar /> {post.date}
                            </span>
                            <span className="post-read-time">
                                <FiClock /> {post.readTime}
                            </span>
                        </div>

                        <h1 className="post-title">{post.title}</h1>
                        <p className="post-excerpt">{post.excerpt}</p>

                        <button onClick={handleShare} className="share-btn">
                            <FiShare2 /> Share Article
                        </button>
                    </motion.div>
                </div>

                {post.image && (
                    <motion.div
                        className="post-hero-image"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <img src={post.image} alt={post.title} />
                    </motion.div>
                )}
            </motion.section>

            {/* Content Section */}
            <motion.section
                className="blog-post-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="container">
                    <article className="post-article">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </article>

                    {/* Tags */}
                    <div className="post-tags">
                        <FiTag />
                        <span>{post.category}</span>
                    </div>
                </div>
            </motion.section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="related-posts-section">
                    <div className="container">
                        <h2>Related Articles</h2>
                        <div className="related-posts-grid">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    to={`/blog/${relatedPost.id}`}
                                    key={relatedPost.id}
                                    className="related-post-card"
                                >
                                    {relatedPost.image && (
                                        <div className="related-post-image">
                                            <img src={relatedPost.image} alt={relatedPost.title} />
                                        </div>
                                    )}
                                    <div className="related-post-content">
                                        <span className="related-post-category">{relatedPost.category}</span>
                                        <h3>{relatedPost.title}</h3>
                                        <span className="related-post-date">{relatedPost.date}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogPost;
