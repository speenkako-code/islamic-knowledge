import React, { useState } from 'react';
import { X, Check, BookOpen, Send, Calendar, Share2 } from 'lucide-react';
import { FeatureCard, Language, NewsItem } from '../types';
import { OrnateDivider } from './Ornaments';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  selectedCard?: FeatureCard | null;
  selectedNews?: NewsItem | null;
  isDuaModal?: boolean;
  isAboutModal?: boolean;
  searchResult?: string | null;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  lang,
  selectedCard,
  selectedNews,
  isDuaModal,
  isAboutModal,
  searchResult,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryName.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#faf6ef] text-[#332b21] rounded-2xl border-2 border-[#bfae94] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2d6c1] bg-[#f0e7d7]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#9e7629]" />
            <h3 className="text-lg font-bold font-nastaliq text-[#3a3024]">
              {selectedCard
                ? lang === 'ur'
                  ? selectedCard.titleUr
                  : selectedCard.titlePs
                : selectedNews
                ? lang === 'ur'
                  ? selectedNews.titleUr
                  : selectedNews.titlePs
                : isDuaModal
                ? lang === 'ur'
                  ? 'آج کی مسنون دعا اور استغفار'
                  : 'د نن ورځې مسنونه دعا'
                : isAboutModal
                ? lang === 'ur'
                  ? 'اسلامی معلومات اور ہدایت کا مرکز کا تفصیلی منشور'
                  : 'د اسلامي معلوماتو او لارښوونې مرکز تفصیلي منشور'
                : lang === 'ur'
                ? 'تلاش کے نتائج'
                : 'د لټون پایلې'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7a6b57] hover:text-[#2d2419] hover:bg-[#e4d7c0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4 font-arabic text-sm text-[#483d30] leading-relaxed">
          {selectedCard && (
            <div>
              <p className="text-base font-semibold text-[#2f251a] mb-2">
                {lang === 'ur' ? selectedCard.descUr : selectedCard.descPs}
              </p>
              <OrnateDivider className="my-3 text-[#baa27d]" />
              <p className="leading-loose mb-6">
                {lang === 'ur' ? selectedCard.detailsUr : selectedCard.detailsPs}
              </p>

              {/* Inquiry & Enrollment Form */}
              <div className="bg-[#ede4d2] p-4 rounded-xl border border-[#d6c7b0]">
                <h4 className="font-bold text-[#35281b] mb-2 text-sm">
                  {lang === 'ur' ? 'کلاس میں داخلہ یا معلومات کے لیے رابطہ فرمائیں:' : 'په ټولګي کې د ګډون یا معلوماتو لپاره نوملیکنه:'}
                </h4>
                {submitted ? (
                  <div className="flex items-center gap-2 text-green-800 font-bold py-2">
                    <Check className="w-5 h-5" />
                    <span>{lang === 'ur' ? 'شکریہ! آپ کی درخواست موصول ہو چکی ہے، ہم جلد رابطہ کریں گے۔' : 'مننه! ستاسو غوښتنه وسپارل شوه، ژر به اړیکه ونیسو.'}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitInquiry} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder={lang === 'ur' ? 'آپ کا مبارک نام' : 'ستاسو نوم'}
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#c4b195] text-xs focus:outline-none focus:ring-1 focus:ring-[#9e7629]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder={lang === 'ur' ? 'واٹس ایپ یا فون نمبر' : 'واټس اپ یا د اړیکې شمیره'}
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#c4b195] text-xs focus:outline-none focus:ring-1 focus:ring-[#9e7629]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#9e7629] hover:bg-[#83611e] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'ur' ? 'درخواست بھیجیں' : 'غوښتنه واستوئ'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {selectedNews && (
            <div>
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#c9b89d] mb-4">
                <img
                  src={selectedNews.image}
                  alt="News"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8c7450] font-cinzel mb-2" dir="ltr">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedNews.hijriDate} | {selectedNews.date}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-nastaliq text-[#2a2117] mb-2 leading-relaxed">
                {lang === 'ur' ? selectedNews.titleUr : selectedNews.titlePs}
              </h3>
              <OrnateDivider className="my-3 text-[#baa27d]" />
              <p className="leading-loose text-justify">
                {lang === 'ur' ? selectedNews.contentUr : selectedNews.contentPs}
              </p>
            </div>
          )}

          {isDuaModal && (
            <div className="text-center space-y-4">
              <div className="p-4 rounded-xl bg-[#f0e7d5] border border-[#d6c7af]">
                <p className="text-xl sm:text-2xl font-amiri font-bold text-[#1f1911] leading-loose">
                  رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                </p>
                <OrnateDivider className="my-2 text-[#b0966f]" />
                <p className="text-sm font-nastaliq text-[#524433] leading-relaxed">
                  {lang === 'ur'
                    ? 'اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی، اور ہمیں دوزخ کے عذاب سے بچا۔'
                    : 'ای زموږ ربه! موږ ته په دنیا کې هم نېکمرغي راکړه او په آخرت کې هم خیر او نېکمرغي راکړه او موږ د جهنم له اوره وژغوره.'}
                </p>
              </div>
              <p className="text-xs text-[#6e5f4d]">
                {lang === 'ur'
                  ? 'ہر نماز کے بعد، سفر کے دوران اور رات کو سونے سے قبل اس مسنون دعا کا کثرت سے ورد فرمائیں۔'
                  : 'د هر لمانځه نه وروسته، د سفر او له خوب وړاندې د دې مبارکې مسنونې دعا ورد کوئ.'}
              </p>
            </div>
          )}

          {isAboutModal && (
            <div className="space-y-3">
              <p>
                {lang === 'ur'
                  ? 'جامع مرکز نور الاسلام کا قیام ۱۹۹۵ء میں عمل میں لایا گیا تھا۔ یہ ادارہ خالصتاً کتاب و سنت، سلف صالحین کے فہم اور اعتدال پسندی کی بنیاد پر کام کرتا ہے۔'
                  : 'د اسلام رڼا جامع مرکز په کال ۱۹۹۵ کې تاسیس شوی. دا مرکز د قرآن، نبوي سنتو او د اسلام د اعتدال او سوله ییزو لارښوونو په بنسټ علمي خدمت کوي.'}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-[#524332]">
                <li>{lang === 'ur' ? 'مفت اسلامی لائبریری اور ڈیجیٹل کتب خانہ' : 'وړیا اسلامي او ډیجیټل کتابتون'}</li>
                <li>{lang === 'ur' ? 'شادی بیاہ، جنازہ اور مصالحتی کمیٹی کی خدمات' : 'د ودونو، جنازې او د شخړو سوله ییز هواری'}</li>
                <li>{lang === 'ur' ? 'یتامیٰ اور نادار خاندانوں کی مستقل کفالت' : 'د یتیمانو او اړمنو کورنیو میاشتنۍ مالي مرسته'}</li>
              </ul>
            </div>
          )}

          {searchResult && (
            <div className="p-4 rounded-xl bg-[#f0e7d5] border border-[#d6c7af]">
              <p className="font-semibold text-xs text-[#3a2f22]">
                {lang === 'ur'
                  ? `آپ نے "${searchResult}" تلاش کیا۔ متعلقہ شعبہ جات اور معلومات نیچے درج ہیں:`
                  : `تاسو د "${searchResult}" په اړه لټون وکړ. اړوند معلومات لاندې دي:`}
              </p>
              <p className="text-xs text-[#6e5e4b] mt-2">
                {lang === 'ur'
                  ? 'آپ نماز کے اوقات، تعلیم و تدریس، مسجد کے آداب یا رابطہ فارم کے ذریعے بھی رہنمائی لے سکتے ہیں۔'
                  : 'تاسو کولی شئ د لمانځه وختونو، ښوونیزو ټولګیو، د جومات آدابو یا د اړیکې برخې له لارې لارښوونه ترلاسه کړئ.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e2d6c1] bg-[#f0e7d7] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#44382c] hover:bg-[#342a20] text-[#f7ecd9] text-xs font-semibold cursor-pointer"
          >
            {lang === 'ur' ? 'بند کریں' : 'بندول'}
          </button>
        </div>
      </div>
    </div>
  );
};
