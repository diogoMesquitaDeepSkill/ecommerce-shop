"use client";

import { ContactForm } from "./contact-form";

interface ContactFormWrapperProps {
  locale: string;
}

export function ContactFormWrapper({ locale }: ContactFormWrapperProps) {
  return <ContactForm locale={locale} />;
} 