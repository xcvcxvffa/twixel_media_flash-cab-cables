import { useEffect, useState } from 'react';

const usePageSEO = (slug) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchSEO = async () => {
            try {
                const response = await fetch(`/api/page-settings/${slug}`);
                if (!response.ok) return;
                
                const json = await response.json();
                if (json && json.data) {
                    setSettings(json.data);
                    const { meta_title, meta_description, meta_keywords } = json.data;

                    if (meta_title) {
                        document.title = meta_title;
                    }
                    
                    if (meta_description) {
                        let metaDesc = document.querySelector('meta[name="description"]');
                        if (!metaDesc) {
                            metaDesc = document.createElement('meta');
                            metaDesc.name = 'description';
                            document.head.appendChild(metaDesc);
                        }
                        metaDesc.content = meta_description;
                    }

                    if (meta_keywords) {
                        let metaKeywords = document.querySelector('meta[name="keywords"]');
                        if (!metaKeywords) {
                            metaKeywords = document.createElement('meta');
                            metaKeywords.name = 'keywords';
                            document.head.appendChild(metaKeywords);
                        }
                        metaKeywords.content = meta_keywords;
                    }
                }
            } catch (error) {
                console.error("Failed to fetch SEO data for:", slug);
            } finally {
                setLoading(false);
            }
        };

        fetchSEO();
    }, [slug]);

    return { pageSettings: settings, loading };
};

export default usePageSEO;
