import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, MapPin, DollarSign, Star, TrendingUp } from "lucide-react";

// Props for the CompanyInsights component
interface CompanyInsightsProps {
  company: string;
}

// Component that displays detailed information about a company
const CompanyInsights = ({ company }: CompanyInsightsProps) => {
  // Mock company data for demonstration
  // In a real application, this would come from an API with actual company information
  const companyData = {
    name: company,
    logo: "https://placehold.co/100x100",
    description: "Leading technology company specializing in innovative software solutions and digital transformation.",
    industry: "Technology",
    size: "1000-5000 employees",
    location: "San Francisco, CA",
    founded: "2010",
    website: "https://techcorpsolutions.com",
    rating: 4.2,
    reviewCount: 245,
    salaryRange: "$90k - $200k",
    growth: "25% YoY",
    benefits: [
      "Health Insurance",
      "401(k) Matching",
      "Remote Work",
      "Professional Development",
      "Flexible Hours"
    ],
    culture: [
      "Innovation",
      "Collaboration",
      "Diversity",
      "Work-Life Balance"
    ]
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Company Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Company header with logo and rating */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted flex-shrink-0">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{companyData.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{companyData.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({companyData.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Company description */}
        <p className="text-muted-foreground mb-6">{companyData.description}</p>

        {/* Key company information in a grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Company size */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{companyData.size}</span>
          </div>
          
          {/* Company location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{companyData.location}</span>
          </div>
          
          {/* Salary range */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{companyData.salaryRange}</span>
          </div>
          
          {/* Growth rate */}
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{companyData.growth}</span>
          </div>
        </div>

        {/* Company benefits section */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {companyData.benefits.map((benefit, index) => (
              <Badge key={index} variant="secondary">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>

        {/* Company culture section */}
        <div>
          <h4 className="font-semibold mb-2">Culture</h4>
          <div className="flex flex-wrap gap-2">
            {companyData.culture.map((value, index) => (
              <Badge key={index} variant="outline">
                {value}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInsights;