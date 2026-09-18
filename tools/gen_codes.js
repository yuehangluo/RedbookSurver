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
const prefix = get("prefix", "XHX").toUpperCase();
const root = path.resolve(__dirname, "..");
const outJs = path.join(root, "js", "codes.js");
const outCsv = path.join(root, "codes_export.csv");

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
function randSeg(len) {
  let s = "";
  const b = crypto.randomBytes(len);
  for (let i = 0; i < len; i++) s += ALPHABET[b[i] % ALPHABET.length];
  return s;
}
function makeCode() {
  return `${prefix}-${randSeg(4)}-${randSeg(4)}`;
}

const codes = [];
const seen = new Set();
let guard = 0;
while (codes.length < count && guard < count * 50) {
  guard++;
  const c = makeCode();
  if (seen.has(c)) continue;
  seen.add(c);
  codes.push({ code: c, tier, note: "", generatedAt: new Date().toISOString().slice(0, 10) });
}

const js = `/* 自动生成：测评兑换码（演示用，生产须走服务端校验） */\nwindow.CODES = ${JSON.stringify(codes, null, 2)};\n`;
fs.writeFileSync(outJs, js);

const csv =
  "code,tier,note,generatedAt\n" +
  codes.map((c) => [c.code, c.tier, c.note, c.generatedAt].join(",")).join("\n");
fs.writeFileSync(outCsv, csv);

console.log(`OK ${codes.length} codes tier=${tier}`);
