import { ArrowLeft, BookOpen, Target, Lightbulb, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CareerGuide = () => {
  const steps = [
    {
      icon: Target,
      title: "Self-Assessment",
      description: "Understand your interests, strengths, and values. Take time to reflect on what truly motivates you.",
      tips: [
        "List your top 5 interests and hobbies",
        "Identify skills you enjoy using",
        "Consider your work-life balance preferences",
      ],
    },
    {
      icon: BookOpen,
      title: "Research Fields",
      description: "Explore different career fields using data-driven insights. Don't just follow trends blindly.",
      tips: [
        "Use Scope Hope to compare job markets",
        "Look at salary ranges and growth projections",
        "Understand competition levels in each field",
      ],
    },
    {
      icon: Lightbulb,
      title: "Skill Development",
      description: "Identify the skills needed for your chosen field and create a learning roadmap.",
      tips: [
        "Focus on both technical and soft skills",
        "Take online courses and certifications",
        "Build projects to demonstrate your abilities",
      ],
    },
    {
      icon: TrendingUp,
      title: "Gain Experience",
      description: "Get hands-on experience through internships, projects, or volunteer work.",
      tips: [
        "Apply for internships early",
        "Contribute to open-source or community projects",
        "Network with professionals in your field",
      ],
    },
    {
      icon: Users,
      title: "Build Your Network",
      description: "Connect with mentors, peers, and professionals who can guide and support your journey.",
      tips: [
        "Attend industry events and webinars",
        "Join professional associations",
        "Maintain an active LinkedIn presence",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Career Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A step-by-step guide to help you navigate your career journey with confidence. 
              Make informed decisions based on data, not pressure.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Step {index + 1}</p>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <h2 className="font-display text-2xl font-bold mb-2">Ready to Explore?</h2>
                <p className="opacity-90 mb-4">
                  Start exploring career fields with real data and make confident decisions.
                </p>
                <Link to="/#explore">
                  <Button variant="secondary" size="lg">
                    Explore Fields
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareerGuide;
