import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import magicalGiftBox from '@/assets/magical-gift-box.jpg';

export default function MysteryGiftBox() {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setIsOpened(true);
      setShowConfetti(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background with magical overlay */}
      <div className="absolute inset-0 bg-magical opacity-20"></div>
      
      {/* Confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        {!isOpened ? (
          <div className="animate-fadeInUp space-y-8">
            <h2 className="text-5xl font-elegant text-primary mb-8">
              A Special Surprise Awaits ✨
            </h2>
            
            <div className="relative max-w-md mx-auto">
              <div 
                className="animate-float cursor-pointer group"
                onClick={handleOpenGift}
              >
                <img
                  src={magicalGiftBox}
                  alt="Magical Gift Box"
                  className="w-full rounded-2xl shadow-magical group-hover:shadow-glow transition-magical sparkle"
                />
                <div className="absolute inset-0 bg-magical opacity-0 group-hover:opacity-20 rounded-2xl transition-magical"></div>
              </div>
              
              {/* Sparkles around the gift box */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-glow rounded-full animate-twinkle"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <p className="text-xl font-script text-muted-foreground">
              Click the gift box to unwrap your surprise! 🎁
            </p>
          </div>
        ) : (
          <div className="animate-fadeInUp max-w-4xl mx-auto space-y-8">
            <div className="text-8xl animate-float mb-8">🎉</div>
            
            <Card className="p-12 shadow-magical sparkle backdrop-blur-sm bg-card/95">
              <div className="space-y-6">
                <h2 className="text-4xl font-elegant text-primary mb-6">
                  Your Special Message 💝
                </h2>
                
                <blockquote className="text-2xl font-script text-primary leading-relaxed">
                  "If I had to describe you in one word — impossible. 
                  <br />
                  Because one word is never enough."
                </blockquote>
                
                <div className="border-t border-primary/20 pt-6 space-y-4">
                  <p className="text-lg font-vintage text-muted-foreground">
                    You bring magic to ordinary moments, turn strangers into friends, 
                    and make the world brighter just by being in it.
                  </p>
                  
                  <p className="text-lg font-vintage text-muted-foreground">
                    Your laughter is music, your kindness is poetry, 
                    and your friendship is the greatest gift of all.
                  </p>
                  
                  <p className="text-xl font-script text-primary mt-6">
                    Happy Birthday, Beautiful Soul! 🌟💖
                  </p>
                </div>
              </div>

              {/* Floating hearts around the message */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-primary/20 animate-float"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      fontSize: '20px',
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  >
                    💖
                  </div>
                ))}
              </div>
            </Card>

            <Button
              onClick={() => setIsOpened(false)}
              variant="outline"
              className="font-elegant shadow-sparkle hover:shadow-glow transition-magical"
            >
              Close Gift Box 📦
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}