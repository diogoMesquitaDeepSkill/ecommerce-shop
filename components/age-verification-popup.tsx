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
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {t("ageVerification.title")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          {t("ageVerification.description")}
        </p>

        {/* Question */}
        <p className="text-lg font-medium text-gray-900 text-center mb-6">
          {t("ageVerification.question")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleYes}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            {t("ageVerification.yes")}
          </button>
          <button
            onClick={handleNo}
            className="flex-1 border border-red-300 text-red-700 hover:bg-red-50 font-medium py-3 px-4 rounded-md transition-colors"
          >
            {t("ageVerification.no")}
          </button>
        </div>
      </div>
    </div>
  );
}
