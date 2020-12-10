import React from "react";


export type WhiteboardContextValue = {
  tool: string,
  setTool: (tool: string) => void,

  emitAction: (action: any) => void,
};


export const WhiteboardContext = React.createContext<WhiteboardContextValue | {}>({});
export const WhiteboardProvider = WhiteboardContext.Provider;