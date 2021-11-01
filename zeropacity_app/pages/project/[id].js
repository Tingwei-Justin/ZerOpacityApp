import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../auth";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Spacer,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  VStack,
  Flex,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import Navigation from "../../components/Navigation";
import ProgressBar from "../../components/ProgressBar";
import ContributeCard from "../../components/ContributeCard";
import { getAllPayments, getAllRecievePayments } from "../../utils/walletUtil";
import TransactionList from "../../components/TransactionList";
import { useDisclosure } from "@chakra-ui/react";
import { seqNumAtom } from "../../state/DemoAtom";
import { useRecoilState } from "recoil";

function BlogTags({ tags, marginTop }) {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="purple" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
}

export function BlogAuthor({ date, name }) {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
}

const Project = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [seqNum, setSeqNum] = useRecoilState(seqNumAtom);

  const FIRESTORE_DOMIN =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://zeropacity.firebaseapp.com";

  const [project, setProject] = useState(null);
  const [income, setIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [contributions, setContributions] = useState([]);
  // const [id, setId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      console.log(id);
      getProject({ id });
    }
  }, [id, seqNum]);

  useEffect(() => {
    if (project && project.public_key?.length > 0) {
      getAllPayments(project.public_key)
        .then((res) => {
          setTransactions(res.records);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [project, seqNum]);

  useEffect(() => {
    const URL = `${FIRESTORE_DOMIN}/api/contribution/contributon_list?project_id=${id}`;
    console.log(URL);

    fetch(URL, {
      method: "GET",
    })
      .then(async (res) => {
        if (res.ok) {
          res.json().then((res) => {
            console.log("contribution", res);
            setContributions(res);
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const addContributionItem = async () => {
    // event.preventDefault();
    let URL = `${FIRESTORE_DOMIN}/api/contribution/create_contribution`;
    console.log(URL);
    console.log({
      user_id: user.uid,
      project_id: id,
      contributor_comment: event.target.desc.value,
      amount: Number(event.target.amount.value),
    });
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.uid,
        project_id: id,
        contributor_comment: event.target.desc.value,
        amount: Number(event.target.amount.value),
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log(res);
          onClose();
        } else {
          console.error(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProject = async ({ id }) => {
    const URL = `${FIRESTORE_DOMIN}/api/project/get_project?project_id=${id}`;
    console.log(URL);
    const res = await fetch(URL, {
      method: "GET",
    })
      .then(async (res) => {
        if (res.ok) {
          res
            .json()
            .then((res) => {
              console.log(res);
              setProject(res);
              return getAllRecievePayments(res.public_key);
            })
            .then((income) => {
              console.log(income);
              setIncome(income);
            });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Navigation user={user} />
      <Flex>
        <Box w={1000} p={4} my={8} mx="auto">
          <Heading as="h1">{project?.project_name}</Heading>
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
              >
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={
                      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                    }
                    alt="project_img"
                    objectFit="contain"
                  />
                </Link>
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                  bgGradient={useColorModeValue(
                    "radial(purple.600 1px, transparent 1px)",
                    "radial(purple.300 1px, transparent 1px)"
                  )}
                  backgroundSize="20px 20px"
                  opacity="0.4"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <BlogTags tags={[project?.tags]} />
              <Text fontSize="2xl" fontWeight="bold" marginTop="1">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {project?.project_subtitle}
                </Link>
              </Text>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("purple.700", "purple.200")}
                fontSize="lg"
              >
                {project?.description}
              </Text>
              <Spacer />
              <Link
                href={`https://stellar.expert/explorer/testnet/account/${project?.public_key}`}
              >
                View account detail
              </Link>
            </Box>
          </Box>
          <Divider marginTop="5" />
          <Heading as="h3" size="lg" marginTop="5" pb="5">
            Budget Overview
          </Heading>
          <ProgressBar budget={project?.budget} balance={income} />
          <Divider marginTop="5" />

          <Heading as="h3" size="lg" marginTop="5" pb="5">
            Financial Contributions
            {user?.uid === project?.user_id && (
              <Button colorScheme="purple" size="sm" ml="5" onClick={onOpen}>
                Add
              </Button>
            )}
          </Heading>
          <SimpleGrid minChildWidth="250px" spacing="30px" maxWidth="1000">
            {contributions.map((item, index) => {
              return (
                <ContributeCard
                  key={index}
                  amount={item.amount}
                  desc={item.contributor_comment}
                  destination={project?.public_key}
                />
              );
            })}
          </SimpleGrid>
          <Divider marginTop="5" />

          <Heading as="h3" size="lg" marginTop="5" pb="5">
            Transactions
          </Heading>
          <TransactionList
            payments={transactions}
            publicKey={project?.public_key}
          />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add contribution item</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={addContributionItem}>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      placeholder="XLM"
                      id="amount"
                      name="amount"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Input id="desc" name="desc" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="purple" mr={3} type="submit">
                    Add
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Container>
  );
};

export default Project;
