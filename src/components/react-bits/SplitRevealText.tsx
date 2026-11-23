import { Fragment, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

interface SplitRevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Palabras que llevan el subrayado editorial amarillo. */
  underline?: string[];
  delay?: number;
  /** Retardo entre palabras del revelado. */
  stagger?: number;
}

export function SplitRevealText({
  text,
  as: Tag = 'h2',
  className = '',
  underline = [],
  delay = 0,
  stagger = 0.08,
}: SplitRevealTextProps) {
  const root = useRef<HTMLElement>(null);
  const words = text.split(' ');
  const normalizedUnderline = underline.map((word) =>
    word.toLocaleLowerCase('es').replace(/[.,—-]/g, ''),
  );

  useGSAP(
    () => {
      const element = root.current;
      const targets = element?.querySelectorAll<HTMLElement>('[data-word]');
      const underlines = element?.querySelectorAll<HTMLElement>('[data-underline]');
      if (!element || !targets?.length) return;

      gsap.set(targets, {
        opacity: 0,
        yPercent: 110,
        filter: 'blur(10px)',
        rotateX: -30,
      });

      if (underlines?.length) {
        gsap.set(underlines, {
          scaleX: 0,
          transformOrigin: 'left center',
        });
      }

      const revealWords = {
        opacity: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        rotateX: 0,
        duration: 0.7,
        delay,
        stagger,
        ease: 'power3.out',
      };

      const revealUnderlines = {
        scaleX: 1,
        duration: 0.5,
        delay: delay + 0.18,
        stagger,
        ease: 'power2.out',
      };

      const rect = element.getBoundingClientRect();
      const visibleOnLoad = rect.top < window.innerHeight && rect.bottom > 0;

      if (visibleOnLoad) {
        // Los titulares above-the-fold se revelan de inmediato: si se dejaran
        // supeditados a ScrollTrigger pueden permanecer ocultos al cargar.
        gsap.to(targets, revealWords);
        if (underlines?.length) gsap.to(underlines, revealUnderlines);
      } else {
        gsap.to(targets, {
          ...revealWords,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            once: true,
          },
        });
        if (underlines?.length) {
          gsap.to(underlines, {
            ...revealUnderlines,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              once: true,
            },
          });
        }
      }
    },
    { scope: root, dependencies: [text, delay, stagger] },
  );

  return (
    <Tag ref={root as never} className={className}>
      {words.map((word, index) => {
        const marked = normalizedUnderline.includes(
          word.toLocaleLowerCase('es').replace(/[.,—-]/g, ''),
        );
        return (
          <Fragment key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <span
                data-word
                className="relative inline-block whitespace-nowrap will-change-transform"
              >
                {marked && (
                  <span
                    data-underline
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[0.06em] h-[0.11em] rounded-full bg-brand-yellow will-change-transform"
                  />
                )}
                <span className="relative">{word}</span>
              </span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
