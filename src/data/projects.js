import { FiShoppingCart, FiMessageSquare, FiBarChart2, FiGlobe, FiLayout, FiServer } from 'react-icons/fi';

export const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured shopping platform with cart, payments, and admin dashboard.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80", // Abstract tech image
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        links: {
            github: "https://github.com",
            demo: "https://demo.com"
        },
        featured: true,
        category: "Full Stack"
    },
    {
        id: 2,
        title: "Real-time Chat App",
        description: "Instant messaging application with rooms, file sharing, and online status.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        tags: ["Socket.io", "React", "Express", "Redis"],
        links: {
            github: "https://github.com",
            demo: "https://demo.com"
        },
        featured: true,
        category: "Realtime"
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        description: "Data visualization tool for tracking user metrics and performance.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        tags: ["D3.js", "React", "Firebase", "TypeScript"],
        links: {
            github: "https://github.com",
            demo: "https://demo.com"
        },
        featured: true,
        category: "Analytics"
    }
];
