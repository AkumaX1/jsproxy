jsproxy_config({
  // 当前配置的版本（记录在日志中，用于排查问题）
  // 每次修改配置，该值需要增加，否则不会生效。
  // 默认每隔 5 分钟自动下载配置，若想立即验证，可通过隐私模式访问。
  ver: '110',

  // Accelerate static resources of popular websites through CDN (experimental)
  static_boost: {
    enable: true,
    ver: 62
  },

  // Node configuration
  node_map: {
    'demo-hk': {
      label: 'Demo Service - Hong Kong Node',
      lines: {
        // host:weight
        'node-aliyun-hk-1.etherdream.com:8443': 1,
        'node-aliyun-hk-2.etherdream.com:8443': 2,
      }
    },
    'demo-sg': {
      label: 'Demo Service - Singapore Node',
      lines: {
        'node-aliyun-sg.etherdream.com:8443': 1,
      },
    },
    'mysite': {
      label: 'current site',
      lines: {
        [location.host]: 1,
      }
    },
    // This node is used to load large static resources
    'cfworker': {
      label: '',
      hidden: true,
      lines: {
        // 收费版（高权重）
        //'node-cfworker-2.etherdream.com': 4,

        // Free version (low weight, share some costs) 
        // 100,000 free requests per account per day with frequency limit
        //'b.007.workers.dev': 1,
        //'b.hehe.workers.dev': 1,
        //'b.lulu.workers.dev': 1,
        //'b.jsproxy.workers.dev': 1,
      }
    }
  },

  /**
   * default node
   */
  node_default: 'mysite',
  // node_default: /jsproxy-demo\.\w+$/.test(location.host) ? 'demo-hk' : 'mysite',

  /**
   * acceleration node
   */
  node_acc: 'cfworker',

  /**
   * Static resource CDN address 
   * Used to speed up access to resources in the `assets` directory
   */
  // assets_cdn: 'https://cdn.jsdelivr.net/gh/zjcqoo/zjcqoo.github.io@master/assets/',

  // Open when testing locally, otherwise access is online
  assets_cdn: 'assets/',

  // Home Path
  index_path: 'index_v3.html',

  // List of sites that support CORS (experimental...）
  direct_host_list: 'cors_v1.txt',

  /**
   * custom injection page HTML
   */
  inject_html: '<!-- custom html -->',

  /**
   * URL custom processing（designing）
   */
  url_handler: {
    'https://www.baidu.com/img/baidu_resultlogo@2.png': {
      replace: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
    },
    'https://www.pornhub.com/': {
      redir: 'https://php.net/'
    },
    'http://haha.com/': {
      content: 'Hello World'
    },
  }
})
