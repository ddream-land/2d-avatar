import { FC } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";

interface Avatar2dProps {}

const Avatar2d: FC<Avatar2dProps> = ({}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div>collecion</div>{" "}
    </NextIntlClientProvider>
  );
};

export default Avatar2d;
