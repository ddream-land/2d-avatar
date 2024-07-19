"use client";
import React, { useEffect, useState } from "react";
import DigitalLifeItem from "./DigitalLifeItem";
import { TypeVoiceModel } from "@/lib/definitions.voice";
import VoiceModelItemSkeleton from "./DigitalLifeItemSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import InfiniteScroll from "@/components/common/infinite-scroll/InfiniteScroll";
import { getMyPublish, getPublishSquare } from "@/lib/voice.api";
import { VoiceModelFilterType } from "@/lib/definitions.voice";
import DigitalLifeItemSkeleton from "./DigitalLifeItemSkeleton";

function DigitalLifeList({
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
      size: isFirst ? rowCount * 6 : rowCount * 2,
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

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      <ScrollShadow
        size={16}
        hideScrollBar
        id="scrollableVoiceModelDiv"
        className="w-full flex-col justify-start items-start gap-6 inline-flex h-dvh overflow-auto"
      >
        <InfiniteScroll
          dataLength={voiceModelList.length}
          next={() => {
            getPublishSquareToServer({ isFirst: false });
          }}
          hasMore={hasMore}
          loader={
            <>
              {Array.from({ length: rowCount * 2 }, (_, i) => i).map((item, index) => (
                <DigitalLifeItemSkeleton key={index} />
              ))}
            </>
          }
          scrollableTarget="scrollableVoiceModelDiv"
          className="w-full self-stretch items-start grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6"
        >
          {voiceModelList.map((voice) => (
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
        </InfiniteScroll>
      </ScrollShadow>
    </div>
  );
}

export default DigitalLifeList;
