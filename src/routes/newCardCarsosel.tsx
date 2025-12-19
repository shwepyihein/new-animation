import gsap from 'gsap';
import Flip from 'gsap/Flip';
import { useEffect, useRef } from 'react';

const NewCardCarsosel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(Flip);

    return () => {
      const container = containerRef.current;
      if (container) {
        gsap.killTweensOf(Array.from(container.querySelectorAll('img')));
      }
    };
  }, []);

  const updateCaterpillar = (forward: boolean) => {
    const container = containerRef.current;
    if (!container || isAnimatingRef.current) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLImageElement>('img')
    );
    if (!cards.length) return;

    isAnimatingRef.current = true;

    const first = cards[0];
    const last = cards[cards.length - 1];
    const state = Flip.getState(cards);

    const newCard = document.createElement('img');
    newCard.src = forward ? first.src : last.src;
    newCard.alt = forward ? first.alt : last.alt;

    gsap.set(newCard, { scale: 0, opacity: 0 });

    if (forward) {
      container.append(newCard);
    } else {
      container.prepend(newCard);
    }

    Flip.from(state, {
      targets: Array.from(container.querySelectorAll('img')),
      fade: true,
      absoluteOnLeave: true,
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          scale: 1,
          transformOrigin: forward ? 'bottom right' : 'bottom left',
        });
      },
      onLeave: (els) => {
        gsap.to(els, {
          opacity: 0,
          scale: 0,
          transformOrigin: forward ? 'bottom left' : 'bottom right',
          onComplete: () => {
            els[0].remove();
            isAnimatingRef.current = false;
          },
        });
      },
    });
  };

  const handleNext = () => updateCaterpillar(true);
  const handlePrev = () => updateCaterpillar(false);

  return (
    <div className='wrapper'>
      <div className='container' ref={containerRef}>
        <img
          src='https://assets.codepen.io/16327/portrait-number-1.png'
          alt=''
        />
        <img
          src='https://assets.codepen.io/16327/portrait-number-2.png'
          alt=''
        />
        <img
          src='https://assets.codepen.io/16327/portrait-number-3.png'
          alt=''
        />
        <img
          src='https://assets.codepen.io/16327/portrait-number-4.png'
          alt=''
        />
      </div>
      <div className='buttons'>
        <button onClick={handleNext} ref={nextRef} id='next'>
          Next
        </button>
        <button onClick={handlePrev} ref={prevRef} id='prev'>
          Previous
        </button>
      </div>
    </div>
  );
};

export default NewCardCarsosel;
