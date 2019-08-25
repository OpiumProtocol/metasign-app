module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'semi': [
      'error',
      'never'
    ],
    'prettier/prettier': [
      'error', {
        'singleQuote': true,
        'semi': false,
        'trailingComma': 'all'
      }
    ],
  }
}
