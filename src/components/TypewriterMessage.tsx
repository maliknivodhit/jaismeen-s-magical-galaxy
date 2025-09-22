import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TypewriterMessageProps {
  messages: string[];
  speed?: number;
}

export default function TypewriterMessage({ messages, speed = 50 }: TypewriterMessageProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) return;

    const message = messages[currentMessageIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < message.length) {
        setCurrentText(message.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        setTimeout(() => {
          if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(currentMessageIndex + 1);
            setCurrentText('');
            setIsTyping(true);
          }
        }, 2000);
        clearInterval(typeInterval);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex, messages, speed]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-elegant text-primary text-center mb-12 animate-fadeInUp">
          Messages from the Heart 💖
        </h2>

        <Card className="max-w-3xl mx-auto p-8 backdrop-blur-sm bg-card/90 shadow-magical">
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-2xl font-script text-primary leading-relaxed text-center">
              {currentText}
              {isTyping && (
                <span className="animate-pulse text-primary-glow">|</span>
              )}
            </p>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentMessageIndex 
                    ? 'bg-primary animate-pulse' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}