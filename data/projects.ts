export interface Project {
    id: number;
    name: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
}

export const projectsData: Project[] = [
    {
        id: 1,
        name: 'SaaS Analytics Platform',
        description: 'Real-time analytics dashboard with AI-powered insights',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
        link: '#',
        tags: ['React', 'Node.js', 'Analytics'],
    },
    {
        id: 2,
        name: 'E-Commerce Revolution',
        description: 'Next-gen shopping experience with AR product preview',
        image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db57?w=500&h=300&fit=crop',
        link: '#',
        tags: ['Next.js', 'Stripe', 'AR'],
    },
    {
        id: 3,
        name: 'AI Content Generator',
        description: 'Intelligent content creation tool powered by GPT-4',
        image: 'https://images.unsplash.com/photo-1677442d019cecf3d4a72eaef4b5c4e8?w=500&h=300&fit=crop',
        link: '#',
        tags: ['AI', 'Python', 'Web3'],
    },
    {
        id: 4,
        name: 'Mobile Fitness App',
        description: 'Personalized workout plans with real-time form detection',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
        link: '#',
        tags: ['React Native', 'ML', 'Fitness'],
    },
    {
        id: 5,
        name: 'Social Network Platform',
        description: 'Community-driven platform with live streaming capabilities',
        image: 'https://images.unsplash.com/photo-1553531088-b29f1fe41c49?w=500&h=300&fit=crop',
        link: '#',
        tags: ['WebSocket', 'MongoDB', 'Social'],
    },
    {
        id: 6,
        name: 'Fintech Dashboard',
        description: 'Secure financial management suite with portfolio tracking',
        image: 'https://images.unsplash.com/photo-1611974588291-47b4651a42a9?w=500&h=300&fit=crop',
        link: '#',
        tags: ['Finance', 'Security', 'Charts'],
    },
];

export const companies = [
    { id: 1, name: 'TechVision', logo: '📱' },
    { id: 2, name: 'DataFlow', logo: '📊' },
    { id: 3, name: 'CloudSync', logo: '☁️' },
    { id: 4, name: 'NeoAI', logo: '🤖' },
    { id: 5, name: 'ByteWave', logo: '🌊' },
    { id: 6, name: 'QuantumLeap', logo: '⚛️' },
    { id: 7, name: 'VortexLabs', logo: '🌀' },
    { id: 8, name: 'PrimeCore', logo: '⭐' },
];
