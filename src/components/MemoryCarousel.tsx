import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const memories = [
  {
    type: 'image',
    url: '/api/placeholder/500/300',
    caption: "Every moment with you is magical ✨",
    title: "Beautiful Memories"
  },
  {
    type: 'image', 
    url: '/api/placeholder/500/300',
    caption: "Your smile lights up my world 🌟",
    title: "Precious Moments"
  },
  {
    type: 'image',
    url: '/api/placeholder/500/300', 
    caption: "Together we create the best stories 💕",
    title: "Our Journey"
  },
  {
    type: 'image',
    url: '/api/placeholder/500/300',
    caption: "You make every day feel like a celebration 🎉",
    title: "Happy Times"
  }
];

export default function MemoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextMemory = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-elegant text-primary text-center mb-4 animate-fadeInUp">
          Our Beautiful Memories
        </h2>
        <p className="text-xl font-script text-muted-foreground text-center mb-12 animate-fadeInUp">
          A collection of moments that make my heart flutter 💝
        </p>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden shadow-magical backdrop-blur-sm bg-card/90">
            <div className="relative h-96 flex items-center justify-center">
              <img
                src={memories[currentIndex].url}
                alt={memories[currentIndex].title}
                className="w-full h-full object-cover transition-all duration-500 opacity-90"
              />
              
              {/* Overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-elegant text-white mb-2">
                  {memories[currentIndex].title}
                </h3>
                <p className="text-lg font-script text-white/90">
                  {memories[currentIndex].caption}
                </p>
              </div>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={prevMemory}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={nextMemory}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>

              {/* Auto-play toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                <Heart className={`w-5 h-5 ${isAutoPlaying ? 'text-red-400 fill-red-400' : 'text-white'}`} />
              </Button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center py-4 space-x-2">
              {memories.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}