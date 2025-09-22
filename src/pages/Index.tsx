import { useState } from 'react';
import MagicalTransition from '@/components/MagicalTransition';
import BirthdayWishes from '@/components/BirthdayWishes';
import TypewriterMessage from '@/components/TypewriterMessage';
import ComplimentCards from '@/components/ComplimentCards';
import MemoryCarousel from '@/components/MemoryCarousel';
import QuizGame from '@/components/QuizGame';
import MysteryGiftBox from '@/components/MysteryGiftBox';
import LoveLetterScroll from '@/components/LoveLetterScroll';
import FinalMessage from '@/components/FinalMessage';
import InteractiveElements from '@/components/InteractiveElements';
import MusicPlayer from '@/components/MusicPlayer';

type JourneyStage = 'transition' | 'wishes' | 'typewriter' | 'compliments' | 'memories' | 'quiz' | 'gift' | 'letter' | 'final';

const Index = () => {
  const [currentStage, setCurrentStage] = useState<JourneyStage>('transition');

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
    <div className="relative">
      {/* Interactive floating elements */}
      <InteractiveElements />
      
      {/* Music player */}
      <MusicPlayer />

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
                  onClick={() => scrollToNext('typewriter')}
                  className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                >
                  Read My Heart 💌
                </button>
              </div>
            </div>
          )}

          {/* Typewriter messages section */}
          {currentStage === 'typewriter' && (
            <div>
              <TypewriterMessage 
                messages={[
                  "Happy Birthday, Sara! 🎉✨",
                  "Today is all about celebrating YOU and how amazing you are! 💖",
                  "Every moment with you feels like magic... ✨💫",
                  "You light up every room you enter with your beautiful smile 😊",
                  "Ready for more surprises? Let's continue this magical journey! 🎁"
                ]}
                speed={60}
              />
              <div className="text-center py-12">
                <button
                  onClick={() => scrollToNext('compliments')}
                  className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                >
                  What Makes You Special ✨
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
                  onClick={() => scrollToNext('memories')}
                  className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                >
                  Our Beautiful Memories 📸
                </button>
              </div>
            </div>
          )}

          {/* Memory carousel section */}
          {currentStage === 'memories' && (
            <div>
              <MemoryCarousel />
              <div className="text-center py-12">
                <button
                  onClick={() => scrollToNext('quiz')}
                  className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                >
                  Let's Play a Game! 🎮
                </button>
              </div>
            </div>
          )}

          {/* Quiz game section */}
          {currentStage === 'quiz' && (
            <div>
              <QuizGame />
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
                  onClick={() => scrollToNext('letter')}
                  className="px-8 py-4 bg-magical text-primary-foreground font-elegant text-lg rounded-full shadow-magical hover:shadow-glow transition-magical animate-float"
                >
                  A Letter for You 💌
                </button>
              </div>
            </div>
          )}

          {/* Love letter scroll section */}
          {currentStage === 'letter' && (
            <div>
              <LoveLetterScroll />
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
