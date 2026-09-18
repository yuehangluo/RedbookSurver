/* ===== 通用测评引擎（纯逻辑，无 UI） =====
 * 设计目标：一套引擎跑所有测试。
 * 每个测试在 tests.js 里用「配置」描述：
 *   - dimensions：计分维度（key 列表）
 *   - questions：题目，每题选项带 score（写入各维度）
 *   - compute(scores, answers)：返回结果对象
 * 引擎只负责「把选项分数累加成分数表」，具体判定交给各测试的 compute。
 */
const Engine = {
  // 把用户作答累加成分数表
  tally(test, answers) {
    const scores = {};
    (test.dimensions || []).forEach(d => (scores[d.key] = 0));
    test.questions.forEach((q, qi) => {
      const optIdx = answers[qi];
      if (optIdx == null) return;
      const opt = q.options[optIdx];
      if (opt && opt.score) {
        for (const k in opt.score) scores[k] = (scores[k] || 0) + opt.score[k];
      }
    });
    return scores;
  },

  // 找出分数最高的维度 key（并列取首个）
  topDimension(scores, dimensions) {
    let best = null, bestVal = -Infinity;
    dimensions.forEach(d => {
      const v = scores[d.key] || 0;
      if (v > bestVal) { bestVal = v; best = d.key; }
    });
    return best;
  },

  // 把各维度原始分归一化为百分比（0~100），供结果页画维度条
  // 自动按题目结构推导每个维度的理论最高分，兼容单选多维度与李克特反向题
  dimPct(scores, test) {
    const maxPer = {};
    (test.dimensions || []).forEach(d => (maxPer[d.key] = 0));
    test.questions.forEach(q => {
      const perDim = {};
      q.options.forEach(o => { for (const k in o.score) perDim[k] = Math.max(perDim[k] || 0, o.score[k]); });
      for (const k in perDim) maxPer[k] += perDim[k];
    });
    const out = {};
    (test.dimensions || []).forEach(d => {
      const raw = scores[d.key] || 0;
      const max = maxPer[d.key] || 1;
      out[d.key] = Math.max(0, Math.min(100, Math.round((raw / max) * 100)));
    });
    return out;
  }
};
