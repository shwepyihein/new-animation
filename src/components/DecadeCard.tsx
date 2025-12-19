import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import type { Decade } from '../data/decades';

interface DecadeCardProps {
  decade: Decade;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  initialTransform?: string;
  stackIndex?: number;
  totalCards?: number;
}

export function DecadeCard({
  decade,
  scrollContainerRef,
  initialTransform,
  stackIndex = 0,
  totalCards = 1,
}: DecadeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const baseTransform = initialTransform ?? 'none';

  useGSAP(
    () => {
      if (!cardRef.current || !scrollContainerRef.current) return;

      const overlapX = stackIndex * -14; // stack cards with negative gap
      const depth = (totalCards - stackIndex - 1) * 10; // push back later cards
      const tilt = -18;

      const transformPrefix =
        baseTransform === 'none' ? '' : `${baseTransform} `;
      const composedTransform = `${transformPrefix}translateX(${overlapX}px) translateZ(${depth}px) rotateY(${tilt}deg)`;

      gsap.set(cardRef.current, {
        opacity: 0.9,
        transform: composedTransform,
        transformOrigin: 'center center -160px',
        transformPerspective: 1400,
      });

      const card = cardRef.current;
      const container = scrollContainerRef.current;

      // Function to update opacity based on card position relative to viewport
      const updateOpacity = () => {
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;

        // Calculate distance from viewport center
        const distance = Math.abs(containerCenter - cardCenter);
        const maxDistance = containerRect.width * 0.8;

        // Calculate opacity: 0.5 when far, 1 when centered
        const opacity = Math.max(
          0.5,
          Math.min(1, 1 - (distance / maxDistance) * 0.5)
        );

        gsap.set(card, { opacity });
      };

      // Use requestAnimationFrame for smoother updates
      const handleScroll = () => {
        updateOpacity();
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      updateOpacity();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    { scope: cardRef, dependencies: [scrollContainerRef, baseTransform] }
  );

  return (
    <div
      ref={cardRef}
      className={`card-horizontal shrink-0 cursor-pointer group -mr-8`}
      data-decade={decade.decade}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        zIndex: totalCards - stackIndex,
        transform: baseTransform,
      }}
    >
      <div
        className={`w-[320px] h-[420px] rounded-3xl  border-2 backdrop-blur-xl bg-black ${decade.colors.bg} border border-white/40 dark:border-white/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden ${decade.colors.hover} relative`}
        style={{ boxShadow: decade.colors.shadow }}
      >
        <div className='absolute inset-y-0 left-0 w-6 bg-linear-to-r from-black/25 via-black/10 to-transparent pointer-events-none'></div>
        <div
        // className={`absolute inset-0 bg-gradient-to-br ${decade.colors.gradient}`}
        ></div>
        <div className='absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/40 to-transparent'></div>
        <div className='relative z-10 w-full h-full p-8 flex flex-col justify-between'>
          <div>
            <div className='flex items-center justify-between mb-3'>
              <h3
                className={`text-5xl font-bold ${decade.colors.text} tracking-tight`}
              >
                {decade.decade}
              </h3>
              <span
                className={`text-xs font-semibold ${decade.colors.badge} backdrop-blur-md px-4 py-2 rounded-full border`}
              >
                {decade.photos} photos
              </span>
            </div>
            <p className={`text-sm ${decade.colors.subtitleText} font-medium`}>
              {decade.subtitle}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            {decade.colors.grid.map((gradient, idx) => (
              <div
                key={idx}
                className={`aspect-square bg-linear-to-br ${gradient} rounded-2xl backdrop-blur-sm`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
