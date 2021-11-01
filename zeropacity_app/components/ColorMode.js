import React, { useState } from "react";
import {
  Button,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

export default function ColorModeButton() {
  const [mode, setMode] = useState("Dark Mode");
  const toast = useToast();
  const { toggleColorMode } = useColorMode();

  function toggle() {
    toggleColorMode();
    if (mode === "Dark Mode") {
      setMode("White Mode");
    } else {
      setMode("Dark Mode");
    }
  }

  return <Button onClick={toggle}>{mode}</Button>;
}
