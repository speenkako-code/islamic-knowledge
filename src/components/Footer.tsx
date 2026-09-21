import React from 'react';
import { ChevronUp, Moon, ShieldCheck, Heart } from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { MosqueSkyline, OrnateDivider } from './Ornaments';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenAdmin,
}) => {
  const t = TRANSLATIONS[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'calendar', label: t.nav.calendar },
    { id: 'photos', label: t.nav.photos },
    { id: 'videos', label: t.nav.videos },
    { id: 'community', label: t.nav.community },
    { id: 'education', label: t.nav.education },
    { id: 'rules', label: t.nav.rules },
    { id: 'news', label: t.nav.news },
  ];

  return (
    <footer id="contacts" className="w-full bg-[#f4eee4] border-t border-[#d8ccb8] pt-8 relative mt-16">
      {/* Top Ornate Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <OrnateDivider className="text-[#a4885c]" />
      </div>

      {/* Main Footer Info Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          {/* Logo & Tagline (No address or phone number as requested) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#dfa84a] to-[#986c23] text-white flex items-center justify-center shadow-sm">
                <Moon className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-nastaliq text-[#3d3225]">
                {t.siteTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#665745] font-arabic leading-relaxed max-w-md">
              {t.tagline} - {t.siteSub}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-6 flex flex-col items-start md:items-end">
            <h4 className="font-bold text-xs sm:text-sm text-[#352a1e] font-arabic mb-3">
              {t.footer.quickLinks}
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-start md:justify-end text-xs font-arabic text-[#5d4e3d]">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="hover:text-[#9e7629] hover:underline cursor-pointer transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Admin Portal access button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-arabic bg-[#ede2cf] hover:bg-[#e0d3bc] text-[#554330] border border-[#c5b49b] cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#9e7629]" />
                <span>{t.footer.adminAccess}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mosque Skyline Silhouette Background Illustration */}
        <div className="mt-10 mb-4 opacity-35 text-[#886938] pointer-events-none select-none">
          <MosqueSkyline />
        </div>

        {/* Bottom Copyright & Scroll to Top */}
        <div className="pt-4 border-t border-[#dfd4c1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-arabic text-[#7b6d5b]">
          <p>{t.footer.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#9d7224] hover:text-[#765415] font-semibold cursor-pointer transition-colors"
          >
            <span>{t.footer.scrollTop}</span>
            <div className="w-5 h-5 rounded-full bg-[#bd5c3b] text-white flex items-center justify-center">
              <ChevronUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
