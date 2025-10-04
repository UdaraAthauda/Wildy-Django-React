import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Sidebar() {
  return (
    <>
      <Flex
        as={'nav'}
        minH={"100%"}
        w={"15%"}
        px={"40px"}
        py={"100px"}
        bg={"teal"}
        display={{ base: "none", md: "flex" }}
      >
        <Text color={"white"}>hello</Text>
      </Flex>
    </>
  );
}
