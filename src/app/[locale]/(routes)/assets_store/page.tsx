import { FC } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import AssetsStore from "@/components/assets_store/AssetsStore";

interface Avatar2dProps {}

const Avatar2d: FC<Avatar2dProps> = ({}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AssetsStore />
    </NextIntlClientProvider>
  );
};

export default Avatar2d;
