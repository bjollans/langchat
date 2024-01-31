const { withExpo } = require('@expo/next-adapter');

const nextConfig = withExpo({
    reactStrictMode: true,
    transpilePackages: ['linguin-shared',
        'react-native',
        'react-native-web',
        'nativewind',
        "react-native-css-interop",
        // Add more React Native/Expo packages here...
    ],
    experimental: {
        forceSwcTransforms: true,
    },
});

module.exports = nextConfig