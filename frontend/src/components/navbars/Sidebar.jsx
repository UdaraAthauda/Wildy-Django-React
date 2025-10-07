import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";

export default function Sidebar() {
  const routes = [
    { to:'/', label:'All info', icon:<MdHome />},
  ]

  return (
    <>
      <Flex
        as={"nav"}
        minH={"100%"}
        w={"15%"}
        gap={1}
        px={"40px"}
        py={"100px"}
        bg={"teal"}
        flexDir={"column"}
        display={{ base: "none", md: "flex" }}
      >
        {routes.map(({to, label, icon}) => (
        <Button
          as={NavLink}
          to={to}
          key={to}
          borderRadius={"full"}
          variant={"subtle"}
          size={"sm"}
          w={'100%'}
          colorPalette={"blue"}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "lightgreen" : "",
            color: isActive ? "green" : "",
          })}
        >
          {icon} {label}
        </Button>
        ))}
      </Flex>
    </>
  );
}
