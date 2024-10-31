module.exports = {
    extends: [
        './react.js',
        'plugin:react-native/all'
    ],
    plugins: ['react-native'],
    env: {
        'react-native/react-native': true
    },
    rules: {
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react-native/no-raw-text': 'warn'
    }
};