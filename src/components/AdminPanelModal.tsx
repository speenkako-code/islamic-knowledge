import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Plus,
  Trash2,
  Video,
  Image as ImageIcon,
  Calendar,
  RotateCcw,
  Check,
  Lock,
  Unlock,
  AlertCircle,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import {
  DailyHighlightItem,
  IslamicPhoto,
  IslamicVideo,
  Language,
} from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  videos: IslamicVideo[];
  photos: IslamicPhoto[];
  highlights: DailyHighlightItem[];
  onUpdateVideos: (videos: IslamicVideo[]) => void;
  onUpdatePhotos: (photos: IslamicPhoto[]) => void;
  onUpdateHighlights: (highlights: DailyHighlightItem[]) => void;
  onResetAllData: () => void;
  isUnlocked: boolean;
  onUnlock: (status: boolean) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  lang,
  videos,
  photos,
  highlights,
  onUpdateVideos,
  onUpdatePhotos,
  onUpdateHighlights,
  onResetAllData,
  isUnlocked,
  onUnlock,
}) => {
  const t = TRANSLATIONS[lang];
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'photos' | 'calendar'>(
    'videos'
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New Video Form State
  const [newVideo, setNewVideo] = useState<Partial<IslamicVideo>>({
    platform: 'youtube',
    category: 'bayan',
    titleUr: '',
    titlePs: '',
    videoUrl: '',
    speaker: '',
    duration: '10:00',
    thumbnail: '',
  });

  // New Photo Form State
  const [newPhoto, setNewPhoto] = useState<Partial<IslamicPhoto>>({
    category: 'ayat',
    titleUr: '',
    titlePs: '',
    imageUrl: '',
    arabicText: '',
    urduCaption: '',
    pashtoCaption: '',
  });

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      onUnlock(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Helper to construct embed URL from user input
  const buildEmbedUrl = (url: string, platform: 'youtube' | 'tiktok'): string => {
    if (platform === 'youtube') {
      if (url.includes('youtube.com/watch?v=')) {
        const id = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtube.com/shorts/')) {
        const id = url.split('shorts/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      return url;
    }
    // TikTok: if direct video URL or embed
    return url;
  };

  // Video Actions
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.videoUrl || !newVideo.titleUr) return;

    const platform = newVideo.platform || 'youtube';
    const embedUrl = buildEmbedUrl(newVideo.videoUrl, platform);

    const created: IslamicVideo = {
      id: `video-${Date.now()}`,
      titleUr: newVideo.titleUr || 'اسلامی ویڈیو',
      titlePs: newVideo.titlePs || newVideo.titleUr || 'اسلامي ویډیو',
      platform,
      videoUrl: newVideo.videoUrl,
      embedUrl,
      speaker: newVideo.speaker || 'اہلِ علم',
      category: (newVideo.category as any) || 'bayan',
      duration: newVideo.duration || '05:00',
      thumbnail:
        newVideo.thumbnail ||
        'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=600&q=80',
    };

    onUpdateVideos([created, ...videos]);
    setNewVideo({
      platform: 'youtube',
      category: 'bayan',
      titleUr: '',
      titlePs: '',
      videoUrl: '',
      speaker: '',
      duration: '10:00',
      thumbnail: '',
    });
    showSuccess(
      lang === 'ur'
        ? 'ویڈیو کامیابی سے شامل کر دی گئی!'
        : 'ویډیو په بریالیتوب سره زیاته شوه!'
    );
  };

  const handleDeleteVideo = (id: string) => {
    onUpdateVideos(videos.filter((v) => v.id !== id));
    showSuccess(
      lang === 'ur' ? 'ویڈیو حذف کر دی گئی' : 'ویډیو ړنګه شوه'
    );
  };

  // Photo Actions
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.imageUrl || !newPhoto.titleUr) return;

    const created: IslamicPhoto = {
      id: `photo-${Date.now()}`,
      titleUr: newPhoto.titleUr || 'اسلامی تصویر',
      titlePs: newPhoto.titlePs || newPhoto.titleUr || 'اسلامي انځور',
      category: (newPhoto.category as any) || 'ayat',
      imageUrl: newPhoto.imageUrl,
      arabicText: newPhoto.arabicText || '',
      urduCaption: newPhoto.urduCaption || newPhoto.titleUr || '',
      pashtoCaption:
        newPhoto.pashtoCaption || newPhoto.titlePs || newPhoto.titleUr || '',
    };

    onUpdatePhotos([created, ...photos]);
    setNewPhoto({
      category: 'ayat',
      titleUr: '',
      titlePs: '',
      imageUrl: '',
      arabicText: '',
      urduCaption: '',
      pashtoCaption: '',
    });
    showSuccess(
      lang === 'ur'
        ? 'تصویر کامیابی سے شامل ہو گئی!'
        : 'انځور په بریالیتوب سره زیات شو!'
    );
  };

  const handleDeletePhoto = (id: string) => {
    onUpdatePhotos(photos.filter((p) => p.id !== id));
    showSuccess(
      lang === 'ur' ? 'تصویر حذف کر دی گئی' : 'انځور ړنګ شو'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in font-arabic">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#fcfaf6] rounded-2xl border-2 border-[#b89547] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#382f25] via-[#483c2f] to-[#382f25] border-b border-[#5e4e3d] flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#9e7629] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-nastaliq text-[#f6cf7d]">
                  {t.adminPanel.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 font-sans font-bold">
                  {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
              <p className="text-xs text-[#d1bea0] font-arabic">
                {t.adminPanel.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={() => onUnlock(false)}
                className="text-xs px-2.5 py-1 rounded bg-[#574838] hover:bg-[#6e5c47] text-[#e8c374] cursor-pointer"
                title="Lock admin session"
              >
                {t.adminPanel.logout}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="bg-emerald-700 text-white px-4 py-2 text-xs sm:text-sm font-arabic flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Body content */}
        {!isUnlocked ? (
          /* PIN Protection Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#f2e7d5] border-2 border-[#caa55d] flex items-center justify-center text-[#9e7629] mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-nastaliq text-[#382d21] mb-2">
              {lang === 'ur'
                ? 'ایڈمن پینل تک رسائی کے لیے پن درج کریں'
                : 'د کنټرول خونې لپاره پین کوډ ولیکئ'}
            </h4>
            <p className="text-xs sm:text-sm text-[#705e49] max-w-sm mb-6">
              {t.adminPanel.enterPin}
            </p>

            <form
              onSubmit={handlePinSubmit}
              className="w-full max-w-xs flex flex-col gap-3"
            >
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="1234"
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 rounded-xl bg-white border-2 border-[#c5b294] focus:border-[#9e7629] focus:outline-none"
              />

              {pinError && (
                <p className="text-xs text-rose-600 font-arabic flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{t.adminPanel.invalidPin}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#9e7629] to-[#c99738] hover:from-[#88621d] hover:to-[#b38228] text-[#1c150b] font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                {t.adminPanel.unlockBtn}
              </button>

              <button
                type="button"
                onClick={() => {
                  setPinInput('1234');
                  onUnlock(true);
                }}
                className="text-xs text-[#8c6721] hover:underline mt-1 cursor-pointer"
              >
                (آسان کلک: 1234 سے ان لاک کریں)
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Dashboard */
          <div className="flex flex-col flex-grow overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex border-b border-[#ded2be] bg-[#f0e7d8] px-4 pt-2 gap-2 text-xs sm:text-sm font-arabic overflow-x-auto">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'videos'
                    ? 'bg-[#fcfaf6] text-[#8f6217] border-t-2 border-x border-[#b89547]'
                    : 'text-[#615140] hover:text-[#2d251d]'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>{t.adminPanel.videosTab} ({videos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'photos'
                    ? 'bg-[#fcfaf6] text-[#8f6217] border-t-2 border-x border-[#b89547]'
                    : 'text-[#615140] hover:text-[#2d251d]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>{t.adminPanel.photosTab} ({photos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-[#fcfaf6] text-[#8f6217] border-t-2 border-x border-[#b89547]'
                    : 'text-[#615140] hover:text-[#2d251d]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t.adminPanel.calendarTab} ({highlights.length})</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-6">
              {/* TAB 1: VIDEOS MANAGEMENT */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  {/* Add Video Form */}
                  <form
                    onSubmit={handleAddVideo}
                    className="p-4 sm:p-5 rounded-xl bg-[#f7f2e8] border border-[#d6c7b0] shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm sm:text-base font-nastaliq text-[#382d21]">
                        {t.adminPanel.addVideoBtn} (یوٹیوب یا ٹک ٹاک)
                      </h4>
                      <span className="text-[11px] text-[#82715d]">
                        ویڈیو کا عام یوٹیوب یا ٹک ٹاک لنک چسپاں کریں
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          ویڈیو پلیٹ فارم:
                        </label>
                        <select
                          value={newVideo.platform}
                          onChange={(e) =>
                            setNewVideo({
                              ...newVideo,
                              platform: e.target.value as any,
                            })
                          }
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        >
                          <option value="youtube">یوٹیوب (YouTube)</option>
                          <option value="tiktok">ٹک ٹاک (TikTok)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          شعبہ / کیٹیگری:
                        </label>
                        <select
                          value={newVideo.category}
                          onChange={(e) =>
                            setNewVideo({
                              ...newVideo,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        >
                          <option value="bayan">اصلاحی بیانات (Bayan)</option>
                          <option value="recitation">قرآنی تلاوت (Recitation)</option>
                          <option value="hadith_reminder">احادیث و نصیحتیں (Hadith)</option>
                          <option value="quran_teachings">قرآنی تعلیمات</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          ویڈیو لنک / Embed URL: *
                        </label>
                        <input
                          type="url"
                          required
                          value={newVideo.videoUrl}
                          onChange={(e) =>
                            setNewVideo({ ...newVideo, videoUrl: e.target.value })
                          }
                          placeholder="https://www.youtube.com/watch?v=... یا TikTok link"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          عنوان (اردو میں): *
                        </label>
                        <input
                          type="text"
                          required
                          value={newVideo.titleUr}
                          onChange={(e) =>
                            setNewVideo({ ...newVideo, titleUr: e.target.value })
                          }
                          placeholder="مثلاً: دل کو چھو لینے والی تلاوت"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          عنوان (پښتو کې):
                        </label>
                        <input
                          type="text"
                          value={newVideo.titlePs}
                          onChange={(e) =>
                            setNewVideo({ ...newVideo, titlePs: e.target.value })
                          }
                          placeholder="د سورت رحمن مبارک تلاوت"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          مقرر / قاری کا نام:
                        </label>
                        <input
                          type="text"
                          value={newVideo.speaker}
                          onChange={(e) =>
                            setNewVideo({ ...newVideo, speaker: e.target.value })
                          }
                          placeholder="شیخ عبدالباسط / مولانا صاحب"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          تصویر / تھمب نیل URL (اختیاری):
                        </label>
                        <input
                          type="url"
                          value={newVideo.thumbnail}
                          onChange={(e) =>
                            setNewVideo({
                              ...newVideo,
                              thumbnail: e.target.value,
                            })
                          }
                          placeholder="https://images.unsplash.com/..."
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8f6217] hover:bg-[#724c10] text-white font-bold text-xs shadow-sm cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.adminPanel.addVideoBtn}</span>
                      </button>
                    </div>
                  </form>

                  {/* List of Existing Videos */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-[#453728] uppercase">
                      موجودہ ویڈیوز کی فہرست ({videos.length})
                    </h5>

                    <div className="space-y-2">
                      {videos.map((vid) => (
                        <div
                          key={vid.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#ded2bf] hover:border-[#c99738] shadow-2xs gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded bg-[#332a21] text-[#dfa84a] flex items-center justify-center shrink-0">
                              <Video className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded text-white ${
                                    vid.platform === 'youtube'
                                      ? 'bg-red-600'
                                      : 'bg-black'
                                  }`}
                                >
                                  {vid.platform}
                                </span>
                                <h6 className="text-xs sm:text-sm font-bold font-nastaliq text-[#382d21] truncate">
                                  {vid.titleUr}
                                </h6>
                              </div>
                              <p className="text-[11px] text-[#7d6d5a] truncate">
                                {vid.speaker} • {vid.videoUrl}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteVideo(vid.id)}
                            className="p-1.5 rounded text-rose-600 hover:bg-rose-50 cursor-pointer shrink-0 transition-colors"
                            title={t.adminPanel.deleteBtn}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PHOTOS MANAGEMENT */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  {/* Add Photo Form */}
                  <form
                    onSubmit={handleAddPhoto}
                    className="p-4 sm:p-5 rounded-xl bg-[#f7f2e8] border border-[#d6c7b0] shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm sm:text-base font-nastaliq text-[#382d21]">
                        {t.adminPanel.addPhotoBtn} (آیات و احادیث گرافکس)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          کیٹیگری:
                        </label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) =>
                            setNewPhoto({
                              ...newPhoto,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        >
                          <option value="ayat">قرآنی آیات</option>
                          <option value="hadith">احادیث مبارکہ</option>
                          <option value="dua">دعائیں و اذکار</option>
                          <option value="holy_places">مکہ و مدینہ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          تصویر کا انٹرنیٹ URL: *
                        </label>
                        <input
                          type="url"
                          required
                          value={newPhoto.imageUrl}
                          onChange={(e) =>
                            setNewPhoto({ ...newPhoto, imageUrl: e.target.value })
                          }
                          placeholder="https://images.unsplash.com/..."
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          عنوان (اردو): *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoto.titleUr}
                          onChange={(e) =>
                            setNewPhoto({ ...newPhoto, titleUr: e.target.value })
                          }
                          placeholder="مثلاً: ذکرِ الٰہی کا نور"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          عنوان (پښتو):
                        </label>
                        <input
                          type="text"
                          value={newPhoto.titlePs}
                          onChange={(e) =>
                            setNewPhoto({ ...newPhoto, titlePs: e.target.value })
                          }
                          placeholder="د الهي ذکر رڼا"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          عربی عبارت (آیت یا حدیث):
                        </label>
                        <input
                          type="text"
                          value={newPhoto.arabicText}
                          onChange={(e) =>
                            setNewPhoto({
                              ...newPhoto,
                              arabicText: e.target.value,
                            })
                          }
                          placeholder="أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b] font-amiri"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          اردو ترجمہ / کیپشن:
                        </label>
                        <textarea
                          rows={2}
                          value={newPhoto.urduCaption}
                          onChange={(e) =>
                            setNewPhoto({
                              ...newPhoto,
                              urduCaption: e.target.value,
                            })
                          }
                          placeholder="خبردار! اللہ کے ذکر ہی سے دلوں کو سکون ملتا ہے۔"
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#554737] mb-1">
                          پښتو ژباړه / کیپشن:
                        </label>
                        <textarea
                          rows={2}
                          value={newPhoto.pashtoCaption}
                          onChange={(e) =>
                            setNewPhoto({
                              ...newPhoto,
                              pashtoCaption: e.target.value,
                            })
                          }
                          placeholder="خبردار اوسئ! يوازې د الله په یاد سره زړونه ارامېږي."
                          className="w-full p-2 rounded-lg bg-white border border-[#c4b39b]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8f6217] hover:bg-[#724c10] text-white font-bold text-xs shadow-sm cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.adminPanel.addPhotoBtn}</span>
                      </button>
                    </div>
                  </form>

                  {/* List of Existing Photos */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-[#453728] uppercase">
                      موجودہ تصاویر ({photos.length})
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {photos.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-[#ded2bf] shadow-2xs"
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.titleUr}
                            className="w-14 h-14 object-cover rounded-md shrink-0 bg-[#332b22]"
                          />
                          <div className="min-w-0 flex-grow">
                            <h6 className="text-xs sm:text-sm font-bold font-nastaliq text-[#382d21] truncate">
                              {p.titleUr}
                            </h6>
                            <p className="text-[10px] text-[#786958] truncate">
                              {p.arabicText || p.urduCaption}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeletePhoto(p.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                            title="حذف کریں"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CALENDAR HIGHLIGHTS */}
              {activeTab === 'calendar' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#f7f2e8] border border-[#d6c7b0] text-xs">
                    <h5 className="font-bold text-sm text-[#382d21] mb-2 font-nastaliq">
                      روزانہ کیلنڈر کا ڈیٹا ({highlights.length} کلام موجود ہیں)
                    </h5>
                    <p className="text-[#695846] leading-relaxed">
                      یہ کلام روزانہ کی بنیاد پر اور ویب سائٹ کے "تازہ کلام" بٹن
                      دبانے پر تبدیل ہوتا ہے۔ ہر آئٹم میں بیک وقت اردو اور پشتو
                      ترجمہ شامل ہے۔
                    </p>
                  </div>

                  <div className="space-y-3">
                    {highlights.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-lg bg-white border border-[#ded2bf] space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-[#eee3d1] pb-1.5 font-bold text-[#8f6217]">
                          <span>کلام نمبر {idx + 1}</span>
                          <span className="text-[10px] text-[#776654]">
                            {item.ayat.reference}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-[#2a2218] font-amiri text-sm">
                            {item.ayat.arabic}
                          </p>
                          <p className="text-[#554737] mt-0.5">
                            اردو: {item.ayat.urdu}
                          </p>
                          <p className="text-[#554737]">
                            پښتو: {item.ayat.pashto}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#f2e9dc]">
                          <p className="font-bold text-[#2a2218] font-amiri">
                            حدیث: {item.hadith.arabic}
                          </p>
                          <p className="text-[#554737]">
                            اردو: {item.hadith.urdu}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#f2e9dc]">
                          <p className="font-bold text-[#8d6215]">
                            قول: {item.qaul.personality}
                          </p>
                          <p className="text-[#554737]">
                            "{item.qaul.arabicOrQuote}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Footer with Reset Action */}
            <div className="px-5 py-3.5 bg-[#ede4d4] border-t border-[#ded1be] flex items-center justify-between text-xs font-arabic">
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      lang === 'ur'
                        ? 'کیا آپ تمام ڈیٹا کو پہلے جیسا (Default) کرنا چاہتے ہیں؟'
                        : 'ایا غواړئ چې ټول معلومات اصلي حالت ته واړوئ؟'
                    )
                  ) {
                    onResetAllData();
                    showSuccess(
                      lang === 'ur'
                        ? 'تمام ڈیٹا اصلی حالت پر بحال کر دیا گیا'
                        : 'ټول معلومات اصلي حالت ته واوښتل'
                    );
                  }
                }}
                className="flex items-center gap-1 text-rose-700 hover:text-rose-900 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.adminPanel.resetBtn}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-[#443a2e] hover:bg-[#2d251d] text-[#e8c374] font-bold cursor-pointer"
                >
                  {t.adminPanel.cancelBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
