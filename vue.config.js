module.exports = {
  pages: {
    login: {
      // page 的入口
      entry: "src/views/login/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Login Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ["chunk-vendors", "chunk-common", "ui"]
    },
    admin: {
      // page 的入口
      entry: "src/views/admin/main.js",
      // 模板来源
      template: "public/admin.html",
      // 在 dist/index.html 的输出
      filename: "admin.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "admin Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ["chunk-vendors", "chunk-common", "hh"]
    },
    user: {
      // page 的入口
      entry: "src/views/user/main.js",
      // 模板来源
      template: "public/login.html",
      // 在 dist/index.html 的输出
      filename: "user.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "user Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ["chunk-vendors", "chunk-common", "hh"]
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    //   subpage: "src/subpage/main.js"
  },
  outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8081',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'https://forum.gdutelc.com', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
};
