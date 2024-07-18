import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const DatokenContext = createContext<number>(0);
const DatokenDispatchContext = createContext(null as any);

// Define action types
type DatokenAction =
  | { type: "set"; payload: number }
  | { type: "add"; payload: number }
  | { type: "subtract"; payload: number }
  | { type: "undefined" };

// Reducer function
function reducer(state: number, action: DatokenAction): number {
  switch (action.type) {
    case "set":
      return action.payload;
    case "add":
      return state + action.payload;
    case "subtract":
      return Math.max(0, state - action.payload);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider component
export function DatokenContextProvider({
  children,
  initialDatoken,
}: {
  children: React.ReactNode;
  initialDatoken: number;
}) {
  const [datoken, dispatch] = useReducer(reducer, initialDatoken);

  useEffect(() => {
    dispatch({ type: "set", payload: initialDatoken });
  }, [initialDatoken]);

  return (
    <DatokenContext.Provider value={datoken}>
      <DatokenDispatchContext.Provider value={dispatch}>{children}</DatokenDispatchContext.Provider>
    </DatokenContext.Provider>
  );
}

// Custom hooks for accessing datoken data and dispatch function
export function useDatoken() {
  return useContext(DatokenContext);
}

export function useDatokenDispatch() {
  return useContext(DatokenDispatchContext);
}
