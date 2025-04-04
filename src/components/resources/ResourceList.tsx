
import ResourceCard, { ResourceType } from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";

interface ResourceListProps {
  filteredResources: ResourceType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ResourceList = ({ 
  filteredResources, 
  searchQuery, 
  setSearchQuery 
}: ResourceListProps) => {
  if (filteredResources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">No resources found</p>
        <p className="text-muted-foreground">
          Try changing your search or filter criteria
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => setSearchQuery("")}
        >
          Clear Search
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredResources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;
