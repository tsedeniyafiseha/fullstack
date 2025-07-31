import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Activity } from 'lucide-react';

const PCOSScreening = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'menstrual-cycle',
      question: 'How regular are your menstrual cycles?',
      options: [
        { value: 'regular', label: 'Regular (21-35 days)', weight: 1 },
        { value: 'irregular', label: 'Irregular (varies significantly)', weight: 3 },
        { value: 'absent', label: 'Absent or very infrequent', weight: 4 }
      ]
    },
    {
      id: 'hirsutism',
      question: 'Do you experience excessive hair growth (face, chest, back)?',
      options: [
        { value: 'none', label: 'No excessive hair growth', weight: 1 },
        { value: 'mild', label: 'Mild hair growth', weight: 2 },
        { value: 'moderate', label: 'Moderate hair growth', weight: 3 },
        { value: 'severe', label: 'Severe hair growth', weight: 4 }
      ]
    },
    {
      id: 'acne',
      question: 'Do you have persistent acne, especially along jawline?',
      options: [
        { value: 'none', label: 'No acne issues', weight: 1 },
        { value: 'occasional', label: 'Occasional breakouts', weight: 2 },
        { value: 'persistent', label: 'Persistent acne', weight: 3 }
      ]
    },
    {
      id: 'weight',
      question: 'Have you experienced unexplained weight gain or difficulty losing weight?',
      options: [
        { value: 'no', label: 'No weight issues', weight: 1 },
        { value: 'mild', label: 'Some weight gain', weight: 2 },
        { value: 'significant', label: 'Significant weight gain/difficulty losing', weight: 3 }
      ]
    },
    {
      id: 'hair-loss',
      question: 'Do you experience male-pattern hair loss or thinning?',
      options: [
        { value: 'none', label: 'No hair loss', weight: 1 },
        { value: 'mild', label: 'Mild thinning', weight: 2 },
        { value: 'noticeable', label: 'Noticeable hair loss', weight: 3 }
      ]
    },
    {
      id: 'mood',
      question: 'Do you experience mood changes, anxiety, or depression?',
      options: [
        { value: 'stable', label: 'Generally stable mood', weight: 1 },
        { value: 'occasional', label: 'Occasional mood swings', weight: 2 },
        { value: 'frequent', label: 'Frequent mood changes/anxiety', weight: 3 }
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
          disease: 'PCOS', 
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
        'Continue monitoring your menstrual cycle',
        'Maintain a healthy diet and exercise routine',
        'Consider annual check-ups with your gynecologist'
      ];
    } else if (risk < 65) {
      return [
        'Consult with your doctor about PCOS screening',
        'Consider lifestyle modifications',
        'Monitor symptoms and track menstrual cycles'
      ];
    } else {
      return [
        'Schedule an appointment with a gynecologist or endocrinologist',
        'Consider hormonal testing',
        'Discuss treatment options with a healthcare provider'
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">PCOS Screening</h1>
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

export default PCOSScreening;