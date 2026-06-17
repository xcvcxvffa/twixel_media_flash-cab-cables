import React from 'react';
import { Building2, Ship, Train } from 'lucide-react';

const usageData = [
    { name: "Building Industry", icon: Building2 },
    { name: "Shipping & Marine", icon: Ship },
    { name: "Railway Industry", icon: Train }
];

const ProductUsage = () => {
    return (
        <section className="relative w-full h-[100vh] min-h-[650px] flex flex-col justify-between overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/assets/images/industrial_mix_bg.png')" }}
            ></div>

            {/* Dark Overlay for text readability - Seamless smooth fade */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-black/80 to-transparent"></div>

            {/* Top Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 md:pt-48">
                <div className="flex justify-center w-full mb-12 md:mb-16">
                    <div className="text-center max-w-3xl w-full flex flex-col items-center">
                        <span className="impact-eyebrow badge-spacing mb-4 md:mb-6 inline-block">
                            INDUSTRIES WE SERVE
                        </span>
                        <h2 className="section-title mb-4 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: 500, color: '#FFFFFF' }}>
                            Our Product Usage
                        </h2>
                        <p className="section-description max-w-3xl text-sm sm:text-base md:text-lg px-2 sm:px-0" style={{ margin: '0 auto', color: '#a0aec0' }}>
                            Our extensive range of wire and cable products is designed to meet the demands of various industries, from construction and energy to telecommunications and transportation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Horizontal Industry Strip (3 Items) */}
            <div className="relative z-10 w-full bg-gradient-to-t from-black/80 to-transparent pt-6 md:pt-10">
                <div className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="container mx-auto px-2 sm:px-4">
                        <div className="flex flex-row flex-wrap md:flex-nowrap items-start justify-center industry-strip-spacing gap-4 sm:gap-8 md:gap-16 lg:gap-32">
                            {usageData.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="flex flex-col items-center justify-start group cursor-pointer w-[100px] sm:w-[130px] md:w-[160px]">
                                        <div className="text-white/80 group-hover:text-white transition-colors duration-300 mb-2 md:mb-4 group-hover:-translate-y-1 md:group-hover:-translate-y-2 transform ease-out flex items-center justify-center">
                                            {/* Responsive icon size logic using inline styles or classes */}
                                            <div className="hidden md:block"><Icon size={42} strokeWidth={1.5} /></div>
                                            <div className="block md:hidden"><Icon size={34} strokeWidth={1.5} /></div>
                                        </div>
                                        <span className="text-white/80 group-hover:text-white text-xs sm:text-sm md:text-base font-bold text-center transition-colors duration-300 leading-tight md:leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                                            {item.name}
                                        </span>
                                        {/* Active Hover Line Indicator */}
                                        <div className="h-1 w-0 bg-[#2fa084] group-hover:w-[80%] md:group-hover:w-full transition-all duration-300 mt-2 md:mt-4 opacity-0 group-hover:opacity-100 rounded-t-md"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS to hide scrollbar */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default ProductUsage;
