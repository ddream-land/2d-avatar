"use client";
import React, { useEffect, useRef, useState } from "react";
import VoiceModelItem from "./voiceassets/voice-model-list/VoiceModelItem";
import { TypeVoiceModel } from "@/lib/definitions.voice";
import VoiceModelItemSkeleton from "./voiceassets/voice-model-list/VoiceModelItemSkeleton";
import { Button, ScrollShadow } from "@nextui-org/react";
import InfiniteScroll from "@/components/common/infinite-scroll/InfiniteScroll";
import { getMyPublish, getPublishSquare } from "@/lib/voice.api";
import { VoiceModelFilterType } from "@/lib/definitions.voice";
import { useTranslations } from "next-intl";
import DigitalLifeItem from "./digital-life-assets/digital-life-list/DigitalLifeItem";
import DigitalLifeItemSkeleton from "./digital-life-assets/digital-life-list/DigitalLifeItemSkeleton";

function DigitalLifeListNoScroll({
  filters,
  selectedVoiceModel,
  type = "all",
  onItemClick,
  onChange,
}: {
  filters?: VoiceModelFilterType;
  selectedVoiceModel?: TypeVoiceModel | null;
  type?: "workstation" | "my" | "all";
  onItemClick?: (voiceModel: TypeVoiceModel | null) => void;
  onChange?: (voiceModelList: TypeVoiceModel[]) => void;
}) {
  let getVoiceModelListApi: any;
  if (type === "my") {
    getVoiceModelListApi = getMyPublish();
  } else {
    getVoiceModelListApi = getPublishSquare();
  }

  const t = useTranslations();
  const initVoiceModelList: Array<TypeVoiceModel> = [];
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceModelList, setVoiceModelList] = useState<TypeVoiceModel[]>(initVoiceModelList);

  const [prevFilters, setPrevFilters] = useState(filters);

  const sWidth = window.innerWidth;
  let rowCount = 2;
  if (sWidth > 1024) {
    rowCount = 5;
  }
  if (sWidth > 1536) {
    rowCount = 6;
  }

  const getPublishSquareToServer = async ({ isFirst = false }) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoiceModelListApi.send({
      page_token: isFirst ? "" : nextPageToken,
      size: isFirst ? rowCount * 3 : rowCount * 2,
      type: filters?.type || "",
      name: filters?.name || "",
    });
    if (res && res.code === 0) {
      onChange && onChange(res.data.list);

      let newVoiceModelList: TypeVoiceModel[] = res.data.list;
      if (isFirst) {
        setCount(newVoiceModelList.length);
        setVoiceModelList([...newVoiceModelList]);
      } else {
        setCount(count + newVoiceModelList.length);
        setVoiceModelList([...voiceModelList, ...newVoiceModelList]);
      }
      setLoading(false);
      setHasMore(res.data.has_more);
      setNextPageToken(res.data.next_page_token);
    }

    setLoading(false);
  };

  if (filters) {
    if (prevFilters?.type !== filters.type || prevFilters.name !== filters.name) {
      setPrevFilters(filters);
      getPublishSquareToServer({ isFirst: true });
    }
  }

  useEffect(() => {
    getPublishSquareToServer({ isFirst: true });
  }, []);

  // ... 保持原有的状态和逻辑
  const [displayRows, setDisplayRows] = useState(2);

  const loadMore = () => {
    setDisplayRows((prev) => prev + 3);

    if (voiceModelList.length < (displayRows + 3) * rowCount) {
      getPublishSquareToServer({ isFirst: false });
    }
  };

  useEffect(() => {
    if (voiceModelList.length === 0) {
      getPublishSquareToServer({ isFirst: true });
    }
  }, []);

  if (voiceModelList.length === 0 && !loading) {
    return null;
  }

  const displayedVoiceModels = voiceModelList.slice(0, displayRows * rowCount);
  const hasMoreToDisplay = voiceModelList.length > displayedVoiceModels.length || hasMore;
  const showMoreButton = voiceModelList.length > rowCount * 2 && hasMoreToDisplay;

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      <div className="w-full self-stretch items-start grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6">
        {displayedVoiceModels.map((voice) => (
          <div key={voice.id}>
            <DigitalLifeItem
              onItemClick={onItemClick}
              voice={voice}
              key={voice.id}
              type={type}
              isSelected={!!selectedVoiceModel && selectedVoiceModel.id === voice.id}
            />
          </div>
        ))}
        {loading &&
          Array.from({ length: rowCount * 2 }, (_, i) => i).map((item, index) => (
            <DigitalLifeItemSkeleton key={`skeleton-${index}`} />
          ))}
      </div>
      {showMoreButton && !loading && (
        <div id="more" className="w-full flex justify-center items-center">
          <Button onClick={loadMore} className="h-12 text-base font-medium" variant="bordered">
            {t("assetsStore.moredigitallife")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default DigitalLifeListNoScroll;
