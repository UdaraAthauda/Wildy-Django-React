import {
  Button,
  CloseButton,
  Drawer,
  Flex,
  Portal,
  Avatar,
  Menu,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHome, MdOutlineMenuBook } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { USER } from "@/constants";

const Sidedrawer = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const user = localStorage.getItem(USER);

  const routes = [
    { to: "/", label: "All info", icon: <MdHome /> },
    { to: "/readList", label: "Blogs", icon: <MdOutlineMenuBook /> },
    { to:'/written', label:'Written', icon:<FaPencilAlt />},
  ];

  return (
    <Drawer.Root
      placement={"start"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <GiHamburgerMenu color="white" />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>Wildy</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Flex
                as={"nav"}
                minH={"100%"}
                p={5}
                gap={2}
                bg={"teal"}
                borderRadius={5}
                flexDir={"column"}
              >
                {routes.map(({ to, label, icon }) => (
                  <Button
                    as={NavLink}
                    to={to}
                    key={to}
                    borderRadius={"full"}
                    variant={"subtle"}
                    size={"sm"}
                    w={"100%"}
                    colorPalette={"blue"}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "lightgreen" : "",
                      color: isActive ? "green" : "",
                    })}
                  >
                    {icon} {label}
                  </Button>
                ))}
              </Flex>
            </Drawer.Body>
            <Drawer.Footer>
              {isAuthenticated ? (
                <Menu.Root>
                  <Menu.Trigger>
                    <HStack>
                      <Text>Logged in User:</Text>
                      <Avatar.Root variant={"solid"} colorPalette={"blue"}>
                        <Avatar.Fallback name={user} />
                      </Avatar.Root>
                    </HStack>
                  </Menu.Trigger>

                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="new-txt">Profile</Menu.Item>
                      <Menu.Item value="new-file">
                        <Link to="/logout" onClick={() => setOpen(false)}>
                          Logout
                        </Link>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu.Root>
              ) : (
                <Button
                  as={Link}
                  to="/signup"
                  w={"full"}
                  variant={"subtle"}
                  colorPalette={"blue"}
                  onClick={() => setOpen(false)}
                >
                  SignUp
                </Button>
              )}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Sidedrawer;
