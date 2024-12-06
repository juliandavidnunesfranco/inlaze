import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        formats: ['image/webp'],
        unoptimized: true,
        localPatterns: [
            {
                pathname: '/assets/images',
                search: '/.*.(png|jpg|jpeg|gif|webp)$/',
            },
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        staleTimes: {
            dynamic: 0, //duracion en segundos de las paginas dinamicas en cache
            static: 120, //duracion en segundos de las paginas estaticas en cache
        },
    },
};

export default nextConfig;
