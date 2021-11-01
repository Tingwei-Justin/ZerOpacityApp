import React from "react";
import { Progress, Text, Flex, Spacer } from "@chakra-ui/react";

function ProgressBar({ balance = 500000, budget = 10000 }) {
  return (
    <>
      <Progress
        value={Math.min(balance / budget, 1) * 100}
        colorScheme="purple"
        hasStripe={true}
        isAnimated={true}
      />
      <Flex mt={2} letterSpacing="wider">
        <Text>Recieved ${balance} </Text>
        <Spacer />
        <Text>Target Budget ${budget} per year</Text>
      </Flex>
    </>
  );
}

export default ProgressBar;
