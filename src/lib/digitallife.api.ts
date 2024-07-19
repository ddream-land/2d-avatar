import { baseApiHander } from "@/lib/base.api";
import { useTranslations } from "next-intl";

const DigitalLifeUrlList = {
  createDigitalLife: `/ddream/api/v1/ai/create`,
  deleteDigitalLife: `/ddream/api/v1/ai/delete`,
  getAllDigitalLife: `/ddream/api/v1/ai/get_all`,
  getDigitalLifeDetailById: `/ddream/api/v1/ai/get_info`,
};

export function getDigitalLifeDetailById() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeDetailById,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}
export function deleteDigitalLife() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.deleteDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}
export function getAllDigitalLife() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.getAllDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}
export function createDigitalLife() {
  const t = useTranslations();
  return baseApiHander({
    url: DigitalLifeUrlList.createDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}
