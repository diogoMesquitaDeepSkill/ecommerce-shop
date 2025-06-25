import { useTranslation } from "@/app/i18n";
import { ImageCarousel } from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getStrapiMediaUrl } from "@/lib/utils";
import { getStore } from "@/services/strapi";
import { StrapiStore } from "@/types/strapi";
import { Building2, Heart, ShoppingBag, Users } from "lucide-react";
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
    title: t("meta.about.title"),
    description: t("meta.about.description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  let store: StrapiStore | null = null;
  let storeImages: Array<{ src: string; alt: string }> = [];

  try {
    const storeResponse = await getStore(locale);
    store = storeResponse.data;

    // Convert Strapi media to carousel format
    if (store) {
      storeImages =
        store.media?.map((media) => ({
          src: getStrapiMediaUrl(media.url),
          alt: media.alternativeText || store?.name || "Store image",
        })) || [];
    }
  } catch (error) {
    console.error("Failed to fetch store information:", error);
  }

  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("about.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("about.description")}
        </p>
      </div>

      {/* Porto Store Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {t("about.portoStore.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            {t("about.portoStore.description")}
          </p>
          <Button asChild>
            <Link href={`/${locale}/stores`}>
              {t("about.portoStore.visitStore")}
            </Link>
          </Button>
        </div>

        {/* Image Carousel */}
        {storeImages.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <ImageCarousel
              images={storeImages}
              autoPlayInterval={4000}
              showControls={true}
              showDots={true}
            />
          </div>
        )}
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Card className="p-6 flex flex-col items-center text-center">
          <Building2 className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">
            {t("about.values.story.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("about.values.story.description")}
          </p>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <Users className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">
            {t("about.values.team.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("about.values.team.description")}
          </p>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <Heart className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">
            {t("about.values.values.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("about.values.values.description")}
          </p>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <ShoppingBag className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">
            {t("about.values.promise.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("about.values.promise.description")}
          </p>
        </Card>
      </div>

      {/* Mission Statement */}
      <div className="bg-muted rounded-lg p-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{t("about.mission.title")}</h2>
        <p className="text-lg max-w-3xl mx-auto">
          {t("about.mission.description")}
        </p>
      </div>

      {/* Additional Content */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {t("about.whatSetsUsApart.title")}
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.whatSetsUsApart.items.0")}</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.whatSetsUsApart.items.1")}</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.whatSetsUsApart.items.2")}</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.whatSetsUsApart.items.3")}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {t("about.commitment.title")}
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.commitment.items.0")}</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.commitment.items.1")}</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.commitment.items.2")}</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>{t("about.commitment.items.3")}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
