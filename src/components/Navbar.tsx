import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  activeSection,
  onNavigate,
  onOpenAdmin,
}) => {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'calendar', label: t.nav.calendar },
    { id: 'photos', label: t.nav.photos },
    { id: 'videos', label: t.nav.videos },
    { id: 'community', label: t.nav.community },
    { id: 'education', label: t.nav.education },
    { id: 'rules', label: t.nav.rules },
    { id: 'news', label: t.nav.news },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#4a433a] border-y-2 border-[#b89f74] shadow-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-2.5 flex-wrap gap-x-2 lg:gap-x-3 text-xs sm:text-sm font-arabic">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`px-2.5 py-1 rounded transition-colors duration-200 cursor-pointer font-medium tracking-wide ${
                    isActive
                      ? 'text-[#f6cf7d] font-bold bg-[#383129]/70 shadow-xs ring-1 ring-[#c99738]/50'
                      : 'text-[#e5decb] hover:text-[#f6cf7d]'
                  }`}
                >
                  {item.label}
                </button>
                {index < navItems.length - 1 && (
                  <span className="text-[#a68f6a] select-none text-[11px]">۞</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex md:hidden items-center justify-between py-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[#f6cf7d] font-nastaliq font-bold">
            <span>{t.siteTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-1 rounded bg-[#383129] text-[#e8c374] border border-[#b89f74]/40"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded bg-[#383129] text-[#f6cf7d] hover:text-white border border-[#b89f74]/50 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-[#655b4e] flex flex-col gap-1 text-sm font-arabic bg-[#433b32]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-2 rounded text-right transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#322c24] text-[#f6cf7d] font-bold'
                      : 'text-[#e8e2d3] hover:bg-[#383129]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#9d8a70]">۞</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};
