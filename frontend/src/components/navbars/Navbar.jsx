import {
  Flex,
  Heading,
  Button,
  HStack,
  Avatar,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { Link, NavLink } from "react-router-dom";
import Sidedrawer from "./Sidedrawer";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { USER } from "@/constants";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const user = localStorage.getItem(USER);

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
          to="/"
          color="white"
          size={{ base: "lg", md: "2xl" }}
        >
          🐍 Wildy
        </Heading>
      </Flex>

      {/* Right Section (Desktop only buttons) */}
      <Flex flex="1" justify="flex-end">
        <HStack
          gap={5}
          mr={{ base: 2, md: 10 }}
          display={{ base: "none", md: "flex" }}
        >
          {isAuthenticated ? (
            <Menu.Root>
              <Menu.Trigger>
                <Avatar.Root variant={"solid"} colorPalette={"blue"} cursor={'pointer'}>
              <Avatar.Fallback name={user} />
            </Avatar.Root>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="new-txt">Profile</Menu.Item>
                    <Menu.Item value="new-file"><Link to='/logout'>Logout</Link></Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <Button
              as={Link}
              to="/signup"
              size="sm"
              variant={"subtle"}
              colorPalette="blue"
            >
              Signup
            </Button>
          )}
          <ColorModeButton />
        </HStack>
      </Flex>

      {/* Right Section (Side Drawer) */}
      <Flex
        flex="1"
        justify="flex-end"
        mr={3}
        display={{ base: "flex", md: "none" }}
      >
        <Sidedrawer />
      </Flex>
    </Flex>
  );
}
