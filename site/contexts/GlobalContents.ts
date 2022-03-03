import { GlobalContents } from "api/fetchGlobalContents";
import { createContext } from "react";

const GlobalContentsContext = createContext<GlobalContents | undefined>(
  undefined
);

export default GlobalContentsContext;
