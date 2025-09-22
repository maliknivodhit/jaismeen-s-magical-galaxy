import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import magicalStarsBg from '@/assets/magical-stars-bg.jpg';

interface LockedIntroProps {
  onUnlock: () => void;
}

export default function LockedIntro({ onUnlock }: LockedIntroProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Birthday date - September 25, 2025
  const birthdayDate = new Date('2025-09-25T00:00:00');

  useEffect(() => {
    // Check localStorage for early unlock
    const unlocked = localStorage.getItem('sara_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
      onUnlock();
    }
    // Start playing background music
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [onUnlock]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = birthdayDate.getTime() - now.getTime();
      if (difference <= 0) {
        setIsUnlocked(true);
        setTimeLeft('🎉 It\'s time! 🎉');
        localStorage.setItem('sara_unlocked', 'true');
        onUnlock();
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [birthdayDate, onUnlock]);

  const handleCodeSubmit = () => {
    if (secretCode === '6125') {
      setIsUnlocked(true);
      setIsDialogOpen(false);
      localStorage.setItem('sara_unlocked', 'true');
      onUnlock();
    }
  };

  const handleUnlock = () => {
    onUnlock();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${magicalStarsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Magical overlay */}
      <div className="absolute inset-0 bg-fairy opacity-70"></div>
      
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-glow rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Card className="relative z-10 p-8 text-center max-w-md mx-4 shadow-magical sparkle backdrop-blur-sm bg-card/90">
        <div className="space-y-6">
          <div className="animate-float">
            <h1 className="text-4xl font-elegant text-primary mb-2">
              ✨ A surprise is preparing for you, 
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-4xl font-script text-primary hover:text-primary-glow transition-magical cursor-pointer underline decoration-wavy">
                  Sara
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
            <p className="text-4xl font-elegant text-primary">💗</p>
          </div>

          {!isUnlocked ? (
            <div className="animate-fadeInUp space-y-4">
              <p className="text-lg font-vintage text-muted-foreground">
                It unlocks on 25th September... until then, keep wondering 💫
              </p>
              <div className="bg-magical p-4 rounded-lg shadow-glow">
                <p className="text-2xl font-script text-primary-foreground font-bold">
                  {timeLeft}
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fadeInUp space-y-4">
              <div className="animate-glow">
                <p className="text-2xl font-script text-primary mb-4">
                  🎉 Happy Birthday! 🎉
                </p>
                <p className="text-lg font-vintage text-muted-foreground mb-4">
                  The magic is ready to unfold...
                </p>
              </div>
              <Button 
                onClick={handleUnlock}
                size="lg"
                className="font-elegant text-lg shadow-magical hover:shadow-glow transition-magical animate-float"
              >
                Begin the Journey ✨
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        className="hidden"
      >
        <source src="/magical-music.mp3" type="audio/mpeg" />
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-02.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
