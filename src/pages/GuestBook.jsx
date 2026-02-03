import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiMessageSquare, FiHeart, FiSmile, FiStar, FiGift, FiCpu, FiEdit3, FiLogOut } from 'react-icons/fi';
import { FaRocket, FaFire, FaLightbulb, FaHandsClapping, FaLaptopCode, FaGoogle } from 'react-icons/fa6';
import { auth, db, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import './GuestBook.css';

const emojiOptions = [
    { id: 'smile', icon: <FiSmile /> },
    { id: 'rocket', icon: <FaRocket /> },
    { id: 'laptop', icon: <FaLaptopCode /> },
    { id: 'star', icon: <FiStar /> },
    { id: 'fire', icon: <FaFire /> },
    { id: 'idea', icon: <FaLightbulb /> },
    { id: 'party', icon: <FiGift /> },
    { id: 'clap', icon: <FaHandsClapping /> },
    { id: 'heart', icon: <FiHeart /> },
    { id: 'cpu', icon: <FiCpu /> }
];

const GuestBook = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax effect for the hero section
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({ message: '' });
    const [selectedEmoji, setSelectedEmoji] = useState('smile');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fetch Entries from Firestore
    useEffect(() => {
        const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedEntries = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEntries(fetchedEntries);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !formData.message.trim()) return;

        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "guestbook"), {
                name: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                message: formData.message,
                emoji: selectedEmoji,
                timestamp: serverTimestamp(),
                date: new Date().toISOString() // Fallback/Display date
            });

            setFormData({ message: '' });
            setSelectedEmoji('smile');
        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="guestbook-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="guestbook-hero">
                <div className="container guestbook-hero-container">
                    <motion.div
                        className="guestbook-hero-content text-center"
                        style={{ y }}
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
                                <span className="badge-icon"><FiEdit3 /></span>
                                SIGN THE GUESTBOOK
                            </span>
                        </motion.div>

                        <h1 className="guestbook-title-massive">
                            <span className="block-text">LEAVE YOUR</span>
                            <span className="block-text text-gradient-purple">MARK</span>
                        </h1>

                        <motion.p
                            className="guestbook-description mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Drop a message, share some feedback, or just say hello.
                            Your words make this digital space feel a little more human.
                        </motion.p>
                    </motion.div>


                </div>

                {/* Background ambient glow */}
                <div className="hero-glow"></div>
            </section>

            {/* Main Content Section */}
            <section className="guestbook-content-section">
                <div className="guestbook-bg-watermark">SIGN</div>
                <div className="container">
                    <div className="guestbook-grid">

                        <div className="guestbook-form-column">
                            <motion.div
                                className="glass-form-card"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {authLoading ? (
                                    <div className="loading-container">
                                        <div className="loading-dots"><span>.</span><span>.</span><span>.</span></div>
                                    </div>
                                ) : !user ? (
                                    <div className="guestbook-signin-container">
                                        <div className="form-header">
                                            <h3>Join the Conversation</h3>
                                            <p>Sign in to leave your mark on the guestbook</p>
                                        </div>
                                        <motion.button
                                            onClick={handleSignIn}
                                            className="btn-google-signin"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FaGoogle className="google-icon" />
                                            <span>Sign in with Google</span>
                                        </motion.button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="form-header-row">
                                            <div className="form-header-content">
                                                <h3>Write a Message</h3>
                                                <div className="user-badge">
                                                    {user.photoURL && <img src={user.photoURL} alt={user.displayName} className="user-avatar-sm" />}
                                                    <span>Posting as <span className="text-gradient-purple">{user.displayName}</span></span>
                                                </div>
                                            </div>
                                            <button onClick={handleSignOut} className="btn-signout-icon" title="Sign Out">
                                                <FiLogOut />
                                            </button>
                                        </div>

                                        <form onSubmit={handleSubmit} className="guestbook-form">
                                            {/* Message Input */}
                                            <div className="form-group">
                                                <label className="input-label">Message</label>
                                                <div className="input-wrapper textarea-wrapper">
                                                    <FiMessageSquare className="input-icon textarea-icon" />
                                                    <textarea
                                                        className="glass-input textarea"
                                                        placeholder="Your message goes here..."
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="input-label">Vibe</label>
                                                <div className="emoji-grid">
                                                    {emojiOptions.map((option) => (
                                                        <button
                                                            key={option.id}
                                                            type="button"
                                                            className={`emoji-btn ${selectedEmoji === option.id ? 'active' : ''}`}
                                                            onClick={() => setSelectedEmoji(option.id)}
                                                            title={option.id}
                                                        >
                                                            {option.icon}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="btn-submit-glow"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isSubmitting ? (
                                                    <span className="loading-dots">
                                                        <span>.</span><span>.</span><span>.</span>
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span>PUBLISH MESSAGE</span>
                                                        <FiSend />
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column: Entries */}
                        <div className="guestbook-entries-column">
                            <motion.div
                                className="entries-header"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2>Recent Signatures <span className="count-badge">{entries.length}</span></h2>
                            </motion.div>

                            <div className="entries-list">
                                <AnimatePresence mode="popLayout">
                                    {entries.map((entry, index) => (
                                        <motion.div
                                            key={entry.id}
                                            className="entry-card-glass"
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                        >
                                            <div className="entry-emoji-wrapper">
                                                {emojiOptions.find(e => e.id === entry.emoji)?.icon || <FiSmile />}
                                            </div>
                                            <div className="entry-content">
                                                <div className="entry-top">
                                                    <h4 className="entry-name">{entry.name}</h4>
                                                    <span className="entry-date">
                                                        {entry.timestamp?.toDate ? entry.timestamp.toDate().toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        }) : new Date(entry.date || Date.now()).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="entry-message">{entry.message}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GuestBook;
