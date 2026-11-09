module.exports = {
    siteUrl: require('./data/seo.json').siteUrl,
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: true,
    autoLastmod: false,
    changefreq: 'monthly',
    exclude: ['/404', '/500'],
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'OAI-SearchBot', allow: '/' },
        { userAgent: 'ChatGPT-User', allow: '/' },
        { userAgent: 'Claude-SearchBot', allow: '/' },
        { userAgent: 'Claude-User', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'Perplexity-User', allow: '/' },
      ],
    },
    // ...other options
    //Reference: Sitecore website - https://github.com/Sitecore/developer-portal/blob/main/apps/devportal/next-sitemap.config.js
  }