
import { useEffect, useState } from "react";
import { seedResources } from "@/utils/seedResources";
import { useToast } from "@/hooks/use-toast";

const DataInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeData = async () => {
      if (!initialized) {
        try {
          const resourcesSeeded = await seedResources();
          if (resourcesSeeded) {
            console.log("Data initialization complete");
          }
        } catch (error) {
          console.error("Error initializing data:", error);
          toast({
            title: "Error",
            description: "Failed to initialize application data.",
            variant: "destructive"
          });
        } finally {
          setInitialized(true);
        }
      }
    };

    initializeData();
  }, [initialized, toast]);

  return null; // This component doesn't render anything
};

export default DataInitializer;
