import { writeFileSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

const dir = "public/images/products";
mkdirSync(dir, { recursive: true });

const COLORS = {
  headphones: ["#6366f1", "#4f46e5"],
  smartphones: ["#3b82f6", "#1d4ed8"],
  laptops: ["#8b5cf6", "#6d28d9"],
  vpn: ["#0891b2", "#0e7490"],
  antivirus: ["#059669", "#047857"],
  "password-managers": ["#d97706", "#b45309"],
  "robot-vacuums": ["#7c3aed", "#5b21b6"],
  "air-purifiers": ["#0ea5e9", "#0369a1"],
  "coffee-makers": ["#92400e", "#78350f"],
  "kitchen-cookware": ["#dc2626", "#991b1b"],
  "sport-headphones": ["#2563eb", "#1d4ed8"],
  "security-cameras": ["#475569", "#334155"],
  "mesh-wifi": ["#0284c7", "#0369a1"],
  "portable-power": ["#ca8a04", "#a16207"],
  "smart-rings": ["#db2777", "#be185d"],
  "bike-storage": ["#4f46e5", "#3730a3"],
  "web-hosting": ["#0d9488", "#0f766e"],
};

// Find all product JSON files
function walk(dirPath) {
  const results = [];
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      results.push(...walk(join(dirPath, entry.name)));
    } else if (entry.name.endsWith(".json")) {
      results.push(join(dirPath, entry.name));
    }
  }
  return results;
}

const products = walk("content/products");
let count = 0;

for (const file of products) {
  const data = JSON.parse(readFileSync(file, "utf-8"));
  const name = data.name;
  const cat = data.category;
  const imgFile = data.image || `${data.slug}-hero.jpg`;
  const [bg, bg2] = COLORS[cat] || ["#475569", "#334155"];

  // Generate SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg}"/>
      <stop offset="100%" style="stop-color:${bg2}"/>
    </linearGradient>
    <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
      <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.15)"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#dots)"/>
  <rect x="40" y="460" width="720" height="120" fill="rgba(0,0,0,0.2)"/>
  <text x="400" y="280" text-anchor="middle" fill="white" font-family="Arial,Helvetica,sans-serif" font-size="42" font-weight="800" opacity="0.9">${escapeXml(name)}</text>
  <text x="400" y="520" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="500">${cat.replace(/-/g, " ")}</text>
</svg>`;

  // Write both as .svg and .jpg (copy)
  const svgName = imgFile.replace(/\.(jpg|jpeg|png)$/i, ".svg");
  writeFileSync(join(dir, svgName), svg, "utf-8");
  count++;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

console.log(`Generated ${count} product images in ${dir}`);
