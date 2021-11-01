import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../auth";
import Container from "../components/Container";
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
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import WalletCard from "../components/WalletCard";
import TransactionList from "../components/TransactionList";
import {
  getAccountBalance,
  getAllPayments,
  getPubicKey,
} from "../utils/walletUtil";

function Wallet() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(null);
  const [payments, setPayments] = useState(null);
  const [pk, setPk] = useState("");
  return (
    <Container>
      <Navigation user={user} />
      <Flex>
        <Box w={1200} p={4} my={8} mx="auto">
          <Flex>
            <Stack
              as={Box}
              flex="1"
              textAlign={balance?.length > 0 ? "left" : "center"}
              spacing={{ base: 8, md: 14 }}
              py={{ base: 20, md: 36 }}
            >
              <Heading
                fontWeight={600}
                color="#452c63"
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Manage your money <br />
                <Text as={"span"} color={"#CCCCFF"}>
                  Secure and Transparent
                </Text>
              </Heading>
              <Text color={"#662d91"}>
                Aalbedo wallet will be used in here. Secret keys never sent over
                the Internet and never exposed to third-party services. <br />
                <br />
                Log into third-party websites with your Stellar account, just
                like with Google/Facebook OAuth. <br />
                <br />
                Use multiple accounts, as well as hardware wallets, and switch
                them on the fly.
              </Text>
              {!balance && (
                <Stack
                  direction={"column"}
                  spacing={3}
                  align={"center"}
                  alignSelf={"center"}
                  position={"relative"}
                >
                  <>
                    <Button
                      colorScheme={"purple"}
                      bg={"purple.500"}
                      rounded={"full"}
                      px={6}
                      _hover={{
                        bg: "purple.700",
                      }}
                      onClick={async () => {
                        getPubicKey()
                          .then((pubkey) => {
                            console.log("pubkey", pubkey);
                            setPk(pubkey);
                            const res = Promise.all([
                              getAccountBalance(pubkey),
                              getAllPayments(pubkey),
                            ]);
                            return res;
                          })
                          .then((res) => {
                            console.log(res);
                            setBalance(res[0]);
                            setPayments(res[1].records);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Get Started to Stellar universe
                    </Button>
                    <Box>
                      <Icon
                        as={Arrow}
                        color={"purple"}
                        w={71}
                        position={"absolute"}
                        right={-71}
                        top={"10px"}
                      />
                    </Box>{" "}
                  </>
                </Stack>
              )}
            </Stack>

            {balance && (
              <>
                <Spacer />
                <Box flex="2">
                  {balance && balance.length > 0 && (
                    <WalletCard balance={balance[0]?.balance} pk={pk} />
                  )}
                  {payments && payments.length > 0 && (
                    <TransactionList payments={payments} publicKey={pk} />
                  )}
                </Box>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

export default Wallet;

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
