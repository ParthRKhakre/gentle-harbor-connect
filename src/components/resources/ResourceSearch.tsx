
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ResourceSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ResourceSearch = ({ searchQuery, setSearchQuery }: ResourceSearchProps) => {
  return (
    <div className="relative w-full md:w-72">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default ResourceSearch;
