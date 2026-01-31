import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Tag, User } from 'lucide-react';

const PostModal = ({ post, isOpen, onClose }) => {
    // If no post is selected, don't render anything
    if (!isOpen || !post) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900/90 border border-white/10 rounded-2xl shadow-2xl z-10 no-scrollbar"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all z-20"
                        >
                            <X size={20} />
                        </button>

                        {/* Hero Image Area */}
                        <div className="relative h-64 md:h-80 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900" />
                            )}

                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                                <span className="inline-block px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-4">
                                    {post.category}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                    {post.title}
                                </h2>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8 border-b border-white/10 pb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={14} />
                                    <span>Admin</span>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                                <p className="lead text-xl text-gray-200 font-light mb-6">
                                    {post.excerpt}
                                </p>
                                <p>
                                    {post.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                                </p>
                                <p className="mt-4">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                                </p>
                            </div>

                            {/* Footer / Tags */}
                            <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2">
                                <Tag size={16} className="text-blue-400" />
                                <span className="text-sm text-gray-400">Tags:</span>
                                {post.category && (
                                    <span className="text-sm text-gray-300 bg-white/5 px-2 py-1 rounded">
                                        {post.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PostModal;
