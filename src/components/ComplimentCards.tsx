import { Card } from '@/components/ui/card';
import { Heart, Star, Crown, Sparkles, Sun, Flower2, Gift, Music } from 'lucide-react';

const compliments = [
  {
    title: "Smart & Thoughtful",
    icon: Star,
    description: "Your mind shines brighter than the stars",
    color: "from-primary to-accent"
  },
  {
    title: "Unmatched Vibes",
    icon: Music,
    description: "You bring the perfect energy to every room",
    color: "from-accent to-secondary"
  },
  {
    title: "Queen of Kindness",
    icon: Crown,
    description: "Your heart is pure gold, Your Majesty",
    color: "from-secondary to-primary"
  },
  {
    title: "Bestie Goals 1000x",
    icon: Heart,
    description: "The definition of friendship perfection",
    color: "from-primary to-secondary"
  },
  {
    title: "Sunshine Spirit",
    icon: Sun,
    description: "You light up the darkest days",
    color: "from-accent to-primary"
  },
  {
    title: "Beautiful Soul",
    icon: Flower2,
    description: "Inside and out, absolutely radiant",
    color: "from-secondary to-accent"
  },
  {
    title: "Gift to the World",
    icon: Gift,
    description: "Everyone's lucky to know you",
    color: "from-primary to-accent"
  },
  {
    title: "Simply Magical",
    icon: Sparkles,
    description: "You make ordinary moments extraordinary",
    color: "from-accent to-secondary"
  }
];

export default function ComplimentCards() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-fairy opacity-50"></div>
      
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-elegant text-primary text-center mb-4 animate-fadeInUp">
          What Makes You Special
        </h2>
        <p className="text-xl font-script text-muted-foreground text-center mb-16 animate-fadeInUp">
          Just a few reasons why you're absolutely amazing ✨
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {compliments.map((compliment, index) => {
            const IconComponent = compliment.icon;
            return (
              <Card
                key={index}
                className="group p-6 text-center hover:scale-105 transition-magical cursor-pointer sparkle shadow-magical hover:shadow-glow animate-fadeInUp backdrop-blur-sm bg-card/90"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${compliment.color} flex items-center justify-center group-hover:animate-float`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-elegant text-primary mb-2">
                  {compliment.title}
                </h3>
                
                <p className="text-sm font-vintage text-muted-foreground">
                  {compliment.description}
                </p>

                {/* Sparkle effect on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-magical">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full animate-sparkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}