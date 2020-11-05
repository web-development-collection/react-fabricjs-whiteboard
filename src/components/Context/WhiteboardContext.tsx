import React from "react";


export type WhiteboardContextValue = {};


export const WhiteboardContext = React.createContext<WhiteboardContextValue | {}>({});
export const WhiteboardProvider = WhiteboardContext.Provider;