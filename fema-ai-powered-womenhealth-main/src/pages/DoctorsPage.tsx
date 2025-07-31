import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, Star, Clock, Users } from 'lucide-react';

const DoctorsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { disease, risk } = location.state || {};
  const [searchLocation, setSearchLocation] = useState('');

  const allDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Gynecologic Oncologist',
      rating: 4.8,
      reviewCount: 127,
      distance: '2.3 miles',
      address: '123 Medical Center Dr, Downtown',
      phone: '(555) 123-4567',
      availability: 'Next available: Tomorrow 2:00 PM',
      image: '/placeholder.svg',
      specialties: ['Breast Cancer', 'Ovarian Cancer', 'Cervical Cancer'],
      experience: '15 years',
      hospital: 'City Medical Center',
      diseases: ['Breast Cancer', 'Cervical Cancer']
    },
    {
      id: 2,
      name: 'Dr. Emily Chen',
      specialty: 'Reproductive Endocrinologist',
      rating: 4.9,
      reviewCount: 89,
      distance: '3.1 miles',
      address: '456 Health Plaza, Midtown',
      phone: '(555) 234-5678',
      availability: 'Next available: Thursday 10:30 AM',
      image: '/placeholder.svg',
      specialties: ['PCOS', 'Fertility', 'Hormonal Disorders'],
      experience: '12 years',
      hospital: 'Women\'s Health Institute',
      diseases: ['PCOS']
    },
    {
      id: 3,
      name: 'Dr. Maria Rodriguez',
      specialty: 'Gynecologist',
      rating: 4.7,
      reviewCount: 156,
      distance: '1.8 miles',
      address: '789 Care Ave, Uptown',
      phone: '(555) 345-6789',
      availability: 'Next available: Monday 9:00 AM',
      image: '/placeholder.svg',
      specialties: ['Endometriosis', 'Pelvic Pain', 'General Gynecology'],
      experience: '18 years',
      hospital: 'Regional Medical Center',
      diseases: ['Endometriosis']
    },
    {
      id: 4,
      name: 'Dr. Jennifer Kim',
      specialty: 'Women\'s Health Specialist',
      rating: 4.6,
      reviewCount: 94,
      distance: '4.2 miles',
      address: '321 Wellness St, Suburbs',
      phone: '(555) 456-7890',
      availability: 'Next available: Friday 3:15 PM',
      image: '/placeholder.svg',
      specialties: ['Preventive Care', 'Mammography', 'Women\'s Wellness'],
      experience: '10 years',
      hospital: 'Suburban Health Network',
      diseases: ['Breast Cancer', 'Cervical Cancer']
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Gynecologic Oncologist',
      rating: 4.9,
      reviewCount: 203,
      distance: '1.5 miles',
      address: '567 Medical Plaza, Central',
      phone: '(555) 567-8901',
      availability: 'Next available: Today 4:00 PM',
      image: '/placeholder.svg',
      specialties: ['Cervical Cancer', 'HPV Treatment', 'Colposcopy'],
      experience: '20 years',
      hospital: 'Cancer Treatment Center',
      diseases: ['Cervical Cancer']
    },
    {
      id: 6,
      name: 'Dr. Rachel Green',
      specialty: 'Endocrinologist',
      rating: 4.8,
      reviewCount: 156,
      distance: '2.8 miles',
      address: '890 Hormone Clinic, West Side',
      phone: '(555) 678-9012',
      availability: 'Next available: Wednesday 11:00 AM',
      image: '/placeholder.svg',
      specialties: ['PCOS', 'Insulin Resistance', 'Metabolic Disorders'],
      experience: '14 years',
      hospital: 'Endocrine Health Center',
      diseases: ['PCOS']
    }
  ];

  // Filter doctors based on disease and sort by relevance
  const getFilteredDoctors = () => {
    if (!disease) return allDoctors;
    
    const diseaseSpecific = allDoctors.filter(doctor => 
      doctor.diseases.includes(disease)
    );
    
    // Sort by rating and experience
    return diseaseSpecific.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return parseInt(b.experience) - parseInt(a.experience);
    });
  };

  const doctors = getFilteredDoctors();

  const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          {hasHalfStar && (
            <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
          )}
          {[...Array(5 - Math.ceil(rating))].map((_, i) => (
            <Star key={i + fullStars} className="h-4 w-4 text-gray-300" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating} ({reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">
                {disease ? `${disease} Specialists` : 'Find Specialists'}
              </h1>
              <p className="text-muted-foreground">
                {disease 
                  ? `Connect with qualified ${disease.toLowerCase()} specialists near you` 
                  : 'Connect with qualified women\'s health experts near you'
                }
              </p>
              {disease && risk && (
                <div className="mt-2">
                  <span className="text-sm px-3 py-1 rounded-full bg-primary-soft text-primary font-medium">
                    Risk Level: {risk}% - {risk < 30 ? 'Low' : risk < 60 ? 'Moderate' : 'High'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter your location (e.g., zip code, city)"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="fema-card hover-scale">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0 mb-4 lg:mb-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-soft to-accent-warm rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                    </div>

                    <StarRating rating={doctor.rating} reviewCount={doctor.reviewCount} />

                     <div className="flex flex-wrap gap-2">
                       {doctor.specialties.map((specialty, index) => (
                         <Badge 
                           key={index} 
                           variant={disease && doctor.diseases.includes(disease) ? "default" : "secondary"} 
                           className="fema-badge"
                         >
                           {specialty}
                         </Badge>
                       ))}
                       {disease && doctor.diseases.includes(disease) && (
                         <Badge variant="default" className="bg-health-success text-white">
                           {disease} Specialist
                         </Badge>
                       )}
                     </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.distance} • {doctor.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.experience} experience</span>
                      </div>
                    </div>
                  </div>

                   {/* Action Buttons */}
                   <div className="flex flex-col space-y-2 mt-4 lg:mt-0 lg:flex-shrink-0">
                     <Button className="fema-button-primary">
                       Book Appointment
                     </Button>
                     <Button variant="outline" className="fema-button-secondary">
                       View Profile
                     </Button>
                     {disease && doctor.diseases.includes(disease) && (
                       <div className="text-xs text-health-success font-medium text-center">
                         Recommended for {disease}
                       </div>
                     )}
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {doctors.length === 0 && disease && (
          <div className="text-center mt-8 p-6 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              No {disease} specialists found in your area. Try expanding your search or contact us for assistance.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 fema-button-secondary"
              onClick={() => setSearchLocation('')}
            >
              Show All Doctors
            </Button>
          </div>
        )}
        {doctors.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="fema-button-secondary">
              Load More Doctors
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;