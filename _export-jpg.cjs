const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = __dirname;

const jobs = [
  // [svg input, jpg output, width, background]
  ["aether-mark-sage.svg",          "aether-mark-sage.jpg",          1024, "#FFFFFF"],
  ["aether-mark-black.svg",         "aether-mark-black.jpg",         1024, "#FFFFFF"],
  ["aether-mark-white.svg",         "aether-mark-white.jpg",         1024, "#0E1410"],
  ["aether-logo-lockup.svg",        "aether-logo-lockup.jpg",        2160, "#FFFFFF"],
  ["aether-instagram-dp-sage.svg",  "aether-instagram-dp-sage.jpg",  1080, "#7E9171"],
  ["aether-instagram-dp-white.svg", "aether-instagram-dp-white.jpg", 1080, "#EDF2E5"]
];

(async () => {
  for (const [src, out, width, bg] of jobs) {
    const svg = fs.readFileSync(path.join(root, src));
    await sharp(svg, { density: 384 })
      .resize({ width, withoutEnlargement: false })
      .flatten({ background: bg })
      .jpeg({ quality: 95, chromaSubsampling: "4:4:4" })
      .toFile(path.join(root, out));
    console.log("✓", out);
  }
})();
