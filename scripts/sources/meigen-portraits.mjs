import { createHash } from 'node:crypto';

const CATEGORY = {
  category: 'portrait-fashion',
  categoryLabelZh: '人像与时尚',
  categoryLabelEn: 'Portrait & Fashion',
  sourceCategory: '人像摄影',
  sourceCategorySlug: 'meigen-portrait-photography',
};

const entries = [
  {
    id: '2052753391093469564',
    titleZh: '百叶窗金色光影东亚女性特写',
    titleEn: 'Golden Venetian-Blind Portrait',
    promptEn: `A stunning, high-resolution close-up portrait of an East Asian woman, gazing directly at the camera with a soulful expression. She is in a softly lit room, bathed in a warm, golden-orange sunlight coming from the side, filtered through venetian blinds. This lighting creates distinct, dark, parallel stripe shadows across her face, eyes, and hair, giving the composition a dramatic, cinematic feel. Her skin has a soft, sun-kissed, and smooth texture. She wears vibrant, glossy red lipstick that reflects the light, and small, ornate pearl drop earrings, partially in shadow. She is wearing a cozy, red knit turtleneck sweater. Subtle icons are placed on the collar: a tiny, stylized red heart to her lower left and a small white dove to the lower right. Her brown eyes are full of expression, reflecting the light, and her brown hair is slightly wavy and soft. The background is a soft, dark, indeterminate gradient, enhancing the contrast and focus on her face. The style is an editorial-quality, intimate beauty photograph with rich color grading.`,
  },
  {
    id: 'community_e29712f7-61d9-45a7-bc6c-3235d7f20b5e',
    imageUrl: 'https://images.meigen.ai/generations/2026-07/community_e29712f7-61d9-45a7-bc6c-3235d7f20b5e.png',
    titleZh: '障子窗格光影日系亲密人像',
    titleEn: 'Shoji-Screen Intimate Portrait',
    promptEn: `Intimate close-up portrait of a young Japanese woman kneeling near a paper shoji screen, late-afternoon golden sunlight slicing through the screen's wooden lattice, throwing sharp geometric grid shadows across her face and hair — more dramatic and angular than blinds. Soulful, direct gaze into camera. Warm sun-kissed skin, glossy red lips, small pearl drop earrings caught between light and shadow, red knit turtleneck sweater with tiny embroidered heart and dove on the collar. Dark hair softly wavy, backlit strands glowing. Background falls into deep shadow with a faint suggestion of tatami texture below frame. Kore-eda-inspired natural warmth, cinematic 35mm film look, rich contrast, soft grain.`,
  },
  {
    id: '2071620172977488298',
    titleZh: '逆光乱发女性超近景侧脸',
    titleEn: 'Backlit Windswept Side Profile',
    promptEn: `Ultra-close side-profile portrait of a young woman, vertical 9:16 composition, subject placed on the right side of the frame, her face turned toward the upper-left light. She is not looking into the camera, but gazing toward a window or distant sunlight. Keep a realistic human handheld photography feeling, not a polished studio beauty shot. She has natural black long hair with slight soft waves, bangs and many loose strands blown across her face, crossing her eyes, cheeks, nose bridge, and lips, with warm golden backlight glowing along the hair edges. Her skin is fair with a cool pink undertone, warmed locally by sunlight, with a soft natural rosy tint on the cheeks. Visible skin is mainly the partial forehead, eye area, nose bridge, cheeks, area around the lips, chin, and a small edge of the neck. The skin should look delicate but naturally textured, feeling soft, warm, slightly dewy, and real to the touch. Avoid plastic skin or excessive retouching. Makeup is clean and natural, with subtle blush, glossy rose-pink or peach-pink lips, and moist eyes with strong catchlights. She wears a cream-white or off-white knitted sweater, with soft fine knit texture visible near the bottom of the frame. Pale yellow out-of-focus flowers or leaves appear in the top foreground, creating partial obstruction, warm bokeh, and irregular light blocking. The background is a blurred wooden railing, window frame, or balcony-like space with blue sky or cool outdoor window light, creating a warm-cool blue-orange contrast. The photography style is real handheld natural-light portraiture with a soft Japanese lifestyle-photo feeling, as if shot close with a smartphone telephoto lens or compact camera. The camera is slightly below or near face level, subtly looking upward. Extreme close-up side-profile framing, with bold facial cropping. Use very shallow depth of field: the eyes and part of the cheek are relatively sharp, while the foreground flowers and background are heavily blurred; some hair strands are sharp while others fall into soft focus. Warm golden afternoon sunlight enters diagonally from the upper-left, passing through hair and plants, creating tiny highlights on the cheeks, nose bridge, lips, and hair edges. Slightly blown highlights, subtle film grain, and candid imperfections should remain. The overall mood feels like an afternoon that has already passed: she had just lifted her head toward the window, the wind moved through her hair, sunlight stayed on her face, and the image carries a quiet, soft, intimate warmth.`,
  },
  {
    id: '2067177420982243555',
    titleZh: '艺术运动模糊时尚肖像',
    titleEn: 'Artistic Motion-Blur Portrait',
    promptEn: `Intentional artistic motion-blur portrait, shot on a smartphone or long-exposure camera. Extreme close-up of a woman with a loose braided low bun and a long face-framing strand covering half her face. Looking down and to the side, one eye mostly hidden, lips slightly parted. Large statement gold earrings, bare shoulders, smooth glowing skin, soft peach blush, subtle highlighter, delicate makeup, defined lashes, matte dusty-rose lips with darker liner. Eye-level framing, face slightly right of center. Neutral light gray or white background. Soft natural window light, warm creamy golden tones. Strong intentional motion blur throughout the image, especially in the earrings and hair, with slightly sharper focus at the center of the face. Cinematic fashion editorial aesthetic, elegant, mysterious, atmospheric, minimal noise, soft contrast, warm color grading. Vertical 9:16.`,
  },
  {
    id: '2071460275421954412',
    titleZh: '四国女性黄金时刻时尚肖像',
    titleEn: 'Four Nationality Golden-Hour Portraits',
    promptEn: `Korean\nUltra-realistic editorial portrait of a young Korean woman, upper-chest framing, long soft black waves, luminous porcelain skin, subtle makeup, direct eye contact, off-shoulder beige knit top, golden-hour window light casting geometric shadows across her face, textured beige plaster wall background, cinematic mood, shallow depth of field, Canon EOS R5 Mark II, 85mm f/1.2, photorealistic.\n\nRussian\nUltra-realistic fashion portrait of a young Russian woman, fair skin, blue-gray eyes, dark brown wavy hair, soft freckles, understated makeup, confident yet thoughtful gaze, off-shoulder cream knit top, golden-hour sunlight creating dramatic light-and-shadow interplay, textured beige backdrop, premium magazine photography, shallow depth of field.\n\nAmerican\nUltra-realistic editorial portrait of a young American woman, sun-kissed skin, light hazel eyes, long soft brunette waves, natural makeup, confident yet approachable expression, off-shoulder beige knit top, warm golden-hour sunlight casting geometric shadows across her face, textured beige plaster wall background, luxury beauty campaign aesthetic, cinematic lighting, shallow depth of field, 85mm lens, photorealistic.\n\nPortuguese\nUltra-realistic editorial portrait of a young Portuguese woman, olive-toned skin, hazel-green eyes, long chestnut waves, natural beauty, subtle makeup, elegant direct gaze, off-shoulder beige knit top, warm Mediterranean-inspired golden sunlight with geometric shadows, textured plaster wall, cinematic luxury fashion campaign, shallow depth of field, 85mm lens.`,
  },
  {
    id: '2016126230022791295',
    titleZh: '樱桃红霓虹电影感女性肖像',
    titleEn: 'Cherry-Red Neon Cinematic Portrait',
    promptEn: `Hyper-realistic cinematic portrait of a young woman, with soft skin and deep gaze, standing by a window, her face illuminated by cherry red neon reflections, shadows forming abstract patterns across her features. Wine-red tones dominate the background, giving an atmospheric editorial mood. Studio-level detail, glossy textures, sharp focus. --ar 2:3 --v 6.1 --style raw`,
  },
  {
    id: '2076161025679008153',
    titleZh: '花树黄金时刻户外女性肖像组',
    titleEn: 'Golden-Hour Flowering-Tree Portraits',
    promptEn: `Ultra-realistic DSLR portrait of a beautiful young East Asian woman sitting outdoors beneath a blooming tree during golden hour, looking back over her shoulder directly at the camera with a calm, dreamy expression. She has long, naturally wavy dark brown hair cascading over her back, with a small vibrant red flower tucked behind one ear. She wears elegant gold oval drop earrings and an oversized off-shoulder deep crimson red knit sweater exposing one shoulder. One hand gently brushes through her hair while the other rests naturally out of frame. Warm golden sunlight creates soft glowing skin with subtle specular highlights and natural rim light around her hair. Background filled with large flowering trees, warm autumn foliage, creamy bokeh, and a softly blurred park pathway. Rich cinematic color grading with warm reds and earthy browns, shallow depth of field, ultra-detailed skin texture, realistic hair strands, natural makeup, soft peach lips, sharp eyes with catchlights, HDR photography, 85mm lens, f/1.8, RAW photo, masterpiece, ultra photorealistic, 8K.\n\nPrompt 2 — Low Angle Outdoor Portrait with Tree Shadows\nUltra-realistic outdoor portrait of a beautiful young East Asian woman photographed from a slightly low-angle perspective beneath a flowering tree on a bright sunny day. She tilts her head gently toward the camera while making soft eye contact with a relaxed, elegant smile. Long voluminous dark brown wavy hair flows naturally over her shoulders, adorned with a small vivid red flower near one ear. She wears delicate gold oval drop earrings and a loose off-shoulder deep crimson red knit sweater. Natural tree leaves cast beautiful dappled shadows across her face and sweater, creating artistic sunlight patterns. Bright blue sky with fluffy white clouds and flowering tree branches fill the background, rendered with soft creamy bokeh. Warm cinematic lighting, luminous skin, subtle glow, realistic facial details, glossy lips, detailed eyes with natural catchlights, shallow depth of field, HDR, 85mm portrait lens, f/2.0, professional fashion photography, RAW, ultra photorealistic, masterpiece quality, 8K.`,
  },
  {
    id: 'community_23a130cf-2b5d-4b45-9be4-fcc0d8a654df',
    imageUrl: 'https://images.meigen.ai/generations/2026-06/community_23a130cf-2b5d-4b45-9be4-fcc0d8a654df.png',
    titleZh: '黑色高领毛衣禁欲系默片人像',
    titleEn: 'Minimalist Black-Turtleneck Portrait',
    promptZh: `35mm 镜头、f/1.8 模拟真实相机参数，以极简主义的视觉风格呈现，一位冷艳美人穿着黑色高领毛衣，站在光影交织之处。她深棕色的长发被盘成低盘发，几缕碎发随意散落，发丝在光的映照下微微发亮。她微微侧过脑袋，纤长的手指轻触鼻尖，水光猫眼色指甲油，眼睫低垂，红唇微张，欲说还休的朦胧情愫在眼中流转。细腻的笔触描绘出她流畅的面部轮廓，阴影里藏着未诉说的故事，画面充满禁欲系美学的神秘氛围，每一处明暗变化都有强烈的戏剧张力，将这一瞬间定格成富有诗意的默片画面。`,
  },
  {
    id: 'community_9fe0b015-20bd-4b96-b82a-eef48a20a33d',
    imageUrl: 'https://images.meigen.ai/generations/2026-06/community_9fe0b015-20bd-4b96-b82a-eef48a20a33d.png',
    titleZh: '窗光叶影白色针织衫半身人像',
    titleEn: 'Window-Light Leaf-Shadow Portrait',
    promptEn: `Vertical half-body portrait photo, young East Asian woman with long black silky hair, tilting her head gently, cold and soft temperament, wearing white deep V knit sweater, clear collarbone and slim shoulder lines, showing slender figure, slanted natural window light, leaf shadow projected clearly on chest skin, dark window background, heavy deep black shadow, dramatic high contrast lighting, partial beam of light, film grain, translucent clean skin, soft atmospheric light, shot on Sony camera, shallow depth of field, realistic raw photo, 8K ultra detailed --ar 9:19 --v 6.0 --style raw --s 230 --q 2`,
  },
  {
    id: '2039956008555229561',
    titleZh: '森林漏光胶片感回眸人像',
    titleEn: 'Forest Light-Leak Film Portrait',
    promptEn: `A cinematic portrait of an Asian woman standing in a quiet forest, captured in a spontaneous moment as she turns her head slightly back toward the camera. Soft sunlight filters through tall trees, creating dramatic patches of light and shadow across her face and body. A distinct vertical light leak streak cuts through the frame, adding a striking analog imperfection. Her hair moves gently in the breeze, with loose strands catching the light, adding natural motion and softness. She wears a simple light-colored blouse layered with dark suspenders, creating a subtle contrast against the deep forest tones. Her expression is calm, slightly distant, and introspective, with her eyes softly meeting the camera. The background is filled with blurred tree trunks and glowing bokeh highlights, creating depth and atmosphere. The color grading features rich teal shadows and warm orange highlights, giving a cinematic teal-and-orange contrast. The image has a strong analog film aesthetic with visible grain, soft haze, slight blur, and light distortion. Imperfect framing, natural light flare, and film burn elements enhance the nostalgic 35mm film look. Cinematic film still, dreamy and moody atmosphere, poetic forest setting, high detail, HD quality.`,
  },
  {
    id: '2016357678680039438',
    titleZh: '粉色花朵前景诗意时尚特写',
    titleEn: 'Poetic Blossom-Framed Portrait',
    promptEn: `Poetic cinematic close-up portrait of a young woman partially obscured by soft pink blossoms and petals in the foreground. Young woman, expressive green eyes, calm introspective expression, natural beauty, ultra-realistic skin texture, wearing a shimmering rose-gold high-neck dress that catches warm sunlight. Close-up framing with the face in sharp focus through gaps in the flowers; soft pink blossoms and petals blur in the foreground, with a deep blue sky and creamy bokeh behind her. Golden-hour lighting creates delicate petal shadows across her skin and makes the dress glow. Use pastel pinks, warm peach tones, rose-gold and deep blue, a romantic spring atmosphere, shallow depth of field, editorial fashion photography, cinematic color grading, ultra-realistic 8K detail.`,
  },
  {
    id: '2071407793899540717',
    titleZh: '柠檬蜜桃水光妆美妆特写',
    titleEn: 'Lemon-Peach Dewy Makeup Close-Up',
    promptZh: `钻绒：柠檬蜜桃水光妆。底妆为冷白奶瓷肌，面中和鼻梁高提亮，皮肤亮白净透但保留真实柔焦质感。眉毛为浅灰棕柔雾眉，眉形平缓，存在感低。眼妆使用浅蜜桃粉、玫瑰粉在上眼皮和眼下轻柔晕染，眼下腮红连接卧蚕和苹果肌，形成粉色微醺感；下眼睑加入香槟金、柠檬金细闪眼线，眼头、卧蚕和眼中高光明亮。细棕色眼线自然拉长，睫毛纤长卷翘、根根分明，下睫毛轻微强调。唇妆为玻璃感蜜桃果冻唇，唇中高光强，唇峰清晰，边缘柔和，水光嘟唇效果。`,
  },
  {
    id: 'community_53b806c1-8c01-4957-8d40-eb0df0c832d8',
    imageUrl: 'https://images.meigen.ai/generations/2026-07/community_53b806c1-8c01-4957-8d40-eb0df0c832d8.png',
    titleZh: '黑色针织衫神秘时尚棚拍',
    titleEn: 'Black-Knit Mysterious Beauty Portrait',
    promptEn: `Ultra-realistic fashion beauty portrait of a stylish young woman with long silky dark-brown hair and soft curtain bangs, wearing an oversized chunky black knit sweater. She poses elegantly against a deep black studio background, partially covering one eye with her hand while gazing confidently into the camera. Soft fair skin, natural matte makeup, warm blush, defined brows, subtle eyeliner, and rich velvet-red lips. Calm, mysterious, high-fashion expression with a modern editorial aesthetic. Professional studio lighting creates dramatic contrast between light and shadow, emphasizing facial structure, hair texture, and the cozy knit fabric. Minimalist composition, luxury fashion campaign mood, sophisticated monochrome styling, clean black-on-black palette with subtle skin-tone highlights. Sharp focus on the visible eye, premium beauty photography, elegant and timeless atmosphere. Shot on a full-frame camera, 85mm lens, f/1.8, shallow depth of field, ultra-detailed skin texture, soft directional key light, cinematic contrast, high-end magazine editorial, luxury fashion advertisement, photorealistic, HDR, 8K resolution, masterpiece quality. Negative prompt: blurry, low resolution, low quality, bad anatomy, extra fingers, deformed hands, duplicate limbs, asymmetrical eyes, distorted face, cartoon, anime, CGI, painting, plastic skin, excessive retouching, overexposed highlights, underexposed shadows, noise, grain, watermark, logo, text, cluttered background, motion blur, unrealistic proportions, oversaturated colors.`,
  },
];

export const meigenPortraitPrompts = entries.map((entry, index) => {
  const sourceUrl = `https://www.meigen.ai/prompt/${entry.id}`;
  const prompt = entry.promptEn || entry.promptZh;
  const imageExtension = (entry.imageUrl || '').includes('.png') ? 'png' : 'jpg';
  return {
    id: `meigen-portrait-${index + 1}`,
    slug: `meigen-${entry.id}`,
    titleZh: entry.titleZh,
    titleEn: entry.titleEn,
    ...CATEGORY,
    styles: ['portrait', 'photography'],
    scenes: [],
    promptZh: entry.promptZh || '',
    promptEn: entry.promptEn || '',
    promptHash: createHash('sha256').update(prompt.replace(/\s+/g, ' ').trim().toLowerCase()).digest('hex'),
    imageUrl: `/images/meigen/meigen-${entry.id}.${imageExtension}`,
    imageAltZh: entry.titleZh,
    imageAltEn: entry.titleEn,
    featured: false,
    sourceUrlZh: sourceUrl,
    sourceUrlEn: sourceUrl,
    sourceRepo: '',
    attribution: '',
    externalSourceLabel: '',
    externalSourceUrl: '',
    hideSource: true,
    dimensions: '',
    license: 'Source attribution',
  };
});
