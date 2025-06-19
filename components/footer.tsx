"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const currentLanguage = pathname.split("/")[1] || "en";

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">GourmetHub</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">{t("footer.shop.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${currentLanguage}/products/wine`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.shop.wine")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLanguage}/products/food`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.shop.food")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLanguage}/products/new`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.shop.newArrivals")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLanguage}/products/sale`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.shop.sale")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">{t("footer.company.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${currentLanguage}/about`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.company.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLanguage}/stores`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.company.storeLocator")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">
              {t("footer.customerService.title")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${currentLanguage}/contact`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.company.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLanguage}/faq`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("footer.customerService.faq")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 mt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {t("footer.legal.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link
              href={`/${currentLanguage}/privacy`}
              className="hover:text-foreground"
            >
              {t("footer.legal.privacyPolicy")}
            </Link>
            <Link
              href={`/${currentLanguage}/terms`}
              className="hover:text-foreground"
            >
              {t("footer.legal.termsOfService")}
            </Link>
            <Link
              href={`/${currentLanguage}/cookies`}
              className="hover:text-foreground"
            >
              {t("footer.legal.cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
