import { useTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContact } from "@/services/strapi";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "meta.contact.title",
  description: "meta.contact.description",
};

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
          <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {t("contact.sendMessage")}
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("contact.form.firstName")}
                  </label>
                  <Input
                    id="firstName"
                    placeholder={t("contact.form.firstNamePlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("contact.form.lastName")}
                  </label>
                  <Input
                    id="lastName"
                    placeholder={t("contact.form.lastNamePlaceholder")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("contact.form.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("contact.form.subject")}
                </label>
                <Input
                  id="subject"
                  placeholder={t("contact.form.subjectPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full">
                {t("contact.form.sendMessage")}
              </Button>
            </form>
          </Card>
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
