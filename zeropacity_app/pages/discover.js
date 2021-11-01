import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import Container from "../components/Container";
import {
  Flex,
  Box,
  Button,
  Text,
  Stack,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import ImageCard from "../components/ImageCard";

const FIRESTORE_DOMIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://zeropacity.firebaseapp.com";

function Discover() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    const URL = `${FIRESTORE_DOMIN}/api/project/project_list`;
    const res = await fetch(URL, {
      method: "GET",
    })
      .then(async (res) => {
        if (res.ok) {
          res.json().then((res) => {
            console.log(res);
            setProjects(res);
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
          <Center>
            <SimpleGrid minChildWidth="250px" spacing="30px" maxWidth="1000">
              {projects.map((project, index) => {
                return (
                  <ImageCard
                    key={index}
                    title={project.project_name}
                    imgUrl={`/${index % 6}.svg`}
                    id={project.project_id}
                    author_id="123"
                    time={project.project_subtitle}
                    buttonText="DETAIL"
                    height="440px"
                  />
                );
              })}
            </SimpleGrid>
          </Center>
        </Box>
      </Flex>
    </Container>
  );
}

export default Discover;
