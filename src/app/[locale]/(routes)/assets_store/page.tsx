import { FC } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";

interface Avatar2dProps {}

const Avatar2d: FC<Avatar2dProps> = ({}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="w-20 h-screen bg-green-200">This is 2dAvatar</div>
    </NextIntlClientProvider>
  );
};

export default Avatar2d;
