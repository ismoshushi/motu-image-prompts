import { createHash } from 'node:crypto';

const REPO = 'wuyoscar/GPT-Image2-Skill';
const BRANCH = 'main';
const RAW_ROOT = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const GITHUB_ROOT = `https://github.com/${REPO}/blob/${BRANCH}`;
const INDEX_PATH = 'skills/gpt-image/references/gallery.md';

const CATEGORY_MAP = {
  'Anime & Manga': ['anime-manga', '动漫与漫画', 'Anime & Manga'],
  'Gaming': ['gaming-visuals', '游戏视觉', 'Gaming Visuals'],
  'Retro & Cyberpunk': ['illustration', '插画', 'Illustration'],
  'Cinematic & Animation': ['scenes-cinematic', '电影感场景', 'Cinematic Scenes'],
  'Character Design': ['characters-3d', '角色与 3D 玩偶', 'Characters & 3D Toys'],
  'Typography & Posters': ['posters', '海报与编辑设计', 'Posters & Editorial'],
  'Illustration': ['illustration', '插画', 'Illustration'],
  'Watercolor': ['illustration', '插画', 'Illustration'],
  'Ink & Chinese': ['illustration', '插画', 'Illustration'],
  'Pixel Art': ['isometric-pixel', '等距与像素艺术', 'Isometric & Pixel Art'],
  'Isometric': ['isometric-pixel', '等距与像素艺术', 'Isometric & Pixel Art'],
  'Product & Food': ['product-shots', '产品摄影', 'Product Photography'],
  'Brand Systems & Identity': ['brand-identity', '品牌识别', 'Brand Identity'],
  'Photography': ['photography-portraits', '人像摄影', 'Portrait Photography'],
  'Infographics & Field Guides': ['infographics', '信息图与示意图', 'Infographics & Diagrams'],
  'Research Paper Figures': ['scientific-figures', '科研与学术图', 'Scientific & Academic Figures'],
  'Official OpenAI Cookbook Examples': ['experimental', '实验与混合', 'Experimental & Mixed'],
  'Edit Endpoint Showcase': ['experimental', '实验与混合', 'Experimental & Mixed'],
  'UI/UX Mockups': ['ui-mockups', 'UI 模拟界面', 'UI Mockups'],
  'Data Visualization': ['infographics', '信息图与示意图', 'Infographics & Diagrams'],
  'Technical Illustration': ['scientific-figures', '科研与学术图', 'Scientific & Academic Figures'],
  'Architecture & Interior': ['architecture-interiors', '建筑与室内', 'Architecture & Interiors'],
  'Scientific & Educational': ['scientific-figures', '科研与学术图', 'Scientific & Academic Figures'],
  'Fashion Editorial': ['fashion-editorial', '时尚编辑', 'Fashion Editorial'],
  'Fine Art Painting': ['illustration', '插画', 'Illustration'],
  'More Illustration Styles': ['illustration', '插画', 'Illustration'],
  'Cinematic Film References': ['scenes-cinematic', '电影感场景', 'Cinematic Scenes'],
  'Beauty & Lifestyle': ['photography-portraits', '人像摄影', 'Portrait Photography'],
  'Events & Experience': ['maps-cartography', '地图与制图', 'Maps & Cartography'],
  'Tattoo Design': ['tattoo-design', '纹身与身体艺术', 'Tattoo & Body Art'],
  'Screen Photography': ['photography-portraits', '人像摄影', 'Portrait Photography'],
};

const mappedCategory = (name) => {
  const [slug, labelZh, labelEn] = CATEGORY_MAP[name] || ['experimental', '实验与混合', 'Experimental & Mixed'];
  return { slug, labelZh, labelEn };
};

const cleanText = (value = '') => value.replace(/\s+/g, ' ').trim();

const slugify = (value) => cleanText(value)
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 72);

const parseMetadata = (line = '') => {
  const raw = line.replace(/^- Metadata:\s*/, '').trim();
  const parts = raw.split(' · ').map((part) => part.trim());
  const sourceMatch = raw.match(/Source:\s*\[([^\]]+)]\(([^)]+)\)/);
  const authorMatch = raw.match(/Author:\s*([^·]+?)(?:\s*·|$)/);
  const citesMatch = raw.match(/\*\*Cites:\*\*\s*(.+)$/);
  return {
    raw,
    categoryLabel: parts[0] || '',
    sizePreset: parts.find((part) => /^`[^`]+`$/.test(part))?.replaceAll('`', '') || '',
    dimensions: parts.find((part) => /^`\d+x\d+`$/.test(part))?.replaceAll('`', '') || '',
    curated: /(?:^| · )Curated(?: · |$)/.test(raw),
    author: authorMatch?.[1]?.trim() || '',
    externalSourceLabel: sourceMatch?.[1] || '',
    externalSourceUrl: sourceMatch?.[2] || '',
    cites: citesMatch?.[1]?.trim() || '',
  };
};

const parseCategoryFile = ({ content, file, categoryName }) => {
  const targetCategory = mappedCategory(categoryName);
  const entries = [];
  const pattern = /^### No\.\s*(\d+)\s*·\s*(.+?)\r?\n([\s\S]*?)(?=^### No\.|(?![\s\S]))/gm;
  let match;
  while ((match = pattern.exec(content))) {
    const number = Number(match[1]);
    const title = cleanText(match[2]);
    const body = match[3];
    const imagePath = body.match(/^- Image:\s*`([^`]+)`/m)?.[1] || '';
    const metadataLine = body.match(/^- Metadata:\s*(.+)$/m)?.[0] || '';
    const prompt = body.match(/```text\r?\n([\s\S]*?)\r?\n```/)?.[1]?.trim() || '';
    if (!prompt) continue;
    const metadata = parseMetadata(metadataLine);
    const promptHash = createHash('sha256').update(prompt.replace(/\s+/g, ' ').trim().toLowerCase()).digest('hex');
    const slugBase = slugify(title) || `entry-${number}`;
    entries.push({
      id: `gpt-image2-skill-${number}`,
      slug: `gpt-image2-${slugBase}`,
      titleZh: '',
      titleEn: title,
      category: targetCategory.slug,
      categoryLabelZh: targetCategory.labelZh,
      categoryLabelEn: targetCategory.labelEn,
      sourceCategory: categoryName,
      sourceCategorySlug: `gpt-image2-${file.replace(/^gallery-|\.md$/g, '')}`,
      styles: [],
      scenes: [],
      promptZh: '',
      promptEn: prompt,
      promptHash,
      imageUrl: imagePath ? `${RAW_ROOT}/${imagePath}` : null,
      imageAltZh: title,
      imageAltEn: title,
      featured: false,
      sourceUrlZh: `${GITHUB_ROOT}/skills/gpt-image/references/${file}`,
      sourceUrlEn: `${GITHUB_ROOT}/skills/gpt-image/references/${file}`,
      sourceRepo: REPO,
      sourceFile: `skills/gpt-image/references/${file}`,
      sourceEntryNumber: number,
      attribution: metadata.author || (metadata.curated ? 'Curated by GPT-Image2-Skill' : ''),
      externalSourceLabel: metadata.externalSourceLabel,
      externalSourceUrl: metadata.externalSourceUrl,
      cites: metadata.cites,
      sizePreset: metadata.sizePreset,
      dimensions: metadata.dimensions,
      license: metadata.externalSourceUrl ? 'Source attribution retained' : 'MIT',
    });
  }
  return entries;
};

export async function fetchGptImage2Skill() {
  const indexResponse = await fetch(`${RAW_ROOT}/${INDEX_PATH}`);
  if (!indexResponse.ok) throw new Error(`GPT-Image2-Skill 索引同步失败：${indexResponse.status}`);
  const index = await indexResponse.text();
  const categoryPattern = /^\|\s*[^|]+?\s+([^|]+?)\s*\|\s*\[`([^`]+\.md)`\]/gm;
  const categoryFiles = [];
  let match;
  while ((match = categoryPattern.exec(index))) {
    categoryFiles.push({ name: cleanText(match[1]), file: match[2] });
  }

  const results = await Promise.all(categoryFiles.map(async ({ name, file }) => {
    const response = await fetch(`${RAW_ROOT}/skills/gpt-image/references/${file}`);
    if (!response.ok) throw new Error(`${file} 同步失败：${response.status}`);
    const content = await response.text();
    return {
      category: {
        ...mappedCategory(name),
        descriptionZh: `包含由 ${name} 归并而来的案例。`,
        descriptionEn: `Includes examples consolidated from ${name}.`,
        count: Number(content.match(/Count:\s*(\d+)/)?.[1] || 0),
        source: REPO,
      },
      prompts: parseCategoryFile({ content, file, categoryName: name }),
    };
  }));

  return {
    categories: results.map((result) => ({ ...result.category, count: result.prompts.length })),
    prompts: results.flatMap((result) => result.prompts),
  };
}
