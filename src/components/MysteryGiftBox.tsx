import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Heart, Star, Sparkles } from 'lucide-react';
import magicalGiftBox from '@/assets/magical-gift-box.jpg';

export default function MysteryGiftBox() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const handleOpenBox = () => {
    setIsOpening(true);
    
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        setShowSurprise(true);
      }, 500);
    }, 1500);
  };

  const resetBox = () => {
    setIsOpening(false);
    setIsOpened(false);
    setShowSurprise(false);
  };

  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20"></div>
      
      {/* Magical particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary-glow rounded-full animate-twinkle ${
              isOpened ? 'animate-ping' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-elegant text-primary text-center mb-4 animate-fadeInUp">
          Mystery Gift Box 🎁
        </h2>
        <p className="text-xl font-script text-muted-foreground text-center mb-12 animate-fadeInUp">
          Something special is waiting inside... dare to open it? 💫
        </p>

        <div className="max-w-2xl mx-auto">
          <Card className="relative overflow-hidden shadow-magical backdrop-blur-sm bg-card/90 p-8">
            <div className="text-center space-y-8">
              {!isOpened ? (
                <div className={`transition-all duration-1500 ${
                  isOpening ? 'transform rotate-12 scale-110' : 'hover:scale-105'
                }`}>
                  <div className="relative inline-block">
                    <img
                      src={magicalGiftBox}
                      alt="Magical Gift Box"
                      className={`w-64 h-64 object-cover rounded-lg shadow-glow transition-all duration-1000 ${
                        isOpening ? 'animate-bounce' : ''
                      }`}
                    />
                    
                    {/* Gift box overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
                    
                    {/* Sparkle effects */}
                    {isOpening && (
                      <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute animate-ping"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 0.5}s`,
                            }}
                          >
                            <Sparkles className="w-6 h-6 text-primary-glow" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {!isOpening && (
                    <div className="mt-8">
                      <Button
                        onClick={handleOpenBox}
                        size="lg"
                        className="font-elegant text-lg shadow-magical hover:shadow-glow transition-magical animate-float"
                      >
                        <Gift className="w-6 h-6 mr-2" />
                        Open Your Surprise ✨
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`transition-all duration-1000 ${
                  showSurprise ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  {/* Opened gift content */}
                  <div className="space-y-6 animate-fadeInUp">
                    <div className="text-6xl animate-bounce">🎊</div>
                    
                    <div className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      <h3 className="text-4xl font-elegant mb-4">
                        You Are My Greatest Gift! 💖
                      </h3>
                    </div>
                    
                    <div className="space-y-4 text-lg font-script text-muted-foreground">
                      <p>
                        "Every moment with you is like unwrapping a beautiful present. 
                        Your kindness, your laughter, your amazing spirit..."
                      </p>
                      <p>
                        "These are the gifts you give me every single day. 
                        Happy Birthday, Sara! You make life magical! ✨"
                      </p>
                    </div>

                    {/* Floating hearts animation */}
                    <div className="relative py-8">
                      {[...Array(6)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`absolute w-8 h-8 text-red-400 fill-red-400 animate-float`}
                          style={{
                            left: `${20 + i * 12}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${2 + Math.random()}s`
                          }}
                        />
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={resetBox}
                        variant="outline"
                        className="font-elegant shadow-magical hover:shadow-glow"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Open Again 🔄
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}