// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api',
//         destination: 'http://34.30.29.231:5000',
//         secure: false,
//         headers: {
//           "x-api-key": "2KgHckAuTVlKe6cUEvu4SoyPfGFCxnQ2KfqjAQVShxQ1yIBtGU"
//         },
//         pathReq
//       },
//     ]
//   },
// }

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://teste.neocodesolutions.com.br',
    secure: false,
    headers: {
      "x-api-key": "2KgHckAuTVlKe6cUEvu4SoyPfGFCxnQ2KfqjAQVShxQ1yIBtGU"
    },
    pathRewrite: { '^/api': '' }
  }
]

module.exports = PROXY_CONFIG
