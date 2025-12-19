import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMemo, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function DiagonalTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const cardImages = useMemo(
    () => [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    []
  );

  useGSAP(
    () => {
      const container = scrollContainerRef.current;
      const section = scrollSectionRef.current;
      const content = scrollContentRef.current;

      if (!container || !section || !content) return;

      const cards = content.querySelectorAll('.card-horizontal');
      const cardCount = cards.length;
      if (!cardCount) return;

      // --- CONFIGURATION ---
      const scrollPercentPerCard = 20;
      const horizontalDistance = content.scrollWidth - container.offsetWidth;
      // Duration of horizontal scroll
      const phaseOneDuration =
        (cardCount * scrollPercentPerCard * window.innerHeight) / 100;
      // Duration of the fan formation
      const phaseTwoDuration = window.innerHeight - 100;

      // --- SETUP: Stacked Pose ---
      const centerIndex = (cardCount - 1) / 2;
      cards.forEach((card, index) => {
        const offset = index - centerIndex;
        gsap.set(card, {
          x: offset * -100, // Initial stack overlap
          y: -20,
          rotateY: -20,
          zIndex: cardCount - index,
          skewY: 15,

          transformOrigin: 'center center -200px',
        });
      });

      const timeline = gsap.timeline({ defaults: { ease: 'none' } });

      // ============================================
      // PHASE 1: Horizontal Slide
      // ============================================
      timeline.to(
        content,
        {
          x: -(horizontalDistance - 400),
          duration: phaseOneDuration,
          ease: 'none', // Linear for scrolling feeling
        },
        0
      );

      // ============================================
      // PHASE 2: Diagonal Fan + Centering Container
      // ============================================

      // 2a. Move the Container (content) back to center
      // This brings the whole assembly to the middle of the screen
      timeline.to(
        content,
        {
          x: '-30%', // Reset horizontal scroll to center
          y: -500, // Optional: Move down slightly if diagonal hits top of screen
          z: -4000, // Optional: Bring whole cluster closer
          duration: phaseTwoDuration,
          scale: 1,
          delay: 0.5,
          ease: 'power2.inOut', // Smooth ease for formation
        },
        phaseOneDuration // Start exactly when Phase 1 ends
      );

      // 2b. Animate Cards into Diagonal Fan
      timeline.to(
        cards,
        {
          x: (i) => {
            const centerIndex = (cardCount - 1) / 2;
            return (i - centerIndex) * -150; // Horizontal spacing
          },
          y: (i) => {
            const centerIndex = cardCount - 1;
            return (i - centerIndex) * -90; // Vertical staircase step
          },
          z: (i) => {
            const centerIndex = cardCount - 1;
            return ((i - centerIndex) * -160) / 2; // Depth (Deep Tunnel effect)
          },
          // Ensure correct layering (left cards on top)
          zIndex: (i) => cardCount - i,

          scale: 1, // Reset scale to 1 (z-depth handles visual scaling)
          duration: phaseTwoDuration,
          delay: (i) => i * 0.05,
          ease: 'power2.inOut',
        },
        phaseOneDuration // Syncs with container movement
      );

      // ScrollTrigger Binding
      ScrollTrigger.create({
        markers: true,
        trigger: section,
        start: '-60px top',
        end: () => `+=${phaseOneDuration + phaseTwoDuration} `,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true, // debug
        animation: timeline,
      });
    },
    { scope: scrollSectionRef }
  );

  return (
    <div className='bg-slate-900 h-full dark:bg-slate-950'>
      <div className='pt-8 pb-6 fixed text-center z-10 w-full pointer-events-none'>
        <h2 className='text-2xl font-semibold text-white mb-2'>
          Explore Your Timeline
        </h2>
        <p className='text-sm text-purple-300'>
          Journey through decades of memories
        </p>
      </div>

      <div
        ref={scrollSectionRef}
        className='overflow-hidden relative'
        style={{
          width: '100vw',
          height: 'calc(100vh - 60px)',
        }}
      >
        <div
          ref={scrollContainerRef}
          className='horizontal-scroll-container h-full overflow-hidden'
          style={{ perspective: '2000px', perspectiveOrigin: 'center 30%' }}
        >
          <div
            ref={scrollContentRef}
            className='horizontal-scroll-content  flex h-full items-center min-w-min'
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Left Spacer: centers the first item initially */}

            {cardImages.map((src, index) => {
              return (
                <div
                  key={`${src}-${index}`}
                  className='card-horizontal border-8 border-amber-50 year_cards'
                  style={{
                    width: '360px',
                    height: '360px',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    // Initial positions are handled by GSAP
                  }}
                >
                  <img
                    src={src}
                    alt=''
                    loading='lazy'
                    className='w-full h-full object-cover opacity-90'
                  />
                </div>
              );
            })}

            {/* Right Spacer: allows scrolling to the last item */}
          </div>
        </div>
      </div>
    </div>
  );
}
