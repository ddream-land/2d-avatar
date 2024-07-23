import { baseApiHander } from "@/lib/base.api";
import { useTranslations } from "next-intl";

const DigitalLifeUrlList = {
  getDigitalLifeSqure: `/nuwa/api/characters/public/all`,
  getDigitalLifeInfo: `/nuwa/api/characters/get`,
  getDigitalLifeInfoPublic: `/nuwa/api/characters/public_info/get`,
  getDigitalLifeMyPublished: `/nuwa/api/characters/public/my_published`,
  getDigitalLifeCollectList: `/nuwa/api/characters/collect/list`,
  collectCancelDigitalLife: `/nuwa/api/characters/collect`,
  runDigitalLife: `/nuwa/api/characters/add/run`,
  exportDigitalLifeCard: `/nuwa/api/characters/export`,
};

export function getDigitalLifeSqure() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeSqure,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeInfo() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeInfo,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeInfoPublic() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeInfoPublic,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeMyPublished() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeMyPublished,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeCollectList() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeCollectList,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function collectCancelDigitalLife() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.collectCancelDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function runDigitalLife() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.runDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function exportDigitalLifeCard() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.exportDigitalLifeCard,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}
