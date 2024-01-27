module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                "module-resolver",
                {
                    "root": ["./"],
                    "alias": {
                        "components": "./src/components",
                        "pages": "./src/pages",
                        "^react-native$": "react-native-web"
                        // Add other aliases here
                    }
                }
            ],
            'nativewind/babel', { mode: 'transformOnly' },
            'react-native-web'
        ]
    };
};
