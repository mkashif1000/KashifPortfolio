import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiSearch, FiCalendar, FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import './Blog.css';

const CATEGORIES = ['All', 'Development', 'Design', 'Career', 'Tutorials'];

const TiltCard = ({ children, className, ...props }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    // Subtle rotation (7deg)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXStart = e.clientX - rect.left;
        const mouseYStart = e.clientY - rect.top;
        const xPct = mouseXStart / width - 0.5;
        const yPct = mouseYStart / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`tilt-card-wrapper ${className || ''}`}
            {...props}
        >
            <div style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setFilteredPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
            // Fallback to empty array if Firebase fails
            setPosts([]);
            setFilteredPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filtered = posts.filter(post => {
            const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
            const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setFilteredPosts(filtered);
    }, [activeCategory, searchQuery, posts]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="blog-page">
            {/* Header Section */}
            <section className="blog-hero">
                <div className="container">
                    <motion.div
                        className="blog-hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="blog-badge">
                            <span className="badge-dot"></span>
                            <span>WRITING & THOUGHTS</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="blog-title">
                            Insights on <span className="text-gradient">Code</span>, <br />
                            Design & Future.
                        </motion.h1>

                        <motion.p variants={itemVariants} className="blog-description">
                            A collection of tutorials, opinions, and experiments from my journey as a MERN Stack Developer.
                        </motion.p>

                        {/* Search & Filter */}
                        <motion.div variants={itemVariants} className="blog-controls">
                            <div className="search-wrapper">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="categories-wrapper">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="blog-posts">
                <div className="container">
                    {loading ? (
                        <div className="blog-loading">
                            <div className="loading-spinner"></div>
                            <p>Loading articles...</p>
                        </div>
                    ) : (
                        <motion.div
                            className="posts-grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    post.featured ? (
                                        <TiltCard key={post.id} className="featured-tilt-wrapper" variants={itemVariants}>
                                            <article className="post-card featured">
                                                <div className="post-image-container">
                                                    <img src={post.image} alt={post.title} className="post-image" />
                                                    <div className="post-category">{post.category}</div>
                                                </div>

                                                <div className="post-content">
                                                    <div className="post-meta">
                                                        <span className="meta-item">
                                                            <FiCalendar /> {post.date}
                                                        </span>
                                                        <span className="meta-item">
                                                            <FiClock /> {post.readTime}
                                                        </span>
                                                    </div>

                                                    <h2 className="post-title">{post.title}</h2>
                                                    <p className="post-excerpt">{post.excerpt}</p>

                                                    <Link to={`/blog/${post.id}`} className="read-more-btn">
                                                        Read Article <FiArrowRight />
                                                    </Link>
                                                </div>
                                            </article>
                                        </TiltCard>
                                    ) : (
                                        <motion.article
                                            key={post.id}
                                            className="post-card"
                                            variants={itemVariants}
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        >
                                            <div className="post-image-container">
                                                <img src={post.image} alt={post.title} className="post-image" />
                                                <div className="post-category">{post.category}</div>
                                            </div>

                                            <div className="post-content">
                                                <div className="post-meta">
                                                    <span className="meta-item">
                                                        <FiCalendar /> {post.date}
                                                    </span>
                                                    <span className="meta-item">
                                                        <FiClock /> {post.readTime}
                                                    </span>
                                                </div>

                                                <h2 className="post-title">{post.title}</h2>
                                                <p className="post-excerpt">{post.excerpt}</p>

                                                <Link to={`/blog/${post.id}`} className="read-more-btn">
                                                    Read Article <FiArrowRight />
                                                </Link>
                                            </div>
                                        </motion.article>
                                    )
                                ))
                            ) : (
                                <motion.div variants={itemVariants} className="no-results">
                                    <FiSearch size={48} />
                                    <h3>No articles found</h3>
                                    <p>Try adjusting your search or category filter.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="container">
                    <motion.div
                        className="newsletter-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="newsletter-content">
                            <div className="newsletter-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2 className="newsletter-title">Stay in the loop</h2>
                            <p className="newsletter-description">Get the latest articles and insights directly in your inbox.</p>

                            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="newsletter-input"
                                />
                                <button type="submit" className="newsletter-btn">
                                    SUBSCRIBE
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Blog;