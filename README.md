# motu-image-prompts

可搜索、可复制、可下载的中英双语 AI 生图提示词库，可部署到 Vercel 或 Cloudflare Pages。

数据来自黑哥 AI 的公开机器接口，以及 `wuyoscar/GPT-Image2-Skill` 的分类 Gallery。外部作者案例保留原作者和来源信息；图片不存入本仓库，只引用原始地址。

## 本地运行

```bash
npm install
npm run sync
npm run dev
```

## 构建

```bash
npm run build
```

静态产物位于 `dist/`。

## 部署到 Vercel

导入 GitHub 仓库即可。构建命令为 `npm run build`，输出目录为 `dist`。

## 部署到 Cloudflare Pages

Git 集成配置：

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js: 20 或更新版本

注意：Cloudflare Pages 目前只会从 `wrangler.jsonc` 读取输出目录，不会读取 Git 部署的 Build command。必须在 Cloudflare Dashboard 的项目 Build Settings 中填写 `npm run build`；否则 Cloudflare 会跳过构建并提示找不到 `dist`。

也可以使用命令行：

```bash
npm run deploy:cloudflare
```

## 数据下载

- `/data/prompts.json`
- `/data/prompts.csv`
- 仓库内 `data/prompts.jsonl`

## 更新数据

```bash
npm run sync
npm run validate
```

## 数据来源与许可

- 来源：https://www.heigeai.com/
- 机器接口：https://www.heigeai.com/agent.json
- 来源许可说明：https://www.heigeai.com/about

详见 [DATA_LICENSE.md](./DATA_LICENSE.md)。
