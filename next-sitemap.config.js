/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://truetopreviews.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
};
