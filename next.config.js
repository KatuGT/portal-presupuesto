/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@react-pdf/renderer"],
    },
    webpack: (config) => {
        config.resolve.fallback = { ...config.resolve.fallback, fs: false }; // Por si el paquete intenta usar 'fs'
        return config;
    },
};
module.exports = nextConfig
