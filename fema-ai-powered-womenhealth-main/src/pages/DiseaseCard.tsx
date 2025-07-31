import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Flower2 } from 'lucide-react';

interface DiseaseCardProps {
  disease: {
    id: string;
    name: string;
    description: string;
    prevalence: string;
    icon: React.ReactNode;
    color: string;
  };
}

export const DiseaseCard = ({ disease }: DiseaseCardProps) => {
  const navigate = useNavigate();

  const handleScreening = () => {
    navigate(`/screening/${disease.id}`);
  };

  return (
    <Card className="fema-card hover-scale cursor-pointer group">
      <CardHeader className="text-center">
        <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${disease.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {disease.icon}
        </div>
        <CardTitle className="text-xl">{disease.name}</CardTitle>
        <CardDescription className="text-center">
          {disease.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Badge variant="secondary" className="fema-badge">
            Affects {disease.prevalence}
          </Badge>
        </div>
        <Button 
          onClick={handleScreening}
          className="w-full fema-button-primary"
        >
          Start Screening
        </Button>
      </CardContent>
    </Card>
  );
};

export const DiseaseCards = () => {
  const diseases = [
    {
      id: 'breast-cancer',
      name: 'Breast Cancer',
      description: 'Early detection screening for breast health',
      prevalence: '1 in 8 women',
      icon: <Heart className="h-8 w-8 text-white" />,
      color: 'from-rose-400 to-pink-500'
    },
    {
      id: 'pcos',
      name: 'PCOS',
      description: 'Polycystic Ovary Syndrome assessment',
      prevalence: '1 in 10 women',
      icon: <Activity className="h-8 w-8 text-white" />,
      color: 'from-purple-400 to-violet-500'
    },
    {
      id: 'endometriosis',
      name: 'Endometriosis',
      description: 'Reproductive health condition screening',
      prevalence: '1 in 10 women',
      icon: <Flower2 className="h-8 w-8 text-white" />,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'cervical-cancer',
      name: 'Cervical Cancer',
      description: 'Cervical health screening and HPV assessment',
      prevalence: '1 in 144 women',
      icon: <Heart className="h-8 w-8 text-white" />,
      color: 'from-orange-400 to-amber-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {diseases.map((disease) => (
        <DiseaseCard key={disease.id} disease={disease} />
      ))}
    </div>
  );
};