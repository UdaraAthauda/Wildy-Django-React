import api from "@/api";
import Nocontent from "@/components/Nocontent";
import Searchbar from "@/components/Searchbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { SimpleGrid, Button, Card, Image, Text, Tag, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  // get Searched informations
  const handleSearchResults = (results) => {
    setData(results)
  }

  if (data.length === 0) {
    return <LoadingSpinner />;
  }

  if (data[0].message === 'no_content') {
    return <Nocontent onBack={getData} />
  }

  return (
    <>

      <Flex align={'center'} justify={{base:'center', md:'space-between'}} mb={3} flexDir={{base:'column', md:'row'}} gap={2}>
        <Heading fontSize={{base:'md', md:'2xl'}}>Sri Lanka's Wild Life Information System</Heading>
        <Searchbar onSearchResults={handleSearchResults} onBack={getData} />
      </Flex>
      
      <SimpleGrid columns={{ base: 2, md: 5 }} gap={3}>
        {data.map((d) => (
          <Card.Root
            as={Link}
            to={`/info/${d.id}`}
            key={d.id}
            w={{ base: "full", md: "200px" }}
            size={"sm"}
            overflow="hidden"
            bg={"green.400"}
            justifySelf={"center"}
            _hover={{
              shadow: "xl",
              transform: "scale(1.03)",
              transition: "0.2s",
            }}
          >
            <Image
              src={d.images[0].image}
              alt={d.name}
              objectFit={"fill"}
              w="100%"
              h={"150px"}
            />
            <Card.Body gap="2">
              <Card.Title fontSize={{ base: "xs", md: "md" }}>
                {d.name}
                <Text fontSize={"xs"}>({d.scientific_name})</Text>
              </Card.Title>
              <Card.Description fontWeight={"semibold"}>
                {d.common_names}
              </Card.Description>
            </Card.Body>
            <Card.Footer alignSelf={"start"}>
              <Tag.Root
                size={"sm"}
                variant={"solid"}
                colorPalette={
                  d.venom_type === "venomous"
                    ? "red"
                    : d.venom_type === "mildly_venomous"
                    ? "orange"
                    : "green"
                }
              >
                <Tag.Label>{d.venom_type}</Tag.Label>
              </Tag.Root>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </>
  );
}
