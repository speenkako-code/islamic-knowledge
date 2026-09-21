import React from 'react';
import { FEATURE_CARDS } from '../data/content';
import { FeatureCard, Language } from '../types';
import { OrnateCorner, OrnateDivider } from './Ornaments';

interface FeatureCardsProps {
  lang: Language;
  onSelectCard: (card: FeatureCard) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  lang,
  onSelectCard,
}) => {
  return (
    <section id="community" className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {FEATURE_CARDS.map((card) => {
          const title = lang === 'ur' ? card.titleUr : card.titlePs;
          const desc = lang === 'ur' ? card.descUr : card.descPs;

          return (
            <div
              key={card.id}
              className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-lg bg-[#fdfbf7] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                card.accent
                  ? 'border-[#c99738] shadow-md ring-1 ring-[#c99738]/30'
                  : 'border-[#d8ccb8] shadow-sm'
              }`}
            >
              {/* Ornate corner metalwork brackets */}
              <OrnateCorner position="top-left" size={26} className="absolute top-1.5 left-1.5 text-[#a89069]" />
              <OrnateCorner position="top-right" size={26} className="absolute top-1.5 right-1.5 text-[#a89069]" />
              <OrnateCorner position="bottom-left" size={26} className="absolute bottom-1.5 left-1.5 text-[#a89069]" />
              <OrnateCorner position="bottom-right" size={26} className="absolute bottom-1.5 right-1.5 text-[#a89069]" />

              {/* Card Header & Title */}
              <div className="text-center pt-2">
                <h3 className="text-lg sm:text-xl font-bold font-nastaliq text-[#352d24] mb-2 leading-relaxed">
                  {title}
                </h3>
                <OrnateDivider className="my-2 text-[#b0966f]" />
              </div>

              {/* Card Body Description */}
              <div className="py-2 flex-grow text-center">
                <p className="text-xs sm:text-sm text-[#5d5142] font-arabic leading-relaxed">
                  {desc}
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="text-center pt-3 pb-1 border-t border-[#eee5d5] mt-3">
                <button
                  onClick={() => onSelectCard(card)}
                  className={`text-xs sm:text-sm font-semibold font-arabic transition-all hover:underline cursor-pointer ${
                    card.accent
                      ? 'text-[#b94e2b] hover:text-[#913719] font-bold'
                      : 'text-[#66543c] hover:text-[#382d1f]'
                  }`}
                >
                  {lang === 'ur' ? 'مزید تفصیلات' : 'نور جزئیات'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
