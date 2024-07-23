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
import { getDigitalLifeMyPublished, getDigitalLifeSqure } from "@/lib/digitallife.api";
import { DEFAULT_DIGITALLIFE, DigitalLifeCardType } from "@/lib/definitions.digitallife";
import { ErrorBoundary } from "react-error-boundary";

function DigitalLifeList({
  selectedDigitalLife,
  type = "all",
  onItemClick,
  onChange,
}: {
  selectedDigitalLife?: DigitalLifeCardType | null;
  type?: "my" | "all";
  onItemClick?: (digitalLife: DigitalLifeCardType | null) => void;
  onChange?: (digitalLifeList: DigitalLifeCardType[]) => void;
}) {
  let getDigitalLifeListApi: any;
  if (type === "my") {
    getDigitalLifeListApi = getDigitalLifeMyPublished();
  } else {
    getDigitalLifeListApi = getDigitalLifeSqure();
  }

  const initDigitalLifeList: Array<DigitalLifeCardType> = [];
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [digitalLifeList, setDigitalLifeList] = useState<DigitalLifeCardType[]>(initDigitalLifeList);

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

    const res = await getDigitalLifeListApi.send({
      page_token: isFirst ? "" : nextPageToken,
      // size: isFirst ? rowCount * 6 : rowCount * 2,
    });
    if (res && (res.code === 200 || res.code === 0)) {
      onChange && onChange(res.data.list);

      let newDigitalLifeList: DigitalLifeCardType[] = res.data.list;

      if (isFirst) {
        setCount(newDigitalLifeList.length);
        setDigitalLifeList([...newDigitalLifeList]);
      } else {
        setCount(count + newDigitalLifeList.length);
        setDigitalLifeList([...digitalLifeList, ...newDigitalLifeList]);
      }
      setLoading(false);
      setHasMore(res.data.has_more);
      setNextPageToken(res.data.next_page_token);
    }

    setLoading(false);
  };

  useEffect(() => {
    // getPublishSquareToServer({ isFirst: true });
    setDigitalLifeList([DEFAULT_DIGITALLIFE]);
  }, []);

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      <ScrollShadow
        size={16}
        hideScrollBar
        id="scrollableVoiceModelDiv"
        className="w-full flex-col justify-start items-start gap-6 inline-flex h-dvh overflow-auto"
      >
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          {digitalLifeList.length > 0 && (
            <InfiniteScroll
              dataLength={digitalLifeList.length}
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
              {digitalLifeList.map((digitalLife) => (
                <div key={digitalLife.cover_url}>
                  <DigitalLifeItem
                    onItemClick={onItemClick}
                    digitalLife={digitalLife}
                    key={digitalLife.p_id}
                    type={type}
                    isSelected={!!selectedDigitalLife && selectedDigitalLife.p_id === digitalLife.p_id}
                  />
                </div>
              ))}
            </InfiniteScroll>
          )}
        </ErrorBoundary>
      </ScrollShadow>
    </div>
  );
}

export default DigitalLifeList;
