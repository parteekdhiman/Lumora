import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define the structure for salary data
interface SalaryData {
  role: string;
  min: number;
  avg: number;
  max: number;
}

// Props for the SalaryComparison component
interface SalaryComparisonProps {
  jobTitle: string;
}

// Component that shows salary comparisons for different experience levels
const SalaryComparison = ({ jobTitle }: SalaryComparisonProps) => {
  // Mock salary data for different experience levels
  // In a real application, this would come from an API with real market data
  const salaryData: SalaryData[] = [
    { role: "Entry Level", min: 60000, avg: 75000, max: 90000 },
    { role: "Mid Level", min: 85000, avg: 110000, max: 135000 },
    { role: "Senior Level", min: 120000, avg: 150000, max: 180000 },
    { role: "Lead/Principal", min: 150000, avg: 190000, max: 240000 },
  ];

  // Find salary data that matches the current job title
  // If no match is found, default to mid-level data
  const currentJobData = salaryData.find(data => 
    jobTitle.toLowerCase().includes(data.role.toLowerCase())
  ) || salaryData[1]; // Default to mid level if not found

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Salary Comparison for {jobTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Interactive bar chart showing salary ranges */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salaryData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 50,
              }}
            >
              {/* Grid lines for better readability */}
              <CartesianGrid strokeDasharray="3 3" />
              
              {/* X-axis showing experience levels */}
              <XAxis dataKey="role" />
              
              {/* Y-axis showing salary values in a readable format */}
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              
              {/* Tooltip that shows detailed salary information on hover */}
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                labelFormatter={(label) => `Experience: ${label}`}
              />
              
              {/* Bars representing minimum, average, and maximum salaries */}
              <Bar dataKey="min" fill="#8884d8" name="Minimum" />
              <Bar dataKey="avg" fill="#82ca9d" name="Average" />
              <Bar dataKey="max" fill="#ffc658" name="Maximum" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary cards with key salary information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Your salary range based on experience level */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Your Range</p>
            <p className="text-xl font-bold text-primary">
              ${currentJobData.min.toLocaleString()} - ${currentJobData.max.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Based on experience level</p>
          </div>
          
          {/* Market average salary */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Average Salary</p>
            <p className="text-xl font-bold text-green-500">
              ${currentJobData.avg.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Market average</p>
          </div>
          
          {/* Comparison to market average */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Comparison</p>
            <p className="text-xl font-bold text-blue-500">
              {currentJobData.avg > 100000 ? "Above" : "Below"} Average
            </p>
            <p className="text-sm text-muted-foreground">
              {Math.abs(currentJobData.avg - 100000).toLocaleString()} {currentJobData.avg > 100000 ? "above" : "below"} market
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryComparison;