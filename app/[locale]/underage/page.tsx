"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function UnderagePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t("underage.title")}
            </CardTitle>
            <CardDescription className="text-base text-gray-600 leading-relaxed">
              {t("underage.description")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <p className="text-gray-700 leading-relaxed text-center">
            {t("underage.message")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
