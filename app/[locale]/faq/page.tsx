import { useTranslation } from "@/app/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFAQs } from "@/services/strapi";
import { StrapiFAQ } from "@/types/strapi";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "meta.faq.title",
  description: "meta.faq.description",
};

// Helper function to group FAQ entries by type
function groupFAQEntriesByType(faq: StrapiFAQ, t: any) {
  const categories = {
    shopping: { title: t("faq.categories.shopping"), questions: [] as any[] },
    returns: { title: t("faq.categories.returns"), questions: [] as any[] },
    account: { title: t("faq.categories.account"), questions: [] as any[] },
    general: { title: t("faq.categories.general"), questions: [] as any[] },
    shipping: { title: t("faq.categories.shipping"), questions: [] as any[] },
    payment: { title: t("faq.categories.payment"), questions: [] as any[] },
  };

  if (faq.entry && Array.isArray(faq.entry)) {
    faq.entry.forEach((entry) => {
      if (categories[entry.type]) {
        categories[entry.type].questions.push({
          id: entry.id,
          question: entry.question,
          answer: entry.answer,
        });
      }
    });
  }

  return Object.values(categories).filter(
    (category) => category.questions.length > 0
  );
}

export default async function FAQPage({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  let faqResponse;
  let faqCategories: Array<{
    title: string;
    questions: Array<{ id: number; question: string; answer: string }>;
  }> = [];
  let mainDescription = "";

  try {
    faqResponse = await getFAQs(locale);
    if (faqResponse.data) {
      // Use the description from the FAQ as the main description
      mainDescription = faqResponse.data.description;
      faqCategories = groupFAQEntriesByType(faqResponse.data, t);
    }
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
  }

  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("faq.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          {mainDescription || t("faq.description")}
        </p>
        <Button asChild>
          <Link href={`/${locale}/contact`}>{t("faq.contactButton")}</Link>
        </Button>
      </div>

      {/* FAQ Categories */}
      {faqCategories.length > 0 ? (
        <div className="grid gap-8 max-w-4xl mx-auto">
          {faqCategories.map((category) => (
            <Card key={category.title} className="p-6">
              <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item) => (
                  <AccordionItem key={item.id} value={item.id.toString()}>
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
      ) : (
        /* Empty State */
        <div className="text-center max-w-2xl mx-auto">
          <Card className="p-12">
            <h2 className="text-2xl font-semibold mb-4">
              {t("faq.empty.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("faq.empty.description")}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
