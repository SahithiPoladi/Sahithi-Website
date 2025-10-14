import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjectsQuery } from '../../apiService';
import { Card, Button } from 'antd';

const Projects = () => {

    const {
        data: projectsResponse, isLoading, isError
    } = useQuery({ queryKey: ['projects'], queryFn: fetchProjectsQuery });

    const normalize = (val = '') => val.toString().toLowerCase().replace(/[^a-z0-9]+/g, '');

    // Auto-build an index of images from the images directory at build time using Webpack's require.context
    const imageIndex = useMemo(() => {
        let context;
        try {
            context = require.context('../../common/images', false, /\.(png|jpe?g|svg)$/);
        } catch (err) {
            console.warn('Dynamic image context not available:', err);
            return {};
        }
        const idx = {};
        context.keys().forEach(key => {
            const fileName = key.replace('./', '');
            const base = fileName.substring(0, fileName.lastIndexOf('.'));
            const norm = normalize(base);
            idx[norm] = context(key);
        });
        return idx;
    }, []);


    const imageMapper = (imageVal) => {
        if (!imageVal) return undefined;
        if (/^https?:\/\//i.test(imageVal)) return imageVal; // already a URL
        const key = normalize(imageVal);
        if (imageIndex[key]) return imageIndex[key];
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
            {
                isLoading ? (
                    <div>Loading projects…</div>
                ) : isError ? (
                    <div>Failed to load projects information</div>
                ) : (
                    <div
                        style={{
                            maxWidth: 1000,
                            margin: '0 auto',
                            display: 'grid',
                            gap: 32,
                            gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))'
                        }}
                    >
                        {projectsResponse?.projects?.map(p => {
                            const logoSrc = imageMapper(p.logo || p.name);
                            return (
                                <Card
                                    key={p._id}
                                    className="card-border-gradient unna-regular"
                                    style={{
                                        padding: 24,
                                        position: 'relative',
                                        color: '#d9dddc',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'stretch'
                                    }}
                                    cover={logoSrc && (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                                            <img
                                                src={logoSrc}
                                                alt={`${p.name} logo`}
                                                style={{ maxWidth: 300, maxHeight: 140, width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))' }}
                                                loading="lazy"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}
                                >

                                    <h2 style={{ marginTop: 0, marginBottom: 12, color: '#d9dddc' }}>{p.name}</h2>
                                    <p style={{ marginTop: 0, marginBottom: 16, color: '#d9dddc', lineHeight: 1.5 }}>{p.description}</p>
                                    {
                                        Array.isArray(p.tech) && p.tech.length > 0 && (
                                            <p style={{ fontSize: 16, opacity: .9, marginBottom: 16, color: '#d9dddc' }}><strong>Tech:</strong> {p.tech.join(', ')}</p>
                                        )
                                    }
                                    {p.link && (
                                        <Button
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                background: '#073b41',
                                                color: '#d9dddc',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                fontSize: 14,
                                                padding: '6px 14px',
                                                alignSelf: 'flex-start'
                                            }}
                                            className="unna-bold"
                                        >
                                            Project Code
                                        </Button>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                )
            }
        </main >
    );
}

export default Projects;
