import { Box, Flex, Heading, Spacer, IconButton, Button } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  return (
    <Flex as="nav" align="center" p={4} bg="green.600">
      <Heading size="md">My App</Heading>
      <Spacer />
      <ColorModeButton />
      <IconButton
        aria-label="Menu"
        icon={<GiHamburgerMenu />}
        ml={2}
        variant="ghost"
        color="white"
      />
      <Button ml={4} colorScheme="teal" size="sm">
        Login
      </Button>
    </Flex>
  );
}
