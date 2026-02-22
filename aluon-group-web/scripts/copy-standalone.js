"use strict";
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");

// public -> .next/standalone/public
const publicSrc = path.join(root, "public");
const publicDest = path.join(standalone, "public");
if (fs.existsSync(publicSrc)) {
  fs.mkdirSync(publicDest, { recursive: true });
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

// .next/static -> .next/standalone/.next/static
const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(standalone, ".next", "static");
if (fs.existsSync(staticSrc)) {
  fs.mkdirSync(path.join(standalone, ".next"), { recursive: true });
  fs.cpSync(staticSrc, staticDest, { recursive: true });
}
