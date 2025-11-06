import {
  Box,
  Card,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  Tag,
  Button,
  Separator,
} from "@chakra-ui/react";
import api from "@/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import bgimg from "../assets/bgimg.png"

export default function ReadBlog() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await api(`blogs/blog/${id}/`);

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (data.length === 0) {
    return <LoadingSpinner />;
  }


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      py={5}
      px={4}
    >
      <Card.Root
        maxW={{ base: "full", md: "80%" }}
        w="full"
        shadow="lg"
        borderRadius={10}
        overflow="hidden"
      >
        {/* Header */}
        <Card.Header p={0}>
          <Image
            src={data.featured_image || bgimg}
            alt={data.title} 
            w="full"
            h={{ base: "250px", md: "400px" }}
            objectFit="cover"
          />
        </Card.Header>

        {/* Body */}
        <Card.Body p={6}>
          <VStack align="start" spacing={3}>
            <Tag.Root variant="subtle" colorPalette="green">
              <Tag.Label>About: {data.snake_name}</Tag.Label>
            </Tag.Root>

            <Heading fontSize={{ base: "2xl", md: "3xl" }} color="green.600">
              {data.title}
            </Heading>

            <HStack fontSize="sm" color="gray.600" spacing={4}>
              <HStack>
                <Text>author: {data.author}</Text>
              </HStack>
              <HStack>
                <Text>{new Date(data.created_at).toLocaleDateString()}</Text>
              </HStack>
            </HStack>

            <Separator />

            <Text
              whiteSpace="pre-line"
              lineHeight="tall"
              color="gray.700"
              fontSize="md"
            >
              {data.content}
            </Text>
          </VStack>
        </Card.Body>

        {/* Footer */}
        <Card.Footer justify="space-between" p={6}>
          <Button as={Link} to="/readList" variant="subtle" colorPalette="green">
            Back to Blogs
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
