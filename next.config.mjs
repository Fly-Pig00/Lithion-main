/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**/fqhnt977/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.sanity.io',
      //   port: '',
      //   pathname: '/images/fqhnt977/**',
      //   loader: 'custom',
      // },
    ],
  },
}

export default config
