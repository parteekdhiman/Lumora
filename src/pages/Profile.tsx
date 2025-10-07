import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <Card className="p-8 mb-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">John Doe</h2>
                <p className="text-muted-foreground">john.doe@email.com</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" defaultValue="John" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="lastName" defaultValue="Doe" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" defaultValue="john.doe@email.com" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="location" defaultValue="San Francisco, CA" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="title" defaultValue="Frontend Developer" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4}
                  defaultValue="Passionate frontend developer with 5+ years of experience building modern web applications."
                  className="resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button size="lg">Save Changes</Button>
                <Button variant="outline" size="lg">Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
