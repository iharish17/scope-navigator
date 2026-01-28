import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    {
      question: "What is Scope Hope?",
      answer:
        "Scope Hope is a platform that helps students make informed career decisions by providing real, data-based insights about various career fields. We show you job market trends, salary ranges, competition levels, and growth projections so you can choose your path with confidence.",
    },
    {
      question: "How accurate is the data on Scope Hope?",
      answer:
        "Our data is compiled from multiple reliable sources including government employment statistics, industry reports, and job market analyses. We regularly update our information to ensure accuracy, though we recommend using our data as a starting point for your research.",
    },
    {
      question: "Is Scope Hope free to use?",
      answer:
        "Yes! Scope Hope is completely free for students. We believe everyone should have access to career guidance tools regardless of their financial situation.",
    },
    {
      question: "How do I choose the right career field?",
      answer:
        "Start by assessing your interests, skills, and values. Then use Scope Hope to explore fields that align with these factors. Look at job availability, salary expectations, and competition levels. Remember, there's no single 'right' choice—it's about finding a good fit for you.",
    },
    {
      question: "What does 'competition level' mean?",
      answer:
        "Competition level indicates how many students are pursuing a particular field compared to available job opportunities. A high competition level means more students are competing for fewer positions, while a low competition level suggests better job prospects.",
    },
    {
      question: "Can I compare different career fields?",
      answer:
        "Yes! You can explore multiple fields on our platform and compare key metrics like job growth, salary ranges, and required skills. This helps you make side-by-side comparisons before making a decision.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "We update our data quarterly to ensure you have access to the most current job market information. Major industry changes or trends are reflected as soon as reliable data becomes available.",
    },
    {
      question: "What if I'm still confused about my career choice?",
      answer:
        "That's completely normal! Career decisions are complex. We recommend using our Career Guide for step-by-step guidance, talking to professionals in fields you're interested in, and considering internships or job shadowing to get firsthand experience.",
    },
    {
      question: "Do you provide career counseling services?",
      answer:
        "Currently, Scope Hope is a self-service platform providing data and resources. While we don't offer one-on-one counseling, our guides and data are designed to help you make informed decisions independently.",
    },
    {
      question: "How can I contact the Scope Hope team?",
      answer:
        "You can reach us through our Contact page. We typically respond within 24-48 hours on business days. We're always happy to hear feedback and suggestions!",
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
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Scope Hope and how to make the most of our platform.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Still Have Questions */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Link to="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQs;
