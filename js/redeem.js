/* ===== 测评兑换码：客户端校验 + 解锁层级（演示用） ===== */
(function () {
  const TIER_RANK = { free: 0, pro: 1, all: 2 };
  const STORE_KEY = "psyche_unlocked_tiers";
  function loadTiers() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveTiers(t) { localStorage.setItem(STORE_KEY, JSON.stringify(t)); }
  function isUnlocked(tier) {
    const need = TIER_RANK[tier] || 0;
    return loadTiers().some((t) => (TIER_RANK[t] || 0) >= need);
  }
  function redeem(raw) {
    const code = (raw || "").trim().toUpperCase().replace(/\s+/g, "");
    const list = window.CODES || [];
    const hit = list.find((c) => c.code === code);
    if (!hit) return { ok: false, message: "兑换码无效或已失效，请核对大小写与横杠后再试。" };
    const tiers = loadTiers();
    if (!tiers.includes(hit.tier)) { tiers.push(hit.tier); saveTiers(tiers); }
    return { ok: true, tier: hit.tier, message: "解锁成功！专业版测评已开放 🎉" };
  }
  function reset() { saveTiers([]); }
  window.Redeem = { isUnlocked, redeem, loadTiers, reset };
})();
