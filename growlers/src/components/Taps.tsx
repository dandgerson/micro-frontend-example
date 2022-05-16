import React from "react";
import { Box } from "@chakra-ui/react";

import BeverageCard from "./BeverageCard";
import { MFE_BORDER } from "../constants";
import store from "../store";
import { useSnapshot } from "valtio";

const Taps = () => {
  const { filteredTaps } = useSnapshot(store)

  console.log(filteredTaps)

  return (
    <Box border={MFE_BORDER}>
      {filteredTaps.map((beverage) => (
        <BeverageCard
          key={[beverage.producerName, beverage.beverageName].join("")}
          beverage={beverage}
        />
      ))}
    </Box>
  );
};

export default Taps;
