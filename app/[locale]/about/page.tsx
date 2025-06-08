import { Card } from "@/components/ui/card";
import { Building2, Heart, ShoppingBag, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | E-commerce Shop",
  description: "Learn more about our e-commerce shop and our mission.",
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We are passionate about delivering high-quality products and
          exceptional shopping experiences to our customers.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Card className="p-6 flex flex-col items-center text-center">
          <Building2 className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Our Story</h3>
          <p className="text-muted-foreground">
            Founded with a vision to revolutionize online shopping through
            quality and innovation.
          </p>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <Users className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Our Team</h3>
          <p className="text-muted-foreground">
            A dedicated group of professionals working to bring you the best
            shopping experience.
          </p>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <Heart className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-muted-foreground">
            Built on trust, quality, and customer satisfaction as our core
            principles.
          </p>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <ShoppingBag className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
          <p className="text-muted-foreground">
            Committed to providing the best products and service to our valued
            customers.
          </p>
        </Card>
      </div>

      {/* Mission Statement */}
      <div className="bg-muted rounded-lg p-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto">
          To provide our customers with an exceptional online shopping
          experience by offering high-quality products, outstanding customer
          service, and innovative solutions that make shopping easier and more
          enjoyable.
        </p>
      </div>

      {/* Additional Content */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Curated selection of premium products</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Exceptional customer service and support</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Fast and reliable shipping worldwide</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Secure and easy shopping experience</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Sustainable and eco-friendly practices</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Continuous improvement and innovation</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Building lasting relationships with customers</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>Supporting our community</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
