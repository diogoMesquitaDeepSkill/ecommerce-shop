"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import i18next from "@/app/i18n-client";
import { submitContactForm, getContact } from "@/services/strapi";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  orderId?: string;
  message: string;
}

interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  orderId?: string;
  message?: string;
}

interface ContactFormProps {
  locale: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    orderId: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [supportEmail, setSupportEmail] = useState<string>("");

  // Initialize i18n with the correct locale
  useEffect(() => {
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale);
    }
  }, [locale]);

  // Fetch contact data to get support email
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const contactResponse = await getContact(locale);
        if (contactResponse.data?.email) {
          setSupportEmail(contactResponse.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };

    fetchContactData();
  }, [locale]);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("contact.validation.firstNameRequired");
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("contact.validation.lastNameRequired");
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t("contact.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.validation.emailInvalid");
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.validation.subjectRequired");
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.validation.messageMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitContactForm({
        ...formData,
        locale,
      });

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        orderId: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {t("contact.sendMessage")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("contact.form.firstName")} *
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder={t("contact.form.firstNamePlaceholder")}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("contact.form.lastName")} *
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder={t("contact.form.lastNamePlaceholder")}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("contact.form.email")} *
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder={t("contact.form.emailPlaceholder")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("contact.form.phone")}
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder={t("contact.form.phonePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("contact.form.subject")} *
          </label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            placeholder={t("contact.form.subjectPlaceholder")}
            className={errors.subject ? "border-red-500" : ""}
          />
          {errors.subject && (
            <p className="text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="orderId"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("contact.form.orderId")}
          </label>
          <Input
            id="orderId"
            value={formData.orderId}
            onChange={(e) => handleInputChange("orderId", e.target.value)}
            placeholder={t("contact.form.orderIdPlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("contact.form.message")} *
          </label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder={t("contact.form.messagePlaceholder")}
            className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? t("contact.form.sending") : t("contact.form.sendMessage")}
        </Button>
      </form>

      
      {submitStatus === "success" && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">{t("contact.form.success")}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">
            {t("contact.form.error", { email: supportEmail })}
          </p>
        </div>
      )}
    </Card>
  );
} 