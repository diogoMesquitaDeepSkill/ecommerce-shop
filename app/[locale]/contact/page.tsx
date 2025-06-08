import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | E-commerce Shop",
  description: "Get in touch with our team for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help. Get in touch
          with our team.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Information Cards */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Email Us</h3>
          </div>
          <p className="text-muted-foreground">support@ecommerce-shop.com</p>
          <p className="text-muted-foreground">sales@ecommerce-shop.com</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Phone className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Call Us</h3>
          </div>
          <p className="text-muted-foreground">+1 (555) 123-4567</p>
          <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Visit Us</h3>
          </div>
          <p className="text-muted-foreground">123 E-commerce Street</p>
          <p className="text-muted-foreground">New York, NY 10001</p>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                First Name
              </label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Last Name
              </label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Subject
            </label>
            <Input id="subject" placeholder="Enter message subject" />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
}
