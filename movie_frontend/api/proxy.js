const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  const target = 'http://47.103.127.114:8080'

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      '^/api/': '/api/'
    }
  })(req, res)
}

