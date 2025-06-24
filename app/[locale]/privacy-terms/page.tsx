import { useTranslation } from "@/app/i18n";
import { Card } from "@/components/ui/card";
import { renderStrapiBlocks } from "@/lib/utils";
import { getTerms } from "@/services/strapi";
import { StrapiTerm } from "@/types/strapi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Terms | GourmetHub",
  description: "Privacy policy and terms of service for GourmetHub",
};

export default async function PrivacyTermsPage({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  let terms: StrapiTerm | null = null;
  let error: string | null = null;

  try {
    const termsResponse = await getTerms(locale);
    terms = termsResponse.data;
  } catch (err) {
    console.error("Failed to fetch terms:", err);
    error = "Failed to load terms and conditions";
  }

  // Convert Blocks JSON to HTML
  const htmlContent = terms ? renderStrapiBlocks(terms.content) : "";

  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("privacyTerms.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("privacyTerms.description")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {terms ? (
          <Card className="p-8">
            <div
              className="rich-text-content [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:first:mt-0 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-5 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:mb-2 [&>h4]:mt-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-muted-foreground [&>strong]:font-bold [&>strong]:text-foreground [&>b]:font-bold [&>b]:text-foreground [&>em]:italic [&>i]:italic [&>u]:underline [&>ul]:mb-4 [&>ul]:pl-6 [&>ul]:list-disc [&>ol]:mb-4 [&>ol]:pl-6 [&>ol]:list-decimal [&>li]:mb-1 [&>li]:text-muted-foreground [&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-4 [&>hr]:my-6 [&>hr]:border-gray-200 [&>table]:w-full [&>table]:border-collapse [&>table]:mb-4 [&>th]:border [&>th]:border-gray-300 [&>th]:px-4 [&>th]:py-2 [&>th]:bg-gray-50 [&>th]:font-semibold [&>td]:border [&>td]:border-gray-300 [&>td]:px-4 [&>td]:py-2 [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>pre]:bg-muted [&>pre]:p-3 [&>pre]:rounded [&>pre]:overflow-x-auto [&>pre]:mb-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </Card>
        ) : error ? (
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                {t("privacyTerms.error.title")}
              </h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </Card>
        ) : (
          <Card className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {t("privacyTerms.empty.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("privacyTerms.empty.description")}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
