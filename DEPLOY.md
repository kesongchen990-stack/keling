# AIToolReview — 部署清单

## 文件清单 (15 files, ~144KB)

| 文件 | 类型 | 说明 |
|------|------|------|
| `index.html` | 页面 | 首页，JS 动态渲染文章卡片 |
| `article.html` | 页面 | 通用评测文章模板 (URL 参数 `?id=xxx`) |
| `review.html` | 页面 | 评测页面入口 (静态 fallback) |
| `compare.html` | 页面 | 交互式 AI 工具对比表 |
| `guide.html` | 页面 | Best AI Tools 2026 排行综述 |
| `quiz.html` | 页面 | AI 工具推荐问答 (6 题 → 推荐) |
| `styles.css` | 样式 | 全局 CSS，响应式 + 暗黑模式 |
| `scripts.js` | JS | 首页渲染、文章详情渲染、搜索、对比表 |
| `adsense-config.js` | 配置 | AdSense 广告位集中管理 |
| `affiliate-config.js` | 配置 | Affiliate 链接集中管理 |
| `articles.json` | 数据 | 21 篇文章数据库 |
| `sitemap.xml` | SEO | Google 站点地图 |
| `robots.txt` | SEO | 爬虫规则 |

## 上线前 Check List

### 必须改的
- [ ] `adsense-config.js` 第 8 行：把 `ca-pub-XXXXXXXXXXXXXXXX` 换成你的真实 AdSense Publisher ID
- [ ] `adsense-config.js` 每个 slot 的 `id` 换成你在 AdSense 后台创建的广告单元 ID
- [ ] 打开 AdSense 账户，创建 15 个广告单元（对应 15 个 slot）
- [ ] `sitemap.xml` 和 `robots.txt` 中 `aitoolreview.com` 换成你的真实域名
- [ ] `adsense-config.js` 底部注释：取消注释 AdSense 脚本加载代码，删除 placeholder 渲染代码
- [ ] 首页 hero `<p>` 里 `5,000+` 改成真实订阅数（刚开始可以写 `Join our newsletter`）

### 建议做的
- [ ] 注册 `aitoolreview.com` 或类似域名（Namesilo/Namecheap/Porkbun）
- [ ] 在 Google Search Console 提交 sitemap.xml
- [ ] 在 Google AdSense 后台完成网站审核（内容需足够丰富，建议先上线 1-2 周再申请）
- [ ] 注册 affiliate 平台账户：Impact.com / PartnerStack / ShareASale
- [ ] 在 `affiliate-config.js` 中填入各平台的 referral tag

### 托管方案推荐

**推荐：Cloudflare Pages（完全免费，速度最快）**
1. 把项目文件夹 push 到 GitHub
2. 在 Cloudflare Pages 连接 GitHub 仓库
3. 构建设置：无需构建命令，输出目录留空
4. 绑定自定义域名，自动 HTTPS
5. 全球 CDN，加载速度极快

**备选：Vercel / Netlify（也都免费）**
操作几乎相同：连 GitHub → 自动部署 → 绑域名

### 上线后 30 天行动计划

| 周 | 行动 |
|----|------|
| 第 1 周 | 上线 → 提交 Google Search Console → 提交 AdSense 审核 |
| 第 2 周 | 每天发布 1 篇新评测文章 → 在 Reddit/Quora 回答相关问题并附链接 |
| 第 3 周 | 开始做 Pinterest 引流（每条评测做 3 张对比图 Pin） |
| 第 4 周 | 分析 Google Search Console 数据 → 优化已有文章 → 注册 affiliate 平台 |

### 收入预估（保守）

| 阶段 | 月流量 | 文章数 | RPM | 月收入 |
|------|--------|--------|-----|--------|
| 3 个月 | 5,000 PV | 30 | $12 | ~$60 |
| 6 个月 | 20,000 PV | 50 | $14 | ~$280 |
| 12 个月 | 80,000 PV | 80 | $16 | ~$1,280 |
| 18 个月 | 250,000 PV | 120 | $18 | ~$4,500 |

以上仅计算 AdSense 收入。加上 Affiliate（通常占 30-50%），实际收入可 ×1.5。

### 新增文章只需一步

编辑 `articles.json`，在数组末尾加一条 JSON 记录，所有页面自动更新。
