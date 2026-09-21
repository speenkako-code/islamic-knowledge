export type Language = 'ur' | 'ps';

export interface DailyAyat {
  id: string;
  arabic: string;
  reference: string;
  urdu: string;
  pashto: string;
}

export interface DailyHadith {
  id: string;
  arabic: string;
  reference: string;
  narrator?: string;
  urdu: string;
  pashto: string;
}

export interface DailyQaul {
  id: string;
  arabicOrQuote: string;
  personality: string;
  urdu: string;
  pashto: string;
}

export interface DailyHighlightItem {
  id: string;
  ayat: DailyAyat;
  hadith: DailyHadith;
  qaul: DailyQaul;
}

export interface IslamicPhoto {
  id: string;
  titleUr: string;
  titlePs: string;
  category: 'ayat' | 'hadith' | 'dua' | 'holy_places';
  imageUrl: string;
  arabicText?: string;
  urduCaption: string;
  pashtoCaption: string;
}

export interface IslamicVideo {
  id: string;
  titleUr: string;
  titlePs: string;
  platform: 'youtube' | 'tiktok';
  videoUrl: string;
  embedUrl: string;
  speaker: string;
  category: 'recitation' | 'bayan' | 'hadith_reminder' | 'quran_teachings';
  duration?: string;
  thumbnail?: string;
}

export interface NewsItem {
  id: string;
  date: string;
  hijriDate: string;
  titleUr: string;
  titlePs: string;
  summaryUr: string;
  summaryPs: string;
  contentUr: string;
  contentPs: string;
  image: string;
}

export interface FeatureCard {
  id: string;
  titleUr: string;
  titlePs: string;
  descUr: string;
  descPs: string;
  detailsUr: string;
  detailsPs: string;
  accent?: boolean;
}

export interface MosqueRule {
  id: number;
  textUr: string;
  textPs: string;
  arabicReference?: string;
}
