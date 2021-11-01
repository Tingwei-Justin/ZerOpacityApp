// import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  AspectRatio,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { StarIcon } from "@chakra-ui/icons";

export default function ImageCard({
  title,
  id,
  body,
  imgUrl,
  pageUrl,
  height = "440px",
  buttonText = "VIEW",
  time = "",
  btnRef,
  onClickFun,
  curMem,
  setCurMem,
  onClickShare,
  author_id = "",
}) {
  return (
    <Center py={6}>
      <Box
        maxW={"300px"}
        h={height}
        bg={useColorModeValue("white", "purple.900")}
        boxShadow={"2xl"}
        borderRadius="2xl"
        p={6}
        overflow={"hidden"}
        pos={"relative"}
        border="solid 1px"
      >
        <AspectRatio
          w="300px"
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
          ratio={1.3 / 1}
        >
          <Image
            src={imgUrl}
            alt="xxx"
            objectFit="fit"
            borderBottom="solid 1px"
          />
        </AspectRatio>

        <Stack>
          <Heading
            color={useColorModeValue("#452c63", "white")}
            fontSize={"2xl"}
            textTransform="capitalize"
            fontFamily={"body"}
          >
            {title}
          </Heading>
          {time && (
            <Text fontSize="sm" fontWeight={600} color={"purple.600"} mb={4}>
              {time}
            </Text>
          )}

          <Text color={"#800080"} noOfLines={3}>
            {body}
          </Text>
        </Stack>

        <Button
          color={"#452c63"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
          position="absolute"
          bottom="5"
          right="5"
          ref={btnRef}
          onClick={() => {
            window.location.href = `/project/${id}`;
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Center>
  );
}
