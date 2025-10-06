import api from "@/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Tag,
  SimpleGrid,
  Separator,
  Badge,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Info() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await api(`wild/snakes/${id}/`);
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
    <Flex justify="center" align="center" p={2}>
      <Box
        w="full"
        p={{ base: 6, md: 10 }}
        rounded="2xl"
        shadow="xl"
        transition="all 0.3s ease"
        _hover={{ shadow: "2xl" }}
      >
        {/* Name Section */}
        <Stack spacing={2} textAlign={{ base: "center", md: "left" }}>
          <Heading size={{ base: "lg", md: "xl" }} color="teal.500">
            {data.name} ({data.common_names || "N/A"})
          </Heading>
          <Text fontStyle="italic" color="gray.600">
            {data.scientific_name}
          </Text>
        </Stack>

        <Separator my={5} />

        {/* image display section */}
        <HStack mb={5} flexDir={{base:'column', md:'row'}} gap={{base:5 , md:10}}>
          <Box alignSelf={'start'}>
            <Text fontWeight="bold" color="teal.600">
              Family:
            </Text>
            <Text>{data.family || "N/A"}</Text>
          </Box>
          <Box>
            <HStack flexDir={{base:'column', md:'row'}}>
              {data.images.map((img) => (
                <Image
                  key={img.id}
                  src={img.image}
                  alt={img.caption}
                  w={"200px"}
                  h={"150px"}
                  objectFit={"cover"}
                  borderRadius={5}
                />
              ))}
            </HStack>
          </Box>
        </HStack>

        {/* Venom Type */}
        <Box mb={5}>
          <Text fontWeight="bold" color="teal.600" mb={2}>
            Venom Type:
          </Text>
          <Tag.Root
            size="md"
            variant={"solid"}
            bg={
              data.venom_type === "venomous"
                ? "red"
                : data.venom_type === "mildly_venomous"
                ? "orange"
                : "green"
            }
          >
            <Tag.Label>{data.venom_type}</Tag.Label>
          </Tag.Root>
        </Box>

        {/* Description */}
        <Box mb={5}>
          <Text fontWeight="bold" color="teal.600" mb={2}>
            Description:
          </Text>
          <Text lineHeight="tall">{data.description}</Text>

          {data.description_translation && (
            <Text mt={2} color="gray.500" fontStyle="italic">
              {data.description_translation}
            </Text>
          )}
        </Box>

        {/* Regions & Habitats */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Box>
            <Text fontWeight="bold" color="teal.600" mb={2}>
              Regions:
            </Text>
            <Flex wrap="wrap" gap={2}>
              {data?.regions ? (
                data.regions.map((region) => (
                  <Badge key={region.id} colorPalette="purple" variant="subtle">
                    {region.name}
                  </Badge>
                ))
              ) : (
                <Text>No regions listed</Text>
              )}
            </Flex>
          </Box>

          <Box>
            <Text fontWeight="bold" color="teal.600" mb={2}>
              Habitats:
            </Text>
            <Flex wrap="wrap" gap={2}>
              {data?.habitats ? (
                data.habitats.map((habitat) => (
                  <Badge key={habitat.id} colorPalette="blue" variant="subtle">
                    {habitat.name}
                  </Badge>
                ))
              ) : (
                <Text>No habitats listed</Text>
              )}
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
