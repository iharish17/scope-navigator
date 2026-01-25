import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, Users, Briefcase, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import * as LucideIcons from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Field = Tables<"fields">;

interface FieldCardProps {
  field: Field;
}

const FieldCard = ({ field }: FieldCardProps) => {
  const navigate = useNavigate();
  const iconName = field.icon || "Folder";
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || LucideIcons.Folder;

  const handleClick = () => {
    navigate(`/field/${field.id}`);
  };

  const getTrendIcon = () => {
    switch (field.growth_trend) {
      case "rapidly_growing":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "growing":
        return <TrendingUp className="w-4 h-4 text-success/70" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-danger" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendBadge = () => {
    switch (field.growth_trend) {
      case "rapidly_growing":
        return <Badge variant="growth">🚀 Rapidly Growing</Badge>;
      case "growing":
        return <Badge variant="success">📈 Growing</Badge>;
      case "declining":
        return <Badge variant="destructive">📉 Declining</Badge>;
      default:
        return <Badge variant="secondary">➡️ Stable</Badge>;
    }
  };

  const getCompetitionColor = (level: number) => {
    if (level >= 75) return "text-danger";
    if (level >= 50) return "text-warning";
    return "text-success";
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const jobGrowth = field.projected_jobs_5y && field.current_jobs 
    ? Math.round(((field.projected_jobs_5y - field.current_jobs) / field.current_jobs) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border-2 hover:border-primary/30"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md">
              <IconComponent className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {field.name}
              </h3>
              <p className="text-sm text-muted-foreground capitalize">
                {field.category?.replace("_", " ")}
              </p>
            </div>
          </div>
          {getTrendIcon()}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {field.description}
        </p>

        {/* Trend Badge */}
        <div className="mb-4">
          {getTrendBadge()}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs">Students</span>
            </div>
            <p className="font-display font-bold text-lg">{formatNumber(field.total_students)}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span className="text-xs">Current Jobs</span>
            </div>
            <p className="font-display font-bold text-lg">{formatNumber(field.current_jobs)}</p>
          </div>
        </div>

        {/* Job Growth Indicator */}
        <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">5-Year Job Growth</span>
            <span className={`text-sm font-bold ${jobGrowth > 0 ? 'text-success' : 'text-danger'}`}>
              {jobGrowth > 0 ? '+' : ''}{jobGrowth}%
            </span>
          </div>
          <p className="text-sm font-medium">
            {formatNumber(field.current_jobs)} → {formatNumber(field.projected_jobs_5y || 0)}
          </p>
        </div>

        {/* Competition Level */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Competition Level</span>
            </div>
            <span className={`text-sm font-bold ${getCompetitionColor(field.competition_level)}`}>
              {field.competition_level}%
            </span>
          </div>
          <Progress value={field.competition_level} className="h-2" />
        </div>

        {/* Preparation Duration */}
        {field.preparation_duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{field.preparation_duration}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldCard;
