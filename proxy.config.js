module.exports = {
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://34.30.29.231:5000',
        headers: {
          "x-api-key": "2KgHckAuTVlKe6cUEvu4SoyPfGFCxnQ2KfqjAQVShxQ1yIBtGU"
        }
      },
    ]
  },
}
