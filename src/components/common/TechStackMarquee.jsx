import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiPostgresql, SiFigma } from 'react-icons/si';
import './TechStackMarquee.css';

const techs = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Figma', icon: <SiFigma /> },
    { name: 'AWS', icon: <FaAws /> },
];

const TechStackMarquee = () => {
    return (
        <div className="tech-marquee">
            <div className="tech-marquee-container">
                <motion.div
                    className="tech-track"
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {/* Duplicate the list to ensure smooth infinite loop */}
                    {[...techs, ...techs].map((tech, index) => (
                        <div key={index} className="tech-item">
                            <span className="tech-icon">
                                {tech.icon}
                            </span>
                            <span className="tech-name">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechStackMarquee;
