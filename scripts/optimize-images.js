#!/usr/bin/env node
/**
 * Optimize PNG/JPG/SVG in common/images and public with sharp/imagemin.
 * Generates 3 sizes for responsive use: 320, 640, 960 (for typical cards).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const roots = [
    path.resolve(__dirname, '../src/common/images'),
    path.resolve(__dirname, '../public'),
];

const exts = new Set(['.png', '.jpg', '.jpeg']);

async function ensureDir(p) {
    await fs.promises.mkdir(p, { recursive: true });
}

async function processImage(file) {
    const dir = path.dirname(file);
    const base = path.basename(file, path.extname(file));
    const outDir = path.join(dir, '__optimized');
    await ensureDir(outDir);
    const sizes = [320, 640, 960];
    await Promise.all(
        sizes.map(async (w) => {
            const out = path.join(outDir, `${base}-${w}.jpg`);
            await sharp(file)
                .resize({ width: w, withoutEnlargement: true })
                .jpeg({ quality: 78, mozjpeg: true })
                .toFile(out);
            console.log('wrote', out);
        })
    );
}

async function walk(dir) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === '__optimized') continue;
            await walk(p);
        } else if (exts.has(path.extname(p).toLowerCase())) {
            try {
                await processImage(p);
            } catch (err) {
                console.warn('Failed to optimize', p, err.message);
            }
        }
    }
}

(async () => {
    for (const root of roots) {
        if (fs.existsSync(root)) {
            await walk(root);
        }
    }
})();
