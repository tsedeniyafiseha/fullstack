import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';

const BreastCancerScreening = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'age',
      question: 'What is your age group?',
      options: [
        { value: 'under-30', label: 'Under 30', weight: 1 },
        { value: '30-40', label: '30-40', weight: 2 },
        { value: '40-50', label: '40-50', weight: 3 },
        { value: 'over-50', label: 'Over 50', weight: 4 }
      ]
    },
    {
      id: 'family-history',
      question: 'Do you have a family history of breast or ovarian cancer?',
      options: [
        { value: 'none', label: 'No family history', weight: 1 },
        { value: 'distant', label: 'Distant relatives', weight: 2 },
        { value: 'close', label: 'Close relatives (mother, sister)', weight: 4 }
      ]
    },
    {
      id: 'menstrual-history',
      question: 'When did you start menstruating?',
      options: [
        { value: 'after-14', label: 'After age 14', weight: 1 },
        { value: '12-14', label: 'Between 12-14', weight: 2 },
        { value: 'before-12', label: 'Before age 12', weight: 3 }
      ]
    },
    {
      id: 'pregnancy',
      question: 'Have you had children?',
      options: [
        { value: 'yes-before-30', label: 'Yes, first child before 30', weight: 1 },
        { value: 'yes-after-30', label: 'Yes, first child after 30', weight: 2 },
        { value: 'no', label: 'No children', weight: 3 }
      ]
    },
    {
      id: 'lifestyle',
      question: 'How would you describe your lifestyle?',
      options: [
        { value: 'very-active', label: 'Very active, healthy diet', weight: 1 },
        { value: 'moderate', label: 'Moderately active', weight: 2 },
        { value: 'sedentary', label: 'Sedentary lifestyle', weight: 3 }
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
      // Calculate risk and navigate to results
      const risk = calculateRisk();
      navigate('/screening-results', { 
        state: { 
          disease: 'Breast Cancer', 
          risk: risk,
          recommendations: getRecommendations(risk)
        } 
      });
    }
  };

  const calculateRisk = () => {
    let totalWeight = 0;
    const maxWeight = questions.length * 4; // Maximum possible weight
    
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
    if (risk < 30) {
      return [
        'Continue regular self-examinations',
        'Maintain a healthy lifestyle',
        'Schedule routine mammograms as recommended by your doctor'
      ];
    } else if (risk < 60) {
      return [
        'Discuss with your doctor about genetic testing',
        'Consider more frequent screenings',
        'Maintain a healthy diet and exercise regularly'
      ];
    } else {
      return [
        'Consult with an oncologist for personalized screening plan',
        'Consider genetic counseling',
        'Discuss preventive measures with your healthcare provider'
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Breast Cancer Screening</h1>
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

export default BreastCancerScreening;