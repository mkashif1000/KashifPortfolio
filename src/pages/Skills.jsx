import { motion } from 'framer-motion';
import { skillsData, softSkills } from '../data/skills.jsx';
import { FiUsers, FiMessageSquare, FiClock, FiAward, FiZap, FiRefreshCw, FiLayout, FiActivity } from 'react-icons/fi';
import './Skills.css';

const SoftSkillIconMap = {
    'Problem Solving': <FiZap />,
    'Team Collaboration': <FiUsers />,
    'Communication': <FiMessageSquare />,
    'Time Management': <FiClock />,
    'Adaptability': <FiRefreshCw />,
    'Critical Thinking': <FiActivity />,
    'Creativity': <FiLayout />,
    'Leadership': <FiAward />
};

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <section className="skills-page">
            <div className="container">
                {/* Hero Headers */}
                <motion.div
                    className="skills-header"
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
                            <span className="badge-icon">⚡</span>
                            THE TOOLKIT
                        </span>
                    </motion.div>

                    <h1 className="skills-title-massive">
                        <span className="block-text">TECHNICAL</span>
                        <span className="block-text text-gradient-purple">PROFICIENCY</span>
                    </h1>

                    <motion.p
                        className="skills-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        A comprehensive overview of the technologies and tools I use to build scalable, high-performance web applications.
                    </motion.p>
                </motion.div>

                {/* Skills Sections */}
                <div className="skills-wrapper">
                    {Object.entries(skillsData).map(([key, category], catIndex) => (
                        <motion.div
                            key={key}
                            className="skill-category-section"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (catIndex * 0.1) }}
                        >
                            <div className="category-header-clean">
                                <span className="category-icon-large" style={{ color: category.color }}>
                                    {category.icon}
                                </span>
                                <h2 className="category-title-large">{category.title}</h2>
                            </div>

                            <motion.div
                                className="skills-grid-clean"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {category.skills.map((skill, index) => (
                                    <SkillCard key={skill.name} skill={skill} color={category.color} index={index} />
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Interpersonal Skills Section - Redesigned */}
            <section className="soft-skills-section">
                <div className="container">
                    <motion.div
                        className="section-title text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-heading">
                            INTERPERSONAL <span className="text-gradient">SKILLS</span>
                        </h2>
                        <p className="section-description">
                            Essential professional attributes that drive collaborative success.
                        </p>
                    </motion.div>

                    <motion.div
                        className="soft-skills-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {softSkills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="soft-skill-card"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="soft-skill-icon">
                                    {SoftSkillIconMap[skill] || <FiZap />}
                                </div>
                                <span className="soft-skill-name">{skill}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </section>
    );
};

// Modern Glass Skill Card
const SkillCard = ({ skill, color, index }) => {
    return (
        <motion.div
            className="skill-card-modern glass-panel"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{
                y: -5,
                borderColor: color,
                boxShadow: `0 10px 30px -10px ${color}40`
            }}
        >
            <div className="skill-card-content">
                <div className="skill-icon-wrapper">
                    {skill.icon ? (
                        <img src={skill.icon} alt={skill.name} className="skill-icon-img" />
                    ) : (
                        <div className="skill-icon-fallback" style={{ borderColor: color, color: color }}>
                            {skill.name.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="skill-details">
                    <h4 className="skill-name-modern">{skill.name}</h4>
                    <div className="skill-track">
                        <motion.div
                            className="skill-bar"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Skills;
