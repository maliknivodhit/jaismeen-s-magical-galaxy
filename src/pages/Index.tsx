import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MagicalTransition from '@/components/MagicalTransition';
import BirthdayWishes from '@/components/BirthdayWishes';
import ComplimentCards from '@/components/ComplimentCards';
import MysteryGiftBox from '@/components/MysteryGiftBox';
import FinalMessage from '@/components/FinalMessage';

type JourneyStage = 'transition' | 'wishes' | 'compliments' | 'gift' | 'final';

const Index = () => {
  const [currentStage, setCurrentStage] = useState<JourneyStage>('transition');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Birthday date - July 28, 2024
  const birthdayDate = new Date('2024-07-28T00:00:00');

  useEffect(() => {
    // Start playing background music
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = birthdayDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsUnlocked(true);
        setTimeLeft('🎉 It\'s time! 🎉');
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  const handleCodeSubmit = () => {
    if (secretCode === '6125') {
      setIsUnlocked(true);
      setIsDialogOpen(false);
    }
  };

  const handleTransitionComplete = () => {
    setCurrentStage('wishes');
  };

  const handleRestart = () => {
    setCurrentStage('transition');
  };

  const scrollToNext = (stage: JourneyStage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        className="hidden"
      >
        <source src="/birthday-music.mp3" type="audio/mpeg" />
        <source src="https://www.soundjay.com/misc/sounds/birthday-song-01.mp3" type="audio/mpeg" />
      </audio>

      {/* Main Content - Always rendered but blurred when locked */}
      <div className={`transition-all duration-1000 ${!isUnlocked ? 'blur-lg scale-105' : ''}`}>
        {/* Magical transition */}
        {currentStage === 'transition' && (
          <MagicalTransition onComplete={handleTransitionComplete} />
        )}

        {/* Main journey content */}
        {currentStage !== 'transition' && (
          <div className="relative">
            {/* Birthday wishes section */}
            {currentStage === 'wishes' && (
              <div>
                <BirthdayWishes />
                <div className="text-center py-12">
                  <button
                    onClick={() => scrollToNext('compliments')}
                    className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                  >
                    Continue the Journey ✨
                  </button>
                </div>
              </div>
            )}

            {/* Compliment cards section */}
            {currentStage === 'compliments' && (
              <div>
                <ComplimentCards />
                <div className="text-center py-12">
                  <button
                    onClick={() => scrollToNext('gift')}
                    className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                  >
                    Discover Your Gift 🎁
                  </button>
                </div>
              </div>
            )}

            {/* Mystery gift section */}
            {currentStage === 'gift' && (
              <div>
                <MysteryGiftBox />
                <div className="text-center py-12">
                  <button
                    onClick={() => scrollToNext('final')}
                    className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                  >
                    Final Surprise 💖
                  </button>
                </div>
              </div>
            )}

            {/* Final message section */}
            {currentStage === 'final' && (
              <FinalMessage onRestart={handleRestart} />
            )}
          </div>
        )}
      </div>

      {/* Lock Overlay - Shows when not unlocked */}
      {!isUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center p-8 bg-card/90 rounded-2xl shadow-magical backdrop-blur-md border border-white/20 max-w-md mx-4">
            <div className="space-y-6">
              <div className="animate-float">
                <h1 className="text-3xl font-elegant text-primary mb-2">
                  ✨ Surprise is loading, 
                </h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="text-3xl font-script text-primary hover:text-primary-glow transition-magical cursor-pointer underline decoration-wavy">
                      Jaismeen
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-elegant text-center">Secret Code 🗝️</DialogTitle>
                      <DialogDescription className="text-center font-vintage">
                        Enter the magical code to unlock early...
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="password"
                        placeholder="Enter secret code"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        className="text-center font-elegant"
                      />
                      <Button 
                        onClick={handleCodeSubmit}
                        className="w-full font-elegant shadow-sparkle"
                      >
                        Unlock the Magic ✨
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <p className="text-3xl font-elegant text-primary">💗</p>
              </div>

              <div className="animate-fadeInUp">
                <p className="text-lg font-vintage text-muted-foreground mb-4">
                  Unlocks on 28th July... until then, keep wondering 💫
                </p>
                <div className="bg-magical p-4 rounded-lg shadow-glow">
                  <p className="text-2xl font-script text-primary-foreground font-bold">
                    {timeLeft}
                  </p>
                </div>
              </div>

              {/* Floating sparkles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-glow rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
