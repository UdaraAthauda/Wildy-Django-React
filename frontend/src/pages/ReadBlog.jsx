import api from "@/api";
import Searchbar from "@/components/Searchbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function ReadBlog() {
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

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={5}>
        {data.map((d) => (
          <Box
            key={d.id}
            bg="blue.500"
            p={3}
            color={"white"}
            borderRadius={8}
            boxShadow={"lg"}
            _hover={{
              shadow: "xl",
              transform: "scale(1.03)",
              transition: "0.2s",
            }}
          >
            <HStack align="start" justify="space-between">
              <Text
                flex="1"
                whiteSpace="normal"
                wordBreak="break-word"
                noOfLines={{ base: 3, md: 2 }}
              >
                {d.title}
              </Text>
              <Text flexShrink={0} ml={2}>
                {new Date(d.created_at).toLocaleDateString()}
              </Text>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
