import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CervicalCancerScreening = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'age',
      question: 'What is your age?',
      options: [
        { value: 'under-21', label: 'Under 21 years', risk: 0 },
        { value: '21-29', label: '21-29 years', risk: 5 },
        { value: '30-65', label: '30-65 years', risk: 15 },
        { value: 'over-65', label: 'Over 65 years', risk: 10 }
      ]
    },
    {
      id: 'pap-test',
      question: 'When was your last Pap test?',
      options: [
        { value: 'within-3-years', label: 'Within the last 3 years', risk: 0 },
        { value: '3-5-years', label: '3-5 years ago', risk: 10 },
        { value: 'over-5-years', label: 'More than 5 years ago', risk: 25 },
        { value: 'never', label: 'Never had a Pap test', risk: 30 }
      ]
    },
    {
      id: 'hpv-history',
      question: 'Have you ever tested positive for HPV?',
      options: [
        { value: 'no', label: 'No', risk: 0 },
        { value: 'yes-treated', label: 'Yes, but it was treated', risk: 15 },
        { value: 'yes-not-treated', label: 'Yes, but not treated', risk: 30 },
        { value: 'dont-know', label: 'I don\'t know', risk: 10 }
      ]
    },
    {
      id: 'sexual-history',
      question: 'Sexual activity history:',
      options: [
        { value: 'not-active', label: 'Not sexually active', risk: 0 },
        { value: 'one-partner', label: 'One sexual partner', risk: 5 },
        { value: 'few-partners', label: 'Few sexual partners (2-4)', risk: 10 },
        { value: 'many-partners', label: 'Multiple sexual partners (5+)', risk: 20 }
      ]
    },
    {
      id: 'smoking',
      question: 'Do you smoke or have you smoked?',
      options: [
        { value: 'never', label: 'Never smoked', risk: 0 },
        { value: 'former', label: 'Former smoker', risk: 10 },
        { value: 'current', label: 'Current smoker', risk: 20 },
        { value: 'heavy', label: 'Heavy smoker (1+ pack/day)', risk: 30 }
      ]
    },
    {
      id: 'symptoms',
      question: 'Do you experience any of these symptoms?',
      options: [
        { value: 'none', label: 'No symptoms', risk: 0 },
        { value: 'bleeding', label: 'Unusual vaginal bleeding', risk: 25 },
        { value: 'discharge', label: 'Unusual vaginal discharge', risk: 15 },
        { value: 'pain', label: 'Pelvic pain or pain during intercourse', risk: 20 }
      ]
    }
  ];

  const totalSteps = questions.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep - 1].id]: value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate risk and navigate to results
      const totalRisk = calculateRisk();
      navigate('/screening-results', { 
        state: { 
          disease: 'Cervical Cancer',
          riskPercentage: totalRisk,
          answers: answers
        } 
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRisk = () => {
    let totalRisk = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answer);
      if (option) {
        totalRisk += option.risk;
      }
    });
    return Math.min(Math.round(totalRisk / questions.length), 100);
  };

  const currentQuestion = questions[currentStep - 1];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="fema-button-secondary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-display font-bold">Cervical Cancer Screening</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="fema-card">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              <CardDescription>
                Please select the option that best describes your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={currentAnswer || ''} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value} 
                      className="flex-1 cursor-pointer font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="fema-button-secondary"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!currentAnswer}
                  className="fema-button-primary"
                >
                  {currentStep === totalSteps ? (
                    <>
                      Get Results
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="fema-card mt-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-orange-800">About Cervical Cancer Screening</h3>
                  <p className="text-sm text-orange-700 leading-relaxed">
                    Regular Pap tests and HPV testing are crucial for early detection. 
                    Cervical cancer is highly preventable when caught early through routine screening.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CervicalCancerScreening;