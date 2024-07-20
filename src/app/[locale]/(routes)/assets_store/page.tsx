import { FC } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import AssetsStore from "@/components/assets_store/AssetsStore";
import { PlayBtnContextProvider } from "@/components/assets_store/voiceassets/voice-preview/PlayButtonContextProvider";

interface Avatar2dProps {}

const Avatar2d: FC<Avatar2dProps> = ({}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PlayBtnContextProvider>
        <AssetsStore />
      </PlayBtnContextProvider>
    </NextIntlClientProvider>
  );
};

export default Avatar2d;
