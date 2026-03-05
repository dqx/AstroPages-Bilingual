export const SITE = {
  website: "https://find-ai.pages.dev", // replace this with your deployed domain
  author: "tosaki",
  profile: "https://t0saki.com",
  desc: "AI工具,小机场,VPN,ClaudeCode,免费机场,科学上网,翻墙",
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
