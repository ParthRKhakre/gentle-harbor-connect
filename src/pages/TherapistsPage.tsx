
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TherapistCard, { TherapistType } from "@/components/TherapistCard";
import { Search, Filter } from "lucide-react";

// Mock therapist data
const therapists: TherapistType[] = [
  {
    id: "1",
    name: "Dr. Alex Johnson",
    title: "Clinical Psychologist",
    location: "New York, NY",
    specialties: ["Anxiety", "Depression", "Trauma"],
    languages: ["English", "Spanish"],
    description: "Specializing in evidence-based therapeutic approaches for anxiety and trauma recovery.",
    verified: true
  },
  {
    id: "2",
    name: "Dr. Sam Rivera",
    title: "Licensed Therapist",
    location: "Los Angeles, CA",
    specialties: ["LGBTQ+", "Identity", "Relationships"],
    languages: ["English", "French"],
    description: "Providing affirming therapy for LGBTQ+ individuals and relationship counseling.",
    verified: true
  },
  {
    id: "3",
    name: "Dr. Morgan Lee",
    title: "Mental Health Counselor",
    location: "Chicago, IL",
    specialties: ["Grief", "Life Transitions", "Stress"],
    languages: ["English", "Mandarin"],
    description: "Supporting clients through life changes, loss, and developing resilience.",
    verified: true
  },
  {
    id: "4",
    name: "Dr. Jordan Smith",
    title: "Psychiatrist",
    location: "Seattle, WA",
    specialties: ["Medication Management", "Bipolar Disorder", "Depression"],
    languages: ["English"],
    description: "Combining medication management with holistic approaches to mental wellness.",
    verified: true
  },
  {
    id: "5",
    name: "Dr. Taylor Wong",
    title: "Family Therapist",
    location: "Austin, TX",
    specialties: ["Family Dynamics", "Parenting", "Adolescents"],
    languages: ["English", "Cantonese"],
    description: "Working with families to improve communication and resolve conflicts.",
    verified: true
  },
  {
    id: "6",
    name: "Dr. Jamie Garcia",
    title: "Cognitive Behavioral Therapist",
    location: "Miami, FL",
    specialties: ["CBT", "Anxiety", "Phobias"],
    languages: ["English", "Spanish", "Portuguese"],
    description: "Specializing in cognitive behavioral therapy for anxiety disorders and phobias.",
    verified: true
  },
  {
    id: "7",
    name: "Dr. Robin Patel",
    title: "Clinical Psychologist",
    location: "Boston, MA",
    specialties: ["Depression", "Trauma", "PTSD"],
    languages: ["English", "Hindi"],
    description: "Providing trauma-informed care with a focus on recovery and resilience.",
    verified: true
  },
  {
    id: "8",
    name: "Dr. Casey Kim",
    title: "Mental Health Counselor",
    location: "Portland, OR",
    specialties: ["Stress", "Burnout", "Work-Life Balance"],
    languages: ["English", "Korean"],
    description: "Helping professionals manage stress and avoid burnout through mindfulness and balance.",
    verified: true
  }
];

// Get unique lists for filters
const locations = Array.from(new Set(therapists.map(t => t.location)));
const allSpecialties = therapists.flatMap(t => t.specialties);
const specialties = Array.from(new Set(allSpecialties));
const allLanguages = therapists.flatMap(t => t.languages);
const languages = Array.from(new Set(allLanguages));

const TherapistsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [filteredTherapists, setFilteredTherapists] = useState<TherapistType[]>(therapists);

  // Filter therapists when filters change
  useEffect(() => {
    let filtered = therapists;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (therapist) =>
          therapist.name.toLowerCase().includes(query) ||
          therapist.description.toLowerCase().includes(query) ||
          therapist.specialties.some((s) => s.toLowerCase().includes(query))
      );
    }
    
    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((therapist) => therapist.location === selectedLocation);
    }
    
    // Filter by specialty
    if (selectedSpecialty) {
      filtered = filtered.filter((therapist) => 
        therapist.specialties.includes(selectedSpecialty)
      );
    }
    
    // Filter by language
    if (selectedLanguage) {
      filtered = filtered.filter((therapist) => 
        therapist.languages.includes(selectedLanguage)
      );
    }
    
    setFilteredTherapists(filtered);
  }, [searchQuery, selectedLocation, selectedSpecialty, selectedLanguage]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedSpecialty("");
    setSelectedLanguage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find Therapists</h1>
          <p className="text-muted-foreground mt-1">
            Browse verified mental health professionals
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-muted-foreground" />
          <h2 className="font-medium">Filter Therapists</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Location</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Specialty</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Language</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Clear filters button (only show if filters are applied) */}
        {(searchQuery || selectedLocation || selectedSpecialty || selectedLanguage) && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Results */}
      {filteredTherapists.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-lg font-medium">No therapists found</p>
          <p className="text-muted-foreground">
            Try changing your search or filter criteria
          </p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredTherapists.length} therapist{filteredTherapists.length !== 1 && 's'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTherapists.map((therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} />
            ))}
          </div>
        </>
      )}
      
      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium mb-2">About Our Therapist Directory</h3>
        <p className="text-muted-foreground text-sm">
          All listed therapists have been verified as licensed mental health professionals. 
          Safe Spaces does not endorse any specific therapist and is not responsible for the 
          services provided. We recommend reviewing a therapist's credentials and approach 
          before beginning therapy.
        </p>
      </div>
    </div>
  );
};

export default TherapistsPage;
