import api from "@/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Heading,
  Button,
  Card,
  Image,
  Text,
  SimpleGrid,
  VStack,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import bgimg from "../assets/bgimg.png";
import { Link } from "react-router-dom";

export default function WrittenBlogs() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await api.get("blogs/blog/");
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
      <Heading
        fontSize={{ base: "md", md: "2xl" }}
        textAlign={{ base: "center", md: "start" }}
      >
        Blogs Written & Owned by You
      </Heading>

      <SimpleGrid mt={4} columns={{ base: 1, md: 5 }} gap={3}>
        {data.map((d) => (
          <Card.Root
            w={"full"}
            key={d.id}
            overflow="hidden"
            shadow={"lg"}
            _hover={{
              shadow: "xl",
              transform: "scale(1.03)",
              transition: "0.2s",
            }}
          >
            <Image src={d.featured_image || bgimg} h={"150px"} />
            <Card.Body gap={2}>
              <Tag.Root colorPalette={"green"}>
                <Tag.Label>About: {d.snake_name}</Tag.Label>
              </Tag.Root>
              <Card.Description>{d.title}</Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button as={Link} to={`/edit/${d.id}`} variant="solid" size={"xs"} colorPalette={'green'}>
                Edit Blog
              </Button>
              <Spacer />
              <VStack align={"flex-end"}>
                <Text fontSize={"xs"}>
                  {new Date(d.created_at).toLocaleDateString()}
                </Text>
                <Tag.Root colorPalette={"blue"}>
                  <Tag.Label>{d.status}</Tag.Label>
                </Tag.Root>
              </VStack>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </>
  );
}
