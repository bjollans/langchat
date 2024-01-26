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
                        "pages": "./src/pages"
                        // Add other aliases here
                    }
                }
            ],
            ["module-resolver", {
                "alias": {
                  "^react-native$": "react-native-web"
                }
              }],
            'nativewind/babel', { mode: 'transformOnly' },
            'react-native-web'
        ]
    };
};
