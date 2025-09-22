import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Download, Share2, RotateCcw } from 'lucide-react';

interface FinalMessageProps {
  onRestart: () => void;
}

export default function FinalMessage({ onRestart }: FinalMessageProps) {
  const handleSaveMemory = () => {
    // Create a simple text version of the birthday message
    const message = `
🎉 Happy Birthday Sara! 🎉

This magical journey was created with love just for you.

"This wasn't just a site... it was a hug in pixels. 
I hope it made you smile the way you make lives better. 
Happy Birthday again, my beautiful bestie. 💝"

– From someone who'll always adore you.

Created on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([message], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Birthday-Memory-for-Sara.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A Magical Birthday Journey for Sara',
          text: 'Check out this beautiful birthday surprise! 🎉✨',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with others 💖');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Magical background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/10 to-secondary/10"></div>
      
      {/* Gentle floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        <div className="animate-fadeInUp space-y-12">
          {/* Final message card */}
          <Card className="p-12 shadow-magical sparkle backdrop-blur-sm bg-card/95">
            <div className="space-y-8">
              <div className="text-6xl animate-float">🌟</div>
              
              <h2 className="text-4xl font-elegant text-primary">
                Until We Meet Again...
              </h2>
              
              <div className="space-y-6 text-center">
                <blockquote className="text-2xl font-script text-primary leading-relaxed">
                  "This wasn't just a site... it was a hug in pixels."
                </blockquote>
                
                <p className="text-lg font-vintage text-muted-foreground max-w-2xl mx-auto">
                  I hope this little journey made you smile the way you make lives better. 
                  Every sparkle, every word, every moment was crafted with love, 
                  just like the way you touch every heart you encounter.
                </p>
                
                <p className="text-lg font-vintage text-muted-foreground">
                  You deserve all the magic, all the joy, and all the beautiful surprises 
                  that life has to offer.
                </p>
                
                <div className="pt-6 border-t border-primary/20">
                  <p className="text-2xl font-script text-primary">
                    Happy Birthday again, my beautiful bestie. 💝
                  </p>
                  <p className="text-lg font-vintage text-muted-foreground mt-2">
                    – From someone who'll always adore you.
                  </p>
                </div>
              </div>

              {/* Floating hearts around the message */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-primary/15 animate-float"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                      fontSize: `${15 + Math.random() * 10}px`,
                      animationDelay: `${Math.random() * 4}s`,
                    }}
                  >
                    💖
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={onRestart}
              size="lg"
              className="font-elegant shadow-magical hover:shadow-glow transition-magical"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Replay the Journey
            </Button>
            
            <Button
              onClick={handleSaveMemory}
              variant="outline"
              size="lg"
              className="font-elegant shadow-sparkle hover:shadow-glow transition-magical"
            >
              <Download className="w-5 h-5 mr-2" />
              Save this Memory
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              size="lg"
              className="font-elegant shadow-sparkle hover:shadow-glow transition-magical"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share the Love
            </Button>
          </div>

          {/* Thank you note */}
          <div className="pt-8">
            <p className="text-sm font-vintage text-muted-foreground/70 flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary animate-pulse" /> for someone truly special
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}