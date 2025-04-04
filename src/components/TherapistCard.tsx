
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User } from "lucide-react";

export type TherapistType = {
  id: string;
  name: string;
  title: string;
  location: string;
  specialties: string[];
  languages: string[];
  description: string;
  verified: boolean;
};

interface TherapistCardProps {
  therapist: TherapistType;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg">{therapist.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{therapist.title}</p>
            </div>
          </div>
          {therapist.verified && (
            <Badge variant="secondary" className="ml-auto">
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-muted-foreground" />
          <span>{therapist.location}</span>
        </div>
        
        <CardDescription className="text-left">
          {therapist.description}
        </CardDescription>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {therapist.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {therapist.languages.map((language) => (
                <Badge key={language} variant="secondary" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default TherapistCard;
