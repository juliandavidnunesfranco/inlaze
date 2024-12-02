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
};

export default nextConfig;
