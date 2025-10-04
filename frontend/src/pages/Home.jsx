import api from "@/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { SimpleGrid, Button, Card, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await api.get("wild/");
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
      <SimpleGrid columns={{ base: 2, md: 5 }} gap={3}>
        {data.map((d) => (
          <Card.Root
            key={d.id}
            w={{ base: "full", md: "200px" }}
            overflow="hidden"
            bg={"teal.100"}
            justifySelf={"center"}
            _hover={{ shadow: "xl", transform: "scale(1.03)", transition: "0.2s" }}
          >
            <Image
              src={d.images[0].image}
              alt={d.name}
              objectFit={"fill"}
              w="100%"
              h={"150px"}
            />
            <Card.Body gap="2">
              <Card.Title>{d.name}</Card.Title>
              <Card.Description>{d.common_names}</Card.Description>
            </Card.Body>
            <Card.Footer alignSelf={"center"}>
              <Button variant="subtle" colorPalette={"teal"} size={"sm"}>
                Buy now
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </>
  );
}
