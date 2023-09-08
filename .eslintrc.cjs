module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'standard',
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'space-before-function-paren': ['off', 'always']
    }
};
