import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Quote,
  Share2,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { DailyHighlightItem, Language } from '../types';
import { IslamicRosette, OrnateCorner, OrnateDivider } from './Ornaments';

interface DailyCalendarHighlightProps {
  lang: Language;
  highlights: DailyHighlightItem[];
  currentIndex: number;
  onRefreshNext: () => void;
}

export const DailyCalendarHighlight: React.FC<DailyCalendarHighlightProps> = ({
  lang,
  highlights,
  currentIndex,
  onRefreshNext,
}) => {
  const t = TRANSLATIONS[lang];
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // Fallback safety
  const currentItem =
    highlights.length > 0
      ? highlights[currentIndex % highlights.length]
      : null;

  if (!currentItem) return null;

  const handleRefresh = () => {
    setIsRotating(true);
    onRefreshNext();
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const fullBundleText = `
🌟 ${t.calendarSection.title} (${new Date().toLocaleDateString('ur-PK')})
📖 ${t.calendarSection.ayatTitle}:
${currentItem.ayat.arabic}
اردو ترجمہ: ${currentItem.ayat.urdu}
پښتو ژباړه: ${currentItem.ayat.pashto}
(${currentItem.ayat.reference})

🕌 ${t.calendarSection.hadithTitle}:
${currentItem.hadith.arabic}
اردو ترجمہ: ${currentItem.hadith.urdu}
پښتو ژباړه: ${currentItem.hadith.pashto}
(${currentItem.hadith.reference})

✨ ${t.calendarSection.qaulTitle} (${currentItem.qaul.personality}):
${currentItem.qaul.arabicOrQuote}
اردو ترجمہ: ${currentItem.qaul.urdu}
پښتو ژباړه: ${currentItem.qaul.pashto}
  `.trim();

  return (
    <section id="calendar" className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-10 sm:my-14">
      {/* Section Header */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-[#fdfaf4] border-2 border-[#c9b596] shadow-xl">
        {/* Filigree Corner Accents */}
        <OrnateCorner position="top-left" size={36} className="absolute -top-2 -left-2 text-[#987847]" />
        <OrnateCorner position="top-right" size={36} className="absolute -top-2 -right-2 text-[#987847]" />
        <OrnateCorner position="bottom-left" size={36} className="absolute -bottom-2 -left-2 text-[#987847]" />
        <OrnateCorner position="bottom-right" size={36} className="absolute -bottom-2 -right-2 text-[#987847]" />

        {/* Top Ribbon with Date & Refresh Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#e2d5c0]">
          <div className="flex items-center gap-3 text-right">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dfa84a] to-[#986c23] flex items-center justify-center text-white shadow-md border border-[#edd194]">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-nastaliq text-[#362b1e]">
                  {t.calendarSection.title}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#dfa84a]/20 text-[#8f6217] border border-[#dfa84a]/50 font-arabic">
                  {lang === 'ur' ? 'روزانہ کی بنیاد پر' : 'هره ورځ'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#7a6b57] font-arabic mt-0.5">
                {t.calendarSection.subtitle}
              </p>
            </div>
          </div>

          {/* Action buttons: Refresh for new text + Copy full package */}
          <div className="flex items-center gap-2.5">
            <button
              id="refresh-daily-highlight-btn"
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#42392e] hover:bg-[#2b241c] text-[#f4d084] text-xs sm:text-sm font-semibold border border-[#c99738]/60 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer font-arabic"
              title="Refresh / اگلا کلام لائیں"
            >
              <RefreshCw
                className={`w-4 h-4 text-[#dfa84a] ${
                  isRotating ? 'animate-spin' : ''
                }`}
              />
              <span>{t.calendarSection.refreshBtn}</span>
            </button>

            <button
              onClick={() => handleCopy(fullBundleText, 'bundle')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#ede2cf] hover:bg-[#e0d3bd] text-[#4d3d2c] text-xs font-semibold border border-[#baa78d] transition-colors cursor-pointer font-arabic"
              title="تمام کلام کاپی کریں"
            >
              {copiedType === 'bundle' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.calendarSection.copiedText}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#886932]" />
                  <span>{t.calendarSection.copyBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Prominent Cards: Ayat, Hadith, Qaul (Simultaneous Urdu & Pashto) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
          {/* Card 1: Ayat-e-Mubaraka */}
          <div className="flex flex-col rounded-xl bg-[#fffefb] border-2 border-[#ded1be] hover:border-[#caa35a] shadow-sm hover:shadow-md transition-all p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#dfa84a]/5 rounded-bl-full pointer-events-none" />
            
            {/* Header badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3d3326] text-[#e8c374] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-nastaliq text-[#3d3326]">
                  {t.calendarSection.ayatTitle}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8c6721] bg-[#fbf3e2] px-2 py-0.5 rounded border border-[#e4cc9a] font-arabic">
                {currentItem.ayat.reference}
              </span>
            </div>

            {/* Arabic Calligraphy */}
            <div className="my-3 p-4 rounded-lg bg-[#faf5eb] border border-[#e8ddc9] text-center">
              <p className="text-xl sm:text-2xl font-bold font-amiri text-[#2b2218] leading-loose text-center" dir="rtl">
                {currentItem.ayat.arabic}
              </p>
            </div>

            {/* Urdu & Pashto Translations side-by-side or stacked cleanly */}
            <div className="space-y-3 flex-grow mt-2">
              {/* Urdu Translation */}
              <div className="p-2.5 rounded-md bg-[#f7f2e7]/80 border-r-3 border-[#9e7629]">
                <span className="text-[11px] font-bold text-[#8d671b] block font-arabic mb-0.5">
                  اردو ترجمہ:
                </span>
                <p className="text-xs sm:text-sm text-[#44382a] font-arabic leading-relaxed">
                  {currentItem.ayat.urdu}
                </p>
              </div>

              {/* Pashto Translation */}
              <div className="p-2.5 rounded-md bg-[#f2ecde]/80 border-r-3 border-[#bd5c3b]">
                <span className="text-[11px] font-bold text-[#bd5c3b] block font-arabic mb-0.5">
                  د پښتو ژباړه:
                </span>
                <p className="text-xs sm:text-sm text-[#44382a] font-arabic leading-relaxed">
                  {currentItem.ayat.pashto}
                </p>
              </div>
            </div>

            {/* Card footer copy button */}
            <div className="mt-4 pt-3 border-t border-[#ede3d1] flex items-center justify-end">
              <button
                onClick={() =>
                  handleCopy(
                    `${currentItem.ayat.arabic}\nاردو: ${currentItem.ayat.urdu}\nپښتو: ${currentItem.ayat.pashto}\n(${currentItem.ayat.reference})`,
                    'ayat'
                  )
                }
                className="text-xs font-arabic text-[#7b6b57] hover:text-[#9e7629] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedType === 'ayat' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedType === 'ayat' ? t.calendarSection.copiedText : t.calendarSection.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Farman-e-Rasool ﷺ */}
          <div className="flex flex-col rounded-xl bg-[#fffefb] border-2 border-[#ded1be] hover:border-[#caa35a] shadow-sm hover:shadow-md transition-all p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#bd5c3b]/5 rounded-bl-full pointer-events-none" />

            {/* Header badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#bd5c3b] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-nastaliq text-[#3d3326]">
                  {t.calendarSection.hadithTitle}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8c6721] bg-[#fbf3e2] px-2 py-0.5 rounded border border-[#e4cc9a] font-arabic">
                {currentItem.hadith.reference}
              </span>
            </div>

            {/* Arabic Hadith */}
            <div className="my-3 p-4 rounded-lg bg-[#faf5eb] border border-[#e8ddc9] text-center">
              <p className="text-lg sm:text-xl font-bold font-amiri text-[#2b2218] leading-relaxed text-center" dir="rtl">
                {currentItem.hadith.arabic}
              </p>
              {currentItem.hadith.narrator && (
                <p className="text-[11px] text-[#7d6749] font-arabic mt-1">
                  ({currentItem.hadith.narrator})
                </p>
              )}
            </div>

            {/* Urdu & Pashto Translations */}
            <div className="space-y-3 flex-grow mt-2">
              <div className="p-2.5 rounded-md bg-[#f7f2e7]/80 border-r-3 border-[#9e7629]">
                <span className="text-[11px] font-bold text-[#8d671b] block font-arabic mb-0.5">
                  اردو ترجمہ:
                </span>
                <p className="text-xs sm:text-sm text-[#44382a] font-arabic leading-relaxed">
                  {currentItem.hadith.urdu}
                </p>
              </div>

              <div className="p-2.5 rounded-md bg-[#f2ecde]/80 border-r-3 border-[#bd5c3b]">
                <span className="text-[11px] font-bold text-[#bd5c3b] block font-arabic mb-0.5">
                  د پښتو ژباړه:
                </span>
                <p className="text-xs sm:text-sm text-[#44382a] font-arabic leading-relaxed">
                  {currentItem.hadith.pashto}
                </p>
              </div>
            </div>

            {/* Card footer copy button */}
            <div className="mt-4 pt-3 border-t border-[#ede3d1] flex items-center justify-end">
              <button
                onClick={() =>
                  handleCopy(
                    `${currentItem.hadith.arabic}\nاردو: ${currentItem.hadith.urdu}\nپښتو: ${currentItem.hadith.pashto}\n(${currentItem.hadith.reference})`,
                    'hadith'
                  )
                }
                className="text-xs font-arabic text-[#7b6b57] hover:text-[#9e7629] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedType === 'hadith' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedType === 'hadith' ? t.calendarSection.copiedText : t.calendarSection.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Qaul-e-Hikmat */}
          <div className="flex flex-col rounded-xl bg-[#fffefb] border-2 border-[#ded1be] hover:border-[#caa35a] shadow-sm hover:shadow-md transition-all p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#9e7629]/5 rounded-bl-full pointer-events-none" />

            {/* Header badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#534533] text-[#e8c374] flex items-center justify-center">
                  <Quote className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-nastaliq text-[#3d3326]">
                  {t.calendarSection.qaulTitle}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#8c6721] bg-[#fbf3e2] px-2 py-0.5 rounded border border-[#e4cc9a] font-arabic">
                {currentItem.qaul.personality}
              </span>
            </div>

            {/* Arabic / Quote */}
            <div className="my-3 p-4 rounded-lg bg-[#faf5eb] border border-[#e8ddc9] text-center">
              <p className="text-base sm:text-lg font-bold font-arabic text-[#2b2218] leading-relaxed text-center" dir="rtl">
                "{currentItem.qaul.arabicOrQuote}"
              </p>
            </div>

            {/* Urdu & Pashto Translations */}
            <div className="space-y-3 flex-grow mt-2">
              <div className="p-2.5 rounded-md bg-[#f7f2e7]/80 border-r-3 border-[#9e7629]">
                <span className="text-[11px] font-bold text-[#8d671b] block font-arabic mb-0.5">
                  اردو مفہوم:
                </span>
                <p className="text-xs sm:text-sm text-[#44382a] font-arabic leading-relaxed">
                  {currentItem.qaul.urdu}
                </p>
              </div>

              <div className="p-2.5 rounded-md bg-[#f2ecde]/80 border-r-3 border-[#bd5c3b]">
                <span className="text-[11px] font-bold text-[#bd5c3b] block font-arabic mb-0.5">
                  د پښتو ژباړه:
                </span>
                <p className="text-xs sm:text-sm text-[#44382a] font-arabic leading-relaxed">
                  {currentItem.qaul.pashto}
                </p>
              </div>
            </div>

            {/* Card footer copy button */}
            <div className="mt-4 pt-3 border-t border-[#ede3d1] flex items-center justify-end">
              <button
                onClick={() =>
                  handleCopy(
                    `${currentItem.qaul.arabicOrQuote}\n(${currentItem.qaul.personality})\nاردو: ${currentItem.qaul.urdu}\nپښتو: ${currentItem.qaul.pashto}`,
                    'qaul'
                  )
                }
                className="text-xs font-arabic text-[#7b6b57] hover:text-[#9e7629] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedType === 'qaul' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedType === 'qaul' ? t.calendarSection.copiedText : t.calendarSection.copyBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="mt-6 pt-4 border-t border-[#e2d5c0] flex items-center justify-center gap-2 text-xs font-arabic text-[#8a7a67]">
          <span>۞</span>
          <span>
            {lang === 'ur'
              ? `منتخب کلام ${currentIndex + 1} از ${highlights.length} - نیا کلام دیکھنے کے لیے بٹن دبائیں`
              : `غوره شوی کلام ${currentIndex + 1} له ${highlights.length} څخه - د نوي کلام لپاره تڼۍ ووهئ`}
          </span>
          <span>۞</span>
        </div>
      </div>
    </section>
  );
};
