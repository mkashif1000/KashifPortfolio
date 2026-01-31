import { FiLayout, FiServer, FiTool } from 'react-icons/fi';

export const skillsData = {
    frontend: {
        title: 'Frontend',
        icon: <FiLayout />,
        color: '#8B5CF6',
        skills: [
            { name: 'React', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'JavaScript', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'TypeScript', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            { name: 'HTML5', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS3', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'Redux', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
            { name: 'Next.js', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            { name: 'Tailwind CSS', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' }
        ]
    },
    backend: {
        title: 'Backend',
        icon: <FiServer />,
        color: '#06B6D4',
        skills: [
            { name: 'Node.js', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'MongoDB', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'PostgreSQL', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'REST APIs', level: 90, icon: null },
            { name: 'GraphQL', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
            { name: 'Socket.io', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' }
        ]
    },
    tools: {
        title: 'Tools & DevOps',
        icon: <FiTool />,
        color: '#F43F5E',
        skills: [
            { name: 'Git', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'GitHub', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'VS Code', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
            { name: 'Docker', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Postman', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
            { name: 'Figma', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'npm', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' }
        ]
    }
};

export const softSkills = [
    'Problem Solving',
    'Team Collaboration',
    'Communication',
    'Time Management',
    'Adaptability',
    'Critical Thinking',
    'Creativity',
    'Leadership'
];

export default skillsData;
