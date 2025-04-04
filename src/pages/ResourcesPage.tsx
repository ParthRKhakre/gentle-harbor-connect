
import { Skeleton } from "@/components/ui/skeleton";
import ResourceSearch from "@/components/resources/ResourceSearch";
import ResourceCategoryTabs from "@/components/resources/ResourceCategoryTabs";
import ResourceInfo from "@/components/resources/ResourceInfo";
import { useResources } from "@/hooks/useResources";

const ResourcesPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredResources,
    categories,
    isLoading
  } = useResources();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Self-Help Resources</h1>
          <p className="text-muted-foreground mt-1">
            Browse our collection of mental health resources
          </p>
        </div>
        
        <ResourceSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      
      {isLoading ? (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center items-center py-4">
            <Skeleton className="h-8 w-60" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-72 w-full rounded-md" />
            ))}
          </div>
        </div>
      ) : (
        <ResourceCategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          filteredResources={filteredResources}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      
      <ResourceInfo />
    </div>
  );
};

export default ResourcesPage;
