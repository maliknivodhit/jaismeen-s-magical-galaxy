import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const wishes = [
  {
    text: "You are made of stars and dreams",
    emoji: "🌙",
    author: "Unknown"
  },
  {
    text: "The world is better with you in it",
    emoji: "🌸",
    author: "Maya Angelou"
  },
  {
    text: "You're not aging, you're leveling up like a queen",
    emoji: "👑",
    author: "Modern Wisdom"
  },
  {
    text: "A birthday is the first day of another 365-day journey around the sun",
    emoji: "☀️",
    author: "Anonymous"
  },
  {
    text: "May your birthday be as wonderful as you are to everyone whose life you touch",
    emoji: "💖",
    author: "Unknown"
  },
  {
    text: "Today you are you, that is truer than true. There is no one alive who is youer than you",
    emoji: "🌟",
    author: "Dr. Seuss"
  },
  {
    text: "The more you praise and celebrate your life, the more there is in life to celebrate",
    emoji: "🎉",
    author: "Oprah Winfrey"
  },
  {
    text: "Birthdays are nature's way of telling us to eat more cake",
    emoji: "🎂",
    author: "Edward Morykwas"
  }
];

export default function BirthdayWishes() {
  const [currentWish, setCurrentWish] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextWish = () => {
    setIsAutoPlaying(false);
    setCurrentWish((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    setIsAutoPlaying(false);
    setCurrentWish((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-elegant text-primary mb-12 animate-fadeInUp">
          Birthday Wishes for You ✨
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <Card className="p-12 shadow-magical sparkle backdrop-blur-sm bg-card/95 min-h-[400px] flex items-center justify-center">
            <div className="space-y-8 animate-fadeInUp" key={currentWish}>
              <div className="text-8xl animate-float">
                {wishes[currentWish].emoji}
              </div>
              
              <blockquote className="text-3xl font-script text-primary leading-relaxed">
                "{wishes[currentWish].text}"
              </blockquote>
              
              <p className="text-lg font-vintage text-muted-foreground">
                — {wishes[currentWish].author}
              </p>
            </div>
          </Card>

          {/* Navigation buttons */}
          <button
            onClick={prevWish}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary/20 hover:bg-primary/40 transition-magical shadow-sparkle"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <button
            onClick={nextWish}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary/20 hover:bg-primary/40 transition-magical shadow-sparkle"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {wishes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentWish(index);
                }}
                className={`w-3 h-3 rounded-full transition-magical ${
                  index === currentWish 
                    ? 'bg-primary shadow-glow' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}