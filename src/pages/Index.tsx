import { useState } from 'react';
import LockedIntro from '@/components/LockedIntro';
import MagicalTransition from '@/components/MagicalTransition';
import BirthdayWishes from '@/components/BirthdayWishes';
import ComplimentCards from '@/components/ComplimentCards';
import MysteryGiftBox from '@/components/MysteryGiftBox';
import FinalMessage from '@/components/FinalMessage';

type JourneyStage = 'locked' | 'transition' | 'wishes' | 'compliments' | 'gift' | 'final';

const Index = () => {
  const [currentStage, setCurrentStage] = useState<JourneyStage>('locked');

  const handleUnlock = () => {
    setCurrentStage('transition');
  };

  const handleTransitionComplete = () => {
    setCurrentStage('wishes');
  };

  const handleRestart = () => {
    setCurrentStage('locked');
  };

  const scrollToNext = (stage: JourneyStage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Locked intro screen */}
      {currentStage === 'locked' && (
        <LockedIntro onUnlock={handleUnlock} />
      )}

      {/* Magical transition */}
      {currentStage === 'transition' && (
        <MagicalTransition onComplete={handleTransitionComplete} />
      )}

      {/* Main journey content */}
      {currentStage !== 'locked' && currentStage !== 'transition' && (
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
  );
};

export default Index;
