import React from 'react';
import { MOSQUE_RULES, NEWS_ITEMS, TRANSLATIONS } from '../data/content';
import { Language, NewsItem } from '../types';
import { OrnateCorner, OrnateDivider } from './Ornaments';

interface ThreeColumnSectionProps {
  lang: Language;
  onSelectNews: (news: NewsItem) => void;
}

export const ThreeColumnSection: React.FC<ThreeColumnSectionProps> = ({
  lang,
  onSelectNews,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="rules" className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Section 1: RULES FOR MOSQUES (مسجد کے آداب و ضوابط) */}
        <div className="lg:col-span-6 flex flex-col p-6 rounded-2xl bg-[#fdfaf5] border-2 border-[#d5c6b0] shadow-sm relative">
          <OrnateCorner position="top-left" size={32} className="absolute -top-1.5 -left-1.5 text-[#987847]" />
          <OrnateCorner position="top-right" size={32} className="absolute -top-1.5 -right-1.5 text-[#987847]" />

          <h3 className="text-xl sm:text-2xl font-bold font-nastaliq text-[#382f25] text-right">
            {t.rulesSection.title}
          </h3>
          <OrnateDivider className="text-[#a4885c] my-3" />

          <p className="text-xs sm:text-sm text-[#5a4c3c] font-arabic mb-4 leading-relaxed text-justify">
            {t.rulesSection.intro}
          </p>

          <div className="space-y-2.5">
            {MOSQUE_RULES.map((rule) => (
              <div
                key={rule.id}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f5ede0] border border-[#e5d8c3]"
              >
                <span className="text-[#a47b2c] font-bold text-sm shrink-0 mt-0.5 select-none">
                  ۞
                </span>
                <p className="text-xs sm:text-sm text-[#45392d] font-arabic leading-relaxed">
                  {lang === 'ur' ? rule.textUr : rule.textPs}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: ISLAMIC NEWS & ANNOUNCEMENTS (اسلامی خبریں و اعلانات) */}
        <div id="news" className="lg:col-span-6 flex flex-col p-6 rounded-2xl bg-[#fdfaf5] border-2 border-[#d5c6b0] shadow-sm relative">
          <OrnateCorner position="top-left" size={32} className="absolute -top-1.5 -left-1.5 text-[#987847]" />
          <OrnateCorner position="top-right" size={32} className="absolute -top-1.5 -right-1.5 text-[#987847]" />

          <h3 className="text-xl sm:text-2xl font-bold font-nastaliq text-[#382f25] text-right">
            {t.newsSection.title}
          </h3>
          <OrnateDivider className="text-[#a4885c] my-3" />

          <div className="space-y-4">
            {NEWS_ITEMS.map((news) => (
              <div
                key={news.id}
                onClick={() => onSelectNews(news)}
                className="group flex gap-3.5 p-3 rounded-xl bg-[#f5ede0] hover:bg-[#eee3d1] border border-[#e5d8c3] hover:border-[#caa35a] transition-all cursor-pointer shadow-2xs"
              >
                <img
                  src={news.image}
                  alt={news.titleUr}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shrink-0 border border-[#c4b396] group-hover:scale-103 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-bold text-[#8c6721] font-arabic bg-[#fffcf7] px-2 py-0.5 rounded border border-[#dfcca7]">
                      {news.hijriDate}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold font-nastaliq text-[#382f25] group-hover:text-[#9e7629] transition-colors line-clamp-1 mt-1">
                      {lang === 'ur' ? news.titleUr : news.titlePs}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#5e5041] font-arabic line-clamp-2 mt-0.5">
                      {lang === 'ur' ? news.summaryUr : news.summaryPs}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#b94e2b] font-arabic group-hover:underline">
                    {lang === 'ur' ? 'مکمل خبر پڑھیں ←' : 'پوره خبر ولولئ ←'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
