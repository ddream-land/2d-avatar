"use client";

import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

export const PlayBtnContext = createContext([]);
export const PlayBtnDispatchContext = createContext(null as any);

export function PlayBtnContextProvider({ children }: { children: React.ReactNode }) {
  const [prevAudios, dispatch] = useImmerReducer(playBtnReducer, [] as any);

  return (
    <PlayBtnContext.Provider value={prevAudios}>
      <PlayBtnDispatchContext.Provider value={dispatch}>{children}</PlayBtnDispatchContext.Provider>
    </PlayBtnContext.Provider>
  );
}

export function usePlayBtn() {
  return useContext(PlayBtnContext);
}

export function usePlayBtnDispatch() {
  return useContext(PlayBtnDispatchContext);
}

function playBtnReducer(draft: Array<any>, action: any) {
  switch (action.type) {
    case "pause": {
      if (draft.length !== 0) {
        draft[0].pause && draft[0].pause();
      }
      draft[0] = action.payload.audio;
      break;
    }

    // bump
    // case "pause": {
    //   if (draft.length !== 0) {
    //     draft[0].pause && draft[0].pause();
    //   }
    //   // 检查新的 audio 是否已经存在
    //   const existingIndex = draft.findIndex((audio) => audio === action.payload.audio);
    //   if (existingIndex !== -1) {
    //     // 如果存在，将其移到数组开头
    //     draft.unshift(draft.splice(existingIndex, 1)[0]);
    //   } else {
    //     // 如果不存在，添加到数组开头
    //     draft.unshift(action.payload.audio);
    //   }
    //   break;
    // }

    case "finished": {
      if (draft.length > 0 && draft[0] === action.payload.audio) {
        draft.shift();
      }
      break;
    }

    case "clear": {
      // return null;
      return [];
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
