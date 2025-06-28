import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { value: string; label: string; image: string }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What time of day do you prefer to wear fragrance?",
    options: [
      { value: "morning", label: "Morning", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { value: "evening", label: "Evening", image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { value: "all-day", label: "All Day", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
    ]
  },
  {
    id: 2,
    question: "Which scent family appeals to you most?",
    options: [
      { value: "floral", label: "Floral", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { value: "fresh", label: "Fresh", image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { value: "woody", label: "Woody", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
      { value: "oriental", label: "Oriental", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" },
    ]
  }
];

export default function ScentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendation = () => {
    const scentFamily = answers[2] || 'fresh';
    const timePreference = answers[1] || 'all-day';
    
    // Simple recommendation logic
    if (scentFamily === 'floral') return 'Garden Whisper';
    if (scentFamily === 'fresh') return 'Ocean Breeze';
    if (scentFamily === 'woody') return 'Heritage Woods';
    if (scentFamily === 'oriental') return 'Golden Amber';
    return 'Pure Essence';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-serif font-bold text-charcoal mb-6">Find Your Perfect Match</h3>
          <p className="text-lg text-gray-600 mb-8">
            Take our personalized scent quiz to discover fragrances tailored to your preferences
          </p>
          
          {/* Scent elements display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                alt="Fresh flowers representing floral scents" 
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <p className="text-sm font-medium">Floral</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                alt="Ocean waves representing fresh scents" 
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <p className="text-sm font-medium">Fresh</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                alt="Wood texture representing woody scents" 
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <p className="text-sm font-medium">Woody</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                alt="Spices representing oriental scents" 
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <p className="text-sm font-medium">Oriental</p>
            </div>
          </div>

          <button 
            onClick={() => setQuizStarted(true)}
            className="bg-charcoal hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium transition-all duration-300"
          >
            Start Scent Quiz
          </button>
        </div>
      </section>
    );
  }

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-serif font-bold text-charcoal mb-6">Your Perfect Match</h3>
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h4 className="text-2xl font-serif font-semibold text-gold mb-4">{recommendation}</h4>
            <p className="text-gray-600 mb-6">
              Based on your preferences, we recommend this exquisite fragrance that perfectly matches your style.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gold hover:bg-yellow-600 text-white px-6 py-3 font-medium transition-colors">
                View Product
              </button>
              <button 
                onClick={resetQuiz}
                className="bg-gray-200 hover:bg-gray-300 text-charcoal px-6 py-3 font-medium transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion ? 'bg-gold' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <h3 className="text-3xl font-serif font-bold text-charcoal mb-4">{question.question}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value)}
              className="group p-6 bg-gray-50 rounded-lg hover:bg-gold hover:text-white transition-all duration-300 text-center"
            >
              <img 
                src={option.image} 
                alt={option.label}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              />
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
