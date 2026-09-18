#!/usr/bin/env python
"""把 Markdown 渲染为统一深色主题的独立 HTML（自包含，可直接双击打开或转发）。

用法：
    python md2html.py                     # 自动发现：当前目录 *.md + docs/*.md
    python md2html.py a.md docs/b.md      # 渲染指定文件
    python md2html.py --root H:/proj      # 指定项目根（用于相对路径显示与自动发现）
    python md2html.py --brand "PolyEdge"  # 页脚品牌名

产物：同目录同名 .html。样式：深灰蓝底 + 青色强调 + 暖黄警示，含侧边目录、滚动高亮、
表格/代码/引用样式、P0/P1/P2/PD 彩色徽章、响应式与打印样式。

依赖：pip install markdown>=3.6
"""

from __future__ import annotations

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    import markdown
except ImportError:  # pragma: no cover
    sys.exit("缺少依赖：请先 pip install markdown>=3.6")


CSS = """
:root{
  --bg:#0f1419; --bg-soft:#161c24; --bg-card:#1b222c; --bg-code:#131922;
  --fg:#e6edf3; --fg-dim:#9aa7b4; --fg-faint:#6e7d8c;
  --accent:#4fd1c5; --accent-2:#63b3ed; --warn:#f6ad55; --danger:#fc8181; --ok:#68d391;
  --border:#2a3441; --border-soft:#222b36;
  --mono:"JetBrains Mono","Cascadia Code",Consolas,"Courier New",monospace;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0; background:var(--bg); color:var(--fg);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  font-size:15px; line-height:1.75; -webkit-font-smoothing:antialiased;
}
.wrap{display:flex; max-width:1400px; margin:0 auto; gap:32px; padding:0 24px}
aside{
  position:sticky; top:0; align-self:flex-start;
  width:260px; flex:0 0 260px; max-height:100vh; overflow-y:auto;
  padding:32px 8px 48px 0; border-right:1px solid var(--border-soft);
}
aside .toc-title{
  font-size:11px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--fg-faint); font-weight:700; margin:0 0 12px 4px;
}
aside a{
  display:block; padding:5px 10px; margin:1px 0; border-radius:6px;
  color:var(--fg-dim); text-decoration:none; font-size:13px; line-height:1.5;
  border-left:2px solid transparent; transition:all .15s;
}
aside a:hover{color:var(--fg); background:var(--bg-soft); border-left-color:var(--accent)}
aside a.lv3{padding-left:24px; font-size:12.5px; color:var(--fg-faint)}
aside a.lv4{padding-left:38px; font-size:12.5px; color:var(--fg-faint)}
main{flex:1 1 auto; min-width:0; padding:32px 0 96px}
header.doc{
  padding:28px 32px; margin-bottom:32px; border-radius:12px;
  background:linear-gradient(135deg,#1b2530 0%,#161c24 60%,#141a22 100%);
  border:1px solid var(--border);
}
header.doc h1{margin:0 0 10px; font-size:28px; letter-spacing:-.01em; border:0; padding:0}
header.doc .meta{color:var(--fg-faint); font-size:12.5px; font-family:var(--mono)}
header.doc .meta b{color:var(--accent); font-weight:600}
main h1{font-size:26px}
main h2{
  font-size:20px; margin:44px 0 16px; padding-bottom:10px;
  border-bottom:1px solid var(--border); color:var(--accent);
}
main h3{font-size:16.5px; margin:32px 0 12px; color:var(--accent-2)}
main h4{font-size:14.5px; margin:24px 0 10px; color:var(--fg)}
h1,h2,h3,h4,h5{line-height:1.35; font-weight:650; scroll-margin-top:16px}
p{margin:12px 0}
a{color:var(--accent-2); text-decoration:none}
a:hover{text-decoration:underline}
strong{color:#fff; font-weight:650}
hr{border:0; border-top:1px solid var(--border-soft); margin:32px 0}
ul,ol{padding-left:24px; margin:12px 0}
li{margin:5px 0}
li>ul,li>ol{margin:4px 0}
blockquote{
  margin:16px 0; padding:10px 18px; border-left:3px solid var(--warn);
  background:rgba(246,173,85,.07); color:#e2d5c3; border-radius:0 8px 8px 0;
}
blockquote p{margin:6px 0}
code{
  font-family:var(--mono); font-size:13px; padding:2px 6px; border-radius:4px;
  background:var(--bg-code); color:#ffd8a8; border:1px solid var(--border-soft);
}
pre{
  background:var(--bg-code); border:1px solid var(--border); border-radius:10px;
  padding:16px 18px; overflow-x:auto; margin:16px 0; line-height:1.6;
}
pre code{background:none; border:0; padding:0; color:#c8d3de; font-size:12.5px}
table{border-collapse:collapse; width:100%; margin:18px 0; font-size:13.5px; display:block; overflow-x:auto}
th,td{border:1px solid var(--border); padding:9px 12px; text-align:left; vertical-align:top}
th{background:var(--bg-card); color:var(--accent); font-weight:650; white-space:nowrap}
tr:nth-child(even) td{background:rgba(255,255,255,.018)}
td{color:var(--fg-dim)}
td strong{color:var(--fg)}
img{max-width:100%; border-radius:8px}
footer.doc{
  margin-top:56px; padding-top:20px; border-top:1px solid var(--border-soft);
  color:var(--fg-faint); font-size:12px; font-family:var(--mono);
  display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap;
}
.badge{
  display:inline-block; padding:2px 9px; border-radius:999px; font-size:11.5px;
  font-weight:650; letter-spacing:.03em; vertical-align:middle;
}
.badge.p0{background:rgba(252,129,129,.15); color:var(--danger); border:1px solid rgba(252,129,129,.35)}
.badge.p1{background:rgba(246,173,85,.15); color:var(--warn); border:1px solid rgba(246,173,85,.35)}
.badge.p2{background:rgba(99,179,237,.15); color:var(--accent-2); border:1px solid rgba(99,179,237,.35)}
.badge.pd{background:rgba(104,211,145,.15); color:var(--ok); border:1px solid rgba(104,211,145,.35)}
@media(max-width:1080px){
  aside{display:none}
  .wrap{padding:0 16px}
  main{padding:20px 0 64px}
  header.doc{padding:20px; border-radius:10px}
}
@media print{
  body{background:#fff; color:#000}
  aside{display:none}
  main{padding:0}
  header.doc{background:#f4f6f8; border-color:#ccc}
}
"""

TOC_JS = """
<script>
(function(){
  var links=[].slice.call(document.querySelectorAll('aside a[href^="#"]'));
  if(!links.length) return;
  var map={};
  links.forEach(function(a){ map[decodeURIComponent(a.getAttribute('href').slice(1))]=a; });
  var heads=[].slice.call(document.querySelectorAll('main h2[id],main h3[id]'));
  function onScroll(){
    var top=document.documentElement.scrollTop+90, cur=null;
    heads.forEach(function(h){ if(h.offsetTop<=top) cur=h; });
    links.forEach(function(a){ a.style.color=''; a.style.borderLeftColor=''; });
    if(cur && map[cur.id]){
      map[cur.id].style.color='var(--accent)';
      map[cur.id].style.borderLeftColor='var(--accent)';
    }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();
</script>
"""

HEADING_RE = re.compile(r"^(#{2,4})\s+(.*?)\s*#*$")


def _slug(text: str, used: set[str]) -> str:
    s = re.sub(r"[^\w\u4e00-\u9fff\- ]", "", text.strip())
    s = re.sub(r"\s+", "-", s).lower()
    if not s:
        s = "sec"
    base, n = s, 2
    while s in used:
        s = f"{base}-{n}"
        n += 1
    used.add(s)
    return s


def _esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _title_of(md_text: str, fallback: str) -> str:
    for line in md_text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def _build_toc(md_text: str) -> tuple[str, list[tuple[int, str, str]]]:
    """返回 (侧边导航 HTML, 锚点计划)。

    锚点计划是**按出现顺序**排列的 ``(层级, 标题, 锚点)`` 列表。
    不能用「标题文本 → 锚点」字典：同名标题会让后者覆盖前者，正文 id 重复、目录跳错。
    """
    used: set[str] = set()
    plan: list[tuple[int, str, str]] = []
    items: list[str] = []
    in_fence = False
    for line in md_text.splitlines():
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = HEADING_RE.match(line)
        if not m:
            continue
        level, text = len(m.group(1)), m.group(2)
        anchor = _slug(text, used)
        plan.append((level, text, anchor))
        items.append(f'<a class="lv{level}" href="#{anchor}">{_esc(text)}</a>')
    nav = (
        '<aside><div class="toc-title">目录</div>\n' + "\n".join(items) + "\n</aside>"
        if items
        else ""
    )
    return nav, plan


def _badge(html: str) -> str:
    """把 P0/P1/P2/PD 标记渲染成彩色徽章。"""
    return re.sub(
        r"\b(?:P0|P1|P2|PD)\b",
        lambda m: f'<span class="badge {m.group(0).lower()}">{m.group(0)}</span>',
        html,
    )


def render(md_path: Path, *, root: Path, brand: str = "") -> Path:
    raw = md_path.read_text(encoding="utf-8")
    title = _title_of(raw, md_path.stem)
    nav, plan = _build_toc(raw)

    # 按出现顺序消费锚点计划，保证正文 id 与目录严格一致
    cursor = 0
    lines, in_fence = [], False
    for line in raw.splitlines():
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            lines.append(line)
            continue
        if not in_fence:
            m = HEADING_RE.match(line)
            if m and cursor < len(plan):
                level, text, anchor = plan[cursor]
                cursor += 1
                lines.append(f'<h{level} id="{anchor}">{text}</h{level}>')
                continue
        lines.append(line)

    body = _badge(
        markdown.markdown(
            "\n".join(lines),
            extensions=["tables", "fenced_code", "sane_lists", "attr_list", "md_in_html"],
        )
    )

    try:
        shown = md_path.resolve().relative_to(root.resolve()).as_posix()
    except ValueError:
        shown = md_path.name

    now = datetime.now()
    left = f"{brand} · {_esc(title)}" if brand else _esc(title)
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{_esc(title)}</title>
<style>{CSS}</style>
</head>
<body>
<div class="wrap">
{nav}
<main>
<header class="doc">
  <h1>{_esc(title)}</h1>
  <div class="meta">源文件 <b>{_esc(shown)}</b>　·　生成于 <b>{now:%Y-%m-%d %H:%M}</b></div>
</header>
{body}
<footer class="doc">
  <span>{left}</span>
  <span>由 md2html.py 从 Markdown 自动生成，请勿直接编辑 HTML</span>
</footer>
</main>
</div>
{TOC_JS}
</body>
</html>
"""
    out = md_path.with_suffix(".html")
    out.write_text(html, encoding="utf-8")
    return out


def discover(root: Path) -> list[Path]:
    """自动发现文档：根目录 *.md + docs/*.md，跳过隐藏目录。"""
    found: list[Path] = []
    for pat in ("*.md", "docs/*.md"):
        found.extend(sorted(root.glob(pat)))
    seen: set[Path] = set()
    uniq: list[Path] = []
    for p in found:
        if any(part.startswith(".") for part in p.parts):
            continue
        rp = p.resolve()
        if rp in seen:
            continue
        seen.add(rp)
        uniq.append(p)
    return uniq


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Markdown -> 统一深色主题 HTML")
    ap.add_argument("files", nargs="*", help="要渲染的 .md 文件，留空则自动发现")
    ap.add_argument("--root", default=".", help="项目根目录（用于相对路径显示与自动发现）")
    ap.add_argument("--brand", default="", help="页脚品牌名")
    args = ap.parse_args(argv)

    root = Path(args.root).resolve()
    targets = [Path(f) for f in args.files] or discover(root)
    if not targets:
        print(f"[warn] 未在 {root} 发现任何 .md 文件")
        return 1

    ok = 0
    for p in targets:
        if not p.exists():
            print(f"[skip] 不存在：{p}")
            continue
        out = render(p, root=root, brand=args.brand)
        print(f"[ok] {p.name} -> {out.name} ({out.stat().st_size / 1024:.1f} KB)")
        ok += 1
    print(f"\n共渲染 {ok} 份文档")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
