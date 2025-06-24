"use client";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsentBanner() {
  const { t } = useTranslation();
  const { consent, isLoading, updateConsent } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Don't show if still loading or if consent has already been given
  if (isLoading || consent) {
    return null;
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    updateConsent(allAccepted);
  };

  const handleAcceptSelected = () => {
    updateConsent(preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    updateConsent(onlyNecessary);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        {!showDetails ? (
          // Simple banner
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                {t("cookieConsent.title")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("cookieConsent.description")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {t("cookieConsent.customize")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleRejectAll}>
                {t("cookieConsent.rejectAll")}
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                {t("cookieConsent.acceptAll")}
              </Button>
            </div>
          </div>
        ) : (
          // Detailed preferences
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("cookieConsent.preferencesTitle")}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={preferences.necessary}
                  disabled
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">
                      {t("cookieConsent.categories.necessary.title")}
                    </h4>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {t("cookieConsent.categories.necessary.required")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t("cookieConsent.categories.necessary.description")}
                  </p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={preferences.functional}
                  onCheckedChange={(checked: boolean) =>
                    updatePreference("functional", checked)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t("cookieConsent.categories.functional.title")}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t("cookieConsent.categories.functional.description")}
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={preferences.analytics}
                  onCheckedChange={(checked: boolean) =>
                    updatePreference("analytics", checked)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t("cookieConsent.categories.analytics.title")}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t("cookieConsent.categories.analytics.description")}
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={preferences.marketing}
                  onCheckedChange={(checked: boolean) =>
                    updatePreference("marketing", checked)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t("cookieConsent.categories.marketing.title")}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t("cookieConsent.categories.marketing.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className="flex-1 sm:flex-none"
              >
                {t("cookieConsent.rejectAll")}
              </Button>
              <Button
                onClick={handleAcceptSelected}
                className="flex-1 sm:flex-none"
              >
                {t("cookieConsent.savePreferences")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
