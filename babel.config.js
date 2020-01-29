module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true
      }
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          utilities: './utilities',
          layouts: './layouts',
          components: './components'
        }
      }
    ]
  ]
}
