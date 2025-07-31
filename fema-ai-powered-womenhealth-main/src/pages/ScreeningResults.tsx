import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, AlertTriangle, CheckCircle, Calendar, Users } from 'lucide-react';

const ScreeningResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { disease, risk, recommendations } = location.state || {};

  if (!disease || risk === undefined) {
    navigate('/dashboard');
    return null;
  }

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { level: 'Low', color: 'text-health-success', bgColor: 'bg-health-success/10' };
    if (risk < 60) return { level: 'Moderate', color: 'text-health-warning', bgColor: 'bg-health-warning/10' };
    return { level: 'High', color: 'text-health-error', bgColor: 'bg-health-error/10' };
  };

  const riskInfo = getRiskLevel(risk);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Results Header */}
        <Card className="fema-card mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display">
              {disease} Screening Results
            </CardTitle>
            <p className="text-muted-foreground">
              Based on your responses, here's your risk assessment
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Score */}
            <div className="text-center space-y-4">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${riskInfo.bgColor}`}>
                {risk < 30 ? (
                  <CheckCircle className={`h-5 w-5 ${riskInfo.color}`} />
                ) : (
                  <AlertTriangle className={`h-5 w-5 ${riskInfo.color}`} />
                )}
                <span className={`font-semibold ${riskInfo.color}`}>
                  {riskInfo.level} Risk
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold">{risk}%</div>
                <Progress value={risk} className="h-3 w-64 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Risk Assessment Score
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="fema-card mb-6">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations?.map((rec: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="fema-card mb-6">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/doctors', { state: { disease, risk } })}
              className="w-full fema-button-primary justify-start"
            >
              <Users className="h-4 w-4 mr-2" />
              Find {disease} Specialists
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full fema-button-secondary justify-start"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Follow-up Screening
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full fema-button-secondary justify-start"
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            This assessment is for educational purposes only and should not replace professional medical advice. 
            Please consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreeningResults;