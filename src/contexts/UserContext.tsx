import React, { createContext, useContext, useReducer, useEffect } from "react";
import { type UserInfo, DEFAULT_USER_INFO } from "@/types/user";

// 创建上下文
const UserContext = createContext<UserInfo>(DEFAULT_USER_INFO);
const UserDispatchContext = createContext(null as any);

// 定义 action 类型
type UserAction =
  | { type: "set"; payload: UserInfo }
  | { type: "update"; payload: Partial<UserInfo> }
  | { type: "undefined" };

// Reducer 函数
function reducer(state: UserInfo, action: UserAction): UserInfo {
  switch (action.type) {
    case "set":
      return action.payload;
    case "update":
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider 组件
export function UserContextProvider({ children, initialUser }: { children: React.ReactNode; initialUser: UserInfo }) {
  const [user, dispatch] = useReducer(reducer, initialUser);

  useEffect(() => {
    dispatch({ type: "set", payload: initialUser });
  }, [initialUser]);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

// 自定义 hooks 用于访问用户数据和 dispatch 函数
export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}
