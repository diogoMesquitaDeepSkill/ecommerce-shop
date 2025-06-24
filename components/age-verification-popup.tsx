"use client";

import { useAgeVerification } from "@/hooks/useAgeVerification";
import { Shield } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export function AgeVerificationPopup() {
  const { t } = useTranslation();
  const { status, isLoading, verifyAge, resetAgeVerification } =
    useAgeVerification();
  const router = useRouter();
  const pathname = usePathname();

  const handleYes = () => {
    verifyAge(true, true); // Always save when they say yes
  };

  const handleNo = () => {
    verifyAge(false, false); // Don't save when they say no
    resetAgeVerification(); // Reset status to pending immediately
    router.push("/underage");
  };

  // Don't show popup if still loading, status is not pending, or if user is on underage page
  if (isLoading || status !== "pending" || pathname.includes("/underage")) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          {t("ageVerification.title")}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
          {t("ageVerification.description")}
        </p>

        {/* Question */}
        <p className="text-base font-medium text-gray-900 text-center mb-4">
          {t("ageVerification.question")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleYes}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
          >
            {t("ageVerification.yes")}
          </button>
          <button
            onClick={handleNo}
            className="flex-1 border border-red-300 text-red-700 hover:bg-red-50 font-medium py-2 px-3 rounded-md transition-colors text-sm"
          >
            {t("ageVerification.no")}
          </button>
        </div>
      </div>
    </div>
  );
}
