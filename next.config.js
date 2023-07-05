/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    output: 'export',

    env: {
        HEALTH_PORTAL_SERVER_URL: process.env.HEALTH_PORTAL_SERVER_URL || 'http://localhost:8080'
    },

    trailingSlash: true
}

module.exports = nextConfig