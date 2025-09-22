import { useEffect, useState } from 'react';

interface MagicalTransitionProps {
  onComplete: () => void;
}

export default function MagicalTransition({ onComplete }: MagicalTransitionProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Magic door opening effect */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Left door */}
        <div 
          className={`absolute inset-y-0 left-0 w-1/2 bg-magical transform transition-transform duration-1000 ${
            stage >= 1 ? '-translate-x-full' : 'translate-x-0'
          }`}
        />
        
        {/* Right door */}
        <div 
          className={`absolute inset-y-0 right-0 w-1/2 bg-magical transform transition-transform duration-1000 ${
            stage >= 1 ? 'translate-x-full' : 'translate-x-0'
          }`}
        />

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Stage 0: Door closed */}
          {stage === 0 && (
            <div className="text-center animate-fadeInUp">
              <div className="text-8xl mb-4 animate-float">🚪</div>
              <p className="text-2xl font-elegant text-primary-foreground">
                Unlocking the magic...
              </p>
            </div>
          )}

          {/* Stage 1: Door opening */}
          {stage >= 1 && (
            <div className="text-center space-y-8">
              {/* Burst of sparkles */}
              <div className="relative">
                <div className="text-8xl animate-float">✨</div>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-sparkle"
                    style={{
                      left: `${40 + Math.random() * 20}%`,
                      top: `${40 + Math.random() * 20}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Stage 2: Welcome message */}
              {stage >= 2 && (
                <div className="animate-fadeInUp space-y-4">
                  <h1 className="text-5xl font-elegant text-primary">
                    Happy Birthday Sara!
                  </h1>
                  <p className="text-2xl font-script text-muted-foreground">
                    💖✨ Let's go on a little journey... ✨💖
                  </p>
                </div>
              )}

              {/* Stage 3: Final sparkle burst */}
              {stage >= 3 && (
                <div className="animate-fadeInUp">
                  <div className="text-6xl animate-pulse">🌟💫🌟</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Background sparkles throughout */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-glow rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}