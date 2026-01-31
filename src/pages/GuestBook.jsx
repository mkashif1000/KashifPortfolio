import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiMessageSquare, FiHeart, FiSmile, FiStar, FiGift, FiCpu, FiEdit3 } from 'react-icons/fi';
import { FaRocket, FaFire, FaLightbulb, FaHandsClapping, FaLaptopCode } from 'react-icons/fa6';
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

// Sample guest entries
const initialEntries = [
    {
        id: 1,
        name: 'John Developer',
        message: "Amazing portfolio! Love the design and the attention to detail. Keep up the great work! 🔥",
        date: '2024-01-28',
        emoji: 'fire'
    },
    {
        id: 2,
        name: 'Sarah Tech',
        message: "Clean code, beautiful UI. Truly inspiring work from a fellow developer!",
        date: '2024-01-25',
        emoji: 'laptop'
    },
    {
        id: 3,
        name: 'Alex Designer',
        message: "The animations and transitions are so smooth. Great job on the user experience!",
        date: '2024-01-20',
        emoji: 'star'
    },
    {
        id: 4,
        name: 'Mike Coder',
        message: "Really impressed by your MERN stack skills. Would love to collaborate sometime!",
        date: '2024-01-15',
        emoji: 'clap'
    }
];

const GuestBook = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax effect for the hero section
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const [entries, setEntries] = useState(initialEntries);
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [selectedEmoji, setSelectedEmoji] = useState('smile');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.message.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newEntry = {
            id: Date.now(),
            name: formData.name,
            message: formData.message,
            date: new Date().toISOString().split('T')[0],
            emoji: selectedEmoji
        };

        setEntries([newEntry, ...entries]);
        setFormData({ name: '', message: '' });
        setSelectedEmoji('smile');
        setIsSubmitting(false);
    };

    return (
        <div className="guestbook-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="guestbook-hero">
                <div className="container guestbook-hero-container">
                    <motion.div
                        className="guestbook-hero-content text-center"
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

                        {/* Left Column: Form */}
                        <div className="guestbook-form-column">
                            <motion.div
                                className="glass-form-card"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="form-header">
                                    <h3>Write a Message</h3>
                                    <p>Share your thoughts with the community</p>
                                </div>

                                <form onSubmit={handleSubmit} className="guestbook-form">
                                    <div className="form-group">
                                        <label className="input-label">Name</label>
                                        <div className="input-wrapper">
                                            <FiUser className="input-icon" />
                                            <input
                                                type="text"
                                                className="glass-input"
                                                placeholder="What should we call you?"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

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
                                                        {new Date(entry.date).toLocaleDateString('en-US', {
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
