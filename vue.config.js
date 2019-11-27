
// 基础路径 注意发布之前要先修改这里
let baseUrl = './'

module.exports = {
    publicPath: baseUrl, // 根据你的实际情况更改这里
    lintOnSave: true,
    // assetsDir: './',
    devServer: {
        // publicPath: baseUrl // 和 baseUrl 保持一致
        proxy: {
            '/dev': {
                // target: ' https://www.easy-mock.com/mock/5c2af2c68b1b183c2bda4f06/api',
                target: 'http://127.0.0.11/dev',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/dev': ''
                }
            },
            '/admin': {
                // target: ' https://www.easy-mock.com/mock/5c2af2c68b1b183c2bda4f06/api',
                target: 'http://127.0.0.11/admin',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': ''
                }
            },
            '/user': {
                // target: ' https://www.easy-mock.com/mock/5c2af2c68b1b183c2bda4f06/api',
                target: 'http://127.0.0.11/user',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/user': ''
                }
            },
            '/api': {
                // target: ' https://www.easy-mock.com/mock/5c2af2c68b1b183c2bda4f06/api',
                target: 'http://127.0.0.11/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/uploads': {
                // target: ' https://www.easy-mock.com/mock/5c2af2c68b1b183c2bda4f06/api',
                target: 'http://127.0.0.11/uploads',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/uploads': ''
                }
            }
        }
    }
}