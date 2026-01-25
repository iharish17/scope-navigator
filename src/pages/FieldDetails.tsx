import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Users, Briefcase, Clock, IndianRupee, Building2, Zap } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const COLORS = ['hsl(174, 62%, 32%)', 'hsl(38, 92%, 55%)', 'hsl(152, 55%, 42%)', 'hsl(200, 60%, 50%)', 'hsl(280, 50%, 50%)'];

const FieldDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: field, isLoading: fieldLoading } = useQuery({
    queryKey: ["field", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fields")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: skills } = useQuery({
    queryKey: ["field-skills", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("field_skills")
        .select("*")
        .eq("field_id", id)
        .order("importance_level", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: companies } = useQuery({
    queryKey: ["field-companies", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("field_companies")
        .select("*")
        .eq("field_id", id)
        .order("jobs_available", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: sectors } = useQuery({
    queryKey: ["field-sectors", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("field_sectors")
        .select("*")
        .eq("field_id", id)
        .order("job_count", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (fieldLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-64 bg-muted rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 bg-muted rounded-xl" />
              <div className="h-80 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!field) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Field Not Found</h1>
          <p className="text-muted-foreground mb-6">The career field you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const iconName = field.icon || "Folder";
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || LucideIcons.Folder;

  const getTrendBadge = () => {
    switch (field.growth_trend) {
      case "rapidly_growing":
        return <Badge variant="growth" className="text-sm">🚀 Rapidly Growing</Badge>;
      case "growing":
        return <Badge variant="success" className="text-sm">📈 Growing</Badge>;
      case "declining":
        return <Badge variant="destructive" className="text-sm">📉 Declining</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm">➡️ Stable</Badge>;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatSalary = (num: number | null) => {
    if (!num) return "N/A";
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    return `₹${(num / 1000).toFixed(0)}K`;
  };

  const jobGrowth = field.projected_jobs_5y && field.current_jobs 
    ? Math.round(((field.projected_jobs_5y - field.current_jobs) / field.current_jobs) * 100)
    : 0;

  // Prepare chart data
  const skillsRadarData = skills?.map(s => ({
    skill: s.skill_name.length > 15 ? s.skill_name.slice(0, 15) + '...' : s.skill_name,
    value: s.importance_level,
    fullName: s.skill_name,
  })) || [];

  const companiesBarData = companies?.slice(0, 5).map(c => ({
    name: c.company_name,
    jobs: c.jobs_available,
  })) || [];

  const sectorsData = sectors?.map((s, i) => ({
    name: s.sector_name,
    jobs: s.job_count,
    growth: Number(s.growth_rate) || 0,
    color: COLORS[i % COLORS.length],
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all fields
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <IconComponent className="w-10 h-10 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                  {field.name}
                </h1>
                {getTrendBadge()}
              </div>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mb-6">
                {field.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Users className="w-5 h-5" />} label="Students" value={formatNumber(field.total_students)} />
                <StatCard icon={<Briefcase className="w-5 h-5" />} label="Current Jobs" value={formatNumber(field.current_jobs)} />
                <StatCard icon={<Clock className="w-5 h-5" />} label="Duration" value={field.preparation_duration || "N/A"} />
                <StatCard 
                  icon={<TrendingUp className="w-5 h-5" />} 
                  label="5yr Growth" 
                  value={`${jobGrowth > 0 ? '+' : ''}${jobGrowth}%`}
                  highlight={jobGrowth > 0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Competition & Salary Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-display text-lg">📊 Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Competition Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Competition Level</span>
                  <span className={`font-bold ${
                    field.competition_level >= 75 ? 'text-danger' :
                    field.competition_level >= 50 ? 'text-warning' : 'text-success'
                  }`}>
                    {field.competition_level}%
                  </span>
                </div>
                <Progress value={field.competition_level} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {field.competition_level >= 75 ? 'High competition - many applicants per position' :
                   field.competition_level >= 50 ? 'Moderate competition' : 'Low competition - good opportunities'}
                </p>
              </div>

              {/* Salary Range */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <IndianRupee className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Salary Range</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground">Entry Level</p>
                    <p className="font-display font-bold text-lg">{formatSalary(Number(field.avg_salary_entry))}</p>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-success/50 mx-4 self-center" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Senior Level</p>
                    <p className="font-display font-bold text-lg text-success">{formatSalary(Number(field.avg_salary_senior))}</p>
                  </div>
                </div>
              </div>

              {/* Job Projection */}
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">5-Year Projection</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold">{formatNumber(field.projected_jobs_5y || 0)}</span>
                  <span className="text-sm text-muted-foreground">jobs expected</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Up from {formatNumber(field.current_jobs)} currently
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skills Breakdown */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Required Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              {skills && skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills List */}
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={skill.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{skill.skill_name}</span>
                          <span className="text-sm text-muted-foreground">{skill.importance_level}%</span>
                        </div>
                        <Progress value={skill.importance_level} className="h-2" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Radar Chart */}
                  {skillsRadarData.length >= 3 && (
                    <ChartContainer config={{}} className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={skillsRadarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Importance"
                            dataKey="value"
                            stroke="hsl(174, 62%, 32%)"
                            fill="hsl(174, 62%, 32%)"
                            fillOpacity={0.5}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No skills data available for this field yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Hiring Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Top Hiring Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {companies && companies.length > 0 ? (
                <>
                  <ChartContainer config={{}} className="h-[250px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={companiesBarData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" tickFormatter={(v) => formatNumber(v)} />
                        <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="jobs" name="Open Positions" fill="hsl(174, 62%, 32%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-2">
                    {companies.map((company, index) => (
                      <div 
                        key={company.id} 
                        className="flex items-center justify-between p-2 bg-muted/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="font-medium text-sm">{company.company_name}</span>
                        <Badge variant="secondary">{formatNumber(company.jobs_available)} jobs</Badge>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">No company data available for this field yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Sector Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Sector Growth Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sectors && sectors.length > 0 ? (
                <>
                  <ChartContainer config={{}} className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="jobs"
                        >
                          {sectorsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="space-y-2">
                    {sectors.map((sector, index) => (
                      <div 
                        key={sector.id} 
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium text-sm">{sector.sector_name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{formatNumber(sector.job_count)} jobs</span>
                          <Badge variant={Number(sector.growth_rate) > 15 ? "success" : "secondary"}>
                            {Number(sector.growth_rate) > 0 ? '+' : ''}{sector.growth_rate}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">No sector data available for this field yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  highlight?: boolean;
}) => (
  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
    <div className="flex items-center gap-2 text-primary-foreground/70 mb-1">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className={`font-display font-bold text-xl ${highlight ? 'text-accent' : 'text-primary-foreground'}`}>
      {value}
    </p>
  </div>
);

export default FieldDetails;