module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'react/display-name': 0,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: '16.12',
    },
  },
}
