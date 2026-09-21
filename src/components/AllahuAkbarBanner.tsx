import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { ASSETS, TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface AllahuAkbarBannerProps {
  lang: Language;
  onOpenDuaModal: () => void;
}

export const AllahuAkbarBanner: React.FC<AllahuAkbarBannerProps> = ({
  lang,
  onOpenDuaModal,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative w-full bg-[#362f27] border-y-4 border-[#bda47b] text-[#f7f2e8] my-10 overflow-hidden shadow-lg">
      {/* Background Calligraphy Watermark Pattern */}
      <div className="absolute inset-0 opacity-8 pointer-events-none select-none flex items-center justify-around text-4xl sm:text-7xl font-amiri text-[#e7c27d]">
        <span>سبحان الله</span>
        <span>الحمد لله</span>
        <span>الله أكبر</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Holy Quran on Rehal Image with Golden Frame */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative p-2 rounded-lg bg-[#27211a] border-2 border-[#b59560] shadow-2xl max-w-sm w-full group">
              <div className="overflow-hidden rounded">
                <img
                  src={ASSETS.quranOpenRehal}
                  alt="Holy Quran on carved wooden rehal with ambient candle glow"
                  className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#b59560] text-[#241c14] p-1.5 rounded-full shadow-md">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Central Verse and Reflection */}
          <div className="md:col-span-7 text-center md:text-right flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#dfa84a]" />
              <h2 className="text-2xl sm:text-4xl font-amiri font-bold text-[#f5d58d] tracking-wide">
                {t.allahuAkbar.arabicTitle}
              </h2>
            </div>

            {/* Holy Verse in Large Calligraphic Style */}
            <p className="text-xl sm:text-2xl md:text-3xl font-amiri text-[#fffbf2] font-semibold my-2 sm:my-3 leading-loose border-b border-[#5c4f3d] pb-2 w-full text-center md:text-right">
              {t.allahuAkbar.verseArabic}
            </p>

            {/* Translation in Urdu or Pashto */}
            <p className="text-sm sm:text-base font-nastaliq text-[#ecd6b0] leading-relaxed mb-3">
              {t.allahuAkbar.verseTranslation}
            </p>

            {/* Reflection */}
            <p className="text-xs sm:text-sm font-arabic text-[#c8b79f] leading-relaxed max-w-xl mb-5">
              {t.allahuAkbar.reflection}
            </p>

            {/* Action button */}
            <button
              id="open-daily-dua-btn"
              onClick={onOpenDuaModal}
              className="px-5 py-2 rounded-full bg-[#dfa84a] hover:bg-[#c99738] text-[#271f14] font-arabic font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>{t.allahuAkbar.actionBtn}</span>
              <span>✦</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
