import { Flex, Heading, Button, HStack, Text } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={{ base: 3, md: 4 }}
      bg="teal.600"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      {/* Left Section (ColorMode on mobile only) */}
      <ColorModeButton display={{ base: "flex", md: "none" }} />

      {/* Center / Left Section (Heading) */}
      <Heading color="white" ml={10}>
        My App
      </Heading>

      {/* Right Section (Desktop only buttons) */}
      <Flex flex="1" justify="flex-end">
        <HStack
          spacing={5}
          mr={{ base: 2, md: 10 }}
          display={{ base: "none", md: "flex" }}
        >
          <Button colorScheme="blue" size="sm">
            Login
          </Button>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Flex>
  );
}
