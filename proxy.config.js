module.exports = {
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://34.30.29.231:5000',
      },
    ]
  },
}
