#!/usr/bin/env node
/* 测评兑换码生成器：node gen_codes.js --count 50 --tier pro --prefix XHX */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const args = process.argv.slice(2);
const get = (name, def) => {
  const i = args.indexOf("--" + name);
  return i >= 0 ? args[i + 1] : def;
};
const count = parseInt(get("count", "50"), 10);
const tier = get("tier", "pro");
const root = path.resolve(__dirname, "..");
const outJs = path.join(root, "js", "codes.js");
const outCsv = path.join(root, "codes_export.csv");
const outImport = path.join(root, "codes_import.csv");

// 12 位纯大写字母+数字（剔除易混淆字符 0/O/1/I/L），不含前缀与横杠
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
function randSeg(len) {
  let s = "";
  const b = crypto.randomBytes(len);
  for (let i = 0; i < len; i++) s += ALPHABET[b[i] % ALPHABET.length];
  return s;
}
function makeCode() {
  return randSeg(12);
}

const codes = [];
const seen = new Set();
let guard = 0;
while (codes.length < count && guard < count * 50) {
  guard++;
  const c = makeCode();
  if (seen.has(c)) continue;
  seen.add(c);
  codes.push({ code: c, tier, generatedAt: new Date().toISOString().slice(0, 10) });
}

const js = `/* 自动生成：测评兑换码（演示用，生产须走服务端校验） */\nwindow.CODES = ${JSON.stringify(codes, null, 2)};\n`;
fs.writeFileSync(outJs, js);

// 内部对账清单（含层级与日期）
const csv =
  "code,tier,generatedAt\n" +
  codes.map((c) => [c.code, c.tier, c.generatedAt].join(",")).join("\n");
fs.writeFileSync(outCsv, csv);

// 卡密平台导入模板：仅一列「兑换码」（12 位），供有赞/微店自动发货直接上传
const importCsv = "兑换码\n" + codes.map((c) => c.code).join("\n");
fs.writeFileSync(outImport, importCsv);

console.log(`OK ${codes.length} codes tier=${tier} (12位无前缀)`);
