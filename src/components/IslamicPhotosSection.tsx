import React, { useState } from 'react';
import {
  Download,
  Eye,
  Check,
  Image as ImageIcon,
  Sparkles,
  X,
  Share2,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { IslamicPhoto, Language } from '../types';
import { OrnateCorner, OrnateDivider } from './Ornaments';

interface IslamicPhotosSectionProps {
  lang: Language;
  photos: IslamicPhoto[];
}

export const IslamicPhotosSection: React.FC<IslamicPhotosSectionProps> = ({
  lang,
  photos,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<IslamicPhoto | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.photosSection.all },
    { id: 'ayat', label: t.photosSection.ayat },
    { id: 'hadith', label: t.photosSection.hadith },
    { id: 'dua', label: t.photosSection.dua },
    { id: 'holy_places', label: t.photosSection.holy_places },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const handleDownload = async (photo: IslamicPhoto) => {
    setDownloadingId(photo.id);
    setToastMessage(t.photosSection.downloadSuccess);

    try {
      // Fetch image as blob for direct safe download
      const response = await fetch(photo.imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `islami-markaz-${photo.id}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback direct link open/download if CORS restricts blob
      const link = document.createElement('a');
      link.href = photo.imageUrl;
      link.target = '_blank';
      link.download = `islami-photo-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => {
        setDownloadingId(null);
        setTimeout(() => setToastMessage(null), 2500);
      }, 1000);
    }
  };

  return (
    <section id="photos" className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-12 sm:my-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#231e18]/95 text-[#f4d084] border border-[#c99738] shadow-2xl backdrop-blur-md animate-fade-in font-arabic text-xs sm:text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfa84a]/15 text-[#8f6217] border border-[#dfa84a]/40 text-xs font-arabic mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#dfa84a]" />
          <span>{lang === 'ur' ? 'قرآنی گرافکس و پوسٹرز' : 'اسلامي والپیپرونه'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-nastaliq text-[#382f25]">
          {t.photosSection.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#736553] font-arabic mt-1.5 max-w-xl mx-auto">
          {t.photosSection.subtitle}
        </p>
        <div className="max-w-md mx-auto my-3">
          <OrnateDivider className="text-[#baa380]" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-arabic font-medium transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#40372d] text-[#f4d084] border-[#c99738] shadow-sm'
                  : 'bg-[#ede5d6] text-[#554737] hover:bg-[#e0d6c3] border-[#cdbfab]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="flex flex-col rounded-xl overflow-hidden bg-[#fffdfa] border-2 border-[#d5c6b0] hover:border-[#b89547] shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* Image Container with Calligraphy Overlay */}
            <div className="relative h-60 sm:h-64 overflow-hidden bg-[#241c15]">
              <img
                src={photo.imageUrl}
                alt={lang === 'ur' ? photo.titleUr : photo.titlePs}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient Vignette & Arabic calligraphy badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-3.5 sm:p-4">
                {/* Top Badge: Category */}
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1e1711]/80 text-[#f5d58c] border border-[#dfa84a]/50 font-arabic backdrop-blur-xs">
                    {photo.category === 'ayat'
                      ? t.photosSection.ayat
                      : photo.category === 'hadith'
                      ? t.photosSection.hadith
                      : photo.category === 'dua'
                      ? t.photosSection.dua
                      : t.photosSection.holy_places}
                  </span>

                  {/* Preview Trigger */}
                  <button
                    onClick={() => setPreviewPhoto(photo)}
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 cursor-pointer"
                    title={t.photosSection.viewFull}
                  >
                    <Eye className="w-4 h-4 text-[#f4d084]" />
                  </button>
                </div>

                {/* Bottom Calligraphy in Arabic */}
                {photo.arabicText && (
                  <div className="text-center p-2 rounded-lg bg-black/50 backdrop-blur-xs border border-white/15">
                    <p className="text-base sm:text-lg font-bold font-amiri text-[#fff9eb] leading-relaxed drop-shadow-md">
                      {photo.arabicText}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Content & Direct Download Action */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#fffefc]">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-nastaliq text-[#382d21] mb-1">
                  {lang === 'ur' ? photo.titleUr : photo.titlePs}
                </h3>
                <p className="text-xs sm:text-sm text-[#5d4f3e] font-arabic leading-relaxed">
                  {lang === 'ur' ? photo.urduCaption : photo.pashtoCaption}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#ede2d1] flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewPhoto(photo)}
                  className="text-xs font-bold font-arabic text-[#876527] hover:text-[#5e4414] cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.photosSection.viewFull}</span>
                </button>

                {/* Direct Download Button (Requirement #7: "jo download b hota jaye") */}
                <button
                  onClick={() => handleDownload(photo)}
                  disabled={downloadingId === photo.id}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-arabic bg-gradient-to-r from-[#9e7629] to-[#c99738] hover:from-[#896420] hover:to-[#b6842a] text-[#1c150c] shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  title="تصویر ڈاؤنلوڈ کریں"
                >
                  {downloadingId === photo.id ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>{lang === 'ur' ? 'جاری ہے...' : 'کېږي...'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.photosSection.downloadBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-3xl w-full bg-[#fdfaf4] rounded-2xl overflow-hidden border-2 border-[#caa55d] shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image display */}
            <div className="relative max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={previewPhoto.imageUrl}
                alt={previewPhoto.titleUr}
                className="max-h-[60vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info and download */}
            <div className="p-5 sm:p-6 bg-[#fbf7ee]">
              {previewPhoto.arabicText && (
                <div className="mb-3 p-3 rounded-lg bg-[#efe7d8] border border-[#d6c7b0] text-center">
                  <p className="text-xl sm:text-2xl font-bold font-amiri text-[#2b2218]">
                    {previewPhoto.arabicText}
                  </p>
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-bold font-nastaliq text-[#382d21]">
                {lang === 'ur' ? previewPhoto.titleUr : previewPhoto.titlePs}
              </h3>
              <p className="text-xs sm:text-sm text-[#5f5140] font-arabic mt-1 leading-relaxed">
                {lang === 'ur'
                  ? previewPhoto.urduCaption
                  : previewPhoto.pashtoCaption}
              </p>

              <div className="mt-5 pt-3 border-t border-[#ded2be] flex items-center justify-between">
                <span className="text-xs text-[#877865] font-arabic">
                  {lang === 'ur'
                    ? 'اصل ہائی ریزولوشن کوالٹی میں ڈاؤنلوڈ کریں'
                    : 'په اصلي کیفیت کې یې ډاونلوډ کړئ'}
                </span>

                <button
                  onClick={() => handleDownload(previewPhoto)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold font-arabic bg-gradient-to-r from-[#9e7629] to-[#c99738] text-[#1c150c] shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.photosSection.downloadBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
