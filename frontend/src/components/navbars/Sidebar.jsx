import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdOutlineMenuBook } from "react-icons/md";

export default function Sidebar() {
  const routes = [
    { to:'/', label:'All info', icon:<MdHome />},
    { to:'/read', label:'Blogs', icon:<MdOutlineMenuBook />},
  ]

  return (
    <>
      <Flex
        as={"nav"}
        minH={"100%"}
        w={'200px'}
        gap={3}
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
          w={'full'}
          justifyContent={'flex-start'}
          colorPalette={"blue"}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "lightgreen" : "",
            color: isActive ? "green" : "",
          })}
        >
          <HStack align={'center'} gap={3}>
            {icon}
            <Box>{label}</Box>
          </HStack>
        </Button>
        ))}
      </Flex>
    </>
  );
}
