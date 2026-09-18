/* ===== 应用层：路由 + 渲染（首页 / 答题 / 结果） ===== */
(function () {
  const app = document.getElementById("app");
  const PALETTE = ["#4f46e5", "#0f766e", "#b45309", "#be123c", "#15803d", "#7c3aed"];

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function renderHome() {
    app.innerHTML = "";
    const brand = el(`<div class="brand"><h1>知微心理</h1><p>专业心理测评 · 科学自我探索平台</p></div>`);
    app.appendChild(brand);

    // 兑换码解锁条
    const unlocked = Redeem.isUnlocked("pro");
    const redeemBar = el(`
      <div class="redeem-bar ${unlocked ? "on" : ""}">
        ${unlocked
          ? `<span>✓ 专业版测评已解锁</span><button class="rb-btn ghost" data-act="reset">恢复锁定</button>`
          : `<span>🔓 专业版测评需兑换码解锁</span><button class="rb-btn" data-act="open">输入兑换码</button>`}
      </div>`);
    redeemBar.querySelectorAll("[data-act]").forEach((b) => {
      b.addEventListener("click", () => {
        const act = b.getAttribute("data-act");
        if (act === "open") openRedeem();
        if (act === "reset") { Redeem.reset(); route(); }
      });
    });
    app.appendChild(redeemBar);

    const grid = el(`<div class="test-grid"></div>`);
    TESTS.forEach((t) => {
      const locked = t.requireCode && !Redeem.isUnlocked("pro");
      const card = el(`
        <div class="test-card ${locked ? "locked" : ""}" data-id="${t.id}">
          <div class="test-emoji">${t.emoji}</div>
          <div class="test-meta">
            <h3>${t.title}</h3>
            <p>${t.subtitle}</p>
            <span class="tag">${t.tag} · 约 ${t.minutes} 分钟${locked ? " · 🔒" : ""}</span>
          </div>
          ${locked ? `<div class="lock-badge">🔒</div>` : ""}
        </div>`);
      card.addEventListener("click", () => {
        if (locked) { openRedeem(); return; }
        location.hash = "#/test/" + t.id;
      });
      grid.appendChild(card);
    });
    app.appendChild(grid);

    app.appendChild(el(`<div class="disclaimer">本平台所有测评均为自我探索与成长用途，结果非专业诊断结论，<br>不能替代医学或心理咨询。作答仅在本地计算，不会被上传。</div>`));
  }

  // 兑换码弹窗
  function openRedeem() {
    const overlay = document.createElement("div");
    overlay.className = "modal-mask";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-title">输入测评兑换码</div>
        <div class="modal-sub">在小红书店铺下单后，凭发货的兑换码解锁专业版测评</div>
        <input class="code-input" placeholder="例如 ZW-XXXX-XXXX" maxlength="20" />
        <div class="modal-msg"></div>
        <button class="btn modal-ok">解锁</button>
        <div class="modal-cancel">稍后再说</div>
      </div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector(".code-input");
    const msg = overlay.querySelector(".modal-msg");
    setTimeout(() => input.focus(), 50);
    const close = () => overlay.remove();
    overlay.querySelector(".modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    overlay.querySelector(".modal-ok").addEventListener("click", () => {
      const res = Redeem.redeem(input.value);
      if (res.ok) {
        msg.className = "modal-msg ok";
        msg.textContent = res.message;
        setTimeout(() => { close(); route(); }, 900);
      } else {
        msg.className = "modal-msg err";
        msg.textContent = res.message;
      }
    });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") overlay.querySelector(".modal-ok").click(); });
  }

  function findTest(id) { return TESTS.find(t => t.id === id); }

  function renderQuiz(id) {
    const test = findTest(id);
    if (!test) return renderHome();
    if (test.requireCode && !Redeem.isUnlocked("pro")) {
      openRedeem();
      return;
    }
    const answers = {};
    app.innerHTML = "";

    const head = el(`<div class="brand"><h1 style="font-size:19px">${test.emoji} ${test.title}</h1><p>${test.subtitle}</p></div>`);
    app.appendChild(head);

    const prog = el(`<div class="progress"><i></i></div><div class="progress-label">0 / ${test.questions.length}</div>`);
    app.appendChild(prog);
    const bar = prog.querySelector("i");
    const label = prog.querySelector(".progress-label");

    const wrap = el(`<div></div>`);
    test.questions.forEach((q, qi) => {
      const qEl = el(`<div class="q" data-q="${qi}">
        <div class="q-text"><span class="q-index">Q${qi + 1}.</span>${q.text}</div></div>`);
      q.options.forEach((opt, oi) => {
        const o = el(`<div class="opt" data-q="${qi}" data-o="${oi}"><span class="dot"></span><span>${opt.label}</span></div>`);
        o.addEventListener("click", () => {
          answers[qi] = oi;
          qEl.querySelectorAll(".opt").forEach(x => x.classList.remove("sel"));
          o.classList.add("sel");
          updateProgress();
        });
        qEl.appendChild(o);
      });
      wrap.appendChild(qEl);
    });
    app.appendChild(wrap);

    const btn = el(`<button class="btn" disabled>查看我的结果</button>`);
    const errTip = el(`<div class="submit-err"></div>`);
    btn.addEventListener("click", () => {
      const answered = Object.keys(answers).length;
      if (answered < test.questions.length) {
        const firstMissing = test.questions.findIndex((_, i) => answers[i] == null);
        const node = wrap.querySelector(`.q[data-q="${firstMissing}"]`);
        if (node) {
          node.classList.add("shake");
          setTimeout(() => node.classList.remove("shake"), 400);
          node.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
      errTip.textContent = "";
      try {
        const scores = Engine.tally(test, answers);
        const result = test.compute(scores, answers, test.dimensions);
        if (!result || !result.title) throw new Error("结果生成失败");
        window.__lastResult = result;
        location.hash = "#/result/" + test.id;
      } catch (e) {
        errTip.textContent = "结果生成出现异常，请刷新页面后重试。";
        console.error("compute error:", e);
      }
    });
    app.appendChild(btn);
    app.appendChild(errTip);

    function updateProgress() {
      const n = Object.keys(answers).length;
      bar.style.width = (n / test.questions.length * 100) + "%";
      label.textContent = n + " / " + test.questions.length;
      btn.disabled = n < test.questions.length;
    }
  }

  function renderResult(id) {
    const test = findTest(id);
    const r = window.__lastResult;
    if (!test || !r) return renderHome();
    const accent = r.accent || PALETTE[Math.floor(Math.random() * PALETTE.length)];
    app.innerHTML = "";

    const card = el(`<div class="result-card" style="--accent:${accent}">
      <div class="r-emoji">${r.emoji || ""}</div>
      <div class="r-title">${r.title}</div>
      <div class="r-tag">${r.tagline || ""}</div>
      <div class="r-summary">${(r.summary || "").replace(/\n/g, "<br>")}</div>
    </div>`);
    app.appendChild(card);

    if (r.bars && r.bars.length) {
      const barsWrap = el(`<div class="bars"><h4>维度画像</h4></div>`);
      r.bars.forEach(b => {
        const row = el(`<div class="bar-row">
          <span class="bar-name">${b.name}</span>
          <div class="bar-track"><i style="width:${Math.max(0, Math.min(100, b.pct))}%"></i></div>
          <span class="bar-val">${b.pct}</span>
        </div>`);
        barsWrap.appendChild(row);
      });
      app.appendChild(barsWrap);
    }

    if (r.traits && r.traits.length) {
      const tr = el(`<div class="traits"></div>`);
      r.traits.forEach(t => tr.appendChild(el(`<span>${t}</span>`)));
      app.appendChild(tr);
    }

    if (r.advice && r.advice.length) {
      const ad = el(`<div class="advice"><h4>给你的建议</h4><ul></ul></div>`);
      const ul = ad.querySelector("ul");
      r.advice.forEach(a => ul.appendChild(el(`<li>${a}</li>`)));
      app.appendChild(ad);
    }

    app.appendChild(el(`<div class="share-hint">长按或截图保存这份报告，分享给 <b>朋友 / 小红书</b> 都 OK～</div>`));

    const again = el(`<button class="btn">再测一个 ↻</button>`);
    again.addEventListener("click", () => { location.hash = "#/home"; });
    app.appendChild(again);

    const back = el(`<div class="back-link">← 返回首页</div>`);
    back.addEventListener("click", () => { location.hash = "#/home"; });
    app.appendChild(back);

    app.appendChild(el(`<div class="disclaimer">本测评结果仅为自我探索与成长参考，非专业心理/医学诊断结论，<br>不能替代专业评估。如有持续困扰，请寻求专业帮助。</div>`));
  }

  function shade(hex) {
    const c = hex.replace("#", "");
    const num = parseInt(c, 16);
    let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    r = Math.max(0, r - 40); g = Math.max(0, g - 40); b = Math.max(0, b - 40);
    return `rgb(${r},${g},${b})`;
  }

  function route() {
    const h = location.hash || "#/home";
    if (h.startsWith("#/test/")) return renderQuiz(h.split("/")[2]);
    if (h.startsWith("#/result/")) return renderResult(h.split("/")[2]);
    return renderHome();
  }

  window.addEventListener("hashchange", route);
  route();
})();
