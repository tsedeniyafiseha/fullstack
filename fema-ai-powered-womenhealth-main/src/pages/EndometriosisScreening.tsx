import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Flower2 } from 'lucide-react';

const EndometriosisScreening = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'period-pain',
      question: 'How severe is your menstrual pain?',
      options: [
        { value: 'none', label: 'No pain or very mild', weight: 1 },
        { value: 'moderate', label: 'Moderate pain, manageable', weight: 2 },
        { value: 'severe', label: 'Severe pain, affects daily activities', weight: 4 }
      ]
    },
    {
      id: 'pelvic-pain',
      question: 'Do you experience pelvic pain outside of menstruation?',
      options: [
        { value: 'never', label: 'Never', weight: 1 },
        { value: 'occasionally', label: 'Occasionally', weight: 2 },
        { value: 'frequently', label: 'Frequently', weight: 3 }
      ]
    },
    {
      id: 'intercourse-pain',
      question: 'Do you experience pain during or after intercourse?',
      options: [
        { value: 'never', label: 'Never', weight: 1 },
        { value: 'sometimes', label: 'Sometimes', weight: 3 },
        { value: 'always', label: 'Usually or always', weight: 4 }
      ]
    },
    {
      id: 'bowel-symptoms',
      question: 'Do you have bowel symptoms during menstruation?',
      options: [
        { value: 'none', label: 'No unusual symptoms', weight: 1 },
        { value: 'mild', label: 'Mild discomfort or changes', weight: 2 },
        { value: 'severe', label: 'Severe pain, constipation, or diarrhea', weight: 3 }
      ]
    },
    {
      id: 'heavy-bleeding',
      question: 'How heavy are your menstrual periods?',
      options: [
        { value: 'normal', label: 'Normal flow', weight: 1 },
        { value: 'heavy', label: 'Heavy flow', weight: 2 },
        { value: 'very-heavy', label: 'Very heavy, flooding', weight: 3 }
      ]
    },
    {
      id: 'fatigue',
      question: 'Do you experience chronic fatigue, especially around your period?',
      options: [
        { value: 'none', label: 'No unusual fatigue', weight: 1 },
        { value: 'moderate', label: 'Some fatigue', weight: 2 },
        { value: 'severe', label: 'Severe, debilitating fatigue', weight: 3 }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const risk = calculateRisk();
      navigate('/screening-results', { 
        state: { 
          disease: 'Endometriosis', 
          risk: risk,
          recommendations: getRecommendations(risk)
        } 
      });
    }
  };

  const calculateRisk = () => {
    let totalWeight = 0;
    const maxWeight = questions.length * 4;
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answer);
      if (option) {
        totalWeight += option.weight;
      }
    });
    
    return Math.round((totalWeight / maxWeight) * 100);
  };

  const getRecommendations = (risk: number) => {
    if (risk < 35) {
      return [
        'Continue monitoring your symptoms',
        'Maintain a pain diary to track patterns',
        'Practice stress management and regular exercise'
      ];
    } else if (risk < 65) {
      return [
        'Consider discussing symptoms with your gynecologist',
        'Keep a detailed symptom diary',
        'Explore pain management techniques'
      ];
    } else {
      return [
        'Schedule an appointment with a gynecologist specializing in endometriosis',
        'Consider imaging studies or laparoscopy for diagnosis',
        'Discuss treatment options including hormonal therapy'
      ];
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion].id];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Flower2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Endometriosis Screening</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="fema-card">
          <CardHeader>
            <CardTitle className="text-xl">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              onClick={handleNext} 
              disabled={!currentAnswer}
              className="w-full fema-button-primary"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Get Results'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EndometriosisScreening;