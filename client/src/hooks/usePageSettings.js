import { useState, useEffect } from 'react';

const usePageSettings = (slug) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!slug) return;
            try {
                const response = await fetch(`/api/page-settings/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.data) {
                        setSettings(data.data);
                        
                        // Update SEO Tags
                        if (data.data.meta_title) {
                            document.title = data.data.meta_title;
                        }
                        if (data.data.meta_description) {
                            let metaDesc = document.querySelector('meta[name="description"]');
                            if (!metaDesc) {
                                metaDesc = document.createElement('meta');
                                metaDesc.name = 'description';
                                document.head.appendChild(metaDesc);
                            }
                            metaDesc.content = data.data.meta_description;
                        }
                        if (data.data.meta_keywords) {
                            let metaKeywords = document.querySelector('meta[name="keywords"]');
                            if (!metaKeywords) {
                                metaKeywords = document.createElement('meta');
                                metaKeywords.name = 'keywords';
                                document.head.appendChild(metaKeywords);
                            }
                            metaKeywords.content = data.data.meta_keywords;
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch page settings for", slug, error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [slug]);

    return { settings, loading };
};

export default usePageSettings;
