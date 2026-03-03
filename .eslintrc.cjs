module.exports = {
  extends: ['@rbinflow/eslint-config/expo'],
  rules: {
    'react-native/no-raw-text': 'off',
  },
  overrides: [
    {
      files: ['*.config.js', '*.config.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
}

