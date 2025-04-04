import { useState, useEffect } from "react";
import { ResourceType } from "@/components/ResourceCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

export const useResources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredResources, setFilteredResources] = useState<ResourceType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();
  
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*') as { 
            data: Database['public']['Tables']['resources']['Row'][] | null; 
            error: Error | null 
          };
        
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
          
          const uniqueCategories = Array.from(
            new Set(formattedResources.map(resource => resource.category))
          );
          setCategories(uniqueCategories);
          
          return formattedResources;
        }
        return [];
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast({
          title: "Error",
          description: "Failed to fetch resources. Using mock data instead.",
          variant: "destructive"
        });
        
        const mockResources = [
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
        ];
        
        setCategories(Array.from(new Set(mockResources.map(resource => resource.category))));
        return mockResources;
      }
    }
  });
  
  useEffect(() => {
    if (!resources) return;
    
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

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredResources,
    resources,
    categories,
    isLoading
  };
};
