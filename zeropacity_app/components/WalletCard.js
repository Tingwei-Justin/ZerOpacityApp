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
  Flex,
  Spacer,
} from "@chakra-ui/react";

import Link from "next/link";
import { CheckIcon } from "@chakra-ui/icons";

const IMAGE =
  "https://www.nasa.gov/sites/default/files/images/153735main_image_feature_626_ys_full.jpg";

export default function WalletCard({ balance, pk }) {
  return (
    <Center py={6}>
      <Box
        maxW={"550px"}
        w={"full"}
        bg={useColorModeValue("white", "purple.800")}
        boxShadow="2xl"
        border="solid 2px"
        rounded={"md"}
        overflow={"hidden"}
        borderColor="#662d91"
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("purple.800", "white")}
          align={"center"}
          borderColor="#452c63"
        >
          <Text
            fontSize={"sm"}
            fontWeight={900}
            bg={useColorModeValue("purple.100", "purple.900")}
            p={2}
            px={3}
            color={"purple.500"}
            rounded={"full"}
          >
            Wallet Card
          </Text>

          <Link
            color="#452c63"
            href={`https://stellar.expert/explorer/testnet/account/${pk}`}
          >
            View account detail
          </Link>
          <Box pos="relative">
            <Image
              rounded={"lg"}
              height={300}
              width={450}
              objectFit={"cover"}
              src={IMAGE}
              boxShadow="md"
            />
            <Box pos="absolute" top="5" left="5" width={350}>
              <Flex>
                <Image
                  borderRadius="full"
                  boxSize="44px"
                  src="/stellar-xlm-logo.svg"
                  alt="logo"
                  fill="#ffffff"
                />

                <Box
                  as="span"
                  color="white"
                  px="1"
                  py="3"
                  fontWeight="semibold"
                >
                  Wallet
                </Box>

                <Spacer />

                <Box color="white" px="1" py="2" fontWeight="semibold">
                  <Text as="span" fontSize={"l"}>
                    XLM:
                  </Text>
                  <Text as="span" px="2" fontSize={"l"} fontWeight={800}>
                    {balance}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>$</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              30
            </Text>
            <Text color={"purple.500"}>/month</Text>
          </Stack> */}
        </Stack>
      </Box>
    </Center>
  );
}
