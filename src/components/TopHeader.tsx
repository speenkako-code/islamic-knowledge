import React, { useState } from 'react';
import { Languages, Moon, Search, ShieldCheck, X } from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface TopHeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onSearch: (query: string) => void;
  onOpenAdmin: () => void;
  isAdminUnlocked: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  lang,
  onToggleLang,
  onSearch,
  onOpenAdmin,
  isAdminUnlocked,
}) => {
  const t = TRANSLATIONS[lang];
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    onSearch('');
  };

  return (
    <header className="w-full border-b border-[#ded5c5] bg-[#f7f3ec]/95 backdrop-blur-xs relative z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#dfa84a] to-[#986c23] shadow-md shadow-[#986c23]/25 border border-[#f0c878]">
              <Moon className="w-6 h-6 text-[#fff8ea] fill-[#fff8ea]" />
              <span className="absolute -top-1 -right-1 text-xs text-[#dfa84a]">✦</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-nastaliq text-[#3d342a] tracking-tight">
                {t.siteTitle}
              </h1>
              <p className="text-[11px] sm:text-xs text-[#7b6d5b] font-arabic leading-tight">
                {t.siteSub}
              </p>
            </div>
          </div>

          {/* Mobile Admin & Lang shortcut */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ede3d1] text-[#4d3d2c] border border-[#bfae94] cursor-pointer"
            >
              {lang === 'ur' ? 'پښتو' : 'اردو'}
            </button>
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-full bg-[#4a4136] text-[#dfa84a] border border-[#c99738]/50"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Search Bar (Requirement #5: "jo search bar he usko uper waly side me krdo") */}
        <div className="w-full md:max-w-md lg:max-w-lg">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full"
          >
            <input
              type="text"
              id="top-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-10 py-2 sm:py-2.5 text-xs sm:text-sm font-arabic rounded-full bg-[#ede4d4]/90 hover:bg-[#ede4d4] focus:bg-[#fffdfa] border border-[#c9b79b] focus:border-[#9e7629] focus:outline-none focus:ring-2 focus:ring-[#c99738]/30 transition-all text-[#382f25] placeholder:text-[#887864] shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f6a29] hover:text-[#5f4414] cursor-pointer transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#887864] hover:text-[#42372a] cursor-pointer"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right utility buttons: Language Switcher and Admin Control Room */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          {/* Language Switcher (Urdu / Pashto) */}
          <button
            id="language-switch-btn"
            onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#ede3d1] hover:bg-[#e0d4c0] text-[#4d3d2c] border border-[#bfae94] shadow-xs transition-all cursor-pointer group"
            title={t.switchLang}
          >
            <Languages className="w-4 h-4 text-[#a67c2e] group-hover:rotate-180 transition-transform duration-300" />
            <div className="flex items-center gap-1 text-xs sm:text-sm font-arabic">
              <span
                className={
                  lang === 'ur'
                    ? 'font-bold text-[#8f6217] underline decoration-2'
                    : 'text-[#685c4f]'
                }
              >
                اردو
              </span>
              <span className="text-[#a49683]">|</span>
              <span
                className={
                  lang === 'ps'
                    ? 'font-bold text-[#8f6217] underline decoration-2'
                    : 'text-[#685c4f]'
                }
              >
                پښتو
              </span>
            </div>
          </button>

          {/* Admin Control Room Launcher */}
          <button
            id="admin-panel-btn"
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs border ${
              isAdminUnlocked
                ? 'bg-[#2b5133] text-[#d4f7dc] border-[#488e57]'
                : 'bg-[#40372d] hover:bg-[#2b241d] text-[#e8c374] border-[#b89547]/50'
            }`}
            title="Admin Management Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#dfa84a]" />
            <span className="font-arabic font-medium">
              {isAdminUnlocked
                ? lang === 'ur'
                  ? 'ایڈمن (فعال)'
                  : 'اډمین (فعال)'
                : t.nav.admin}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
