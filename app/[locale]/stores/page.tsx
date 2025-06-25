import { useTranslation } from "@/app/i18n";
import { ImageCarousel } from "@/components/image-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getStrapiMediaUrl } from "@/lib/utils";
import { getStore } from "@/services/strapi";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  return {
    title: t("meta.stores.title"),
    description: t("meta.stores.description"),
  };
}

export default async function StoresPage({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  let store;

  try {
    const storeResponse = await getStore(locale);
    store = storeResponse.data;
  } catch (error) {
    console.error("Failed to fetch store information:", error);
    store = null;
  }

  // Convert Strapi media to carousel format
  const storeImages =
    store?.media?.map((media) => ({
      src: getStrapiMediaUrl(media.url),
      alt: media.alternativeText || store.name,
    })) || [];

  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("stores.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("stores.description")}
        </p>
      </div>

      {store ? (
        <div className="max-w-6xl mx-auto">
          {/* Store Images Carousel */}
          {storeImages.length > 0 && (
            <div className="mb-8">
              <ImageCarousel
                images={storeImages}
                autoPlayInterval={4000}
                showControls={true}
                showDots={true}
              />
            </div>
          )}

          {/* Store Information */}
          <Card className="p-8">
            <div className="space-y-8">
              {/* Store Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{store.name}</h2>
                <Badge variant="secondary" className="mb-4">
                  {t("stores.location")}
                </Badge>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {store.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium text-lg">{store.address}</p>
                      <p className="text-muted-foreground">
                        {t("stores.location")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-primary" />
                    <a
                      href={`tel:${store.phone}`}
                      className="text-lg hover:text-primary transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-primary" />
                    <a
                      href={`mailto:${store.email}`}
                      className="text-lg hover:text-primary transition-colors"
                    >
                      {store.email}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">
                      {t("stores.openingHours")}
                    </h3>
                  </div>
                  <div
                    className="text-lg whitespace-pre-line [&>p]:mb-3 [&>p]:last:mb-0 [&>p]:leading-relaxed [&>ul]:mb-3 [&>ul]:last:mb-0 [&>ol]:mb-3 [&>ol]:last:mb-0 [&>li]:mb-1 [&>li]:last:mb-0 [&>ul>li]:ml-4 [&>ol>li]:ml-4 [&>ul>li]:list-disc [&>ol>li]:list-decimal [&>strong]:font-bold [&>em]:italic [&>u]:underline [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mb-2 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>pre]:bg-muted [&>pre]:p-3 [&>pre]:rounded [&>pre]:overflow-x-auto [&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80"
                    dangerouslySetInnerHTML={{
                      __html: store.openingHours,
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {store.mapsLink && (
                  <Button asChild className="flex-1">
                    <a
                      href={store.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      {t("stores.getDirections")}
                    </a>
                  </Button>
                )}
                <Button variant="outline" asChild className="flex-1">
                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {t("stores.contactStore")}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center max-w-2xl mx-auto">
          <Card className="p-12">
            <h2 className="text-2xl font-semibold mb-4">
              {t("stores.empty.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("stores.empty.description")}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
