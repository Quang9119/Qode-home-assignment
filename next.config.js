/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mneqwznlmlhyegurinlp.supabase.co'
            }
        ]
    }
}

module.exports = nextConfig
