import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { DecadeCard } from '../components/DecadeCard';
import { decades } from '../data/decades';

gsap.registerPlugin(ScrollTrigger);

export function FanShowcase() {
  const stackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stack = stackRef.current;
      const container = scrollContainerRef.current;
      const section = sectionRef.current;
      if (!stack || !container || !section) return;

      const cards = stack.querySelectorAll<HTMLDivElement>('.card-horizontal');
      const totalCards = cards.length;
      const centerIndex = (totalCards - 1) / 2;

      // Set initial card states: stacked, scale 0.5, opacity 1
      cards.forEach((card, index) => {
        const zIndex = (totalCards - 1 - index) * 10;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          position: 'absolute',
          x: 0,
          y: 0,
          z: 0,
          zIndex: zIndex,
          scale: 0.5,
          opacity: 1,
        });
      });

      const maxScroll = totalCards * 600 + 1000;

      // Use ScrollTrigger to track scroll and update perspective animation
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${maxScroll}`,
        onUpdate: (self) => {
          const progress = self.progress;

          // Two-step animation
          // Step 1: progress 0 → 0.5 (scale only, cards stay stacked)
          // Step 2: progress 0.5 → 1.0 (first card fixed, based on the center index, others fan out)

          if (progress <= 0.5) {
            // Step 1: Only scale changes from 0.5 → 0.8
            const step1Progress = progress / 0.5; // Normalize to 0-1 for step 1
            const scale = gsap.utils.interpolate(0.5, 0.8, step1Progress);

            cards.forEach((card, index) => {
              const zIndex = (totalCards - 1 - index) * 10;

              gsap.set(card, {
                x: 0,
                y: 0,
                z: 0,
                zIndex: zIndex,
                scale: scale,
              });
            });
          } else {
            // Step 2: First card stays fixed, others fan out
            const step2Progress = (progress - 0.5) / 0.5; // Normalize to 0-1 for step 2

            // Interpolate spacing values from 0 to target values
            const diagonalSpacing = gsap.utils.interpolate(
              0,
              80,
              step2Progress
            );
            const diagonalOffset = gsap.utils.interpolate(0, 40, step2Progress);

            cards.forEach((card, index) => {
              const offset = index - centerIndex;
              const zIndex = (totalCards - 1 - index) * 10;

              // Other cards fan out from center (0,0,0)
              const targetX = offset * diagonalSpacing;
              const targetY = -(offset * diagonalOffset);

              gsap.set(card, {
                x: targetX,
                y: targetY,
                z: -Math.abs(offset) * 10,
                zIndex: zIndex,
                scale: 0.8,
              });
            });
          }
        },
      });

      // Cleanup
      return () => {
        trigger.kill();
      };
    },
    { scope: stackRef }
  );

  return (
    <>
      {/* Spacer to create scroll space */}
      <div style={{ height: 'calc(100vh - 135px)' }}></div>
      <div
        ref={sectionRef}
        style={{
          height: 'calc(100vh - 135px)',
          position: 'fixed',
          top: '135px',
          left: 0,
          right: 0,
        }}
        className=' bg-gray-50  dark:bg-gray-950  overflow-hidden relative'
      >
        <div
          ref={scrollContainerRef}
          className='relative w-full h-full max'
          style={{ perspective: '1100px', perspectiveOrigin: 'center center' }}
        >
          <div
            ref={stackRef}
            className='absolute inset-0 flex items-center justify-center'
          >
            {decades.map((decade) => (
              <DecadeCard
                key={decade.decade}
                decade={decade}
                scrollContainerRef={scrollContainerRef}
              />
            ))}
          </div>
        </div>

        {/* Text content below cards */}
        <div className='absolute bottom-0 left-0 right-0 pb-16 px-8 text-center z-10'>
          <h2 className='text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-3'>
            Capture Moments
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg'>
            Journey through decades of memories, each card revealing a unique
            era of your life's story.
          </p>
        </div>
      </div>
      {/* Additional spacer for scroll space */}
      <div style={{ height: '100vh' }}></div>
    </>
  );
}
