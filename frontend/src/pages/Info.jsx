import api from "@/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  Box,
  Flex,
  Heading,
  Text,
  Tag,
  SimpleGrid,
  Separator,
  Badge,
  Image,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineBookOpen, HiOutlinePencil } from "react-icons/hi";

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
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          justify="space-between"
          textAlign={{ base: "center", md: "left" }}
          gap={4}
        >
          {/* Left section */}
          <VStack align={{ base: "center", md: "flex-start" }} flex={1}>
            <Heading size={{ base: "lg", md: "xl" }} color="teal.500">
              {data.name} {data.common_names && `(${data.common_names})`}
            </Heading>
            <Text fontStyle="italic" color="gray.600">
              {data.scientific_name}
            </Text>
          </VStack>

          {/* Right section */}
          <HStack gap={5}>
            <Button size="sm" colorPalette={"green"}>
              <HiOutlineBookOpen /> Read Blogs
            </Button>
            <Button as={Link} to={`/write/${data.id}/${data.name+' '+`(${data.common_names})`}`} size="sm" colorPalette={"yellow"}>
              <HiOutlinePencil /> Write Blogs
            </Button>
          </HStack>
        </Flex>

        <Separator my={5} />

        {/* image display section */}
        <HStack
          mb={5}
          align={{ base: "center", md: "start" }}
          flexDir={{ base: "column", md: "row" }}
          spacing={{ base: 5, md: 10 }}
          w="full"
        >
          {/* Left Section — Family Info */}
          <Box flex={1} alignSelf={'self-start'} mb={3}>
            <Text fontWeight="bold" color="teal.600">
              Family:
            </Text>
            <Text>{data.family || "N/A"}</Text>
          </Box>

          {/* Right Section — Images */}
          <Box flex={3} w="full">
            <SimpleGrid
              columns={{ base: 2, sm: 3, md: 4 }}
              gap={{base:0, md:3}}
              justifyItems="center"
            >
              {data.images?.length > 0 ? (
                data.images.map((img) => (
                  <Image
                    key={img.id}
                    src={img.image}
                    alt={img.caption || "snake image"}
                    w={{ base: "120px", sm: "150px", md: "200px" }}
                    h={{ base: "100px", sm: "120px", md: "140px" }}
                    objectFit="cover"
                    borderRadius="md"
                    shadow="sm"
                  />
                ))
              ) : (
                <Text>No images available</Text>
              )}
            </SimpleGrid>
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
            <Tag.Label color={"white"}>{data.venom_type}</Tag.Label>
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
