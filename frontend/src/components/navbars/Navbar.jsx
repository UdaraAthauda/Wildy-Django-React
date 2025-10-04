import { Flex, Heading, Button, HStack } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { Link, NavLink } from "react-router-dom";
import Sidedrawer from "./Sidedrawer";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      p={{ base: 3, md: 4 }}
      bg="teal.600"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      {/* Left Section (ColorMode on mobile only) */}
      <Flex flex="1" justify="flex-start">
        <ColorModeButton display={{ base: "flex", md: "none" }} />
      </Flex>

      {/* Center / Left Section (Heading) */}
      <Flex flex="20" justify={{ base: "center", md: "flex-start" }}>
        <Heading
          as={NavLink}
          to='/'
          color="white"
          size={{ base: "lg", md: "2xl" }}
        >
          Wildy
        </Heading>
      </Flex>

      {/* Right Section (Desktop only buttons) */}
      <Flex flex="1" justify="flex-end">
        <HStack
          gap={5}
          mr={{ base: 2, md: 10 }}
          display={{ base: "none", md: "flex" }}
        >
          <Button as={Link} to='/login' colorPalette="blue" size="sm" variant={'subtle'}>
            Login
          </Button>

          <Button as={Link} to='/signup' size="sm" variant={'outline'} color={'white'}>
            Signup
          </Button>

          <ColorModeButton />
        </HStack>
      </Flex>

      {/* Right Section (Side Drawer) */}
      <Flex flex="1" justify="flex-end" mr={3} display={{ base: "flex", md: "none" }}>
        <Sidedrawer />
      </Flex>
    </Flex>
  );
}
