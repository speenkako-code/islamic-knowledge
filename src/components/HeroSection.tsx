import React from 'react';
import { ASSETS, TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { IslamicRosette, OrnateCorner } from './Ornaments';

interface HeroSectionProps {
  lang: Language;
  onExploreMore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreMore,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section
      id="home"
      className="relative pt-6 sm:pt-10 pb-12 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(237, 231, 219, 0.88), rgba(237, 231, 219, 0.96)), url(${ASSETS.mosqueColumnsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* The Vintage Ornate Framed Showcase Container */}
        <div className="relative p-2.5 sm:p-4 rounded-xl bg-[#fdfaf4] border-2 border-[#bda682] shadow-2xl">
          {/* Outer Arabesque filigree corners */}
          <OrnateCorner position="top-left" size={44} className="absolute -top-2.5 -left-2.5 text-[#91764e]" />
          <OrnateCorner position="top-right" size={44} className="absolute -top-2.5 -right-2.5 text-[#91764e]" />
          <OrnateCorner position="bottom-left" size={44} className="absolute -bottom-2.5 -left-2.5 text-[#91764e]" />
          <OrnateCorner position="bottom-right" size={44} className="absolute -bottom-2.5 -right-2.5 text-[#91764e]" />

          {/* Inner Decorative Border Frame */}
          <div className="relative rounded-lg overflow-hidden border border-[#c4b192] p-1 bg-[#ede4d4]">
            {/* The Hero Image with hands in Dua and Kaaba */}
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded overflow-hidden">
              <img
                src={ASSETS.heroDuaKaaba}
                alt="Muslim in sincere Dua prayer facing Kaaba"
                className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated Dark Gradient Vignette for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1712]/90 via-[#231d16]/40 to-black/30 flex flex-col justify-end p-6 sm:p-10 text-center items-center">
                {/* Spiritual Category Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1510]/80 border border-[#dfa84a]/50 text-[#f3cf7e] text-xs font-arabic mb-3 shadow-sm backdrop-blur-xs">
                  <span className="text-[#dfa84a]">✦</span>
                  <span>{t.hero.badge}</span>
                  <span className="text-[#dfa84a]">✦</span>
                </div>

                {/* Primary Hero Headline in Urdu / Pashto */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-nastaliq text-[#fff9ec] drop-shadow-md max-w-3xl leading-snug sm:leading-relaxed mb-3">
                  {t.hero.heading}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-base md:text-lg text-[#ebd6b3] font-arabic max-w-2xl leading-relaxed mb-6 drop-shadow-xs">
                  {t.hero.subheading}
                </p>

                {/* Classic Bracketed CTA Button: ⊰ مزید جانیے ⊱ */}
                <button
                  id="hero-more-btn"
                  onClick={onExploreMore}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#9e7629] via-[#c99738] to-[#9e7629] text-[#1c160e] font-arabic font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#c99738]/30 hover:shadow-[#c99738]/50 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-[#ffdf99]"
                >
                  <span className="text-[#3c2a07] text-lg font-serif group-hover:-translate-x-1 transition-transform">
                    ⊰
                  </span>
                  <span className="px-1 text-[#241a06]">{t.hero.btnMore}</span>
                  <span className="text-[#3c2a07] text-lg font-serif group-hover:translate-x-1 transition-transform">
                    ⊱
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Central Rosette Medallion beneath the frame */}
        <div className="flex justify-center -mt-6 sm:-mt-8 relative z-10">
          <div className="bg-[#ede7db] rounded-full p-2 border-2 border-[#b89f74] shadow-md">
            <IslamicRosette size={68} className="text-[#a47b2c]" />
          </div>
        </div>
      </div>
    </section>
  );
};
