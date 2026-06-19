import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        phone: '+91 90 93 94 95 99',
        email: 'info@flashcabcables.com',
        address: "R S NO 9 P4/P1, Plot No 1 & 2,\nNational Highway 27, Opp. BPCL Petrol Pump,\nBiliyala, Gondal, \nRajkot, Gujarat-360005",
        facebook: '',
        linkedin: '',
        instagram: '',
        whatsapp: '',
        map_url: 'https://www.google.com/maps?q=Flashcab+Cables+Pvt+Ltd,+National+Highway+27,+Opp+BPCL+Petrol+Pump,+Biliyala,+Gondal,+Rajkot,+Gujarat+360311&output=embed&z=15',
        header_logo: '/assets/images/logo.png',
        footer_logo: '/assets/images/logo_colored.png',
        favicon: '/favicon.ico'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                const data = await response.json();
                if (data && typeof data === 'object' && !data.message) {
                    setSettings(prev => ({
                        ...prev,
                        ...data
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // Update favicon when settings change
    useEffect(() => {
        if (settings.favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = settings.favicon;
        }
    }, [settings.favicon]);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};
