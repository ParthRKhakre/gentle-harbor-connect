
import { supabase } from "@/integrations/supabase/client";

// Mock resource data
const resourcesData = [
  {
    title: "Mindfulness Meditation Guide",
    description: "A comprehensive guide to mindfulness meditation practices for beginners.",
    category: "mindfulness",
    tags: ["meditation", "stress-relief", "beginners"],
    url: "/resources/1"
  },
  {
    title: "Journal Prompts for Anxiety",
    description: "30 therapeutic journal prompts to help manage anxiety and worry.",
    category: "journaling",
    tags: ["anxiety", "writing", "self-reflection"],
    url: "/resources/2"
  },
  {
    title: "Cognitive Behavioral Therapy Worksheets",
    description: "Practical CBT worksheets for identifying and changing negative thought patterns.",
    category: "therapy",
    tags: ["cbt", "worksheets", "thought-patterns"],
    url: "/resources/3"
  },
  {
    title: "Deep Breathing Techniques",
    description: "Step-by-step guide to various deep breathing exercises for immediate stress relief.",
    category: "mindfulness",
    tags: ["breathing", "stress-relief", "anxiety"],
    url: "/resources/4"
  },
  {
    title: "Building a Self-Care Routine",
    description: "How to create and maintain a personalized self-care routine that works for you.",
    category: "self-care",
    tags: ["routine", "wellness", "balance"],
    url: "/resources/5"
  },
  {
    title: "Understanding Depression",
    description: "An informative guide to understanding depression symptoms and management strategies.",
    category: "education",
    tags: ["depression", "mental-health", "symptoms"],
    url: "/resources/6"
  },
  {
    title: "Sleep Hygiene Guide",
    description: "Tips and strategies for improving sleep quality and establishing healthy sleep patterns.",
    category: "self-care",
    tags: ["sleep", "insomnia", "wellness"],
    url: "/resources/7"
  },
  {
    title: "Grief and Loss Workbook",
    description: "Supportive exercises for processing grief and navigating the journey of loss.",
    category: "coping",
    tags: ["grief", "loss", "healing"],
    url: "/resources/8"
  },
  {
    title: "Positive Affirmations Collection",
    description: "A collection of positive affirmations organized by different emotional needs.",
    category: "mindfulness",
    tags: ["affirmations", "positivity", "self-esteem"],
    url: "/resources/9"
  },
  {
    title: "Crisis Resource Directory",
    description: "Comprehensive list of crisis support resources and hotlines.",
    category: "crisis",
    tags: ["emergency", "hotlines", "support"],
    url: "/resources/10"
  },
];

export const seedResources = async () => {
  try {
    const { data: existingResources } = await supabase
      .from('resources')
      .select('id')
      .limit(1);
    
    // Only seed if there are no existing resources
    if (!existingResources?.length) {
      const { data, error } = await supabase
        .from('resources')
        .insert(resourcesData);
      
      if (error) {
        console.error('Error seeding resources:', error);
        return false;
      }
      
      console.log('Resources seeded successfully');
      return true;
    } else {
      console.log('Resources already exist, skipping seed');
      return true;
    }
  } catch (error) {
    console.error('Error checking or seeding resources:', error);
    return false;
  }
};
