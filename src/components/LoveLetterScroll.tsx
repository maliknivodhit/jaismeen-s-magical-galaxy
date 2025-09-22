import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

const letterContent = [
  {
    text: "My Dearest Sara,",
    highlight: true
  },
  {
    text: "Where do I even begin to tell you how much you mean to me? Every day with you feels like a beautiful dream that I never want to wake up from."
  },
  {
    text: "Your smile lights up my entire world",
    highlight: true
  },
  {
    text: "The way you laugh at my silly jokes, even when they're not funny... The way you care for everyone around you with such a pure heart... The way you make ordinary moments feel magical just by being there."
  },
  {
    text: "You are my sunshine on cloudy days",
    highlight: true
  },
  {
    text: "When I'm with you, time seems to slow down and speed up all at once. Every moment is precious, every memory is a treasure I'll keep forever in my heart."
  },
  {
    text: "Happy Birthday to the most amazing person I know",
    highlight: true
  },
  {
    text: "Today isn't just about celebrating another year of your life - it's about celebrating the incredible person you are, the joy you bring to others, and the love you share so freely."
  },
  {
    text: "You deserve all the happiness in the world",
    highlight: true
  },
  {
    text: "I hope this birthday brings you everything your heart desires and more. You've given me so much happiness, and I want to spend forever trying to give that same joy back to you."
  },
  {
    text: "With all my love and best wishes,",
    highlight: true
  },
  {
    text: "Forever yours 💖"
  }
];

export default function LoveLetterScroll() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev.filter(i => i !== index), index]);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/10 to-secondary/5"></div>
      
      {/* Floating love elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/20 animate-float text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            💝
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-elegant text-primary text-center mb-4 animate-fadeInUp">
          A Letter from the Heart 💌
        </h2>
        <p className="text-xl font-script text-muted-foreground text-center mb-12 animate-fadeInUp">
          Scroll down to read a special message just for you...
        </p>

        <div className="max-w-3xl mx-auto space-y-12">
          {letterContent.map((section, index) => (
            <div
              key={index}
              ref={(el) => sectionRefs.current[index] = el}
              data-index={index}
              className={`transition-all duration-1000 transform ${
                visibleSections.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-30 translate-y-8'
              }`}
            >
              <Card className={`p-8 backdrop-blur-sm bg-card/90 shadow-magical ${
                section.highlight 
                  ? 'border-primary/50 shadow-glow' 
                  : ''
              } ${
                visibleSections.includes(index) && section.highlight
                  ? 'animate-pulse-slow'
                  : ''
              }`}>
                <p className={`${
                  section.highlight 
                    ? 'text-2xl font-elegant text-primary text-center' 
                    : 'text-lg font-script text-muted-foreground leading-relaxed'
                } ${
                  visibleSections.includes(index) && section.highlight
                    ? 'bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient'
                    : ''
                }`}>
                  {section.text}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-primary/60 animate-bounce">
          <div className="text-sm font-vintage text-center">
            Keep scrolling 💫
          </div>
        </div>
      </div>
    </section>
  );
}