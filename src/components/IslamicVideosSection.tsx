import React, { useState } from 'react';
import {
  Play,
  X,
  Youtube,
  Tv,
  Film,
  Sparkles,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { IslamicVideo, Language } from '../types';
import { OrnateDivider } from './Ornaments';

interface IslamicVideosSectionProps {
  lang: Language;
  videos: IslamicVideo[];
  onOpenAdmin: () => void;
}

export const IslamicVideosSection: React.FC<IslamicVideosSectionProps> = ({
  lang,
  videos,
  onOpenAdmin,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePlayingVideo, setActivePlayingVideo] =
    useState<IslamicVideo | null>(null);

  const categories = [
    { id: 'all', label: t.videosSection.all },
    { id: 'youtube', label: t.videosSection.youtube },
    { id: 'tiktok', label: t.videosSection.tiktok },
    { id: 'recitation', label: t.videosSection.recitation },
    { id: 'bayan', label: t.videosSection.bayan },
    { id: 'hadith_reminder', label: t.videosSection.hadith_reminder },
  ];

  const filteredVideos = videos.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'youtube') return v.platform === 'youtube';
    if (selectedCategory === 'tiktok') return v.platform === 'tiktok';
    return v.category === selectedCategory;
  });

  // Helper to ensure iframe embed URL is playable
  const getPlayableEmbedUrl = (video: IslamicVideo): string => {
    if (video.embedUrl) {
      // Add autoplay if not present
      if (!video.embedUrl.includes('autoplay=1')) {
        return video.embedUrl.includes('?')
          ? `${video.embedUrl}&autoplay=1`
          : `${video.embedUrl}?autoplay=1`;
      }
      return video.embedUrl;
    }
    // If only regular YouTube link is provided, convert to embed
    if (video.videoUrl.includes('youtube.com/watch?v=')) {
      const id = video.videoUrl.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (video.videoUrl.includes('youtu.be/')) {
      const id = video.videoUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (video.videoUrl.includes('youtube.com/shorts/')) {
      const id = video.videoUrl.split('shorts/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return video.videoUrl;
  };

  return (
    <section id="videos" className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-12 sm:my-16">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#bd5c3b]/15 text-[#a64a2c] border border-[#bd5c3b]/40 text-xs font-arabic mb-2.5">
          <Film className="w-3.5 h-3.5 text-[#bd5c3b]" />
          <span>{lang === 'ur' ? 'یوٹیوب اور ٹک ٹاک کلیکشن' : 'یوټیوب او ټیک ټاک ویډیوګانې'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-nastaliq text-[#382f25]">
          {t.videosSection.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#736553] font-arabic mt-1.5 max-w-xl mx-auto">
          {t.videosSection.subtitle}
        </p>
        <div className="max-w-md mx-auto my-3">
          <OrnateDivider className="text-[#baa380]" />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-arabic font-medium transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#3b3228] text-[#f4d084] border-[#c99738] shadow-sm'
                  : 'bg-[#ede5d6] text-[#554737] hover:bg-[#e0d6c3] border-[#cdbfab]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct In-page Embedded Player Modal */}
      {activePlayingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#1c1813] rounded-2xl overflow-hidden border-2 border-[#caa55d] shadow-2xl flex flex-col">
            {/* Top Player Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#2b231a] border-b border-[#47392a] text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-arabic text-[#e1c58c]">
                  {t.videosSection.nowPlaying}:
                </span>
                <h4 className="text-xs sm:text-sm font-bold font-arabic text-[#fff8ea] truncate max-w-md">
                  {lang === 'ur'
                    ? activePlayingVideo.titleUr
                    : activePlayingVideo.titlePs}
                </h4>
              </div>

              <button
                onClick={() => setActivePlayingVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                title={t.videosSection.closePlayer}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Screen (Direct Iframe Embed Player) */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                src={getPlayableEmbedUrl(activePlayingVideo)}
                title={activePlayingVideo.titleUr}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Player Info Details */}
            <div className="p-4 sm:p-5 bg-[#251e16] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[#d1ba92] font-arabic">
                  {lang === 'ur' ? 'بیان / تلاوت کار:' : 'ویونکی / قاري:'}{' '}
                  <span className="font-bold text-white">
                    {activePlayingVideo.speaker}
                  </span>
                </p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-[#3d3326] text-[#e0c283] font-arabic border border-[#6b583f]">
                  {activePlayingVideo.platform === 'youtube'
                    ? 'یوٹیوب ویڈیو'
                    : 'ٹک ٹاک ویڈیو'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePlayingVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#dfa84a] hover:underline flex items-center gap-1 font-arabic"
                >
                  <span>{lang === 'ur' ? 'اصل لنک دیکھیں' : 'اصلي لېنک'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col rounded-xl overflow-hidden bg-[#fffdfa] border-2 border-[#d5c6b0] hover:border-[#caa35a] shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* Thumbnail with Play Overlay */}
            <div
              onClick={() => setActivePlayingVideo(video)}
              className="relative h-48 sm:h-52 overflow-hidden bg-[#241c15] cursor-pointer"
            >
              <img
                src={
                  video.thumbnail ||
                  'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=600&q=80'
                }
                alt={lang === 'ur' ? video.titleUr : video.titlePs}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Dark Overlay with Play Icon */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#9e7629] to-[#dfa84a] text-[#1c150b] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300 border-2 border-white/80">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Platform Badges */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                {video.platform === 'youtube' ? (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#cc0000] text-white shadow-md">
                    <Youtube className="w-3 h-3" />
                    <span>YouTube</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#000000] text-[#00f2fe] border border-[#fe2c55]/40 shadow-md">
                    <Tv className="w-3 h-3 text-[#fe2c55]" />
                    <span>TikTok</span>
                  </span>
                )}
              </div>

              {/* Duration badge */}
              {video.duration && (
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-cinzel backdrop-blur-xs">
                  {video.duration}
                </div>
              )}
            </div>

            {/* Video Information */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#fffefc]">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#84725e] font-arabic mb-1">
                  <span>{video.speaker}</span>
                  <span className="text-[#a87a2a]">
                    {video.category === 'recitation'
                      ? t.videosSection.recitation
                      : video.category === 'bayan'
                      ? t.videosSection.bayan
                      : video.category === 'hadith_reminder'
                      ? t.videosSection.hadith_reminder
                      : t.videosSection.quran_teachings}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-nastaliq text-[#382d21] line-clamp-2 leading-relaxed mt-1">
                  {lang === 'ur' ? video.titleUr : video.titlePs}
                </h3>
              </div>

              {/* Direct Play Action */}
              <div className="mt-4 pt-3 border-t border-[#ede2d1] flex items-center justify-between">
                <span className="text-xs text-[#7d6c59] font-arabic flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  {lang === 'ur' ? 'براہِ راست چلائیں' : 'سمدستي وغږوئ'}
                </span>

                <button
                  onClick={() => setActivePlayingVideo(video)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-arabic bg-[#453c31] hover:bg-[#2b241c] text-[#f4d084] border border-[#c99738]/50 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.videosSection.playDirectly}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin backend control notice bar */}
      <div className="mt-10 p-4 rounded-xl bg-[#ede3d1]/80 border border-[#c9b79b] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#9e7629]/20 flex items-center justify-center text-[#9e7629]">
            <Sliders className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-arabic text-[#554635]">
            {t.videosSection.managedByAdmin}
          </p>
        </div>

        <button
          onClick={onOpenAdmin}
          className="px-4 py-1.5 rounded-full text-xs font-bold font-arabic bg-[#42392d] hover:bg-[#2e261d] text-[#e8c374] border border-[#c99738]/60 cursor-pointer shadow-xs transition-all hover:scale-105"
        >
          {lang === 'ur'
            ? 'نئی ویڈیو شامل کریں (ایڈمن)'
            : 'نوې ویډیو زیاته کړئ (اډمین)'}
        </button>
      </div>
    </section>
  );
};
