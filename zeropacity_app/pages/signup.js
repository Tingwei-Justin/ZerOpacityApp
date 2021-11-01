import React, { useState } from "react";
import Link from "next/link";
import firebaseClient from "../firebaseClient";
import ColorMode from "../components/ColorMode";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

function SignUpForm({ setLoading }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const formBackground = useColorModeValue("purple.100", "purple.700");

  return (
    <Flex
      direction="column"
      minWidth="33%"
      background={formBackground}
      p={12}
      rounded={6}
    >
      <Heading mb={6}>Signup</Heading>

      <FormControl isRequired>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="emailAddress"
          value={email}
          borderColor="purple.700"
          aria-describedby="email-helper-text"
          placeholdre="Your email: xxx@xxx"
        />
        <FormHelperText id="email-helper-text">
          We will never share your email.
        </FormHelperText>
      </FormControl>

      <FormControl isRequired mt={6}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          onChange={(e) => setPass(e.target.value)}
          type="password"
          id="pass"
          value={pass}
          placeholdre="********"
          variant="filled"
          mb={6}
          borderColor="purple.700"
        />
      </FormControl>

      <Button
        colorScheme="purple"
        mb={3}
        isDisabled={email === "" || pass === ""}
        onClick={async () => {
          setLoading(true);
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, pass)
            .then(function (userCredential) {
              setLoading(false);
              // Signed in
              const user = userCredential.user;
              router.push("/");
            })
            .catch(function (error) {
              console.log(error);
              setLoading(false);
              const message = error.message;
              toast({
                title: "An error occurred.",
                description: message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            });
        }}
      >
        Signup
      </Button>

      <Link href="/login">
        <Button colorScheme="purple" mb={3}>
          Login
        </Button>
      </Link>

      <ColorMode />
    </Flex>
  );
}

function Signup() {
  firebaseClient();
  const [loading, setLoading] = useState(false);
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      ) : (
        <SignUpForm setLoading={setLoading} />
      )}
    </Flex>
  );
}

export default Signup;
