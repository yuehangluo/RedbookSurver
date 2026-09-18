/* ============================================================
 * tests.js — 知微心理·题库与计分逻辑
 * 纯前端配置：每个测试用「数据」描述，引擎只做累加与归一化。
 * 计分：李克特 5 点（非常不符合→非常符合，0~4 分）。
 * 中文强调一律用「」全角引号，避免与 JS 字符串定界符 " 冲突。
 * ============================================================ */

/* 李克特 5 点选项生成器：每题只作用于一个主维度 dim。
 * reverse=true 表示「反向计分」题（同意=该维度低分）。 */
function opt5(dim, reverse) {
  const s = reverse ? [4, 3, 2, 1, 0] : [0, 1, 2, 3, 4];
  return [
    { label: "非常不符合", score: { [dim]: s[0] } },
    { label: "不太符合", score: { [dim]: s[1] } },
    { label: "说不清", score: { [dim]: s[2] } },
    { label: "比较符合", score: { [dim]: s[3] } },
    { label: "非常符合", score: { [dim]: s[4] } }
  ];
}

const TESTS = [

  /* ===================== 测试 1：人格原型 ===================== */
  {
    id: "archetype",
    title: "人格原型测评",
    subtitle: "纵览六种内在原型，看清你最有力量的一面",
    emoji: "🜂",
    tag: "自我探索",
    minutes: 8,
    requireCode: false,
    dimensions: [
      { key: "visionary", name: "探索者" },
      { key: "strategist", name: "战略家" },
      { key: "healer", name: "疗愈者" },
      { key: "creator", name: "创造者" },
      { key: "executor", name: "执行者" },
      { key: "connector", name: "联结者" }
    ],
    questions: [
      { text: "我常被尚未被定义的可能性所吸引。", options: opt5("visionary", false) },
      { text: "比起守住已知，我更愿意去触碰未知的边界。", options: opt5("visionary", false) },
      { text: "一个好问题，往往比一个标准答案更让我兴奋。", options: opt5("visionary", false) },
      { text: "我会主动跳出舒适区，去接触陌生的领域。", options: opt5("visionary", false) },
      { text: "我对「事情为什么是这样」始终保有好奇。", options: opt5("visionary", false) },

      { text: "面对复杂局面，我习惯先看清全局再出手。", options: opt5("strategist", false) },
      { text: "我擅长在多条路径中权衡利弊、排定先后。", options: opt5("strategist", false) },
      { text: "出手之前，我会先想清楚三步之后的局面。", options: opt5("strategist", false) },
      { text: "我能在混乱中迅速抓住那个最关键的变量。", options: opt5("strategist", false) },
      { text: "我偏好用系统性方法，而非单凭直觉做判断。", options: opt5("strategist", false) },

      { text: "我很容易感知到身边人情绪的变化。", options: opt5("healer", false) },
      { text: "看到别人受挫，我会本能地想给予支持。", options: opt5("healer", false) },
      { text: "我相信关系，是靠耐心与倾听慢慢长出来的。", options: opt5("healer", false) },
      { text: "我愿意为他人的成长，付出时间与心力。", options: opt5("healer", false) },
      { text: "和谐、被接纳的氛围，对我而言非常重要。", options: opt5("healer", false) },

      { text: "我总有想要亲手做出点什么东西的冲动。", options: opt5("creator", false) },
      { text: "我对「从空白里造出一个东西」充满热情。", options: opt5("creator", false) },
      { text: "哪怕没有回报，我也会投入自己热爱的创作。", options: opt5("creator", false) },
      { text: "我习惯用作品，而不是用言语来表达自己。", options: opt5("creator", false) },
      { text: "我喜欢在空白之中，看见结构一点点成形的那一刻。", options: opt5("creator", false) },

      { text: "一旦定下目标，我会不折不扣地推进到底。", options: opt5("executor", false) },
      { text: "我对「把事情真正做完」有近乎本能的执着。", options: opt5("executor", false) },
      { text: "我擅长把模糊的任务，拆成可执行的步骤。", options: opt5("executor", false) },
      { text: "明确的截止时间，反而能让我进入最佳状态。", options: opt5("executor", false) },
      { text: "我享受把计划一格一格打钩的踏实感。", options: opt5("executor", false) },

      { text: "我擅长在人群中牵线搭桥、促成合作。", options: opt5("connector", false) },
      { text: "我能快速找到不同的人之间的共同点。", options: opt5("connector", false) },
      { text: "我享受把一群人凝聚成一个共同体的过程。", options: opt5("connector", false) },
      { text: "与人相处时，我总能找到让彼此舒服的节奏。", options: opt5("connector", false) },
      { text: "我相信很多难题，靠「对的人」就能被解开。", options: opt5("connector", false) }
    ],
    profiles: {
      visionary: { emoji: "🜂", title: "探索者 · The Explorer", tagline: "被未知牵引，天生好奇", summary: "你有一双永远朝前看的眼睛。比起守住既得，你更愿意去触碰尚未被定义的边界。一个问题比一个答案更让你兴奋，陌生的领域对你而言不是风险，而是召唤。", traits: ["好奇驱动", "拥抱不确定", "前瞻视野"], advice: ["把好奇心落成一个可长期投入的小项目，避免兴趣过于碎片化。", "为探索留出固定时间，否则容易被日常琐事淹没。"], accent: "#4f46e5" },
      strategist: { emoji: "♟", title: "战略家 · The Strategist", tagline: "先看清全局，再落子", summary: "你是那种在出手前先把棋盘看透的人。复杂局面不会让你慌乱，反而激发你抽丝剥茧的快感。你相信，大多数问题都源于没找对那个关键变量。", traits: ["系统思考", "延迟满足", "谋定后动"], advice: ["警惕「过度分析」导致的行动瘫痪，设一个决策 deadline。", "把你的框架分享给别人，往往能反过来校准自己。"], accent: "#0f766e" },
      healer: { emoji: "🌿", title: "疗愈者 · The Healer", tagline: "以共情安顿人心", summary: "你对他人的情绪有天然的雷达。你相信关系是慢慢长出来的，也愿意为别人的成长付出耐心与心力。在你身边，人容易感到被看见、被接纳。", traits: ["高共情", "倾听型", "关系导向"], advice: ["记得给自己的共情设边界，避免被他人的情绪反复透支。", "你的支持很珍贵，先照顾好自己才能更好地照顾别人。"], accent: "#15803d" },
      creator: { emoji: "🎨", title: "创造者 · The Creator", tagline: "从空白里长出结构", summary: "你体内有一股想要亲手造物的冲动。比起消费，你更渴望生产；比起言说，你更相信作品本身。你享受的，是混沌之中结构成形的那一刻。", traits: ["动手本能", "表达欲强", "审美驱动"], advice: ["给创作设一个「完成优于完美」的底线，避免永远停留在构思。", "把热爱变成可分享的作品，会反哺你走得更远。"], accent: "#b45309" },
      executor: { emoji: "⚙", title: "执行者 · The Executor", tagline: "把计划一格格打钩", summary: "你是把蓝图变成现实的那只手。目标一旦定下，你就有不折不扣推进到底的韧性。你享受进度条往前走的感觉，也因此在团队里常被委以「一定能成」的信任。", traits: ["强执行力", "结果导向", "抗拖延"], advice: ["偶尔停下来问「这件事还值得做吗」，避免陷入低效的勤奋。", "把大目标拆得更细，成就感会持续为你供能。"], accent: "#7c3aed" },
      connector: { emoji: "🕸", title: "联结者 · The Connector", tagline: "让对的人彼此遇见", summary: "你是人际关系网络里的节点。你擅长在差异之间找到共同点，也享受把一群人凝聚成一个共同体的过程。很多卡住的事，到你手里就变成了「找对人」。", traits: ["人脉枢纽", "协调力强", "氛围掌控"], advice: ["别只做连接者，也要经营属于你自己的核心能力。", "把牵线后的后续也稍微跟进，信任会因此更扎实。"], accent: "#be123c" }
    },
    compute(scores, answers, dims) {
      const pct = Engine.dimPct(scores, this);
      const top = Engine.topDimension(scores, dims);
      const prof = this.profiles[top];
      const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
      return Object.assign({}, prof, { bars });
    }
  },

  /* ===================== 测试 2：职业赛道 ===================== */
  {
    id: "career",
    title: "职业天赋测评",
    subtitle: "六条职业赛道，定位你最该深耕的那条",
    emoji: "🧭",
    tag: "职业成长",
    minutes: 8,
    requireCode: false,
    dimensions: [
      { key: "create", name: "创造型" },
      { key: "analyze", name: "研究型" },
      { key: "social", name: "社交型" },
      { key: "hands", name: "实操型" },
      { key: "business", name: "经营型" },
      { key: "art", name: "艺术型" }
    ],
    questions: [
      { text: "我喜欢从零设计一套全新的方案。", options: opt5("create", false) },
      { text: "面对老问题，我总想换个框架重新解一遍。", options: opt5("create", false) },
      { text: "我享受头脑风暴里灵光一现的瞬间。", options: opt5("create", false) },
      { text: "我难以忍受日复一日的纯重复工作。", options: opt5("create", false) },
      { text: "我更愿做「没有标准答案」的事。", options: opt5("create", false) },

      { text: "我会本能地追问数据背后的逻辑。", options: opt5("analyze", false) },
      { text: "一个问题没想透，我会寝食难安。", options: opt5("analyze", false) },
      { text: "我偏好用证据，而非感觉来下判断。", options: opt5("analyze", false) },
      { text: "我擅长把复杂现象，抽象成可复用的模型。", options: opt5("analyze", false) },
      { text: "我对「为什么」的执念，常常高于「怎么做」。", options: opt5("analyze", false) },

      { text: "和人深度交流，会让我能量满满。", options: opt5("social", false) },
      { text: "我能很快读懂一个房间里的气氛。", options: opt5("social", false) },
      { text: "我善于在冲突之中，充当调停者。", options: opt5("social", false) },
      { text: "我享受影响并激励他人的过程。", options: opt5("social", false) },
      { text: "团队里如果有我在，协作通常会更顺。", options: opt5("social", false) },

      { text: "我更相信亲手做出来的东西。", options: opt5("hands", false) },
      { text: "比起纸上谈兵，我更愿意直接上手试。", options: opt5("hands", false) },
      { text: "我对工具、流程与手感，格外敏感。", options: opt5("hands", false) },
      { text: "我能在动手中，快速找到问题的症结。", options: opt5("hands", false) },
      { text: "我讨厌只说不做的管理风格。", options: opt5("hands", false) },

      { text: "我习惯用投入产出比，衡量一件事值不值得做。", options: opt5("business", false) },
      { text: "我对市场机会与供需缺口，格外敏锐。", options: opt5("business", false) },
      { text: "我享受把资源组织起来、产生更大价值的过程。", options: opt5("business", false) },
      { text: "我对「这件事怎么变现」总有本能反应。", options: opt5("business", false) },
      { text: "我敢于为看准的机会，承担可控的风险。", options: opt5("business", false) },

      { text: "我对美、节奏与氛围，有近乎苛刻的感知。", options: opt5("art", false) },
      { text: "我常从艺术与感官体验里获得灵感。", options: opt5("art", false) },
      { text: "我希望自己的表达，带有鲜明的个人印记。", options: opt5("art", false) },
      { text: "我难以接受粗制滥造、毫无审美的产出。", options: opt5("art", false) },
      { text: "我相信好的形式，本身就是内容的一部分。", options: opt5("art", false) }
    ],
    profiles: {
      create: { emoji: "💡", title: "创造型天赋 · The Innovator", tagline: "在空白里看见新可能", summary: "你的天赋在于「重新定义问题」。你受不了重复，却对从零搭建充满热情。适合你的，是那些没有标准答案、允许你不断推翻重来的领域。", traits: ["框架重构", "点子密度高", "厌弃重复"], advice: ["把发散的创意收敛成一件能落地的事，避免一直停在构思层。", "找一位执行型搭档，会让你的创意真正长出翅膀。"], accent: "#4f46e5" },
      analyze: { emoji: "🔬", title: "研究型天赋 · The Analyst", tagline: "在逻辑里寻找确定", summary: "你是天生的解谜者。一个问题没想透，你睡不踏实；你相信证据胜过感觉，也擅长把混沌抽象成模型。深度，是你的舒适区。", traits: ["逻辑严密", "追根究底", "模型思维"], advice: ["警惕分析成瘾——有时「先做一个小实验」比「再想三天」更高效。", "把你的结论讲给外行听，能检验你是否真的想透了。"], accent: "#0f766e" },
      social: { emoji: "🤝", title: "社交型天赋 · The Catalyst", tagline: "在关系里创造能量", summary: "你的天赋在人。你读得懂气氛，也点得燃别人。深度交流让你充电而非耗电，团队因你而更顺。你天生适合那些「以人为核心」的事业。", traits: ["高人际敏锐", "激励他人", "冲突调解"], advice: ["别把「被需要」误当成自我价值，留出独处回血的时间。", "把影响力沉淀为方法论，而不只是靠个人魅力。"], accent: "#be123c" },
      hands: { emoji: "🛠", title: "实操型天赋 · The Builder", tagline: "在动手里逼近真相", summary: "你是那种「做了才知道」的人。你信手感、信工具、信一遍遍试出来的手感。抽象讨论让你不耐，真东西落地才让你踏实。", traits: ["强行动力", "手感敏锐", "结果可见"], advice: ["在动手前花十分钟想清楚目标，能少走很多弯路。", "把经验沉淀为可复用的流程或模板，放大你的价值。"], accent: "#b45309" },
      business: { emoji: "📈", title: "经营型天赋 · The Operator", tagline: "在价值交换里看见机会", summary: "你的脑子里天然有一本账。你懂供需、懂节奏、也敢为看准的机会下注。你享受把资源重新组织、产生更大回报的过程。", traits: ["商业嗅觉", "资源整合", "风险可控"], advice: ["警惕为增长牺牲底线，长期主义才是经营者的护城河。", "把直觉背后的判断写下来，复盘会让你下一次下注更准。"], accent: "#7c3aed" },
      art: { emoji: "🎭", title: "艺术型天赋 · The Aesthete", tagline: "在美里安放表达", summary: "你对美有近乎本能的苛求。灵感常从感官体验里来，你也渴望自己的表达带上鲜明的个人印记。对你而言，形式从来不是附属，而是内容本身。", traits: ["审美敏锐", "表达驱动", "风格鲜明"], advice: ["把审美能力产品化，让它可被他人需要、被市场看见。", "在「为艺术」与「为受众」之间找平衡，作品才能被传递。"], accent: "#15803d" }
    },
    compute(scores, answers, dims) {
      const pct = Engine.dimPct(scores, this);
      const top = Engine.topDimension(scores, dims);
      const prof = this.profiles[top];
      const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
      return Object.assign({}, prof, { bars });
    }
  },

  /* ===================== 测试 3：综合能量 ===================== */
  {
    id: "energy",
    title: "综合能量测评",
    subtitle: "五大生命领域，看清你此刻的能量流向",
    emoji: "🔆",
    tag: "自我觉察",
    minutes: 7,
    requireCode: false,
    dimensions: [
      { key: "wealth", name: "财富" },
      { key: "love", name: "情感" },
      { key: "career", name: "事业" },
      { key: "health", name: "身心" },
      { key: "mind", name: "心智" }
    ],
    questions: [
      { text: "我对自己的收入结构和发展空间感到乐观。", options: opt5("wealth", false) },
      { text: "我正在为更稳健的财务未来，做具体的规划。", options: opt5("wealth", false) },
      { text: "我对「让已有资源生出新价值」有清晰可行的想法。", options: opt5("wealth", false) },
      { text: "我相信自己有能力，持续创造更多价值。", options: opt5("wealth", false) },
      { text: "我当下的资源，足以支撑我想做的事。", options: opt5("wealth", false) },
      { text: "我对物质层面的安全感，比较踏实。", options: opt5("wealth", false) },

      { text: "我在亲密关系里，能坦然做自己。", options: opt5("love", false) },
      { text: "我最近和在意的人相处，是温暖的。", options: opt5("love", false) },
      { text: "我愿意为重要关系，投入时间与耐心。", options: opt5("love", false) },
      { text: "我能顺畅地表达，也被回应情感上的需求。", options: opt5("love", false) },
      { text: "我对「被爱」这件事，抱有信心。", options: opt5("love", false) },
      { text: "我的情感生活，目前是充盈而非匮乏的。", options: opt5("love", false) },

      { text: "我对自己的职业方向，感到笃定。", options: opt5("career", false) },
      { text: "我手头的工作，能带来真实的成就感。", options: opt5("career", false) },
      { text: "我看得见自己接下来一步的成长路径。", options: opt5("career", false) },
      { text: "我所在的平台或赛道，让我有奔头。", options: opt5("career", false) },
      { text: "我愿意为长期目标，延迟当下的满足。", options: opt5("career", false) },
      { text: "我对「把事做成」有持续的掌控感。", options: opt5("career", false) },

      { text: "我近来的精力水平，足以应对日常。", options: opt5("health", false) },
      { text: "我的睡眠与作息，基本在可控范围内。", options: opt5("health", false) },
      { text: "我会主动照顾身体，而不是一味透支它。", options: opt5("health", false) },
      { text: "运动或静心，能让我重新充上电。", options: opt5("health", false) },
      { text: "我对自己的体态与状态，基本满意。", options: opt5("health", false) },
      { text: "我很少被长期的疲惫或不适拖住。", options: opt5("health", false) },

      { text: "我拥有能让自己平静下来的内在锚点。", options: opt5("mind", false) },
      { text: "我对世界，保有持续的好奇与思考。", options: opt5("mind", false) },
      { text: "我能和自己的情绪，保持一点距离地去观察。", options: opt5("mind", false) },
      { text: "我常感到生活有某种超出日常的意义。", options: opt5("mind", false) },
      { text: "我享受独处时，不被打扰的精神空间。", options: opt5("mind", false) },
      { text: "我对「成为什么样的人」，有朦胧但真实的答案。", options: opt5("mind", false) }
    ],
    profiles: {
      wealth: { emoji: "💰", title: "财富能量主导", tagline: "你正聚焦于把价值做实", summary: "此刻你的能量明显流向「财富」一域。你对自己创造价值的能力有信心，也在为更稳健的财务未来布局。这种务实的底气，是其他领域生长的土壤。", traits: ["价值敏感", "规划意识", "务实底气"], advice: ["警惕把自我价值单一绑定在收入上，留一点不被量化的空间。", "把财务安全感转化为尝试新事物的底气，而非囤积的焦虑。"], accent: "#b45309" },
      love: { emoji: "💗", title: "情感能量主导", tagline: "你正被关系与温度滋养", summary: "此刻你的能量明显流向「情感」一域。你能在关系里做自己，也愿意为重要的人付出。温暖的连接，正在成为你面对世界的底气。", traits: ["关系导向", "情感丰沛", "被爱确信"], advice: ["在投入关系的同时，保留属于你自己的精神角落。", "把「被爱」的确认，更多从内在而非他人的反馈里获得。"], accent: "#be123c" },
      career: { emoji: "🚀", title: "事业能量主导", tagline: "你正走在上升的轨道上", summary: "此刻你的能量明显流向「事业」一域。你对方向笃定，也从手头的事里拿到成就感。这种「把事做成」的掌控感，正在为你积累长期的复利。", traits: ["目标笃定", "成就驱动", "成长可见"], advice: ["留意事业之外的领域是否被长期忽视，木桶的短板会突然漏水。", "把阶段性成果记录下来，低谷时它能托住你。"], accent: "#4f46e5" },
      health: { emoji: "🌱", title: "身心能量主导", tagline: "你正把根基养厚", summary: "此刻你的能量明显流向「身心」一域。你开始真正照顾这副身体与状态，而不是一味透支。被照料的精力，会反哺你奔赴其他领域。", traits: ["自我照料", "节律稳定", "精力在线"], advice: ["把运动或静心固化为日常节律，别等透支了才补救。", "身心状态好了，记得主动把能量导流去你真正想推进的事。"], accent: "#15803d" },
      mind: { emoji: "🌌", title: "心智能量主导", tagline: "你正向内寻得秩序", summary: "此刻你的能量明显流向「心智」一域。你拥有让自己平静的锚点，也对生活保持着意义层面的追问。这份内在的秩序，是你面对外部喧嚣的压舱石。", traits: ["内省稳定", "意义追寻", "情绪觉察"], advice: ["别让向内探索变成逃避行动的借口，想清楚就迈出一小步。", "把感悟落笔或落行，心智的能量才会真正改变现实。"], accent: "#0f766e" }
    },
    compute(scores, answers, dims) {
      const pct = Engine.dimPct(scores, this);
      const top = Engine.topDimension(scores, dims);
      const prof = this.profiles[top];
      const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
      return Object.assign({}, prof, { bars });
    }
  },

  /* ===================== 测试 4：亲密依恋（需兑换码） ===================== */
  {
    id: "love",
    title: "亲密依恋风格测评",
    subtitle: "四种依恋原型，读懂你在关系里的模式",
    emoji: "💞",
    tag: "关系深层 · 专业版",
    minutes: 9,
    requireCode: true,
    dimensions: [
      { key: "secure", name: "安全型" },
      { key: "anxious", name: "焦虑型" },
      { key: "avoidant", name: "疏离型" },
      { key: "fearful", name: "恐惧型" }
    ],
    questions: [
      { text: "在亲密关系里，我能够坦然表达自己的需要。", options: opt5("secure", false) },
      { text: "当伴侣暂时不在身边，我也能安心做自己的事。", options: opt5("secure", false) },
      { text: "冲突过后，我相信关系可以修复如初。", options: opt5("secure", false) },
      { text: "我既不害怕靠近，也不恐惧失去。", options: opt5("secure", false) },
      { text: "我对自己「值得被爱」这件事，比较确信。", options: opt5("secure", false) },
      { text: "我能在依赖与独立之间，找到舒服的平衡。", options: opt5("secure", false) },
      { text: "我很少因为对方没秒回，就陷入慌乱。", options: opt5("secure", false) },
      { text: "我愿意在关系里，展现真实的脆弱。", options: opt5("secure", false) },

      { text: "对方稍微冷淡，我就会怀疑是不是自己哪里做错了。", options: opt5("anxious", false) },
      { text: "我常需要反复确认「你爱我」，才能真的安心。", options: opt5("anxious", false) },
      { text: "独处时，我容易感到被抛弃的不安。", options: opt5("anxious", false) },
      { text: "我会在关系里，不自觉地讨好对方。", options: opt5("anxious", false) },
      { text: "越是重要的人，我越害怕失去他。", options: opt5("anxious", false) },
      { text: "我常把对方的沉默，解读为不爱了。", options: opt5("anxious", false) },
      { text: "没有时刻的联结，我会觉得关系不稳。", options: opt5("anxious", false) },
      { text: "我容易因为小事，在夜里反复回想、难以入睡。", options: opt5("anxious", false) },

      { text: "太亲密会让我本能地想后退一步。", options: opt5("avoidant", false) },
      { text: "我更习惯把情绪封存，自己慢慢消化。", options: opt5("avoidant", false) },
      { text: "依赖别人，会让我感到不自在，甚至软弱。", options: opt5("avoidant", false) },
      { text: "我不太愿意展露内心深处的柔软。", options: opt5("avoidant", false) },
      { text: "当关系变得沉重，我倾向于抽离。", options: opt5("avoidant", false) },
      { text: "我更享受有清晰边界、互不侵扰的距离感。", options: opt5("avoidant", false) },
      { text: "承诺对我而言，像一种束缚。", options: opt5("avoidant", false) },
      { text: "我不喜欢被人过多地窥探和介入。", options: opt5("avoidant", false) },

      { text: "我既渴望亲密，又害怕靠太近会受伤。", options: opt5("fearful", false) },
      { text: "我常在「想靠近」和「想逃开」之间拉扯。", options: opt5("fearful", false) },
      { text: "过去受过的伤，让我很难全然信任别人。", options: opt5("fearful", false) },
      { text: "我会在关系升温时，莫名地想推开对方。", options: opt5("fearful", false) },
      { text: "我害怕被爱，因为那往往意味着迟早会失去。", options: opt5("fearful", false) },
      { text: "我总在预判关系里最坏的可能。", options: opt5("fearful", false) },
      { text: "亲密对我来说，接近于一种冒险。", options: opt5("fearful", false) },
      { text: "我渴望有人懂我，又怕被看懂之后会失望。", options: opt5("fearful", false) }
    ],
    profiles: {
      secure: { emoji: "🕊", title: "安全型依恋 · Secure", tagline: "近而不黏，远而不慌", summary: "你能在亲密里做自己，也容得下对方做自己。你既不害怕靠近，也不恐惧失去；冲突之后你相信关系可以修复。这种稳定，往往源于你对自己「值得被爱」的笃定。", traits: ["情绪稳定", "边界清晰", "修复力强"], advice: ["你的稳定本身就是关系里的礼物，继续以身作则地沟通。", "当对方焦虑或疏离时，你的从容最能托住关系。"], accent: "#15803d" },
      anxious: { emoji: "🔥", title: "焦虑型依恋 · Anxious", tagline: "爱得用力，也怕得用力", summary: "你投入关系时全然交出自己，却也容易在不确定里慌乱。你渴望紧密的联结，需要反复被确认「你还在」。这背后，往往是对「被丢下」的深层不安。", traits: ["高浓度投入", "需安全感确认", "怕被抛弃"], advice: ["把「确认爱」的请求，改成直接表达需要，而非反复试探。", "练习在独处时自我安抚，关系的重量就不必全压在对方身上。"], accent: "#be123c" },
      avoidant: { emoji: "🧊", title: "疏离型依恋 · Avoidant", tagline: "靠近即后退，独立即安全", summary: "亲密一旦逼近，你会本能地后退一步。你更习惯把情绪封存、自己消化，也享受有清晰边界的距离感。对你而言，依赖近乎软弱，承诺则像束缚。", traits: ["高独立", "边界感强", "回避情绪"], advice: ["试着在感到安全的小关系里，多透露一点点真实，看看并不会被吞没。", "把「我需要空间」说出口，比突然抽离更让关系可持续。"], accent: "#0f766e" },
      fearful: { emoji: "🌗", title: "恐惧型依恋 · Fearful", tagline: "既想靠近，又怕受伤", summary: "你站在亲密的门口，一只脚想迈进，一只脚想逃开。你渴望被懂，又怕被看懂后失望；你向往爱，却总预判最坏的可能。这种拉扯，常源于过往未被好好安放的伤害。", traits: ["矛盾拉扯", "信任困难", "自我保护"], advice: ["先练习对自己温柔，关系的信任往往从「我值得被好好对待」开始。", "不必逼自己立刻全情投入，小步试探、慢速靠近同样有效。"], accent: "#7c3aed" }
    },
    compute(scores, answers, dims) {
      const pct = Engine.dimPct(scores, this);
      const top = Engine.topDimension(scores, dims);
      const prof = this.profiles[top];
      const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
      return Object.assign({}, prof, { bars });
    }
  },

  /* ===================== 测试 5：大五人格 OCEAN（需兑换码） ===================== */
  {
    id: "ocean",
    title: "大五人格测评 OCEAN",
    subtitle: "开放性·尽责性·外向性·宜人性·神经质，科学画像",
    emoji: "🧬",
    tag: "人格科学 · 专业版",
    minutes: 8,
    requireCode: true,
    dimensions: [
      { key: "O", name: "开放性 O" },
      { key: "C", name: "尽责性 C" },
      { key: "E", name: "外向性 E" },
      { key: "A", name: "宜人性 A" },
      { key: "N", name: "神经质 N" }
    ],
    questions: [
      { text: "我对陌生的文化与观念，抱有真诚的好奇。", options: opt5("O", false) },
      { text: "我享受抽象思辨与天马行空的想象。", options: opt5("O", false) },
      { text: "我常能从习以为常的事物里，看出新意。", options: opt5("O", false) },
      { text: "我愿意尝试与主流不同的生活方式。", options: opt5("O", false) },
      { text: "艺术、哲学或诗歌，能真正触动我。", options: opt5("O", false) },
      { text: "比起冒险尝鲜，我更偏爱熟悉稳妥的日常节奏。", options: opt5("O", true) },

      { text: "做事前我会列清楚计划，并按节奏推进。", options: opt5("C", false) },
      { text: "我对承诺过的事，有近乎固执的兑现欲。", options: opt5("C", false) },
      { text: "我难以容忍自己的敷衍与半途而废。", options: opt5("C", false) },
      { text: "我习惯把环境和事务，整理得井井有条。", options: opt5("C", false) },
      { text: "我宁可提前完成，也不要压线赶工。", options: opt5("C", false) },
      { text: "我常在截止前才仓促赶工，计划总赶不上变化。", options: opt5("C", true) },

      { text: "在人群之中，我通常能量更高，而非更累。", options: opt5("E", false) },
      { text: "我享受成为关注中心的时刻。", options: opt5("E", false) },
      { text: "我倾向于先行动，再思考。", options: opt5("E", false) },
      { text: "我很容易和陌生人打开话题。", options: opt5("E", false) },
      { text: "独处太久，我会想念人群的喧嚣。", options: opt5("E", false) },
      { text: "人群里待久了，我会想找地方躲起来透口气。", options: opt5("E", true) },

      { text: "我本能地体谅并照顾他人的处境。", options: opt5("A", false) },
      { text: "我尽量不让自己的坚持，伤到别人。", options: opt5("A", false) },
      { text: "我相信合作，大多优于对抗。", options: opt5("A", false) },
      { text: "我更容易看到别人的善意，而非算计。", options: opt5("A", false) },
      { text: "我愿意在分歧里，先伸出和解的手。", options: opt5("A", false) },
      { text: "利益冲突时，我更习惯先护住自己。", options: opt5("A", true) },

      { text: "即便小事，我也容易情绪波动。", options: opt5("N", false) },
      { text: "压力之下，我常感到难以自持。", options: opt5("N", false) },
      { text: "我容易为还没发生的事焦虑。", options: opt5("N", false) },
      { text: "批评会让我久久不能释怀。", options: opt5("N", false) },
      { text: "我的心情像天气，说变就变。", options: opt5("N", false) },
      { text: "即便有事压在心头，我也能很快恢复平静。", options: opt5("N", true) }
    ],
    profiles: {
      O: { emoji: "🌀", title: "高开放性 · Open", tagline: "世界是一本永远翻不完的书", summary: "你对新经验、新观念与新审美都敞开怀抱。你享受思辨与想象，也愿意跳出自在的轨道去尝试不同的活法。对你而言，熟悉是舒适，却不该是边界。", traits: ["求新求异", "抽象思维", "审美敏感"], advice: ["高开放性是创造力的土壤，也别忘了把灵感收束成产出。", "偶尔的专注深耕，能让你的广阔真正沉淀下来。"], accent: "#0f766e" },
      C: { emoji: "📐", title: "高尽责性 · Conscientious", tagline: "把承诺变成可交付的结果", summary: "你可靠、有序、对目标有近乎固执的坚持。计划、条理与兑现欲是你的底色，也因此常被委以「交给你就放心」的信任。", traits: ["可靠有序", "目标驱动", "自律兑现"], advice: ["警惕完美主义拖慢进度，完成往往优于完美。", "给自己留一点弹性，紧绷的弦也需要松一松。"], accent: "#4f46e5" },
      E: { emoji: "⚡", title: "高外向性 · Extraverted", tagline: "在人群与行动里充电", summary: "你的能量，在外部世界与人互动中被点亮。你享受表达、行动与成为焦点的时刻，也更容易从热闹里汲取活力。", traits: ["能量外放", "行动先导", "乐群善谈"], advice: ["别忘了独处也是 replenishment，过度社交会悄悄透支你。", "把外向的优势用在连接与推动上，会事半功倍。"], accent: "#be123c" },
      A: { emoji: "🤲", title: "高宜人性 · Agreeable", tagline: "以善意与和解对待冲突", summary: "你天然体谅他人、偏好合作，也愿意在分歧里先伸出和解的手。你更容易看见别人的善意，也因此常常是关系里的「稳压器」。", traits: ["体恤他人", "合作导向", "冲突回避"], advice: ["温和不等于退让，该划的边界要清晰表达。", "你的善意很珍贵，先照顾好自己才可持续。"], accent: "#15803d" },
      N: { emoji: "🌊", title: "高神经质 · Sensitive", tagline: "情绪更敏锐，也更易被牵动", summary: "你对情绪与压力的感受更敏锐，波动也更明显。这既是负担，也是天赋——敏感的人，往往更能共情、更能察觉细微的变化。", traits: ["情绪敏锐", "压力易感", "深度共情"], advice: ["把敏感转化为觉察力，而非自我消耗；规律作息是你的护城河。", "找到一两个能让你很快平静的锚点，波动来时先稳住自己。"], accent: "#b45309" }
    },
    compute(scores, answers, dims) {
      const pct = Engine.dimPct(scores, this);
      const top = Engine.topDimension(scores, dims);
      const prof = this.profiles[top];
      const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
      return Object.assign({}, prof, { bars });
    }
  }
];
