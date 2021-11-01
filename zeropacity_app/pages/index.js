import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../auth";
import firebase from "firebase/app";
import Container from "../components/Container";
import Head from "next/head";
import albedo from "@albedo-link/intent";
import {
  Flex,
  Box,
  Button,
  Text,
  Stack,
  Heading,
  SimpleGrid,
  useDisclosure,
  Spacer,
  useColorModeValue,
  chakra,
  Icon,
  Image,
} from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import CreateProject from "../components/CreateProject";

const StellarSdk = require("stellar-sdk");

export default function Home() {
  const { user } = useAuth();
  const bg = useColorModeValue("white", "gray.800");

  function test() {
    console.log("test");
    albedo
      .pay({
        amount: "100",
        destination: "GAKOUPKRUTO3FLG7VBAEF5HWTG2LS5IG6CR6LU5ZB2ZAR3JQJZKZCWYC",
        network: "testnet",
      })
      .then((res) => {
        console.log(res);
        const server = new StellarSdk.Server(
          "https://horizon-testnet.stellar.org"
        );
        console.log(server);
        // server.submitTransaction(res);
      }) // everything is ok, parse response here
      .catch((e) => console.error(e)); // handle errors or user's rejection
  }
  return (
    <Container>
      <Navigation user={user} />
      <Flex>
        <Box width="90%" p={4} my={8} mx="auto">
          <Box pos="relative" overflow="hidden" bg={bg} mt={10}>
            <Box maxW="7xl" mx="auto">
              <Box
                pos="relative"
                pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                maxW={{ lg: "2xl" }}
                w={{ lg: "full" }}
                zIndex={1}
                bg={bg}
                border="solid 1px transparent"
              >
                <Icon
                  display={{ base: "none", lg: "block" }}
                  position="absolute"
                  right={0}
                  top={0}
                  bottom={0}
                  h="full"
                  w={48}
                  color={bg}
                  transform="translateX(50%)"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="50,0 100,0 50,100 0,100" />
                </Icon>
                <Box
                  mx="auto"
                  maxW={{ base: "7xl" }}
                  px={{ base: 4, sm: 6, lg: 8 }}
                  mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
                >
                  <Box
                    w="full"
                    textAlign={{ sm: "center", lg: "left" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <chakra.h1
                      fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                      letterSpacing="tight"
                      lineHeight="short"
                      fontWeight="extrabold"
                      color={useColorModeValue("gray.900", "white")}
                    >
                      <chakra.span
                        bgGradient="linear(to-l, #1b2c97,#fc466b)"
                        bgClip="text"
                        display={{ base: "block", xl: "inline" }}
                      >
                        ZerOpacity
                      </chakra.span>
                    </chakra.h1>
                    <chakra.p
                      mt={{ base: 3, sm: 5, md: 5 }}
                      fontSize={{ sm: "lg", md: "xl" }}
                      maxW={{ sm: "xl" }}
                      mx={{ sm: "auto", lg: 0 }}
                      color="#452c63"
                    >
                      ZerOpacity is a platform providing transparent and
                      trustful fundraising services for non-profit organizations
                      and activities.
                      <br />
                      <br />
                      Our payment is based on the Stellar Network, which uses
                      blockchain technologies and creates a decentralized and
                      open transaction network.
                      <br />
                      <br />
                      Everyone can publish their fundraising activities on our
                      platform or contribute to activities they are interested
                      in.
                    </chakra.p>
                    <Box
                      mt={{ base: 5, sm: 8 }}
                      display={{ sm: "flex" }}
                      justifyContent={{ sm: "center", lg: "start" }}
                      fontWeight="extrabold"
                      fontFamily="fantasy"
                    >
                      <Box rounded="full" shadow="md">
                        <chakra.a
                          w="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="solid 1px transparent"
                          bgColor="#662d91"
                          fontSize={{ base: "md", md: "lg" }}
                          rounded="lg"
                          bg="brand.600"
                          _hover={{ bg: "brand.700" }}
                          px={{ base: 8, md: 10 }}
                          py={{ base: 3, md: 4 }}
                          cursor="pointer"
                        >
                          <CreateProject user={user} />
                        </chakra.a>
                      </Box>
                      <Box mt={[3, 0]} ml={[null, 3]}>
                        <chakra.a
                          w="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          px={{ base: 8, md: 10 }}
                          py={{ base: 3, md: 4 }}
                          border="solid 1px transparent"
                          fontSize={{ base: "md", md: "lg" }}
                          rounded="md"
                          color="#452c63"
                          bg="brand.100"
                          _hover={{ bg: "brand.200" }}
                          cursor="pointer"
                          href="/discover"
                        >
                          Discover
                        </chakra.a>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              position={{ lg: "absolute" }}
              top={{ lg: 0 }}
              bottom={{ lg: 0 }}
              right={{ lg: 0 }}
              w={{ lg: "50%" }}
              border="solid 1px transparent"
            >
              <Image
                h={[56, 72, 96, "full"]}
                w="full"
                fit="cover"
                src="/universe.jpeg"
                alt=""
                loading="lazy"
              />
            </Box>
          </Box>

          {/* <CreateProject user={user} /> */}
        </Box>
      </Flex>
    </Container>
  );
}
