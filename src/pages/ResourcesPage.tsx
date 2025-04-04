import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard, { ResourceType } from "@/components/ResourceCard";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredResources, setFilteredResources] = useState<ResourceType[]>([]);
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('resources')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedResources = data.map((resource) => ({
            id: resource.id,
            title: resource.title,
            description: resource.description,
            category: resource.category,
            tags: resource.tags,
            url: resource.url
          }));
          
          setResources(formattedResources);
          
          const uniqueCategories = Array.from(
            new Set(formattedResources.map(resource => resource.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast({
          title: "Error",
          description: "Failed to fetch resources. Using mock data instead.",
          variant: "destructive"
        });
        
        setResources([
          {
            id: "1",
            title: "Mindfulness Meditation Guide",
            description: "A comprehensive guide to mindfulness meditation practices for beginners.",
            category: "mindfulness",
            tags: ["meditation", "stress-relief", "beginners"],
            url: "/resources/1"
          },
          {
            id: "2",
            title: "Journal Prompts for Anxiety",
            description: "30 therapeutic journal prompts to help manage anxiety and worry.",
            category: "journaling",
            tags: ["anxiety", "writing", "self-reflection"],
            url: "/resources/2"
          },
          {
            id: "3",
            title: "Cognitive Behavioral Therapy Worksheets",
            description: "Practical CBT worksheets for identifying and changing negative thought patterns.",
            category: "therapy",
            tags: ["cbt", "worksheets", "thought-patterns"],
            url: "/resources/3"
          },
          {
            id: "4",
            title: "Deep Breathing Techniques",
            description: "Step-by-step guide to various deep breathing exercises for immediate stress relief.",
            category: "mindfulness",
            tags: ["breathing", "stress-relief", "anxiety"],
            url: "/resources/4"
          },
          {
            id: "5",
            title: "Building a Self-Care Routine",
            description: "How to create and maintain a personalized self-care routine that works for you.",
            category: "self-care",
            tags: ["routine", "wellness", "balance"],
            url: "/resources/5"
          },
          {
            id: "6",
            title: "Understanding Depression",
            description: "An informative guide to understanding depression symptoms and management strategies.",
            category: "education",
            tags: ["depression", "mental-health", "symptoms"],
            url: "/resources/6"
          },
          {
            id: "7",
            title: "Sleep Hygiene Guide",
            description: "Tips and strategies for improving sleep quality and establishing healthy sleep patterns.",
            category: "self-care",
            tags: ["sleep", "insomnia", "wellness"],
            url: "/resources/7"
          },
          {
            id: "8",
            title: "Grief and Loss Workbook",
            description: "Supportive exercises for processing grief and navigating the journey of loss.",
            category: "coping",
            tags: ["grief", "loss", "healing"],
            url: "/resources/8"
          },
          {
            id: "9",
            title: "Positive Affirmations Collection",
            description: "A collection of positive affirmations organized by different emotional needs.",
            category: "mindfulness",
            tags: ["affirmations", "positivity", "self-esteem"],
            url: "/resources/9"
          },
          {
            id: "10",
            title: "Crisis Resource Directory",
            description: "Comprehensive list of crisis support resources and hotlines.",
            category: "crisis",
            tags: ["emergency", "hotlines", "support"],
            url: "/resources/10"
          },
        ]);
        
        setCategories(Array.from(new Set(resources.map(resource => resource.category))));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, [toast]);
  
  useEffect(() => {
    let filtered = resources;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    if (activeCategory !== "all") {
      filtered = filtered.filter((resource) => resource.category === activeCategory);
    }
    
    setFilteredResources(filtered);
  }, [searchQuery, activeCategory, resources]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Self-Help Resources</h1>
          <p className="text-muted-foreground mt-1">
            Browse our collection of mental health resources
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-center">
            <p className="text-lg font-medium">Loading resources...</p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="all" onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="mb-6 flex flex-wrap h-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium">No resources found</p>
                <p className="text-muted-foreground">
                  Try changing your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">No resources found</p>
                  <p className="text-muted-foreground">
                    Try changing your search criteria
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
      
      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium mb-2">About Our Resources</h3>
        <p className="text-muted-foreground text-sm">
          Our self-help resources are carefully curated to provide evidence-based information and practical tools. 
          While these resources can be valuable supplements to your mental health journey, they are not intended to 
          replace professional mental health treatment. If you're experiencing a crisis or need immediate help, 
          please contact a mental health professional or crisis helpline.
        </p>
      </div>
    </div>
  );
};

export default ResourcesPage;
