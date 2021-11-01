import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Image,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { pay } from "../utils/walletUtil";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { seqNumAtom } from "../state/DemoAtom";

const IMAGE =
  "https://www.nasa.gov/sites/default/files/images/153735main_image_feature_626_ys_full.jpg";

export default function ContributeCard({ amount, desc, destination }) {
  const toast = useToast();
  const [seqNum, setSeqNum] = useRecoilState(seqNumAtom);
  return (
    <Center py={6}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={900}
            bg={useColorModeValue("purple.50", "purple.900")}
            p={2}
            px={3}
            color={"purple.500"}
            rounded={"full"}
          >
            Membership
          </Text>

          <Image
            rounded={"lg"}
            height={200}
            width={262}
            objectFit={"cover"}
            src={IMAGE}
          />

          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"6xl"} fontWeight={800}>
              {amount}
              <Text fontSize={"2xl"}>XLM </Text>
            </Text>
            {/* <Text color={"gray.500"}>/month</Text> */}
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color="purple.400" />
              {desc}
            </ListItem>
          </List>

          <Button
            mt={10}
            w={"full"}
            bg={"purple.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            onClick={() => {
              console.log(String(amount), destination);
              pay({ amount: String(amount), destination })
                .then((res) => {
                  console.log(res);
                  setSeqNum(seqNum + 1);
                  toast({
                    title: "Contribute successfully!",
                    status: "success",
                    isClosable: true,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  toast({
                    title: `Error happens, please try again later`,
                    status: "error",
                    isClosable: true,
                  });
                });
            }}
            _hover={{
              bg: "purple.500",
            }}
            _focus={{
              bg: "purple.500",
            }}
          >
            Contribute
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
