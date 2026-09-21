import React, { useState, useEffect } from 'react';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailyCalendarHighlight } from './components/DailyCalendarHighlight';
import { IslamicPhotosSection } from './components/IslamicPhotosSection';
import { IslamicVideosSection } from './components/IslamicVideosSection';
import { FeatureCards } from './components/FeatureCards';
import { AllahuAkbarBanner } from './components/AllahuAkbarBanner';
import { ThreeColumnSection } from './components/ThreeColumnSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import {
  INITIAL_DAILY_HIGHLIGHTS,
  INITIAL_PHOTOS,
  INITIAL_VIDEOS,
} from './data/content';
import {
  DailyHighlightItem,
  FeatureCard,
  IslamicPhoto,
  IslamicVideo,
  Language,
  NewsItem,
} from './types';

// Storage key for admin-managed content
const STORAGE_KEY = 'islami_markaz_cms_v2';

export default function App() {
  const [lang, setLang] = useState<Language>('ur');
  const [activeSection, setActiveSection] = useState('home');

  // Admin & Content State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Content collections with LocalStorage persistence for Admin management
  const [videos, setVideos] = useState<IslamicVideo[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_videos`);
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  const [photos, setPhotos] = useState<IslamicPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_photos`);
      return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const [highlights, setHighlights] = useState<DailyHighlightItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_highlights`);
      return saved ? JSON.parse(saved) : INITIAL_DAILY_HIGHLIGHTS;
    } catch {
      return INITIAL_DAILY_HIGHLIGHTS;
    }
  });

  // Daily calendar active index (for refresh button)
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Detail Modal states
  const [selectedCard, setSelectedCard] = useState<FeatureCard | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isDuaModal, setIsDuaModal] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Synchronize document language & RTL direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = 'rtl';
  }, [lang]);

  // Persist content updates to localStorage
  const handleUpdateVideos = (updatedVideos: IslamicVideo[]) => {
    setVideos(updatedVideos);
    try {
      localStorage.setItem(
        `${STORAGE_KEY}_videos`,
        JSON.stringify(updatedVideos)
      );
    } catch (e) {
      console.error('Failed to save videos to localStorage', e);
    }
  };

  const handleUpdatePhotos = (updatedPhotos: IslamicPhoto[]) => {
    setPhotos(updatedPhotos);
    try {
      localStorage.setItem(
        `${STORAGE_KEY}_photos`,
        JSON.stringify(updatedPhotos)
      );
    } catch (e) {
      console.error('Failed to save photos to localStorage', e);
    }
  };

  const handleUpdateHighlights = (
    updatedHighlights: DailyHighlightItem[]
  ) => {
    setHighlights(updatedHighlights);
    try {
      localStorage.setItem(
        `${STORAGE_KEY}_highlights`,
        JSON.stringify(updatedHighlights)
      );
    } catch (e) {
      console.error('Failed to save highlights to localStorage', e);
    }
  };

  const handleResetAllData = () => {
    setVideos(INITIAL_VIDEOS);
    setPhotos(INITIAL_PHOTOS);
    setHighlights(INITIAL_DAILY_HIGHLIGHTS);
    setHighlightIndex(0);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_videos`);
      localStorage.removeItem(`${STORAGE_KEY}_photos`);
      localStorage.removeItem(`${STORAGE_KEY}_highlights`);
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ur' ? 'ps' : 'ur'));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchResult(query);
  };

  const handleRefreshNextHighlight = () => {
    setHighlightIndex((prev) => (prev + 1) % highlights.length);
  };

  const closeAllDetailModals = () => {
    setSelectedCard(null);
    setSelectedNews(null);
    setIsDuaModal(false);
    setSearchResult(null);
  };

  const isAnyDetailModalOpen =
    Boolean(selectedCard) ||
    Boolean(selectedNews) ||
    isDuaModal ||
    Boolean(searchResult);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#ede7db] text-[#332e27] flex flex-col islamic-parchment-bg font-arabic relative selection:bg-[#c99738] selection:text-white"
    >
      {/* 1. Top Header: Brand name in Urdu, Search bar relocated to top, Language switcher & Admin link */}
      <TopHeader
        lang={lang}
        onToggleLang={handleToggleLang}
        onSearch={handleSearch}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminUnlocked={isAdminUnlocked}
      />

      {/* 2. Navigation Ribbon */}
      <Navbar
        lang={lang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {/* Section 1: Hero framed showcase */}
        <HeroSection
          lang={lang}
          onExploreMore={() => handleNavigate('calendar')}
        />

        {/* Section 2: Daily Calendar Highlight (Ayat, Hadith, Qaul in Urdu & Pashto simultaneously with Refresh) */}
        <DailyCalendarHighlight
          lang={lang}
          highlights={highlights}
          currentIndex={highlightIndex}
          onRefreshNext={handleRefreshNextHighlight}
        />

        {/* Section 3: Islamic Photos Section (with Ayat, Hadith, Duas & Direct Download feature) */}
        <IslamicPhotosSection lang={lang} photos={photos} />

        {/* Section 4: Islamic Videos Section (YouTube & TikTok videos with Direct In-site Player & Admin backend control) */}
        <IslamicVideosSection
          lang={lang}
          videos={videos}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Section 5: Sacred Quran Calligraphy Banner */}
        <AllahuAkbarBanner
          lang={lang}
          onOpenDuaModal={() => setIsDuaModal(true)}
        />

        {/* Section 6: Feature Cards (Islamic Community, Education & Classes) */}
        <FeatureCards
          lang={lang}
          onSelectCard={(card) => setSelectedCard(card)}
        />

        {/* Section 7: Mosque Rules & Etiquette + Islamic News (About Us Column removed) */}
        <ThreeColumnSection
          lang={lang}
          onSelectNews={(news) => setSelectedNews(news)}
        />
      </main>

      {/* Footer (Address & Phone number removed as requested, with quick navigation & admin access) */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Full-control Admin Management Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        videos={videos}
        photos={photos}
        highlights={highlights}
        onUpdateVideos={handleUpdateVideos}
        onUpdatePhotos={handleUpdatePhotos}
        onUpdateHighlights={handleUpdateHighlights}
        onResetAllData={handleResetAllData}
        isUnlocked={isAdminUnlocked}
        onUnlock={setIsAdminUnlocked}
      />

      {/* Detail Modal for Articles, Class Enrollment, Dua & Search */}
      <DetailModal
        isOpen={isAnyDetailModalOpen}
        onClose={closeAllDetailModals}
        lang={lang}
        selectedCard={selectedCard}
        selectedNews={selectedNews}
        isDuaModal={isDuaModal}
        searchResult={searchResult}
      />
    </div>
  );
}
