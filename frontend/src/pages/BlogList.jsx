import api from "@/api";
import Searchbar from "@/components/Searchbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  Card,
  Image,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import bgimg from "../assets/bgimg.png"
import { Link } from "react-router-dom";

export default function BlogList() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await api.get("blogs/read/");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Flex
        align={"center"}
        justify={{ base: "center", md: "space-between" }}
        mb={3}
        flexDir={{ base: "column", md: "row" }}
        gap={2}
      >
        <Heading fontSize={{ base: "md", md: "2xl" }}>
          Blogs published by Wildy Contributors
        </Heading>
        <Searchbar />
      </Flex>

      <Flex justify={"center"} align={"center"}>
        <SimpleGrid columns={1} gap={4} mt={2} w={{ base: "full", md: "80%" }}>
          {data.map((d) => (
            <Card.Root
              key={d.id}
              as={Link}
              to={`/read/${d.id}`}
              flexDirection={{ base: "column", md: "row" }}
              overflow="hidden"
              bg={"blue.200"}
              shadow={"lg"}
              _hover={{
                shadow: "xl",
                transform: "scale(1.03)",
                transition: "0.2s",
              }}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "full", md: "200px" }}
                h={{ base: "150px", md: "full" }}
                src={d.featured_image || bgimg}
                alt="Caffe Latte"
              />
              <Box flex={1}>
                <Card.Body>
                  <HStack justify={'space-between'}>
                    <Tag.Root w={'200px'} variant={'subtle'} colorPalette={'green'} mt={3}>
                    <Tag.Label>about: {d.snake_name}</Tag.Label>
                  </Tag.Root>

                  <Text alignSelf={"flex-end"} fontSize={"sm"}>
                    {new Date(d.created_at).toLocaleDateString()}
                  </Text>
                  </HStack>

                  <Wrap>
                  <Card.Title
                    mt={4}
                    color={"green.500"}
                    fontSize={{ base: "lg", md: "2xl" }}
                    textAlign={'justify'}
                  >
                    {d.title}
                  </Card.Title>
                  </Wrap>
                </Card.Body>
                <Card.Footer>
                  
                </Card.Footer>
              </Box>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}
