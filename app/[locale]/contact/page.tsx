import { useTranslation } from "@/app/i18n";
import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { getContact } from "@/services/strapi";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { ContactFormWrapper } from "@/components/contact-form-wrapper";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  return {
    title: t("meta.contact.title"),
    description: t("meta.contact.description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  let contact;

  try {
    const contactResponse = await getContact(locale);
    contact = contactResponse.data;
  } catch (error) {
    console.error("Failed to fetch contact information:", error);
    contact = null;
  }

  return (
    <div className="container px-4 py-16 mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t("contact.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {contact ? contact.description : t("contact.description")}
        </p>
      </div>

      {contact ? (
        <>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information Cards */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">
                  {t("contact.emailUs")}
                </h3>
              </div>
              <p className="text-muted-foreground">{contact.email}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">{t("contact.callUs")}</h3>
              </div>
              <p className="text-muted-foreground">{contact.phone}</p>
              <p className="text-muted-foreground">{contact.businessHours}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">
                  {t("contact.visitUs")}
                </h3>
              </div>
              <p className="text-muted-foreground">{contact.address}</p>
            </Card>
          </div>

          {/* Contact Form */}
          <ContactFormWrapper locale={locale} />
        </>
      ) : (
        /* Empty State */
        <div className="text-center max-w-2xl mx-auto">
          <Card className="p-12">
            <h2 className="text-2xl font-semibold mb-4">
              {t("contact.empty.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("contact.empty.description")}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
