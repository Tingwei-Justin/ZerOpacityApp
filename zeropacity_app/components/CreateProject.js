import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
  useToast,
  RadioGroup,
  Radio,
  Stack,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { getPubicKey } from "../utils/walletUtil";
import { useDisclosure } from "@chakra-ui/react";

const FIRESTORE_DOMIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://zeropacity.firebaseapp.com";

function CreateProject({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = React.useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [type, setType] = React.useState("Open source project");

  const createProjectItem = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log(process.env.NODE_ENV);

    let CREATE_PROJECT_URL = `${FIRESTORE_DOMIN}/api/project/create_project`;

    console.log(
      JSON.stringify({
        user_id: user.uid,
        public_key: publicKey,
        project_name: event.target.name.value,
        project_subtitle: event.target.subtitle.value,
        budget: event.target.budget.value,
        description: event.target.desc.value,
        tags: type,
      })
    );

    const res = await fetch(CREATE_PROJECT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.uid,
        public_key: publicKey,
        project_name: event.target.name.value,
        project_subtitle: event.target.subtitle.value,
        budget: event.target.budget.value,
        description: event.target.desc.value,
        tags: type,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log(res);
          toast({
            title: "Create the new project successfully!",
            status: "success",
            isClosable: true,
          });
          onClose();
        } else {
          console.error(res);
          toast({
            title: `Error happens, please try again later`,
            status: "error",
            isClosable: true,
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          title: `Error happens, please try again later`,
          status: "error",
          isClosable: true,
        });
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text color="white" onClick={onOpen}>
        Create
      </Text>
      <Modal
        size={"2xl"}
        nitialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#452c63">
            Create non-profit project / community
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createProjectItem}>
            <ModalBody color="#4B0082" pb={6}>
              <FormControl>
                <FormLabel>Project / Community Name</FormLabel>
                <Input
                  ref={initialRef}
                  id="name"
                  name="name"
                  placeholder="Your project / community name"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>What does your project / community do?</FormLabel>
                <Input id="subtitle" name="subtitle" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Estimated budget for collection</FormLabel>
                <InputGroup>
                  <InputRightElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  >
                    XLM
                  </InputRightElement>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Enter amount"
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Create/import your financial account</FormLabel>
                <Flex>
                  <Button
                    colorScheme="purple"
                    size="sm"
                    mr="5"
                    onClick={() => {
                      getPubicKey()
                        .then((pubkey) => {
                          setPublicKey(pubkey);
                          console.log("pubkey", pubkey);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Click here
                  </Button>

                  {publicKey.length > 0 && (
                    <Text>
                      Account id: {publicKey.substr(0, 6)}...
                      {publicKey.slice(-6)}
                    </Text>
                  )}
                </Flex>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  onChange={setType}
                  value={type}
                  colorScheme="purple"
                >
                  <Stack direction="row">
                    <Radio value="Open source project" colorScheme="purple">
                      Open source project
                    </Radio>
                    <Radio value="Non-profit Organization">
                      Non-profit Organization
                    </Radio>
                    <Radio value="Other">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description (optional)</FormLabel>
                <Textarea
                  id="desc"
                  name="desc"
                  placeholder="Introduce detail in here"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                color="#662d91"
                mr={3}
                isLoading={isLoading}
                loadingText="Creating"
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateProject;
