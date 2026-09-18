/* ============================================================
 * tests_career.js — 知微心理·职业测评扩展包
 * 追加 5 套常用职业测评（每套 30 题），并在末尾统一锁定全部测评。
 * 依赖 tests.js 中已定义的 opt5(dim, reverse) 与全局 TESTS/Engine。
 * 中文强调一律用「」全角引号，避免与 JS 字符串定界符 " 冲突。
 * ============================================================ */
(function () {
  const ADD = [

    /* ===================== 职业测评 1：职业兴趣 RIASEC 六型 ===================== */
    {
      id: "riasec",
      title: "职业兴趣测评 RIASEC",
      subtitle: "霍兰德六型模型，定位你天然契合的职业环境",
      emoji: "🧭",
      tag: "职业测评 · 专业版",
      minutes: 8,
      dimensions: [
        { key: "R", name: "现实型 R" },
        { key: "I", name: "研究型 I" },
        { key: "A", name: "艺术型 A" },
        { key: "S", name: "社会型 S" },
        { key: "E", name: "企业型 E" },
        { key: "C", name: "常规型 C" }
      ],
      questions: [
        { text: "我享受用双手把东西实实在在做出来的过程。", options: opt5("R") },
        { text: "摆弄机械、工具或设备，常让我觉得踏实。", options: opt5("R") },
        { text: "比起坐着开会，我更愿意到现场把事干出来。", options: opt5("R") },
        { text: "修理家里出了故障的物件，我通常自己上手而非立刻找人。", options: opt5("R") },
        { text: "具体的、能看见成果的操作，比空谈更让我投入。", options: opt5("R") },

        { text: "我享受钻研一个问题直到想通的那种快感。", options: opt5("I") },
        { text: "面对未知，我习惯先收集证据再下判断。", options: opt5("I") },
        { text: "抽象的理论模型，常让我觉得迷人。", options: opt5("I") },
        { text: "我偏好用数据和分析说话，而非凭感觉。", options: opt5("I") },
        { text: "纯粹的思考时间，对我而言很重要。", options: opt5("I") },

        { text: "我常用文字、图像或声音表达心里的感受。", options: opt5("A") },
        { text: "美的东西，会让我本能地停下来多看一会儿。", options: opt5("A") },
        { text: "我不喜欢被条条框框限制住表达。", options: opt5("A") },
        { text: "创作时，我容易进入忘记时间的状态。", options: opt5("A") },
        { text: "我希望自己的产出，能留下一点属于自己的印记。", options: opt5("A") },

        { text: "看到别人成长，我会由衷地高兴。", options: opt5("S") },
        { text: "我愿意花时间，去倾听和开导身边人。", options: opt5("S") },
        { text: "教导或带领他人，让我觉得有意义。", options: opt5("S") },
        { text: "我本能地站在弱者或被忽略的一方。", options: opt5("S") },
        { text: "团队的融洽，比输赢更让我在意。", options: opt5("S") },

        { text: "我喜欢推动事情向前，也享受说服别人。", options: opt5("E") },
        { text: "机会面前，我愿意主动站出来牵头。", options: opt5("E") },
        { text: "我对「把事做成、把局面打开」有强烈冲动。", options: opt5("E") },
        { text: "谈判或争取资源，我不会本能退缩。", options: opt5("E") },
        { text: "我享受为一个目标负责，并承担相应风险。", options: opt5("E") },

        { text: "把流程和标准定清楚，会让我安心。", options: opt5("C") },
        { text: "我对数字和细节的准确，有天然的在意。", options: opt5("C") },
        { text: "有规律、可预期的工作，我也能做得安稳。", options: opt5("C") },
        { text: "我偏好按制度办事，而非临场发挥。", options: opt5("C") },
        { text: "一份清晰可查的台账，比口头约定更让我踏实。", options: opt5("C") }
      ],
      profiles: {
        R: { emoji: "🔧", title: "现实型 · Realistic", tagline: "在动手与实操中找到掌控感", summary: "你偏爱具体、可触摸的工作，享受用工具与身体把事情做成。机械、自然、建造类环境最贴合你，抽象的空谈反而让你无感。", traits: ["动手务实", "操作稳健", "结果可见"], advice: ["选能「做出东西」的岗位，你会更有成就感。", "适度补足沟通与表达，能让你的硬实力被更多人看见。"], accent: "#b45309" },
        I: { emoji: "🔬", title: "研究型 · Investigative", tagline: "在追问与论证里安放好奇心", summary: "你天然被问题与真相吸引，享受观察、分析与推理的过程。研究、技术、数据类环境能容纳你的深度，重复性的事务则容易让你走神。", traits: ["勤于探究", "逻辑缜密", "独立思考"], advice: ["给自己的专业留足纵深，你会越走越宽。", "偶尔练习把复杂结论讲给外行听，价值会翻倍。"], accent: "#0f766e" },
        A: { emoji: "🎨", title: "艺术型 · Artistic", tagline: "用创造表达独一无二的自己", summary: "你追求自由的表达与审美上的真诚，讨厌被流程框死。设计、写作、艺术与一切需要想象力的领域，都是你的主场。", traits: ["审美敏感", "表达驱动", "厌恶束缚"], advice: ["把灵感落到可交付的作品，比停留在感觉里更重要。", "在自由与纪律之间找个支点，作品才能被持续看见。"], accent: "#7c3aed" },
        S: { emoji: "🤝", title: "社会型 · Social", tagline: "在成就他人里确认自己", summary: "你乐于与人相处、助人与教导，关系里的温度对你至关重要。教育、咨询、医护、公益类工作能让你持续获得意义感。", traits: ["乐于助人", "善解人意", "协作导向"], advice: ["你的共情是天赋，也别忘了设边界以免透支。", "把「被需要」转化为清晰的职业角色，会更可持续。"], accent: "#15803d" },
        E: { emoji: "🚀", title: "企业型 · Enterprising", tagline: "在推动与影响中打开局面", summary: "你有牵头、说服与承担的冲动，享受为目标负责并把资源聚拢成势。销售、经营、管理类场景能点燃你，纯执行则容易让你按捺不住。", traits: ["主动牵头", "善于说服", "结果导向"], advice: ["把冲劲配上一套方法论，胜率会更高。", "别只盯着赢，留住信任你的人，局面才稳。"], accent: "#be123c" },
        C: { emoji: "🗂️", title: "常规型 · Conventional", tagline: "在秩序与精确里获得安稳", summary: "你重视条理、准确与可预期，擅长把流程跑顺、把账做清。行政、财务、运营、质控类岗位能发挥你的稳定价值。", traits: ["严谨有序", "注重细节", "可靠稳定"], advice: ["你的可靠是稀缺品，记得让它被看见、被定价。", "在安稳之外留一点弹性，环境变动时更从容。"], accent: "#4f46e5" }
      },
      compute(scores, answers, dims) {
        const pct = Engine.dimPct(scores, this);
        const top = Engine.topDimension(scores, dims);
        const prof = this.profiles[top];
        const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
        return Object.assign({}, prof, { bars });
      }
    },

    /* ===================== 职业测评 2：职业性格画像（六维） ===================== */
    {
      id: "workstyle",
      title: "职业性格画像",
      subtitle: "外倾·开放·共情·条理·行动·适应，六维工作风格",
      emoji: "🪞",
      tag: "职业测评 · 专业版",
      minutes: 8,
      dimensions: [
        { key: "E", name: "外倾能量" },
        { key: "O", name: "开放思维" },
        { key: "T", name: "共情倾向" },
        { key: "C", name: "条理性" },
        { key: "A", name: "行动力" },
        { key: "F", name: "适应力" }
      ],
      questions: [
        { text: "在人群里待着，我的能量通常是上升的。", options: opt5("E") },
        { text: "我倾向于先说再做，说着说着就清楚了。", options: opt5("E") },
        { text: "成为话题中心，我不会本能排斥。", options: opt5("E") },
        { text: "我很容易和陌生人搭上话。", options: opt5("E") },
        { text: "热闹散场后，我常还意犹未尽。", options: opt5("E") },

        { text: "我对与我不同的观点，抱有真诚的好奇。", options: opt5("O") },
        { text: "新工具、新方法，我通常愿意抢先试。", options: opt5("O") },
        { text: "我享受天马行空的头脑风暴。", options: opt5("O") },
        { text: "既定流程之外，我常能想到别的路子。", options: opt5("O") },
        { text: "抽象和概念，比琐碎执行更吸引我。", options: opt5("O") },

        { text: "别人情绪一变，我几乎立刻能感觉到。", options: opt5("T") },
        { text: "我容易站在对方鞋子里想问题。", options: opt5("T") },
        { text: "冲突里，我本能想先把气氛缓和下来。", options: opt5("T") },
        { text: "别人的难处，我常记挂在心。", options: opt5("T") },
        { text: "我说话会下意识照顾听者的感受。", options: opt5("T") },

        { text: "我习惯把任务拆成清单再推进。", options: opt5("C") },
        { text: "环境乱了，我会忍不住想整理。", options: opt5("C") },
        { text: "我宁可提前完成，也不要压线赶工。", options: opt5("C") },
        { text: "承诺过的事，我有兑现的执念。", options: opt5("C") },
        { text: "重要的东西，我会归类收好。", options: opt5("C") },

        { text: "想到就做，是我的一贯风格。", options: opt5("A") },
        { text: "等靠要，会让我坐立难安。", options: opt5("A") },
        { text: "我更相信做了再说，边做边调。", options: opt5("A") },
        { text: "风险面前，我通常不会先被吓住。", options: opt5("A") },
        { text: "我讨厌把时间耗在空转的讨论上。", options: opt5("A") },

        { text: "计划被打乱，我通常能很快接住。", options: opt5("F") },
        { text: "临时变动，不会让我太久慌乱。", options: opt5("F") },
        { text: "我能在不确定里，先动起来。", options: opt5("F") },
        { text: "现场的情况，我比纸面方案更信。", options: opt5("F") },
        { text: "我不太执着于「必须按计划来」。", options: opt5("F") }
      ],
      profiles: {
        E: { emoji: "⚡", title: "外倾驱动型", tagline: "在人群与互动里充电", summary: "你的能量来自外部世界。你享受表达、协作与成为连接点，适合需要高频沟通与带动的工作。独处太久，你会想找人。", traits: ["能量外放", "沟通主动", "乐群"], advice: ["把外倾变成「连接与推动」的杠杆。", "留一点独处给深度思考，避免一直浮在表面。"], accent: "#be123c" },
        O: { emoji: "🌀", title: "开放探索型", tagline: "在新鲜与可能里兴奋", summary: "你对新观念、新工具与新路径天然敞开。你适合变化快、鼓励创新的岗位，重复与封闭会让你迅速失去热情。", traits: ["求新求异", "思辨活跃", "不惧变动"], advice: ["广度之外，留一个深耕的支点。", "把灵感收束成可交付，创新才被看见。"], accent: "#0f766e" },
        T: { emoji: "🫶", title: "共情协作型", tagline: "在理解与温度里工作", summary: "你敏锐地感知他人，习惯照顾情绪与关系。你适合需要信任与协作的角色，冷冰冰的纯事务会让你疏远。", traits: ["情绪察觉", "关系导向", "温和"], advice: ["温柔是你的力量，边界也要清晰。", "先照顾好自己，共情才能持续。"], accent: "#15803d" },
        C: { emoji: "📐", title: "条理掌控型", tagline: "在秩序与兑现里安心", summary: "你靠计划、清单与兑现感运转。你适合流程清晰、结果可查的工作，混乱无章会持续消耗你。", traits: ["计划先行", "注重细节", "可靠"], advice: ["警惕完美主义拖慢节奏。", "给不确定留点缓冲，紧绷的弦需松一松。"], accent: "#4f46e5" },
        A: { emoji: "🔥", title: "行动先导型", tagline: "在做中逼近答案", summary: "你想清楚不如先做出来，边干边调是你的节奏。你适合容错高、强调推进的岗位，漫长空转会让你焦躁。", traits: ["说干就干", "结果导向", "敢承担"], advice: ["行动力是优势，关键决策前多停三秒。", "把冲劲配复盘，少走弯路。"], accent: "#b45309" },
        F: { emoji: "🌊", title: "适应弹性型", tagline: "在变动里接住局面", summary: "你不被计划绑架，能在不确定里先动起来。你适合节奏多变、需随机应变的环境，僵化流程反而束缚你。", traits: ["临场应变", "抗压灵活", "现场感强"], advice: ["弹性是你的天赋，也需守住核心目标。", "偶尔主动定计划，避免一直被环境推着走。"], accent: "#7c3aed" }
      },
      compute(scores, answers, dims) {
        const pct = Engine.dimPct(scores, this);
        const top = Engine.topDimension(scores, dims);
        const prof = this.profiles[top];
        const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
        return Object.assign({}, prof, { bars });
      }
    },

    /* ===================== 职业测评 3：职业价值观（六维） ===================== */
    {
      id: "values",
      title: "职业价值观测评",
      subtitle: "财富·成长·自主·成就·助人·平衡，看清你真正的排序",
      emoji: "⚖️",
      tag: "职业测评 · 专业版",
      minutes: 8,
      dimensions: [
        { key: "wealth", name: "财富回报" },
        { key: "growth", name: "持续成长" },
        { key: "autonomy", name: "自主掌控" },
        { key: "achievement", name: "成就认可" },
        { key: "helping", name: "助人意义" },
        { key: "balance", name: "生活平衡" }
      ],
      questions: [
        { text: "一份能明显改善生活水平的收入，对我很重要。", options: opt5("wealth") },
        { text: "我会认真比较不同机会的报酬高低。", options: opt5("wealth") },
        { text: "经济上的安全感，是我选工作的重要底线。", options: opt5("wealth") },
        { text: "钱是我衡量一份工作价值的标准之一。", options: opt5("wealth") },
        { text: "我乐于为更高的回报，付出相应的努力。", options: opt5("wealth") },

        { text: "一份工作若不能让我进步，我会很快失去热情。", options: opt5("growth") },
        { text: "我看重能否持续学到新东西。", options: opt5("growth") },
        { text: "有挑战、能拉伸我的任务，更吸引我。", options: opt5("growth") },
        { text: "我会主动寻找能提升自己的平台与人。", options: opt5("growth") },
        { text: "比起安稳，我更怕「原地踏步」。", options: opt5("growth") },

        { text: "我希望对自己的时间和方式，有掌控权。", options: opt5("autonomy") },
        { text: "我不喜欢被盯得太死、管得太细。", options: opt5("autonomy") },
        { text: "我能为自己负责的事，扛到底。", options: opt5("autonomy") },
        { text: "自由安排节奏，比高薪更能留住我。", options: opt5("autonomy") },
        { text: "我抗拒「听话照做」式的执行。", options: opt5("autonomy") },

        { text: "把难事做成，带来的满足感很强。", options: opt5("achievement") },
        { text: "我习惯给自己设更高的目标。", options: opt5("achievement") },
        { text: "可见的成果与认可，对我很重要。", options: opt5("achievement") },
        { text: "我享受和过去的自己较劲、不断刷新纪录。", options: opt5("achievement") },
        { text: "一事无成地混日子，会让我难受。", options: opt5("achievement") },

        { text: "我的工作若能帮到别人，意义感会翻倍。", options: opt5("helping") },
        { text: "我愿意为「对社会有用」牺牲一点收益。", options: opt5("helping") },
        { text: "看到自己的产出改善他人处境，我很满足。", options: opt5("helping") },
        { text: "我更想做「被需要」的事。", options: opt5("helping") },
        { text: "利他的目标，能让我坚持更久。", options: opt5("helping") },

        { text: "我不愿用全部生活，去换一份忙碌的工作。", options: opt5("balance") },
        { text: "工作之外，我需要留时间给家人与自己。", options: opt5("balance") },
        { text: "张弛有度，比长期透支更可持续。", options: opt5("balance") },
        { text: "我会主动给生活设边界，不让工作入侵一切。", options: opt5("balance") },
        { text: "身心健康，是我权衡 offer 的硬指标。", options: opt5("balance") }
      ],
      profiles: {
        wealth: { emoji: "💰", title: "财富优先", tagline: "回报是价值的刻度之一", summary: "你不讳言金钱的重要性，也愿意为更高回报付出努力。这未必功利，而是你对身体自由与选择空间的清醒。", traits: ["务实", "等价交换", "向往自由"], advice: ["谈钱不羞耻，但别让报酬掩盖了长期价值。", "用收入反哺能力与资产，让自由更稳。"], accent: "#b45309" },
        growth: { emoji: "🌱", title: "成长优先", tagline: "进步是上班的第一理由", summary: "你最怕原地踏步，持续学习与挑战是你的燃料。平台能否让你变强，往往比眼前薪水更决定你的去留。", traits: ["好学", "自我驱动的", "不耐停滞"], advice: ["成长重要，也别忽视「深耕」带来的复利。", "定期复盘，避免一直在学却没沉淀。"], accent: "#0f766e" },
        autonomy: { emoji: "🕊️", title: "自主优先", tagline: "掌控感比头衔更贵", summary: "你极度看重对自己时间与方式的掌控，被 micromanagement 会迅速消耗你。自由，是你愿意为之放弃部分安稳的东西。", traits: ["独立", "厌恶管控", "自我负责"], advice: ["自主珍贵，也要用结果证明它值得。", "在自由与协作间找平衡，孤军易乏力。"], accent: "#7c3aed" },
        achievement: { emoji: "🏆", title: "成就优先", tagline: "把难事做成才有爽感", summary: "你被目标、成果与认可驱动，享受刷新纪录的快感。你适合有清晰胜负与反馈的赛道。", traits: ["目标感强", "好胜", "结果导向"], advice: ["成就感是引擎，也别让它变成唯 KPI。", "把大目标拆小，节奏更稳也更持久。"], accent: "#be123c" },
        helping: { emoji: "💡", title: "意义优先", tagline: "被需要才有劲", summary: "你希望工作能改善他人或世界的处境，「有用」是你坚持的底层燃料。纯粹利己的事，你很难长久。", traits: ["利他", "责任感", "意义驱动"], advice: ["利他很美，也别忘了为自己的可持续定价。", "把善意落到可衡量的产出上，价值更显。"], accent: "#15803d" },
        balance: { emoji: "☯️", title: "平衡优先", tagline: "生活是工作的容器", summary: "你不接受工作吞噬全部生活，张弛有度才是可走的远路。你主动设边界，也把身心当作硬指标来守住。", traits: ["边界清晰", "可持续", "重健康"], advice: ["平衡是智慧，也别用它回避该啃的硬仗。", "阶段性冲刺与长期平衡，可以共存。"], accent: "#4f46e5" }
      },
      compute(scores, answers, dims) {
        const pct = Engine.dimPct(scores, this);
        const top = Engine.topDimension(scores, dims);
        const prof = this.profiles[top];
        const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
        return Object.assign({}, prof, { bars });
      }
    },

    /* ===================== 职业测评 4：职业锚定位（六维） ===================== */
    {
      id: "anchor",
      title: "职业锚定位测评",
      subtitle: "施恩八锚取六：看清你不愿妥协的职业内核",
      emoji: "⚓",
      tag: "职业测评 · 专业版",
      minutes: 8,
      dimensions: [
        { key: "tech", name: "技术/职能" },
        { key: "mg", name: "通用管理" },
        { key: "auto", name: "自主/独立" },
        { key: "sec", name: "安全/稳定" },
        { key: "ent", name: "创业/创造" },
        { key: "svc", name: "服务/奉献" }
      ],
      questions: [
        { text: "我更想成为某一领域的行家，而非什么都管一点。", options: opt5("tech") },
        { text: "把一门手艺练到极致，让我踏实。", options: opt5("tech") },
        { text: "专业上的深度，比职位头衔更吸引我。", options: opt5("tech") },
        { text: "我享受解决具体的技术难题。", options: opt5("tech") },
        { text: "我害怕被抽离专业，变成只做协调的「夹层」。", options: opt5("tech") },

        { text: "我享受带着一队人，把目标拿下。", options: opt5("mg") },
        { text: "统筹资源、分派任务，是我的舒适区。", options: opt5("mg") },
        { text: "我渴望对结果负总责的位子。", options: opt5("mg") },
        { text: "影响与带动他人，让我有成就感。", options: opt5("mg") },
        { text: "比起单打，我更想赢在团队。", options: opt5("mg") },

        { text: "我极度看重不被束缚的自由。", options: opt5("auto") },
        { text: "为我自己打工，是深埋的愿望。", options: opt5("auto") },
        { text: "我受不了被严密管控的节奏。", options: opt5("auto") },
        { text: "我宁愿少赚，也要自己说了算。", options: opt5("auto") },
        { text: "自由安排人生，高于安稳与头衔。", options: opt5("auto") },

        { text: "稳定可预期，是我选工作的重要前提。", options: opt5("sec") },
        { text: "我不喜欢大起大落、朝不保夕。", options: opt5("sec") },
        { text: "一份有兜底的保障，让我睡得安稳。", options: opt5("sec") },
        { text: "我厌恶高风险、赌一把的活法。", options: opt5("sec") },
        { text: "组织与制度的可靠，对我很重要。", options: opt5("sec") },

        { text: "我从零做出一样东西的冲动很强。", options: opt5("ent") },
        { text: "看到空白市场，我会本能想占住。", options: opt5("ent") },
        { text: "我享受把想法变成产品的全过程。", options: opt5("ent") },
        { text: "创造新事物，比守成更让我兴奋。", options: opt5("ent") },
        { text: "哪怕失败，我也想试过自己造一次。", options: opt5("ent") },

        { text: "我的工作若服务于更大的善意，我会更有劲。", options: opt5("svc") },
        { text: "帮助弱势群体或公共利益，让我踏实。", options: opt5("svc") },
        { text: "我愿为「值得」的事，放下部分私利。", options: opt5("svc") },
        { text: "被需要的感觉，是我的燃料。", options: opt5("svc") },
        { text: "我不想只为自己活。", options: opt5("svc") }
      ],
      profiles: {
        tech: { emoji: "🛠️", title: "技术/职能锚", tagline: "做专，比做宽更让我安心", summary: "你的职业内核是「成为某一领域的行家」。头衔与权力不如专业深度让你踏实，被抽离专业会是你的痛点。", traits: ["专业深耕", "手艺人的骄傲", "重实质"], advice: ["守护你的专业纵深，它是别人抢不走的资产。", "适度练表达，让深度被组织看见与复用。"], accent: "#0f766e" },
        mg: { emoji: "🧭", title: "通用管理锚", tagline: "带人成事，才是我的战场", summary: "你渴望对结果负总责，享受统筹资源、分派任务与带动团队。你适合权责清晰的 managerial 路径。", traits: ["统筹力", "担责", "影响他人"], advice: ["管理是手艺，先带好小团队再放大。", "别只盯权力，把「让别人成功」当成自己的成功。"], accent: "#4f46e5" },
        auto: { emoji: "🕊️", title: "自主/独立锚", tagline: "自己说了算，才不委屈", summary: "你极度看重自由与独立，被 micromanagement 会迅速流失。你适合能自我管理、甚至自己当家作主的形态。", traits: ["独立", "厌恶管控", "自我驱动"], advice: ["自由要用结果去换，别让它变成孤芳自赏。", "独立不等于孤立，关键节点仍需同盟。"], accent: "#7c3aed" },
        sec: { emoji: "🛡️", title: "安全/稳定锚", tagline: "可预期，才敢全力以赴", summary: "你需要稳定与保障作为底色，才愿把精力投入工作。大起大落会消耗你，靠谱的组织与制度让你安心。", traits: ["求稳", "重保障", "可信赖"], advice: ["稳定是优势，也别因怕风险错过关键跃迁。", "在安稳里持续积累可迁移的能力。"], accent: "#b45309" },
        ent: { emoji: "🌱", title: "创业/创造锚", tagline: "从零到一，才叫活着", summary: "你被「从无到有」的创造冲动驱动，享受把想法变成产品。守成与重复让你厌倦，哪怕失败也想自己造一次。", traits: ["敢创", "从0到1", "不畏挫"], advice: ["创造欲珍贵，先用小成本验证再all in。", "把热情配上商业判断，提高存活率。"], accent: "#be123c" },
        svc: { emoji: "💗", title: "服务/奉献锚", tagline: "利他，是坚持的燃料", summary: "你希望工作服务于更大的善意，被需要的感觉支撑你走远。纯利己的赛道，你很难长久投入。", traits: ["利他", "使命感", "重意义"], advice: ["善意要落到可衡量的产出上。", "先照顾好自己，奉献才可持续。"], accent: "#15803d" }
      },
      compute(scores, answers, dims) {
        const pct = Engine.dimPct(scores, this);
        const top = Engine.topDimension(scores, dims);
        const prof = this.profiles[top];
        const bars = dims.map(d => ({ name: d.name, pct: pct[d.key] }));
        return Object.assign({}, prof, { bars });
      }
    },

    /* ===================== 职业测评 5：职场优势才干（六维） ===================== */
    {
      id: "strength",
      title: "职场优势才干测评",
      subtitle: "执行·影响·关系·战略·学习·责任，定位你的天赋象限",
      emoji: "🌟",
      tag: "职业测评 · 专业版",
      minutes: 8,
      dimensions: [
        { key: "exec", name: "执行交付" },
        { key: "infl", name: "影响带动" },
        { key: "rel", name: "关系建立" },
        { key: "strat", name: "战略思维" },
        { key: "learn", name: "快速学习" },
        { key: "resp", name: "责任担当" }
      ],
      questions: [
        { text: "交代给我的事，我习惯闭环到底。", options: opt5("exec") },
        { text: "我做事推进快，不拖泥带水。", options: opt5("exec") },
        { text: "把想法落成可交付的结果，是我的强项。", options: opt5("exec") },
        { text: "我能在混乱里把事一项项办妥。", options: opt5("exec") },
        { text: "deadline 当前，我反而更专注。", options: opt5("exec") },

        { text: "我容易成为房间里带动气氛的人。", options: opt5("infl") },
        { text: "说服与感召他人，是我的天赋。", options: opt5("infl") },
        { text: "我敢于在关键场合发声。", options: opt5("infl") },
        { text: "我擅长把大家拧成一股劲。", options: opt5("infl") },
        { text: "让人信服并跟上来，我不犯怵。", options: opt5("infl") },

        { text: "建立和维系信任，我很在行。", options: opt5("rel") },
        { text: "我能很快察觉团队里谁需要被看见。", options: opt5("rel") },
        { text: "我擅长在人与人之间搭桥。", options: opt5("rel") },
        { text: "长期的关系，比一次交易更被我看重。", options: opt5("rel") },
        { text: "我能让气场不合的人，也愿意合作。", options: opt5("rel") },

        { text: "我习惯先看大势，再定落点。", options: opt5("strat") },
        { text: "复杂问题，我能拆出关键脉络。", options: opt5("strat") },
        { text: "我常能比别人早半步看到走向。", options: opt5("strat") },
        { text: "我享受谋划与布局胜过蛮干。", options: opt5("strat") },
        { text: "重要的决定，我会先想清几种可能。", options: opt5("strat") },

        { text: "新领域上手快，是我常被夸的点。", options: opt5("learn") },
        { text: "我享受从不懂到懂的过程。", options: opt5("learn") },
        { text: "我会主动补全自己的知识盲区。", options: opt5("learn") },
        { text: "信息更新快，我也能跟上。", options: opt5("learn") },
        { text: "我把学习本身当成一种习惯。", options: opt5("learn") },

        { text: "该我担的，我绝不含糊。", options: opt5("resp") },
        { text: "出错时，我第一反应是扛而非甩。", options: opt5("resp") },
        { text: "交付物经我手，我会对质量负责到底。", options: opt5("resp") },
        { text: "别人托付的信任，我很珍惜。", options: opt5("resp") },
        { text: "即便吃力，我也把承诺放在前头。", options: opt5("resp") }
      ],
      profiles: {
        exec: { emoji: "⚙️", title: "执行交付者", tagline: "想到，就稳稳做成", summary: "你是把想法落成结果的人。推进快、闭环强，混乱里也能一项项办妥，是团队里最可靠的「交付引擎」。", traits: ["落地强", "不拖沓", "靠谱"], advice: ["执行力是稀缺品，记得用它换话语权。", "偶尔抬头看方向，别只埋头跑。"], accent: "#4f46e5" },
        infl: { emoji: "📣", title: "影响带动者", tagline: "让人愿意跟上你", summary: "你天生能在人群里带动气氛、说服与感召他人。你适合需要动员、销售与领导的场景。", traits: ["感染力", "敢发声", "聚人气"], advice: ["影响力要用在正向的目标上，才长久。", "少一点表演，多一点实质，信任更牢。"], accent: "#be123c" },
        rel: { emoji: "🤝", title: "关系建立者", tagline: "把人连成网", summary: "你擅长建立与维系信任，能在人之间搭桥，让不合的人也愿合作。你是团队里的「粘合剂」。", traits: ["善联结", "懂人心", "长情"], advice: ["关系是资产，也别透支在无效社交。", "把纽带转化为协作产出，价值更实。"], accent: "#15803d" },
        strat: { emoji: "♟️", title: "战略思维者", tagline: "先看势，再落子", summary: "你习惯先看清大势与关键脉络，再决定落点。你享受谋划胜过蛮干，适合需要判断与布局的角色。", traits: ["大局观", "善拆解", "前瞻"], advice: ["战略再好，也要有人帮你落地。", "别陷在「想太多」，关键处先动一步验证。"], accent: "#0f766e" },
        learn: { emoji: "📚", title: "快速学习者", tagline: "上手快，是底气", summary: "你新领域上手快，享受从不懂到懂，也主动补全盲区。变化再快，你也能跟上，是抗不确定性的天赋。", traits: ["吸收快", "好奇", "自适应"], advice: ["学得快是优势，也需沉淀成体系。", "把新知识接回实战，才真正长在你身上。"], accent: "#7c3aed" },
        resp: { emoji: "🛡️", title: "责任担当者", tagline: "该我的，我扛", summary: "你出问题先扛而非甩，对承诺与质量有执念。别人托付的信任，你格外珍惜，是组织里最被依赖的那类人。", traits: ["靠谱", "扛事", "重诺"], advice: ["担当珍贵，也别把别人的责任都背身上。", "学会分配与求助，扛才能扛得更久。"], accent: "#b45309" }
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

  ADD.forEach(t => TESTS.push(t));
  // 统一锁定：所有测评默认需兑换码解锁（一次解锁，全部开放）
  TESTS.forEach(t => { t.requireCode = true; });
})();
