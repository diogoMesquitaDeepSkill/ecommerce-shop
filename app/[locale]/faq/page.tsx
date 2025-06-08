import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | E-commerce Shop",
  description: "Frequently asked questions about our e-commerce shop.",
};

// Mock data structure similar to what we'd get from Strapi
const faqCategories = [
  {
    id: "shopping",
    title: "Shopping & Orders",
    questions: [
      {
        id: "delivery-time",
        question: "How long does delivery take?",
        answer:
          "Delivery times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days.",
      },
      {
        id: "track-order",
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's website to track your package.",
      },
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. Some regions may also have access to local payment methods.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    questions: [
      {
        id: "return-policy",
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to certain products for hygiene reasons.",
      },
      {
        id: "refund-time",
        question: "How long do refunds take?",
        answer:
          "Once we receive your return, refunds typically take 3-5 business days to process. The time it takes for the money to appear in your account depends on your payment method and financial institution.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Security",
    questions: [
      {
        id: "create-account",
        question: "How do I create an account?",
        answer:
          "Click the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address and create a password. You can also sign up using your Google or Facebook account.",
      },
      {
        id: "reset-password",
        question: "I forgot my password. What should I do?",
        answer:
          "Click the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password.",
      },
      {
        id: "data-security",
        question: "How do you protect my personal information?",
        answer:
          "We use industry-standard encryption and security measures to protect your data. Your payment information is never stored on our servers, and we regularly update our security protocols.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our products, services, and
          policies. Can't find what you're looking for? Contact our support
          team.
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="grid gap-8 max-w-4xl mx-auto">
        {faqCategories.map((category) => (
          <Card key={category.id} className="p-6">
            <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
}
