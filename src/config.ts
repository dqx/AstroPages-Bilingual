export const SITE = {
  website: "https://find-ai.pages.dev", // replace this with your deployed domain
  author: "tosaki",
  profile: "https://t0saki.com",
  desc: "发现AI - 探索最新AI工具、免费机场资源和科学上网指南。提供ClaudeCode使用教程、VPN推荐等实用内容,帮助每个人便捷使用AI技术。",
  title: "发现AI",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/dqx/AstroPages-Bilingual/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Singapore", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

export const BLOG_PATH = "src/data/blog";
