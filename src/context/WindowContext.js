import React from "react";

const WindowContext = React.createContext({});

export const WindowContextProvider = WindowContext.Provider;
export const WindowContextConsumer = WindowContext.Consumer;
export default WindowContext;
