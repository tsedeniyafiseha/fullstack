import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Heart,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  type: 'radio' | 'checkbox' | 'textarea';
  options?: string[];
  required: boolean;
}

interface ScreeningSection {
  title: string;
  description: string;
  icon: React.ElementType;
  questions: Question[];
}

export const ScreeningForm = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const screeningSections: ScreeningSection[] = [
    {
      title: "General Health",
      description: "Basic health information and family history",
      icon: Heart,
      questions: [
        {
          id: "age",
          question: "What is your age group?",
          type: "radio",
          options: ["18-25", "26-35", "36-45", "46-55", "55+"],
          required: true
        },
        {
          id: "family_history",
          question: "Do you have a family history of breast cancer, ovarian cancer, or other reproductive cancers?",
          type: "radio",
          options: ["Yes", "No", "Unsure"],
          required: true
        },
        {
          id: "medications",
          question: "Are you currently taking any medications or supplements?",
          type: "textarea",
          required: false
        }
      ]
    },
    {
      title: "Menstrual Health",
      description: "Information about your menstrual cycle and reproductive health",
      icon: Activity,
      questions: [
        {
          id: "cycle_length",
          question: "How long is your typical menstrual cycle?",
          type: "radio",
          options: ["Less than 21 days", "21-35 days", "More than 35 days", "Irregular/Unpredictable"],
          required: true
        },
        {
          id: "period_pain",
          question: "How would you describe your period pain?",
          type: "radio",
          options: ["No pain", "Mild discomfort", "Moderate pain", "Severe pain that affects daily activities"],
          required: true
        },
        {
          id: "pcos_symptoms",
          question: "Have you experienced any of the following symptoms? (Check all that apply)",
          type: "checkbox",
          options: ["Irregular periods", "Excessive hair growth", "Acne", "Weight gain", "Hair thinning", "None of the above"],
          required: false
        }
      ]
    },
    {
      title: "Symptoms Assessment",
      description: "Current symptoms and concerns",
      icon: AlertCircle,
      questions: [
        {
          id: "breast_changes",
          question: "Have you noticed any changes in your breasts?",
          type: "radio",
          options: ["No changes", "Lumps or thickening", "Skin changes", "Nipple discharge", "Pain or tenderness"],
          required: true
        },
        {
          id: "pelvic_pain",
          question: "Do you experience pelvic pain outside of menstruation?",
          type: "radio",
          options: ["Never", "Rarely", "Sometimes", "Frequently", "Always"],
          required: true
        },
        {
          id: "additional_concerns",
          question: "Please describe any additional health concerns or symptoms you'd like to discuss:",
          type: "textarea",
          required: false
        }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const getCurrentProgress = () => {
    return ((currentSection + 1) / screeningSections.length) * 100;
  };

  const handleNext = () => {
    if (currentSection < screeningSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Screening Complete!",
        description: "Your health assessment has been submitted successfully. Dr. FEMA will analyze your responses and provide personalized insights.",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const currentScreening = screeningSections[currentSection];
  const IconComponent = currentScreening.icon;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="fema-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <IconComponent className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">{currentScreening.title}</h3>
                <p className="text-sm text-muted-foreground">{currentScreening.description}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentSection + 1} of {screeningSections.length}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(getCurrentProgress())}%</span>
            </div>
            <Progress value={getCurrentProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card className="fema-card">
        <CardContent className="p-6 space-y-6">
          {currentScreening.questions.map((question, index) => (
            <div key={question.id} className="space-y-4">
              <div>
                <Label className="text-base font-medium">
                  {question.question}
                  {question.required && <span className="text-destructive ml-1">*</span>}
                </Label>
              </div>

              {question.type === 'radio' && (
                <RadioGroup
                  value={answers[question.id] || ''}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                      <Label htmlFor={`${question.id}-${optionIndex}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'checkbox' && (
                <div className="space-y-3">
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${question.id}-${optionIndex}`}
                        checked={answers[question.id]?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const currentAnswers = answers[question.id] || [];
                          if (checked) {
                            handleAnswerChange(question.id, [...currentAnswers, option]);
                          } else {
                            handleAnswerChange(question.id, currentAnswers.filter((a: string) => a !== option));
                          }
                        }}
                      />
                      <Label htmlFor={`${question.id}-${optionIndex}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'textarea' && (
                <Textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Please provide any relevant details..."
                  className="fema-input min-h-[100px]"
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="fema-button-secondary"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentSection === screeningSections.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="fema-button-primary"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Assessment
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="fema-button-primary"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};