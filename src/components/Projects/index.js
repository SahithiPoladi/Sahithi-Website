import React, { useMemo } from 'react';
import { Card, Button } from 'antd';
import { projects } from '../../config';

const Projects = () => {

    const normalize = (val = '') => val.toString().toLowerCase().replace(/[^a-z0-9]+/g, '');

    // Auto-build an index of images (including __optimized variants) from the images directory at build time using Webpack's require.context
    const imageIndex = useMemo(() => {
        let context;
        try {
            // recursive: true so we also pick up __optimized variants inside subfolders
            context = require.context('../../common/images', true, /\.(png|jpe?g|svg)$/);
        } catch (err) {
            console.warn('Dynamic image context not available:', err);
            return {};
        }
        // Build a structure that can hold base image and width-specific variants
        // e.g. { ruby: { base: url, variants: {320: url320, 640: url640, 960: url960} } }
        const map = {};
        const VARIANT_RE = /^(.*?)-(\d{2,4})$/; // matches name-320, name-640, etc
        context.keys().forEach(key => {
            const fileName = key.replace('./', '').replace(/^.*\//, '');
            const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
            const match = nameWithoutExt.match(VARIANT_RE);
            if (match) {
                const baseName = normalize(match[1]);
                const width = match[2];
                map[baseName] = map[baseName] || { base: undefined, variants: {} };
                map[baseName].variants[width] = context(key);
            } else {
                const baseName = normalize(nameWithoutExt);
                map[baseName] = map[baseName] || { base: undefined, variants: {} };
                map[baseName].base = context(key);
            }
        });
        return map;
    }, []);

    // Color palette for cards
    const CARD_COLORS = ['#de3f52', '#a81c66', '#ee5b48', '#b82152'];

    // Simple deterministic hash to pick a stable color per project
    const hashToIndex = (str, mod) => {
        if (!str) return 0;
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h * 31 + str.charCodeAt(i)) >>> 0; // unsigned 32-bit
        }
        return h % mod;
    };

    // Convert hex color (e.g. #de3f52) to rgba string with given alpha
    const hexToRgba = (hex, alpha = 0.4) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Build a soft, glowy radial-gradient background using the chosen color
    const buildGlowBackground = (hex) => {
        // A soft white center glow plus subtle color vignettes from edges
        const whiteCenter = 'rgba(255,255,255,0.18)';
        const strong = hexToRgba(hex, 0.18);
        const soft = hexToRgba(hex, 0.10);
        return [
            // Center sheen
            `radial-gradient(110% 110% at 50% 50%, ${whiteCenter} 0%, rgba(255,255,255,0) 55%)`,
            // Bottom vignette
            `radial-gradient(140% 100% at 50% 120%, ${soft} 0%, rgba(0,0,0,0) 60%)`,
            // Corner vignettes
            `radial-gradient(120% 95% at 0% 0%, ${strong} 0%, rgba(0,0,0,0) 60%)`,
            `radial-gradient(120% 95% at 100% 0%, ${soft} 0%, rgba(0,0,0,0) 62%)`
        ].join(', ');
    };


    const imageMapper = (imageVal) => {
        if (!imageVal) return undefined;
        if (/^https?:\/\//i.test(imageVal)) return imageVal; // already a URL
        const key = normalize(imageVal);
        // Try removing common suffixes
        const trimmed = key.replace(/(project|app|site)$/i, '');
        if (imageIndex[trimmed]) return imageIndex[trimmed];
        // Try singular form (remove trailing s)
        if (key.endsWith('s')) {
            const singular = key.slice(0, -1);
            if (imageIndex[singular]) return imageIndex[singular];
        }
        return undefined;
    };

    return (
        <main style={{ padding: '64px 24px', minHeight: '80vh' }}>
            <h1 className="kaushan-script-regular section-title" style={{ marginTop: 0 }}>Projects</h1>
            <div className="projects-grid">
                {projects?.map(p => {
                    const color = CARD_COLORS[hashToIndex(p._id || p.name || '', CARD_COLORS.length)];
                    const glowStrong = hexToRgba(color, 0.55);
                    const glowSoft = hexToRgba(color, 0.28);
                    const mapped = imageMapper(p.logo || p.name);
                    const logoSrc = typeof mapped === 'string' ? mapped : mapped?.base;
                    const variants = typeof mapped === 'object' ? mapped?.variants : undefined;
                    const srcSet = variants
                        ? Object.keys(variants)
                            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
                            .map(w => `${variants[w]} ${w}w`)
                            .join(', ')
                        : undefined;
                    return (
                        <Card
                            key={p._id}
                            className="card-border-gradient unna-regular"
                            style={{
                                padding: 24,
                                position: 'relative',
                                color: '#000000',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                // Base uses one of the 4 palette colors, with a soft glow overlay
                                backgroundColor: color,
                                backgroundImage: buildGlowBackground(color),
                                // Inward glowy effect using inset shadows derived from the card color
                                boxShadow: `inset 0 0 44px ${glowStrong}, inset 0 0 120px ${glowSoft}`,
                                borderRadius: 12
                            }}
                            cover={logoSrc && (
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                                    <img
                                        src={logoSrc}
                                        alt={`${p.name} logo`}
                                        style={{ maxWidth: 300, maxHeight: 140, width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))' }}
                                        width={300}
                                        height={140}
                                        loading="lazy"
                                        decoding="async"
                                        sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 300px"
                                        srcSet={srcSet}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                            )}
                        >

                            <h2 style={{ marginTop: 0, marginBottom: 12, color: '#000000' }}>{p.name}</h2>
                            <p style={{ marginTop: 0, marginBottom: 16, color: '#000000', lineHeight: 1.5 }}>{p.description}</p>
                            {
                                Array.isArray(p.tech) && p.tech.length > 0 && (
                                    <p style={{ fontSize: 16, opacity: .9, marginBottom: 16, color: '#000000' }}><strong>Tech:</strong> {p.tech.join(', ')}</p>
                                )
                            }
                            {p.link && (
                                <Button
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        background: '#ff9657',
                                        color: '#1b1b1b',
                                        border: '3px solid #ff9657',
                                        fontSize: 14,
                                        padding: '6px 14px',
                                        alignSelf: 'flex-start'
                                    }}
                                    className="unna-bold project-link-btn"
                                >
                                    Project Code
                                </Button>
                            )}
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}

export default Projects;
