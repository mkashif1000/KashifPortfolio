import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import './Admin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please try again later.');
            } else {
                setError('Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-bg">
                <div className="admin-gradient-orb admin-orb-1"></div>
                <div className="admin-gradient-orb admin-orb-2"></div>
            </div>

            <motion.div
                className="admin-login-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="admin-login-card">
                    <div className="admin-login-header">
                        <h1>Admin Panel</h1>
                        <p>Sign in to manage your blog</p>
                    </div>

                    {error && (
                        <motion.div
                            className="admin-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <FiAlertCircle />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-login-form">
                        <div className="admin-input-group">
                            <label htmlFor="email">Email</label>
                            <div className="admin-input-wrapper">
                                <FiMail className="admin-input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label htmlFor="password">Password</label>
                            <div className="admin-input-wrapper">
                                <FiLock className="admin-input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="admin-login-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="btn-loading">
                                    <span className="loading-dot"></span>
                                    <span className="loading-dot"></span>
                                    <span className="loading-dot"></span>
                                </span>
                            ) : (
                                <>
                                    Sign In <FiArrowRight />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="admin-login-footer">
                        <a href="/">← Back to Portfolio</a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
