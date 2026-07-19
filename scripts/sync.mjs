import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fetchGptImage2Skill } from './sources/gpt-image2-skill.mjs';
import { meigenPortraitPrompts } from './sources/meigen-portraits.mjs';

const SOURCE = 'https://www.heigeai.com/agent.json';
const ROOT = process.cwd();

const response = await fetch(SOURCE, {
  headers: { 'User-Agent': 'motu-image-prompts/0.1 (+https://github.com/)' },
});

if (!response.ok) throw new Error(`同步失败：${response.status} ${response.statusText}`);

const source = await response.json();
if (!Array.isArray(source.cases) || !Array.isArray(source.categories)) {
  throw new Error('数据源结构异常：缺少 cases 或 categories');
}

const syncedAt = new Date().toISOString();
const heigePrompts = source.cases.map((item) => ({
  id: item.id,
  slug: item.slug,
  titleZh: item.titleZh,
  titleEn: item.titleEn,
  category: item.category,
  categoryLabelZh: item.categoryLabelZh,
  categoryLabelEn: item.categoryLabelEn,
  sourceCategory: item.categoryLabelZh,
  sourceCategorySlug: item.category,
  styles: item.styles || [],
  scenes: item.scenes || [],
  promptZh: item.promptZh,
  promptEn: item.promptEn,
  promptHash: createHash('sha256').update((item.promptEn || item.promptZh).replace(/\s+/g, ' ').trim().toLowerCase()).digest('hex'),
  imageUrl: item.image ? new URL(item.image, source.baseUrl).href : null,
  imageAltZh: item.imageAltZh || '',
  imageAltEn: item.imageAltEn || '',
  featured: Boolean(item.featured),
  sourceUrlZh: new URL(item.caseUrlZh, source.baseUrl).href,
  sourceUrlEn: new URL(item.caseUrlEn, source.baseUrl).href,
  sourceRepo: '',
  attribution: '黑哥 AI',
  license: 'MIT',
}));

const gptImage2Skill = await fetchGptImage2Skill();
const existingHashes = new Set(heigePrompts.map((item) => item.promptHash));
const importedPrompts = gptImage2Skill.prompts.filter((item) => !existingHashes.has(item.promptHash));
const MASTER_CATEGORIES = [
  { slug: 'illustration-anime', labelZh: '插画与动漫', labelEn: 'Illustration & Anime', descriptionZh: '插画、动漫漫画、角色设计、3D 玩偶、像素艺术与收藏卡视觉。' },
  { slug: 'portrait-fashion', labelZh: '人像与时尚', labelEn: 'Portrait & Fashion', descriptionZh: '人像摄影、时尚编辑、美妆、人物参考与生活方式影像。' },
  { slug: 'brand-commercial', labelZh: '品牌与平面设计', labelEn: 'Brand & Graphic Design', descriptionZh: '品牌识别、海报、字体、出版物和商业平面设计。' },
  { slug: 'ecommerce-product', labelZh: '电商与产品', labelEn: 'Ecommerce & Product', descriptionZh: '产品摄影、电商卖点图、广告横幅、美食饮品和商品展示。' },
  { slug: 'research-infographic', labelZh: '科研与信息图', labelEn: 'Research & Infographics', descriptionZh: '科研论文图、技术图解、数据可视化、流程图与知识图谱。' },
  { slug: 'ui-digital', labelZh: 'UI 与数字产品', labelEn: 'UI & Digital Products', descriptionZh: 'App、网站、仪表盘、社交界面和数字产品概念。' },
  { slug: 'architecture-map', labelZh: '建筑空间与地图', labelEn: 'Architecture, Space & Maps', descriptionZh: '建筑、室内、城市空间、导览图和地图制图。' },
  { slug: 'culture-art', labelZh: '文化艺术与纹身', labelEn: 'Culture, Art & Tattoo', descriptionZh: '历史古典、传统文化、艺术母题与纹身设计。' },
  { slug: 'cinematic-gaming', labelZh: '影视场景与游戏', labelEn: 'Cinematic & Gaming', descriptionZh: '电影感场景、动画分镜、游戏视觉、HUD 和世界观设计。' },
  { slug: 'experimental-creative', labelZh: '实验与创意', labelEn: 'Experimental & Creative', descriptionZh: '混合媒介、编辑工作流、图像修改和难以归入单一类型的实验案例。' },
];
const MASTER_CATEGORY_BY_SOURCE = {
  'illustration':'illustration-anime','anime-manga':'illustration-anime','characters-3d':'illustration-anime','isometric-pixel':'illustration-anime','trading-cards':'illustration-anime',
  'photography-portraits':'portrait-fashion','fashion-editorial':'portrait-fashion','character-reference':'portrait-fashion','character-reference-atlas':'portrait-fashion',
  'brand-identity':'brand-commercial','posters':'brand-commercial','typography':'brand-commercial','documents-publishing':'brand-commercial',
  'product-shots':'ecommerce-product','ecommerce-promos':'ecommerce-product','ecommerce-promo-creatives':'ecommerce-product','ecommerce-banners':'ecommerce-product','food-photography':'ecommerce-product',
  'scientific-figures':'research-infographic','infographics':'research-infographic',
  'ui-mockups':'ui-digital','social-screenshots':'ui-digital',
  'architecture-interiors':'architecture-map','maps-cartography':'architecture-map',
  'history-classical':'culture-art','tattoo-design':'culture-art',
  'scenes-cinematic':'cinematic-gaming','gaming-visuals':'cinematic-gaming',
  'experimental':'experimental-creative',
};
const masterMetadata = new Map(MASTER_CATEGORIES.map((category) => [category.slug, category]));
const prompts = [...heigePrompts, ...importedPrompts, ...meigenPortraitPrompts].map((prompt) => {
  const masterSlug = MASTER_CATEGORY_BY_SOURCE[prompt.category] || 'experimental-creative';
  const master = masterMetadata.get(masterSlug);
  return { ...prompt, category: master.slug, categoryLabelZh: master.labelZh, categoryLabelEn: master.labelEn };
});
const categoryCounts = new Map();
for (const prompt of prompts) categoryCounts.set(prompt.category, (categoryCounts.get(prompt.category) || 0) + 1);
const categories = [...MASTER_CATEGORIES]
  .filter((category) => categoryCounts.has(category.slug))
  .map((category) => ({ ...category, count: categoryCounts.get(category.slug) }))
  .sort((a, b) => b.count - a.count || a.labelZh.localeCompare(b.labelZh, 'zh-CN'));

const dataset = {
  name: 'motu-image-prompts',
  description: '中英双语 AI 生图提示词开放数据集',
  source: SOURCE,
  sourceSite: source.baseUrl,
  license: 'MIT',
  syncedAt,
  counts: {
    prompts: prompts.length,
    categories: categories.length,
    sources: { heigeai: heigePrompts.length, gptImage2Skill: importedPrompts.length, meigen: meigenPortraitPrompts.length },
  },
  categories,
  prompts,
};

await mkdir(path.join(ROOT, 'data'), { recursive: true });
await mkdir(path.join(ROOT, 'public', 'data'), { recursive: true });

await writeFile(path.join(ROOT, 'data', 'prompts.json'), JSON.stringify(dataset, null, 2) + '\n');
await writeFile(path.join(ROOT, 'data', 'prompts.jsonl'), prompts.map((item) => JSON.stringify(item)).join('\n') + '\n');
await writeFile(path.join(ROOT, 'public', 'data', 'prompts.json'), JSON.stringify(dataset));

const escapeCsv = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const columns = ['id','slug','titleZh','titleEn','category','categoryLabelZh','styles','scenes','promptZh','promptEn','sourceUrlZh','sourceUrlEn','sourceRepo','attribution','externalSourceUrl','dimensions','license'];
const csv = [columns.join(','), ...prompts.map((item) => columns.map((key) => escapeCsv(Array.isArray(item[key]) ? item[key].join('|') : item[key])).join(','))].join('\n');
await writeFile(path.join(ROOT, 'public', 'data', 'prompts.csv'), '\uFEFF' + csv + '\n');

console.log(`已同步 ${prompts.length} 条提示词、${categories.length} 个分类。`);
console.log(`来源：黑哥 AI ${heigePrompts.length} 条；GPT-Image2-Skill 新增 ${importedPrompts.length} 条。`);
