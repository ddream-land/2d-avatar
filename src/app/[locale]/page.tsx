import { redirect } from "@/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Home() {
  const messages = useMessages();

  redirect(`/assets_store`);

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <div></div>
      </NextIntlClientProvider>
    </>
  );
}
