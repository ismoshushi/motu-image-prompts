import { readFile } from 'node:fs/promises';

let dataset;
try {
  dataset = JSON.parse(await readFile('data/prompts.json', 'utf8'));
} catch {
  console.error('缺少 data/prompts.json，请先运行 npm run sync。');
  process.exit(1);
}

const errors = [];
const seen = new Set();
for (const [index, item] of dataset.prompts.entries()) {
  const label = item.slug || `第 ${index + 1} 条`;
  if (!item.slug || !(item.titleZh || item.titleEn) || !(item.promptZh || item.promptEn) || !(item.sourceUrlZh || item.sourceUrlEn)) errors.push(`${label}: 缺少必填字段`);
  if (seen.has(item.slug)) errors.push(`${label}: slug 重复`);
  seen.add(item.slug);
  if (item.promptZh?.endsWith('…')) errors.push(`${label}: 中文提示词疑似被截断`);
  if (item.promptEn?.endsWith('…')) errors.push(`${label}: 英文提示词疑似被截断`);
}

if (errors.length) {
  console.error(errors.slice(0, 30).join('\n'));
  console.error(`验证失败，共 ${errors.length} 个问题。`);
  process.exit(1);
}

console.log(`验证通过：${dataset.prompts.length} 条提示词，slug 无重复，必填字段完整。`);
