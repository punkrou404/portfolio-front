const path = require('path');

module.exports = {
    images: {
        path: '/_next/image',
        domains: ['grass-graph.moshimo.works'],
    },
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/blog/1',
                permanent: true,
            },
            {
                source: '/blog/post',
                destination: '/blog/1',
                permanent: true,
            },
        ];
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                fs: 'empty',
            };
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            '~': path.resolve(__dirname, './src'),
        };
        return config;
    },
};
