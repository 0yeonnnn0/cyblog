/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cyblog.vercel.app", // 여기에 배포된 사이트 URL 입력
  generateRobotsTxt: true, // robots.txt 파일도 함께 생성
  sitemapSize: 7000, // (선택) 한 개의 sitemap 파일에 포함될 최대 URL 수
};
