import { readFileSync, writeFileSync } from "fs"

const FILES = [
  ".quartz/plugins/footer/dist/components/index.js",
  ".quartz/plugins/footer/dist/index.js",
]

// Matches the <p> children block inside the footer render — handles any Quartz default footer
const PATTERN =
  /\/\* @__PURE__ \*\/ u2\("p", \{ children: \[[^\]]*(?:\[[^\]]*\][^\]]*)*\] \}\)/

const REPLACEMENT = `/* @__PURE__ */ u2("p", { children: [
      "\\xA9 ", year, " \\xB7 ",
      /* @__PURE__ */ u2("a", { href: "https://ruicoelho.dev", children: "Rui Coelho" })
    ] })`

let patched = 0
for (const file of FILES) {
  const content = readFileSync(file, "utf-8")
  if (content.includes("ruicoelho.dev")) {
    console.log(`Already patched: ${file}`)
    continue
  }
  const updated = content.replace(PATTERN, REPLACEMENT)
  if (updated === content) {
    console.error(`Pattern not found in: ${file}`)
    process.exit(1)
  }
  writeFileSync(file, updated)
  console.log(`Patched: ${file}`)
  patched++
}
console.log(`Done — ${patched} file(s) patched`)
