
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ResourceList from "./ResourceList";
import { ResourceType } from "@/components/ResourceCard";

interface ResourceCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  filteredResources: ResourceType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ResourceCategoryTabs = ({
  activeCategory,
  setActiveCategory,
  categories,
  filteredResources,
  searchQuery,
  setSearchQuery,
}: ResourceCategoryTabsProps) => {
  return (
    <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="mb-8">
      <TabsList className="mb-6 flex flex-wrap h-auto">
        <TabsTrigger value="all">All</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <ResourceList 
          filteredResources={filteredResources} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </TabsContent>
      
      {categories.map((category) => (
        <TabsContent key={category} value={category} className="mt-0">
          <ResourceList 
            filteredResources={filteredResources} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ResourceCategoryTabs;
