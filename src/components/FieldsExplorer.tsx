import { useState } from "react";
import { Search, Filter, TrendingUp, Users, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FieldCard from "./FieldCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Field = Tables<"fields">;

const categories = [
  { value: "all", label: "All Fields" },
  { value: "engineering", label: "Engineering" },
  { value: "medical", label: "Medical" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "design", label: "Design" },
  { value: "law", label: "Law" },
  { value: "education", label: "Education" },
];

const FieldsExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: fields, isLoading } = useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fields")
        .select("*")
        .order("total_students", { ascending: false });
      
      if (error) throw error;
      return data as Field[];
    },
  });

  const filteredFields = fields?.filter((field) => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || field.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const growingFields = filteredFields?.filter(f => f.growth_trend === 'rapidly_growing' || f.growth_trend === 'growing').length || 0;
  const lowCompetitionFields = filteredFields?.filter(f => f.competition_level < 50).length || 0;

  return (
    <section id="explore" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Career Fields
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover insights about different career paths. Compare job demand, competition, and future growth potential.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{growingFields} Growing Fields</span>
          </div>
          <div className="flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{lowCompetitionFields} Low Competition</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search fields, skills, or industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Fields Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredFields?.map((field, index) => (
                <div 
                  key={field.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FieldCard field={field} />
                </div>
              ))}
            </div>

            {filteredFields?.length === 0 && (
              <div className="text-center py-12">
                <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No fields found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FieldsExplorer;
