import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AlterMessageContextProvider } from "@/components/common/AlterMessageContextProvider";

const locales = ["en", "zh-CN"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  // const messages = useMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <AlterMessageContextProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AlterMessageContextProvider>
      </NextIntlClientProvider>
    </>
  );
}
