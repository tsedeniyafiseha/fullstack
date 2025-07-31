import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  CheckCircle,
  Heart,
  Activity,
  Calendar
} from 'lucide-react';

interface HealthMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'attention';
  description: string;
}

export const HealthChart = () => {
  const healthMetrics: HealthMetric[] = [
    {
      name: "Overall Health Score",
      value: 85,
      trend: 'up',
      status: 'good',
      description: "Improved by 8% this month"
    },
    {
      name: "Cycle Regularity",
      value: 78,
      trend: 'stable',
      status: 'good',
      description: "Consistent 28-day cycles"
    },
    {
      name: "Breast Health",
      value: 92,
      trend: 'up',
      status: 'good',
      description: "Regular self-examinations completed"
    },
    {
      name: "PCOS Risk Factors",
      value: 35,
      trend: 'down',
      status: 'warning',
      description: "Monitor insulin resistance"
    },
    {
      name: "Endometriosis Symptoms",
      value: 25,
      trend: 'down',
      status: 'good',
      description: "Pain levels decreasing"
    },
    {
      name: "Stress Levels",
      value: 45,
      trend: 'up',
      status: 'attention',
      description: "Consider stress management techniques"
    }
  ];

  const recentInsights = [
    {
      date: "This Week",
      insight: "Your cycle tracking shows consistent patterns. Great job maintaining regular monitoring!",
      type: "positive"
    },
    {
      date: "Last Week",
      insight: "Consider discussing elevated stress levels with your healthcare provider.",
      type: "attention"
    },
    {
      date: "2 Weeks Ago",
      insight: "Breast self-examination completed on schedule. No concerns noted.",
      type: "positive"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-health-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-primary" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-health-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-health-warning" />;
      case 'attention':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-health-success/10 text-health-success';
      case 'warning':
        return 'bg-health-warning/10 text-health-warning';
      case 'attention':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Metrics Overview */}
      <Card className="fema-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Health Analytics Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="space-y-4 p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(metric.status)}
                    <h4 className="font-semibold text-sm">{metric.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.value}%
                    </Badge>
                  </div>
                </div>
                
                <Progress value={metric.value} className="h-2" />
                
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Insights */}
      <Card className="fema-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Personalized Health Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-muted/20">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                insight.type === 'positive' ? 'bg-health-success' : 'bg-health-warning'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">{insight.date}</span>
                </div>
                <p className="text-sm leading-relaxed">{insight.insight}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card className="fema-card bg-gradient-to-br from-primary-soft to-accent-warm">
        <CardHeader>
          <CardTitle className="text-white">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 text-white/90">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Schedule your annual breast cancer screening</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Continue tracking menstrual cycle patterns</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Consider stress reduction techniques</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};