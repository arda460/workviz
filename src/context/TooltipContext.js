import React, { useState } from "react";

const TooltipContext = React.createContext({});

const TooltipProvider = () => {
  const [tooltip, setTooltip] = useState(false);
  return (
    <TooltipContext.Provider
      value={{ tooltip, setTooltip }}
    ></TooltipContext.Provider>
  );
};

const TooltipConsumer = TooltipContext.Consumer;
export default { TooltipContext, TooltipProvider, TooltipConsumer };
