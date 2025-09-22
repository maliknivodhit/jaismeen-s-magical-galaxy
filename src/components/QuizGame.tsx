import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Gift } from 'lucide-react';

const quizQuestions = [
  {
    question: "What's my favorite way to spend a weekend?",
    options: [
      "Cozy movie marathons",
      "Outdoor adventures", 
      "Shopping and brunch",
      "Reading and relaxing"
    ],
    correct: 0,
    feedback: "Yes! Nothing beats our cozy movie nights together! 🍿💕"
  },
  {
    question: "What always makes me smile?",
    options: [
      "Surprise gifts",
      "Your silly jokes",
      "Dancing together", 
      "All of the above"
    ],
    correct: 3,
    feedback: "You know me so well! Everything about you makes me smile! 😊✨"
  },
  {
    question: "My dream vacation destination?",
    options: [
      "Paris, France",
      "Tropical beach",
      "Mountain cabin",
      "New York City"
    ],
    correct: 0,
    feedback: "Oui! Paris with you would be absolutely magical! 🗼💖"
  },
  {
    question: "What's my favorite thing about birthdays?",
    options: [
      "The cake and treats",
      "Getting older",
      "Celebrating with loved ones",
      "The presents"
    ],
    correct: 2,
    feedback: "Exactly! Birthdays are about love and togetherness! 🎉💝"
  }
];

export default function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-2xl mx-auto p-8 text-center backdrop-blur-sm bg-card/90 shadow-magical">
            <div className="space-y-6">
              <div className="text-6xl animate-bounce">🎊</div>
              <h3 className="text-4xl font-elegant text-primary">Quiz Complete!</h3>
              <p className="text-2xl font-script text-muted-foreground">
                You scored {score} out of {quizQuestions.length}!
              </p>
              
              <div className="py-4">
                {score === quizQuestions.length ? (
                  <p className="text-lg text-primary font-vintage">
                    Perfect score! You know me inside and out! 💖✨
                  </p>
                ) : score >= quizQuestions.length / 2 ? (
                  <p className="text-lg text-primary font-vintage">
                    Great job! You really pay attention! 🌟💕
                  </p>
                ) : (
                  <p className="text-lg text-primary font-vintage">
                    Not bad! We'll make more memories together! 😊💫
                  </p>
                )}
              </div>

              <Button 
                onClick={resetQuiz}
                className="font-elegant shadow-magical hover:shadow-glow"
              >
                Play Again 🎮
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-elegant text-primary text-center mb-4 animate-fadeInUp">
          How Well Do You Know Me? 💭
        </h2>
        <p className="text-xl font-script text-muted-foreground text-center mb-12 animate-fadeInUp">
          Let's see if you've been paying attention! 😉
        </p>

        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-sm bg-card/90 shadow-magical">
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-vintage text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="flex space-x-1">
                {[...Array(quizQuestions.length)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i <= currentQuestion ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-elegant text-primary">
                {quizQuestions[currentQuestion].question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showFeedback
                      ? index === quizQuestions[currentQuestion].correct
                        ? "default"
                        : selectedAnswer === index
                        ? "destructive"
                        : "outline"
                      : "outline"
                  }
                  className="w-full p-4 h-auto text-left justify-start font-vintage"
                  onClick={() => !showFeedback && handleAnswerSelect(index)}
                  disabled={showFeedback}
                >
                  <span className="mr-3">
                    {showFeedback && index === quizQuestions[currentQuestion].correct && <Star className="w-4 h-4 inline" />}
                    {showFeedback && selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && <Heart className="w-4 h-4 inline" />}
                  </span>
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="text-center space-y-4 animate-fadeInUp">
                <p className="text-lg font-script text-primary">
                  {quizQuestions[currentQuestion].feedback}
                </p>
                <Button 
                  onClick={nextQuestion}
                  className="font-elegant shadow-magical hover:shadow-glow"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'} ✨
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}