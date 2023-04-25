const nextConfig = {
    output: 'export',

    env: {
        HEALTH_PORTAL_SERVER_URL: process.env.HEALTH_PORTAL_SERVER_URL || 'http://localhost:8080',
        DEV_TOKEN: process.env.DEV_TOKEN || 'b5454fe7-f0d5-4b6b-a64a-a755262149e8'
    }
}

module.exports = nextConfig