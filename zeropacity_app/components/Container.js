import React from "react";
import { Flex } from "@chakra-ui/react";

function Container({ children }) {
  return (
    <>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </>
  );
}

export default Container;
