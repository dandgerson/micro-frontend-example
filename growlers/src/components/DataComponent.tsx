import React, { ReactElement } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

import { MFE_BORDER } from "../constants";
import { useSnapshot } from "valtio";
import store, { TapStore } from "../store";

const DataComponent: React.FC<{
  children: (state: TapStore) => ReactElement<any, any>
}> = ({ children }) => {
  const state = useSnapshot(store)
  return children(state as TapStore);
};

export default DataComponent;
