
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type ResourceType = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
};

interface ResourceCardProps {
  resource: ResourceType;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-left">{resource.title}</CardTitle>
          <Badge variant="secondary" className="capitalize">
            {resource.category}
          </Badge>
        </div>
        <CardDescription className="text-left">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={`/resources/${resource.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Resource
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
