import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MessageCircle, 
  Calendar, 
  Activity, 
  Heart, 
  Brain,
  FileText,
  TrendingUp,
  Send,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aiDoctor from '@/assets/ai-doctor.jpg';
import { AIChat } from '@/components/AIChat';
import { HealthChart } from '@/components/HealthChart';
import { ScreeningForm } from '@/components/ScreeningForm';
import { DiseaseCards } from './DiseaseCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('diseases');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const healthMetrics = [
    { 
      title: "Health Score", 
      value: 85, 
      description: "Based on recent assessments",
      color: "text-health-success"
    },
    { 
      title: "Risk Assessment", 
      value: 23, 
      description: "Low risk profile",
      color: "text-health-info"
    },
    { 
      title: "Screening Progress", 
      value: 67, 
      description: "2 of 3 screenings complete",
      color: "text-health-warning"
    }
  ];

  const recentActivities = [
    { 
      date: "Today", 
      activity: "Completed PCOS screening questionnaire", 
      type: "screening" 
    },
    { 
      date: "Yesterday", 
      activity: "AI consultation about irregular cycles", 
      type: "consultation" 
    },
    { 
      date: "3 days ago", 
      activity: "Health insights report generated", 
      type: "report" 
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-primary" />
                <span className="text-2xl font-display font-bold text-gradient">FEMA</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your personalized health overview and AI assistant.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - AI Chat */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={activeTab === 'diseases' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('diseases')}
                className={activeTab === 'diseases' ? 'fema-button-primary' : ''}
              >
                <Heart className="h-4 w-4 mr-2" />
                Health Screening
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('chat')}
                className={activeTab === 'chat' ? 'fema-button-primary' : ''}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                variant={activeTab === 'insights' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('insights')}
                className={activeTab === 'insights' ? 'fema-button-primary' : ''}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Health Insights
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === 'diseases' && <DiseaseCards />}
            {activeTab === 'chat' && <AIChat />}
            {activeTab === 'insights' && <HealthChart />}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Health Metrics */}
            <Card className="fema-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Health Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.title}</span>
                      <span className={`text-sm font-bold ${metric.color}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="fema-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full fema-button-primary justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Screening
                </Button>
                <Button variant="outline" className="w-full fema-button-secondary justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Track Symptoms
                </Button>
                <Button variant="outline" className="w-full fema-button-secondary justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="fema-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="fema-card bg-gradient-to-br from-primary-soft to-accent-warm">
              <CardHeader>
                <CardTitle className="text-white">Today's Health Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 text-sm leading-relaxed">
                  Regular self-examinations can help detect changes early. Set a monthly reminder to perform breast self-exams and track any changes you notice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;