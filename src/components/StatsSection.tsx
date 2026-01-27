import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

const COLORS = ['hsl(174, 62%, 32%)', 'hsl(38, 92%, 55%)', 'hsl(152, 55%, 42%)', 'hsl(200, 60%, 50%)', 'hsl(280, 50%, 50%)'];

const StatsSection = () => {
  const { data: fields } = useQuery({
    queryKey: ["fields-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fields")
        .select("*")
        .order("total_students", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (!fields) return null;

  // Prepare data for charts
  const studentDistribution = fields.slice(0, 6).map(f => ({
    name: f.name.length > 15 ? f.name.slice(0, 15) + '...' : f.name,
    students: f.total_students,
    fullName: f.name,
  }));

  const jobGrowthData = fields.slice(0, 6).map(f => ({
    name: f.name.length > 12 ? f.name.slice(0, 12) + '...' : f.name,
    current: f.current_jobs,
    projected: f.projected_jobs_5y,
    fullName: f.name,
  }));

  const trendDistribution = [
    { name: 'Rapidly Growing', value: fields.filter(f => f.growth_trend === 'rapidly_growing').length, color: COLORS[2] },
    { name: 'Growing', value: fields.filter(f => f.growth_trend === 'growing').length, color: COLORS[0] },
    { name: 'Stable', value: fields.filter(f => f.growth_trend === 'stable').length, color: COLORS[3] },
    { name: 'Declining', value: fields.filter(f => f.growth_trend === 'declining').length, color: 'hsl(0, 72%, 55%)' },
  ].filter(d => d.value > 0);

  // Find overcrowded and underutilized fields
  const overcrowdedFields = fields.filter(f => f.competition_level >= 70).slice(0, 3);
  const opportunityFields = fields.filter(f => f.competition_level < 50 && (f.growth_trend === 'growing' || f.growth_trend === 'rapidly_growing')).slice(0, 3);

  return (
    <section id="stats" className="py-20 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            📊 Analytics
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Insights at a Glance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Data-driven insights to help you understand the current job market and make informed decisions.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Student Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                📚 Students per Field
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="students" fill="hsl(174, 62%, 32%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Job Growth Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                📈 5-Year Job Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                    <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="current" name="Current Jobs" fill="hsl(200, 60%, 50%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="projected" name="Projected (5yr)" fill="hsl(152, 55%, 42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trend Distribution Pie */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">🎯 Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trendDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {trendDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {trendDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overcrowded Fields Warning */}
          <Card className="border-warning/30 bg-warning/5">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                High Competition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These fields have many students competing for limited positions.
              </p>
              <div className="space-y-3">
                {overcrowdedFields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between">
                    <span className="font-medium text-sm">{field.name}</span>
                    <Badge variant="warning">{field.competition_level}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Fields */}
          <Card className="border-success/30 bg-success/5">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2 text-success">
                <CheckCircle2 className="w-5 h-5" />
                Hidden Gems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Growing fields with less competition - great opportunities!
              </p>
              <div className="space-y-3">
                {opportunityFields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between">
                    <span className="font-medium text-sm">{field.name}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-success" />
                      <Badge variant="success">{field.competition_level}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
