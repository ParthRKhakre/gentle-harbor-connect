
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, BookOpen, Users } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background -z-10"></div>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              A Safe Space for Mental Health Support
            </h1>
            <p className="text-lg md:text-xl mb-8 text-balance mx-auto max-w-2xl text-muted-foreground">
              Connect anonymously with peers, access self-help resources, and find verified mental health professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto">
                  Join a Chat Room
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Safe Spaces Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Anonymous Chat</h3>
                <p className="text-muted-foreground text-center">
                  Connect with peers in moderated chat rooms where you can share experiences and get support without revealing your identity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Self-Help Resources</h3>
                <p className="text-muted-foreground text-center">
                  Access our library of evidence-based resources for mindfulness, journaling, coping strategies, and more.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm transition-all hover:shadow-md">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Therapist Directory</h3>
                <p className="text-muted-foreground text-center">
                  Find verified mental health professionals filtered by location, specialization, and language.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Privacy Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card shadow-sm rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Privacy & Security First</h2>
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                At Safe Spaces, we prioritize your privacy and security above all else.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <h3 className="font-medium mb-2">Anonymous Participation</h3>
                  <p className="text-sm text-muted-foreground">
                    No personal information required to join and participate.
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">End-to-End Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    All conversations are securely encrypted.
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Strong Moderation</h3>
                  <p className="text-sm text-muted-foreground">
                    Community guidelines ensure a supportive environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
            Create an anonymous account and start connecting with others in a safe, supportive environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Join Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
